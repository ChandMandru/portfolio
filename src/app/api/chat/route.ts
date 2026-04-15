import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { buildSystemPrompt } from '@/lib/chatbot/buildSystemPrompt';
import { checkRateLimit } from '@/lib/chatbot/ratelimit';

export async function POST(request: Request) {
  // 1. Extract client IP (handle proxy chains per research pitfall 5)
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'anonymous';

  // 2. Rate limiting (D-09: 10 req/min per IP)
  const { success } = await checkRateLimit(ip);
  if (!success) {
    return Response.json(
      {
        error:
          "You're sending messages too quickly. Please wait a moment.",
      },
      { status: 429 }
    );
  }

  // 3. Parse and validate request body
  let messages: unknown;
  try {
    const body = await request.json();
    messages = body.messages;
  } catch {
    return Response.json(
      {
        error:
          "I'm having trouble responding right now. Please try again in a moment.",
      },
      { status: 400 }
    );
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json(
      {
        error:
          "I'm having trouble responding right now. Please try again in a moment.",
      },
      { status: 400 }
    );
  }

  // 4. Truncate conversation history (D-04: last 10 messages)
  const truncated = messages.slice(-10);

  // 5. Stream response from OpenAI
  try {
    const result = streamText({
      model: openai('gpt-4o-mini'),
      system: buildSystemPrompt(),
      messages: truncated,
      maxOutputTokens: 500, // D-12: cap response length
      temperature: 0.3, // Low temperature for factual, consistent answers
    });

    return result.toUIMessageStreamResponse();
  } catch {
    return Response.json(
      {
        error:
          "I'm having trouble responding right now. Please try again in a moment.",
      },
      { status: 500 }
    );
  }
}
