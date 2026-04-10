import { skills } from '@/data/skills';

export function SkillsSection() {
  return (
    <section className="py-12">
      <h2 className="text-xl font-semibold text-foreground mb-8">Skills</h2>
      <div className="flex flex-col gap-8">
        {skills.map((group) => (
          <div key={group.category}>
            <h3 className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill.name}
                  className="bg-muted rounded-full px-2 py-1 text-sm text-foreground"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
