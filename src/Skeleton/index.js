import React from 'react'
import { Row, Card, CardBody, CardTitle, CardImg, CardSubtitle, Button, Collapse, Tooltip, Col} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Skeleton from 'react-loading-skeleton';

const SkeletonData = () => {
    return (
        <div className="container-fluid prodLists skeleton">
            <Col md="12">
                <Row style={{ marginTop: "30px" }}>
                    <Col md="3" className="">
                    </Col>
                    <Col md="9">
                        <Row className="mb-2">
                        </Row>
                        <Row>
                            <Col md="4" sm="6" xs="6" lg="3">
                                <Card className="plp-card" id={"Tooltip"}>
                                    <a style={{marginLeft : "6px", marginRight:"6px"}}>
                                    <Skeleton count={1} height={"120px"} width={"100%"}/>
                                    </a>
                                    <a style={{marginTop:"15px", marginRight:"6px", marginLeft:"6px"}}>
                                    <Skeleton count={3} width={"80%"} />
                                    </a>
                                </Card>
                            </Col>
                            <Col md="4" sm="6" xs="6" lg="3">
                                <Card className="plp-card" id={"Tooltip"}>
                                    <a style={{marginLeft : "6px", marginRight:"6px"}}>
                                    <Skeleton count={1} height={"120px"} width={"100%"}/>
                                    </a>
                                    <a style={{marginTop:"15px", marginRight:"6px", marginLeft:"6px"}}>
                                    <Skeleton count={3} width={"80%"} />
                                    </a>
                                </Card>
                            </Col>
                            <Col md="4" sm="6" xs="6" lg="3">
                                <Card className="plp-card" id={"Tooltip"}>
                                    <a style={{marginLeft : "6px", marginRight:"6px"}}>
                                    <Skeleton count={1} height={"120px"} width={"100%"}/>
                                    </a>
                                    <a style={{marginTop:"15px", marginRight:"6px", marginLeft:"6px"}}>
                                    <Skeleton count={3} width={"80%"} />
                                    </a>
                                </Card>
                            </Col>
                            <Col md="4" sm="6" xs="6" lg="3">
                                <Card className="plp-card" id={"Tooltip"}>
                                    <a style={{marginLeft : "6px", marginRight:"6px"}}>
                                    <Skeleton count={1} height={"120px"} width={"100%"}/>
                                    </a>
                                    <a style={{marginTop:"15px", marginRight:"6px", marginLeft:"6px"}}>
                                    <Skeleton count={3} width={"80%"} />
                                    </a>
                                </Card>
                            </Col>
                            <Col md="4" sm="6" xs="6" lg="3">
                                <Card className="plp-card" id={"Tooltip"}>
                                    <a style={{marginLeft : "6px", marginRight:"6px"}}>
                                    <Skeleton count={1} height={"120px"} width={"100%"}/>
                                    </a>
                                    <a style={{marginTop:"15px", marginRight:"6px", marginLeft:"6px"}}>
                                    <Skeleton count={3} width={"80%"} />
                                    </a>
                                </Card>
                            </Col>
                            <Col md="4" sm="6" xs="6" lg="3">
                                <Card className="plp-card" id={"Tooltip"}>
                                    <a style={{marginLeft : "6px", marginRight:"6px"}}>
                                    <Skeleton count={1} height={"120px"} width={"100%"}/>
                                    </a>
                                    <a style={{marginTop:"15px", marginRight:"6px", marginLeft:"6px"}}>
                                    <Skeleton count={3} width={"80%"} />
                                    </a>
                                </Card>
                            </Col>
                            <Col md="4" sm="6" xs="6" lg="3">
                                <Card className="plp-card" id={"Tooltip"}>
                                    <a style={{marginLeft : "6px", marginRight:"6px"}}>
                                    <Skeleton count={1} height={"120px"} width={"100%"}/>
                                    </a>
                                    <a style={{marginTop:"15px", marginRight:"6px", marginLeft:"6px"}}>
                                    <Skeleton count={3} width={"80%"} />
                                    </a>
                                </Card>
                            </Col>
                            <Col md="4" sm="6" xs="6" lg="3">
                                <Card className="plp-card" id={"Tooltip"}>
                                    <a style={{marginLeft : "6px", marginRight:"6px"}}>
                                    <Skeleton count={1} height={"120px"} width={"100%"}/>
                                    </a>
                                    <a style={{marginTop:"15px", marginRight:"6px", marginLeft:"6px"}}>
                                    <Skeleton count={3} width={"80%"} />
                                    </a>
                                </Card>
                            </Col>
                            <Col md="4" sm="6" xs="6" lg="3">
                                <Card className="plp-card" id={"Tooltip"}>
                                    <a style={{marginLeft : "6px", marginRight:"6px"}}>
                                    <Skeleton count={1} height={"120px"} width={"100%"}/>
                                    </a>
                                    <a style={{marginTop:"15px", marginRight:"6px", marginLeft:"6px"}}>
                                    <Skeleton count={3} width={"80%"} />
                                    </a>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </div>
    )
}

export default SkeletonData