import { Button, Modal } from 'react-bootstrap'
import React, { useContext, useState } from 'react'
import { ReducerContext } from '../../context/ReducerContext';
import { setTipCollectionModalStatus } from '../../feature/appAction';

const TipCollectionModal = () => {
  const {dispatch, isModalShow} = useContext(ReducerContext);
  
  const handleClose = () => {
    setTipCollectionModalStatus(dispatch, false);
  }
  return (
    <div className=''>
      <Modal 
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={isModalShow} onHide={handleClose}
      className='tip_collection_modal'
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">My Tip Collection</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default TipCollectionModal