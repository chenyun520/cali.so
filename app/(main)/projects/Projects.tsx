'use client'

import type { Project } from '~/sanity/schemas/project'

import { ProjectCard } from './ProjectCard'

export function Projects({ projects, limit = 3 }: { projects: Project[]; limit?: number }) {
  return (
    <ul role="list" className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {projects.slice(0, limit).map((project) => (
        <ProjectCard project={project} key={project._id} />
      ))}
    </ul>
  )
}
