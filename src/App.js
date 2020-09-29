import React from 'react'
import { ReactQueryCacheProvider, useQuery } from 'react-query'
import { query } from 'graphqurl'

const getProjects = async () => {
  const results = await query({
    query: 'query { project { id name github } }',
    endpoint: 'https://pet-mutt-99.hasura.app/v1/graphql',
  })

  return results.data.project
}

const App = () => {
  return (
    <ReactQueryCacheProvider>
      <Projects />
    </ReactQueryCacheProvider>
  )
}

const Projects = () => {
  const projectsQuery = useQuery('project', getProjects)

  return (
    <div>
      <h2>Some Projects</h2>
      {projectsQuery?.data?.map((project) => (
        <p>
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            <code>{project.name}</code>
          </a>
        </p>
      ))}
    </div>
  )
}

export default App
