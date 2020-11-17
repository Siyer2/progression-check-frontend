import React, { useState } from 'react';
import {
    Form, 
    Col, 
    Button
} from 'react-bootstrap';
import AsyncSelect from 'react-select/async';
import _ from 'lodash';
import { getCourseList, getCourse } from '../models/apiCalls';

function CourseSelector(props) {
    const [courseInput, setCourseInput] = useState('');
    const [courseList, setCourseList] = useState([]);
    const [completedCourses, setCompletedCourses] = useState([]);
    const [courseError, setCourseError] = useState('');

    const handleCourseInputChange = newValue => {
        setCourseError('');
        setCourseInput(newValue);
    }

    const promiseOptions = inputValue => {
        return new Promise(async resolve => {
            const courses = await getCourseList(inputValue);
            setCourseList(courses);
            const formattedCourses = courses.map((course) => {
                return {
                    course_code: course.item.Item.course_code.S,
                    label: `${course.item.Item.course_code.S}: ${course.item.Item.name.S}`
                }
            });
            resolve(formattedCourses);
        });
    }

    async function courseAdded() {
        // Get the course from the course list
        var courseFromDataList = _.find(courseList, function(course) {
            return course.item.Item.course_code.S === courseInput.course_code
        });

        if (!courseFromDataList) {
            courseFromDataList = await getCourse(courseInput.course_code);
        }

        if (!courseFromDataList) {
            setCourseError(`Course not found`);
        }
        else {
            const newCompletedCourses = completedCourses.concat([courseFromDataList.item]);
            setCompletedCourses(newCompletedCourses);
    
            props.addedCourse(courseFromDataList.item);
    
            setCourseInput('');
        }

    }

    const listOfCompletedCourses = completedCourses.length && completedCourses.map((completedCourse, i) => {
        const link = `https://www.handbook.unsw.edu.au${completedCourse.Item.link.S}`;
        return (
            <a style={{ textDecoration: 'none' }} href={link} target='_blank' key={completedCourse.Item.course_code.S + i}>
                <Button variant="secondary" block>
                        {completedCourse.Item.course_code.S}: {completedCourse.Item.name.S}
                </Button>
            </a>
        )
    });

    return (
        <Form style={{padding: '10px'}}>
            <Form.Row>
                <Col>
                    <AsyncSelect onChange={handleCourseInputChange} cacheOptions defaultOptions loadOptions={promiseOptions} placeholder={"Add courses you've completed..."} value={courseInput}/>
                    {courseError &&
                    <Form.Text className="text-muted">
                        {courseError}
                    </Form.Text>
                    }
                </Col>
                <Col xs="auto">
                    <Button onClick={() => { courseAdded() }} className="mb-2">
                        Add
                    </Button>
                </Col>
            </Form.Row>
            {completedCourses.length ? 
                <>
                    Completed Courses:
                    {listOfCompletedCourses}
                </>
            : <></>    
            }
        </Form>
    )
}

export default CourseSelector;