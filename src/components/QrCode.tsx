import { QRCodeCanvas } from 'qrcode.react'

type Props = {
  address: string
}

const QRCode = ({ address }: Props) => {
  return (
    <QRCodeCanvas
      level={'H'}
      style={{ padding: 5, backgroundColor: '#fff' }}
      value={`ethereum:${address}`}
      size={150}
      imageSettings={{
        width: 30,
        height: 30,
        excavate: true,
        src: `https://stamp.fyi/avatar/${address}`
      }}
    />
  )
}

export default QRCode
