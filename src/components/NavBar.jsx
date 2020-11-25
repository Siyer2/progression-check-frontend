import React from 'react';
import { Button } from 'react-bootstrap';

function NavBar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="/">
                progcheck <span className="badge badge-secondary">EXPERIMENTAL</span>
            </a>

            <Button className="navbar-toggler" data-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation">
                <a target='_blank' href="mailto:iyersyam@gmail.com?subject=Found%20a%20bug%20%3A(&body=There%20was%20a%20bug%20when%20I%3A%0D%0A%3CTELL%20ME%20WHAT%20I%20SCREWED%20UP%20HERE%3E%0D%0A%0D%0A%0D%0APls%20fix%20%E2%9D%A4%EF%B8%8F">🙁</a>
            </Button>

            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <Button className="">
                        <a target='_blank' href="mailto:iyersyam@gmail.com?subject=Found%20a%20bug%20%3A(&body=There%20was%20a%20bug%20when%20I%3A%0D%0A%3CTELL%20ME%20WHAT%20I%20SCREWED%20UP%20HERE%3E%0D%0A%0D%0A%0D%0APls%20fix%20%E2%9D%A4%EF%B8%8F">🙁</a>
                    </Button>
                </form>
            </div>
        </nav>
    )
}

export default NavBar;