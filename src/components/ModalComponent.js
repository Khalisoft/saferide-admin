import React, { useState } from "react";

import PageTitle from "../components/Typography/PageTitle";
import CTA from "../components/CTA";
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
} from "@windmill/react-ui";

function ModalComponent({
	isModalOpen,
	setIsModalOpen,
	title,
	children,
	actions,
	actionBtn,
}) {
	// const [isModalOpen, setIsModalOpen] = useState(false);
	// const title = "Send Report";
	const accept = () => {
		closeModal();
		return alert("Pressed");
	};
	function openModal() {
		setIsModalOpen(true);
	}

	function closeModal() {
		setIsModalOpen(false);
	}

	return (
		<>
			{/* <PageTitle>Modals</PageTitle> */}
			{/* <CTA />

			<div>
				<Button onClick={openModal}>Open modal</Button>
			</div> */}

			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<ModalHeader>{`${title}`}</ModalHeader>
				<ModalBody>{children}</ModalBody>
				{actions && (
					<ModalFooter>
						{/* I don't like this approach. Consider passing a prop to ModalFooter
						 * that if present, would duplicate the buttons in a way similar to this.
						 * Or, maybe find some way to pass something like size="large md:regular"
						 * to Button
						 */}
						<div className="hidden sm:block">
							<Button layout="outline" onClick={closeModal}>
								Cancel
							</Button>
						</div>
						<div className="hidden sm:block">
							<Button onClick={() => actionBtn?.action()}>
								{actionBtn?.label}
							</Button>
						</div>
						<div className="block w-full sm:hidden">
							<Button block size="large" layout="outline" onClick={closeModal}>
								Cancel
							</Button>
						</div>
						<div className="block w-full sm:hidden">
							<Button onClick={() => actionBtn?.action()} block size="large">
								{actionBtn?.label}
							</Button>
						</div>
					</ModalFooter>
				)}
			</Modal>
		</>
	);
}

export default ModalComponent;
