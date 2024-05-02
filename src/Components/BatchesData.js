import axios from "axios";
import React, { Component } from "react";

class BatchesData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      batches: [],
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/batches")
      .then((res) => {
        this.setState({
          batches: res.data,
        });
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteBatch = (batchId) => {
    axios
      .delete("http://localhost:4000/batches/" + batchId)
      .then(() => alert("Batch ID " + batchId + " Deleted succfully"))
      .catch((err) => console.log(err));
    //
  };
  render() {
    return (
      <div className="table-responsive p-5 vh-100">
        <h3>Batches Data from Custom API</h3>
        <table className="table table-bordered ">
          <thead className="table-dark">
            <tr>
              <td>Id</td>
              <td>Course</td>
              <td>Start Date</td>
              <td>Timing</td>
              <td>Duration</td>
              <td>Instructor</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {this.state.batches.map((batch) => (
              <tr key={batch.id}>
                <td>{batch.id}</td>
                <td>{batch.course}</td>
                <td>{batch.startDate}</td>
                <td>{batch.timing}</td>
                <td>{batch.duration} Days</td>
                <td>{batch.trainer}</td>
                <td>
                  <button
                    className="btn btn-primary m-2"
                    data-bs-target="#update"
                    data-bs-toogle="modal"
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    onClick={() => {
                      this.deleteBatch(batch.id);
                    }}
                    className="btn btn-danger"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="modal" id="update">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Get Batch Details</h3>
                <button className="btn-close" data-bs-dismiss="modal"></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BatchesData;
