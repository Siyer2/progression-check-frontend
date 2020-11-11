import React, { useState, useCallback } from 'react';
import _ from 'lodash';

function Inputs(props) {
    const [value, setValue] = useState("");

    const handleInputChange = useCallback(
        (e) => {
            const value = e.target.value;
            setValue(value);
            debounceHandler(value);
        },
        [debounceHandler]
    );

    const debounceHandler = useCallback(
        _.debounce((value) => {
            console.log(`Debounced Value = ${value}`);
        }, 1000),
        []
    );


    return (
        <div className="jumbotron">
            {/* Programs */}
            <div className="form-group">
                <label>Program</label>
                <input onChange={handleInputChange} className="form-control" list="browsers" name="browser"/>
                <datalist id="browsers">
                    <option value="Firefox" />
                    <option value="Chrome" />
                    <option value="Opera" />
                    <option value="Safari" />
                </datalist>
            </div>

            {/* Year */}
            <div className="form-group">
                <label>Year</label>
                <input className="form-control" list="years" name="years"/>
                <datalist id="years">
                    <option>2019</option>
                    <option>2020</option>
                    <option>2021</option>
                </datalist>
            </div>

            {/* Specialisations */}
            <div className="form-group">
                <label className="control-label">Major</label>
                <div className="form-group">
                    <div className="input-group mb-3">
                        <select className="form-control" id="exampleSelect1">
                            <option>None</option>
                            <option>2</option>
                        </select>
                        <div className="input-group-append">
                            <button className="btn btn-secondary">Add</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Go */}
            <button type="submit" className="btn btn-primary">Go</button>

        </div>
    )
}

export default Inputs;