import { useState, useEffect } from "react";
import common from "styles/styles.module.css";

import { Html5QrcodeScanner } from "html5-qrcode";

const qrcodeRegionId = "html5qr-code-full-region";

import styles from "styles/camera.module.css";
import Link from "next/link";

const props = {
  fps: 10,
  qrbox: 250,
  disableFlip: false,
};

const createConfig = (props: any) => {
  let config: any = {};
  if (props.fps) {
    config.fps = props.fps;
  }
  if (props.qrbox) {
    config.qrbox = props.qrbox;
  }
  if (props.aspectRatio) {
    config.aspectRatio = props.aspectRatio;
  }
  if (props.disableFlip !== undefined) {
    config.disableFlip = props.disableFlip;
  }
  return config;
};

const QrScanner = () => {
  const [data, setData] = useState("");

  const qrCodeErrorCallback = (...error: any) => {
    console.log(`ERROR = ${error}`);
  };

  const qrCodeSuccessCallback = (decodedText: string, decodedResult: any) => {
    setData(decodedText);

    console.log(`Scan result = ${decodedText}`, decodedResult);
  };

  useEffect(() => {
    // when component mounts
    const config = createConfig(props);
    //@ts-ignore
    const verbose = props.verbose === true;
    // Suceess callback is required.

    const html5QrcodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId,
      config,
      verbose
    );

    html5QrcodeScanner.render(qrCodeSuccessCallback, qrCodeErrorCallback);

    // cleanup function when component will unmount
    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  }, []);

  return (
    <div className={common.container}>
      {data ? <Link href={data}>{data}</Link> : <div id={qrcodeRegionId} />}
    </div>
  );
};

export default QrScanner;
