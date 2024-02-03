import React from 'react'

export enum IconName {
  thumbDown = './icon-thumb-down.png',
  thumbUp = './icon-thumb-up.png',
}

type Props = {
  iconName: IconName
}
const Icon: React.FC<Props> = ({ iconName }) => {
  const iconColor = iconName === IconName.thumbDown ? 'bg-red-500' : 'bg-green-500'
  return (
    <div
      className={`absolute -top-3 -right-3 bg-red-500 p-[10px] rounded-full flex shadow-md ${iconColor} `}
    >
      <img src={iconName} />
    </div>
  )
}

export default Icon
