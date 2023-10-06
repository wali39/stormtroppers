import React from 'react'
import { Carousel, Row, Col } from 'react-bootstrap'

import wali_img from "../assets/wali.png"
import johir_img from "../assets/johir.png"
import labi_img from "../assets/labib.png"
import jaowad_img from "../assets/jaowad.png"
import "./TeamCarousel.css"

const TeamCarousel = () => {
    return (
        <Col lg="8" sm="12" className="align-itself-center"> <Carousel controls={false}>
            <Carousel.Item >
                <Row >
                    <Col >
                        <div className='custom-card '>
                            <div className='custom-card-image'>
                                <img src={labi_img} alt="" />
                            </div>
                            <div className='custom-card-text'>
                                <h2>Mainul Islam Labib</h2>
                                <p>Electronics and Communication Engineering Discipline, Khulna University</p>
                            </div>
                        </div>
                    </Col>
                    <Col >
                        <div className='custom-card '>
                            <div className='custom-card-image'>
                                <img src={johir_img} alt="" />
                            </div>
                            <div className='custom-card-text'>
                                <h2>Johir Raihan</h2>
                                <p>Electronics and Communication Engineering Discipline, Khulna University</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Carousel.Item>
            <Carousel.Item >
                <Row >
                    <Col >
                        <div className='custom-card '>
                            <div className='custom-card-image'>
                                <img src={jaowad_img} alt="" />
                            </div>
                            <div className='custom-card-text'>
                                <h2>Md. Rashed Zaod khan</h2>
                                <p>Electronics and Communication Engineering Discipline, Khulna University</p>
                            </div>
                        </div>
                    </Col>
                    <Col >
                        <div className='custom-card '>
                            <div className='custom-card-image'>
                                <img src={wali_img} alt="" />
                            </div>
                            <div className='custom-card-text'>
                                <h2>Wali Ullah</h2>
                                <p>Electronics and Communication Engineering Discipline, Khulna University</p>
                            </div>
                        </div>
                    </Col>
                </Row>

            </Carousel.Item>

        </Carousel></Col>
    )
}

export default TeamCarousel
