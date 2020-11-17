import React, { useState } from 'react';
import {
    OverlayTrigger,
    Tooltip,
    Card,
    ListGroup,
    Button,
    Modal
} from 'react-bootstrap';

import { stripHtml } from '../helperFunctions';

function RenderRule(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const courseShowLimit = 20;

    const rule = props.rule;

    // Don't display the rule if it's already been completed
    if (rule.M.completedCourses && rule.M.credit_points && rule.M.credit_points.S === 0) {
        return (
            <> </>
        )
    }

    // Course list and credit points exist
    if ((rule.M.courses && rule.M.courses.L.length <= courseShowLimit) && ((rule.M.credit_points && rule.M.credit_points.S) || (rule.M.credit_points_max && rule.M.credit_points_max.S))) {
        return (
            <div key={props.ruleName + props.index}>
                <OverlayTrigger
                    key={'top'}
                    placement={'top'}
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            {stripHtml(rule.M.description.S)}
                        </Tooltip>
                    }
                >
                    <Card.Title>
                        {
                            rule.M.credit_points && rule.M.credit_points_max && rule.M.credit_points.S === rule.M.credit_points_max.S ?
                                `Finish ${rule.M.credit_points.S} UOC of the following courses:`
                                :
                                rule.M.credit_points && rule.M.credit_points_max ?
                                    `Finish between ${rule.M.credit_points.S} and ${rule.M.credit_points_max.S} UOC of the following courses:`
                                    :
                                    rule.M.credit_points ?
                                        `Finish ${rule.M.credit_points.S} UOC of the following courses:`
                                        :
                                        rule.M.credit_points_max ?
                                            `Finish up to ${rule.M.credit_points_max.S} UOC of the following courses:`
                                            :
                                            stripHtml(rule.M.description.S)
                        }
                    </Card.Title>
                </OverlayTrigger>
                <ListGroup variant="flush">
                    {rule.M.courses && rule.M.courses.L.map((course, i) => {
                        return (<ListGroup.Item key={i + course.M.code.S}>{course.M.code.S} ({course.M.credit_points ? course.M.credit_points.S : '0'} UOC)</ListGroup.Item>)
                    })}
                </ListGroup>
            </div >
        )
    }
    // If no credit points but it is a core course (consider compulsory)
    else if (rule.M.courses && rule.M.courses.L.length <= courseShowLimit) {
        return (
            <div key={props.ruleName + props.index}>
                <OverlayTrigger
                    key={'top'}
                    placement={'top'}
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            {stripHtml(rule.M.description.S)}
                        </Tooltip>
                    }
                >
                    <Card.Title>
                        {stripHtml(rule.M.description.S)}
                    </Card.Title>
                </OverlayTrigger>
                <ListGroup variant="flush">
                    {rule.M.courses && rule.M.courses.L.map((course, i) => {
                        return (<ListGroup.Item key={i + course.M.code.S}>{course.M.code.S} ({course.M.credit_points ? course.M.credit_points.S : '0'} UOC)</ListGroup.Item>)
                    })}
                </ListGroup>
            </div >
        )
    }
    // If there are over 10 courses
    else if (rule.M.courses && rule.M.courses.L.length) {
        return (
            <div key={props.ruleName + props.index}>
                <OverlayTrigger
                    key={'top'}
                    placement={'top'}
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            {stripHtml(rule.M.description.S)}
                        </Tooltip>
                    }
                >
                    <Card.Title>
                        {
                            rule.M.credit_points && rule.M.credit_points_max ?
                                `Finish between ${rule.M.credit_points.S} and ${rule.M.credit_points_max.S} UOC of the following courses:`
                                :
                                rule.M.credit_points ?
                                    `Finish ${rule.M.credit_points.S} UOC of the following courses:`
                                    :
                                    rule.M.credit_points_max ?
                                        `Finish up to ${rule.M.credit_points_max.S} UOC of the following courses:`
                                        :
                                        stripHtml(rule.M.description.S)
                        }
                    </Card.Title>
                </OverlayTrigger>
                <Card.Body>
                    <Button variant="primary" onClick={handleShow}>View {rule.M.courses.L.length} Courses</Button>
                </Card.Body>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Showing {rule.M.courses.L.length} courses from {props.ruleName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ListGroup variant="flush">
                            {rule.M.courses && rule.M.courses.L.map((course, i) => {
                                return (<ListGroup.Item key={i + course.M.code.S}>{course.M.code.S} ({course.M.credit_points ? course.M.credit_points.S : '0'} UOC)</ListGroup.Item>)
                            })}
                        </ListGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div >
        )
    }
    else {
        const url = rule.M.url && !rule.M.url.NULL ? `https://www.handbook.unsw.edu.au${rule.M.url.S}` : null;

        return (
            url ?
            <div key={props.ruleName + props.index}>
                <Card.Title>
                    <a href={url} target="_blank">
                        {stripHtml(rule.M.description.S)}
                    </a>
                </Card.Title>
            </div>
            :
            <div key={props.ruleName + props.index}>
                <Card.Title>
                    {stripHtml(rule.M.description.S)}
                </Card.Title>
            </div>
        )
    }
}

export default RenderRule;