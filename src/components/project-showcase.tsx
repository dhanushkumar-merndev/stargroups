import type { Project } from "@/lib/companies";
import { ProjectCarousel } from "@/components/project-carousel";
import { ProjectInfoDialog } from "@/components/project-info-dialog";

function ProjectCard({ project }: { project: Project }) {
  const details = project.details ?? [];
  const hasProjectInfo = details.length > 0 || Boolean(project.footer?.length);

  return (
    <article>
      <div className="flex items-start justify-between gap-4">
        <h2 className="font-display text-4xl font-semibold text-sg-dark-ink md:text-5xl">
          {project.title}
        </h2>
        {hasProjectInfo && (
          <ProjectInfoDialog title={project.title} details={details} footer={project.footer} />
        )}
      </div>
      {project.subtitle && (
        <p className="mt-3 font-display text-xl italic text-sg-red">{project.subtitle}</p>
      )}
      <p className="mt-4 max-w-[66ch] text-base leading-relaxed text-sg-dark-muted">
        {project.description}
      </p>
      <div className="mt-7">
        <ProjectCarousel images={project.images} />
      </div>

    </article>
  );
}

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  const finishedProjects = projects.filter((project) => project.status === "finished");
  const ongoingProjects = projects.filter((project) => project.status === "ongoing");
  const upcomingProjects = projects.filter((project) => project.status === "upcoming");

  return (
    <div>
      {finishedProjects.length > 0 && (
        <section>
          <p className="sg-eyebrow mb-5 text-sg-red">Our completed projects.</p>
          <p className="max-w-[66ch] text-base leading-relaxed text-sg-dark-muted">
            Thoughtfully planned communities and farmland developments in Madikeri and Hoskote,
            created around quality infrastructure, natural surroundings and lasting value.
          </p>
          <div className="mt-8 space-y-10">
            {finishedProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>
      )}

      {ongoingProjects.length > 0 && (
        <section
          className={
            finishedProjects.length > 0
              ? "mt-20 border-t border-sg-line-light pt-14 lg:mt-24 lg:pt-20"
              : undefined
          }
        >
          <p className="sg-eyebrow mb-5 text-sg-red">Ongoing projects.</p>
          <div className="mt-2 space-y-10">
            {ongoingProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>
      )}

      {upcomingProjects.length > 0 && (
        <section className="mt-20 border-t border-sg-line-light pt-14 lg:mt-24 lg:pt-20">
          <p className="sg-eyebrow mb-5 text-sg-red">Upcoming projects.</p>
          <div className="space-y-16 lg:space-y-20">
            {upcomingProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
