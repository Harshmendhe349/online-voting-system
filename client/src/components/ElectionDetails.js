import React from "react";
import { Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";

const ElectionDetails = ({ election, showModal, toggleModal }) => {
  const { link } = useParams(); // Get the dynamic parameter from the URL

  // Use the 'election' data to display details of the specific election
  // You can use 'id' to fetch the specific election details if needed

  const shareable_link = "http://localhost:3000/election/" + election.link;

  return (
    <Modal show={showModal} onHide={toggleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Election Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2>Election Details</h2>
        <p>Title: {election.title}</p>
        <p>Date: {election.date}</p>
        <p>Description: {election.description}</p>
        <p>Shareable Link: {shareable_link}</p>
        <p>Votes : {election.votes}</p>
      </Modal.Body>
    </Modal>
  );
};

export default ElectionDetails;
