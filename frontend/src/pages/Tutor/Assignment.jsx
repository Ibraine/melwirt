import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { getTutorAssignments } from "../../api/assignmentAPI";
import CreateAssignment from "./CreateAssignment";
import TutorSubmissions from "./TutorSubmissions";
import "../../styles/assignment.css";

const Assignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const loadAssignments = async () => {
    try {
      const res = await getTutorAssignments();
      setAssignments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadAssignments();
  }, []);

  return (
    <div className="d-flex">
      <Sidebar role="tutor" />
      <div className="flex-grow-1 p-4">
        <Header role="tutor" />

        {/* ASSIGNMENT LIST */}
        {!showCreate && !selectedAssignment && (
          <div className="assignment-page-body">
            <div className="d-flex justify-content-between mb-4">
              <h2>Assignments</h2>
              <button
                className="btn btn-primary"
                onClick={() => setShowCreate(true)}
              >
                + Create Assignment
              </button>
            </div>

            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Course</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {assignments.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No assignments
                    </td>
                  </tr>
                ) : (
                  assignments.map((a) => (
                    <tr key={a.id}>
                      <td>{a.title}</td>
                      <td>{a.course_title}</td>
                      <td>
                        <span className="status-pending">CREATED</span>
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => setSelectedAssignment(a)}
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* CREATE ASSIGNMENT */}
        {showCreate && (
          <CreateAssignment
            onSuccess={() => {
              setShowCreate(false);
              loadAssignments();
            }}
            onClose={() => setShowCreate(false)}
          />
        )}

        {/* STUDENT SUBMISSIONS */}
        {selectedAssignment && (
          <TutorSubmissions
            assignment={selectedAssignment}
            onBack={() => setSelectedAssignment(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Assignment;


