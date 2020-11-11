import React from 'react';

function NavBar(props) {
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <a class="navbar-brand" href="/">
                progcheck <span class="badge badge-secondary">EXPERIMENTAL</span>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        </nav>
    )
}

export default NavBar;