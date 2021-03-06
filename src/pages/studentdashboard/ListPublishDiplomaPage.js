import React, { Component } from "react";
import Axios from "axios";
import toastr from "toastr";
import { MDBDataTable } from "mdbreact";
import { columns } from "../../columns";

class ListPublishDiplomaPage extends Component {
    state = {
        diplomas: [],
        rows: []
    };

    componentDidMount() {
        document.title = "List of publish diplomas";

        const student = JSON.parse(localStorage.studentInfo);

        Axios.get(
            "http://d24w27cd80vt93.cloudfront.net/api/shared/listAll/" +
                student.studentid
        )
            .then(res => {
                this.setState(
                    {
                        diplomas: res.data
                    },
                    () => {
                        this.state.diplomas.forEach((value, index) => {
                            this.state.rows.push({
                                digitalcredid: value.digitalcredid,
                                firstname: value.firstname,
                                lastname: value.lastname,
                                email: value.email,
                                programname: value.programname,
                                postaladress: value.postaladress,
                                nic: value.nic
                            });
                        });
                    }
                );
            })
            .catch(err => toastr.warning("Something wrong!"));
    }
    render() {
        const data = {
            columns: columns,
            rows: this.state.rows
        };

        return (
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <div className="app-page-title">
                        <div className="page-title-wrapper">
                            <div className="page-title-heading">
                                <div className="page-title-icon">
                                    <i className="fas fa-atom icon-gradient bg-mean-fruit"></i>
                                </div>
                                <div>All Publish Diplomas</div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="main-card mb-3 card">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        List of Publish diplomas
                                    </h5>
                                    <MDBDataTable
                                        striped
                                        bordered
                                        hover
                                        data={data}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListPublishDiplomaPage;
