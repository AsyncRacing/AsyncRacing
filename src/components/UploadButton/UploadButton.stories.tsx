import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { UploadButton } from './UploadButton'
import { useFiles } from '../../model/useFiles'
import { useEffect, useState } from 'react'

export default {
  title: 'components/UploadButton',
  component: UploadButton,
} as ComponentMeta<typeof UploadButton>

const Template: ComponentStory<typeof UploadButton> = () => {
  const [files, , addFiles, clearFiles] = useFiles()
  const [text, setText] = useState('')
  useEffect(() => {
    ;(async () => {
      const textPromises = files.map((file) => file.text())
      const textArray = await Promise.all(textPromises)
      const newText = textArray.join('\n------------\n\n')
      setText(newText)
    })()
  }, [files.length])

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="file-uploader">Upload a File</label>

      <br />

      <UploadButton
        id="file-uploader"
        files={files}
        addFiles={addFiles}
        clearFiles={clearFiles}
      />

      <hr />

      <textarea
        value={text}
        style={{
          width: '100%',
          height: '500px',
        }}
        disabled
        readOnly
      />
    </>
  )
}

export const Primary = Template.bind({})
Primary.args = {}
