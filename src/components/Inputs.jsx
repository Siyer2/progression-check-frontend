import React from 'react';

function Inputs(props) {
    return (
        <div class="jumbotron">
            {/* Programs */}
            <div class="form-group">
                <label for="exampleInputEmail1">Program</label>
                <input class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter program" />
            </div>

            {/* Year */}
            <div class="form-group">
                <label for="exampleSelect1">Year</label>
                <select class="form-control" id="exampleSelect1">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
            </div>

            {/* Specialisations */}
            <div class="form-group">
                <label class="control-label">Major</label>
                <div class="form-group">
                    <div class="input-group mb-3">
                        <select class="form-control" id="exampleSelect1">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
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