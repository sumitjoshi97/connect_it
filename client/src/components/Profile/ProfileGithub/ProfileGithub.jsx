import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Spinner from '../../Common/Spinner/Spinner'

export class ProfileGithub extends Component {
  state = {
    repos: []
  }

  componentDidMount() {
    const { username } = this.props
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
        process.env.REACT_APP_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`
    )
      .then(res => res.json())
      .then(data => {
        if (this.repo) {
          this.setState({ repos: data })
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    const { repos } = this.state
    let repoList = <Spinner />
    if (repos.length > 0) {
      repoList = repos.map(repo => (
        <div key={repo.id} className="card card_body mb-2">
          <div className="row">
            <div className="col-md-6">
              <h4>
                <a
                  href={repo.html_url}
                  className="font-purple m-2 pt-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {' '}
                  {repo.name}
                </a>
              </h4>
              <p className="m-2">{repo.description}</p>
            </div>
          </div>
        </div>
      ))
    }

    return (
      <div ref={repo => (this.repo = repo)}>
        <hr />
        <h3 className="mb-4 font-purple">Latest Github Repos</h3>
        {repoList}
      </div>
    )
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
}

export default ProfileGithub
