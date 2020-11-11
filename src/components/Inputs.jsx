import React from 'react';

function Inputs(props) {
    return (
        <div class="jumbotron">
            {/* Programs */}
            <div class="form-group">
                <label for="exampleInputEmail1">Program</label>
                <input class="form-control" list="browsers" name="browser"/>
                <datalist id="browsers">
                    <option value="Firefox" />
                    <option value="Chrome" />
                    <option value="Opera" />
                    <option value="Safari" />
                </datalist>
            </div>

            {/* Year */}
            <div class="form-group">
                <label for="exampleInputEmail1">Year</label>
                <input class="form-control" list="years" name="years"/>
                <datalist id="years">
                    <option>2019</option>
                    <option>2020</option>
                    <option>2021</option>
                </datalist>
            </div>

            {/* Specialisations */}
            <div class="form-group">
                <label class="control-label">Major</label>
                <div class="form-group">
                    <div class="input-group mb-3">
                        <select class="form-control" id="exampleSelect1">
                            <option>None</option>
                            <option>2</option>
                        </select>
                        <div class="input-group-append">
                            <button class="btn btn-secondary">Add</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Go */}
            <button type="submit" class="btn btn-primary">Go</button>

        </div>
    )
}

export default Inputs;