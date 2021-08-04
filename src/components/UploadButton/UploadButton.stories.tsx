import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { UploadButton } from './UploadButton'
import { useFiles } from '../../model/useFiles'
import { useFilesToTextMap } from '../../model/useFileToText'

export default {
  title: 'components/UploadButton',
  component: UploadButton,
} as ComponentMeta<typeof UploadButton>

const Template: ComponentStory<typeof UploadButton> = () => {
  const [files, , addFiles, clearFiles] = useFiles()
  const fileTextMap = useFilesToTextMap(files)

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
        value={[...fileTextMap.values()].join(',\n\n')}
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
