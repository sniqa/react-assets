import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const MyDropzone = () => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files

    console.log(acceptedFiles)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()} className={`border inline-flex rounded h-24`}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <div className="flex flex-col items-center">
          <p>Drag 'n' drop some files here</p>
          <p>or click to select files</p>
        </div>
      )}
    </div>
  )
}

export default MyDropzone
