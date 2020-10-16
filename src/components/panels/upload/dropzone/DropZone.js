import React, { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Icon } from "semantic-ui-react"
import { useStateValue } from "../../../context/StateProvider"

function DropZone() {
	const [{}, dispatch] = useStateValue()
	const onDrop = useCallback((acceptedFiles) => {
		acceptedFiles.forEach((file) => {

			const reader = new FileReader()

			reader.onabort = () => console.log("file reading was aborted")
			reader.onerror = () => console.log("file reading has failed")
			reader.onload = () => {
				// Do whatever you want with the file contents
				const binaryStr = reader.result
			}
			reader.readAsArrayBuffer(file)
			const uploadedFile = Object.assign(file, {
                preview: URL.createObjectURL(file),
            })
				
			dispatch({
				type: "SET_CURRENT_IMAGE",
				currImage: {
					name: file.name,
					path: file.path,
					file: uploadedFile,
				},
			})
			
		})
	}, [])

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		maxFiles: 1,
	})
	return (
		<div {...getRootProps()} className="dropZone">
			<input {...getInputProps()} />
			{isDragActive ? (
				<p>Drop the files here ...</p>
			) : (
				<>
					<Icon name="upload" size="huge" />
					<p>Drag and drop some files here, or click to select files</p>
				</>
			)}
		</div>
	)
}

export default DropZone
