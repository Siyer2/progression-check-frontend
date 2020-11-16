import React from 'react';
import {
    Form, 
    Col, 
    Button
} from 'react-bootstrap';
import AsyncSelect from 'react-select/async';

function CourseSelector() {
    const handleCourseInputChange = newValue => {
        // setProgramInput(newValue);
        console.log(newValue);
    }

    const promiseOptions = inputValue => {
        return new Promise(async resolve => {
            // const programs = await getProgramList(inputValue);
            // setDataList(programs);
            // const formattedPrograms = programs.map((program) => {
            //     return {
            //         year: program.item.Item.implementation_year.S,
            //         code: program.item.Item.code.S,
            //         label: `${program.item.Item.code.S}: ${program.item.Item.title.S} (${program.item.Item.implementation_year.S})`
            //     }
            // });
            // resolve(formattedPrograms);

            resolve();
        });
    }

    function courseAdded() {
        // // See if it's a valid program
        // const code = programInput.code;
        // const year = programInput.year;

        // var programFromDataList = _.find(dataList, function (program) {
        //     return program.item.Item.code.S === code && program.item.Item.implementation_year.S === year;
        // });

        // if (!programFromDataList) {
        //     programFromDataList = await getProgram(code, year);
        // }

        // if (!programFromDataList) {
        //     setProgramError('Program not found');
        // }
        // else {
        //     setProgramError('');
        // }

        // setSelectedProgram(programFromDataList);
        console.log("course added");
    }

    return (
        <Form style={{padding: '10px'}}>
            <Form.Row>
                <Col>
                    <AsyncSelect onChange={handleCourseInputChange} cacheOptions defaultOptions loadOptions={promiseOptions} placeholder={"Add courses you've completed..."} />
                </Col>
                <Col xs="auto">
                    <Button onClick={() => { courseAdded() }} className="mb-2">
                        Add
                    </Button>
                </Col>
            </Form.Row>
        </Form>
    )
}

export default CourseSelector;