import { useState, useEffect } from "react";
import common from "styles/styles.module.css";

import { Html5QrcodeScanner } from "html5-qrcode";

const qrcodeRegionId = "html5qr-code-full-region";

import styles from "styles/camera.module.css";

const qrCodeSuccessCallback = (decodedText: string, decodedResult: any) => {
  console.log(`Scan result = ${decodedText}`, decodedResult);
};

const qrCodeErrorCallback = (...error: any) => {
  console.log(`Scan result = ${error}`);
};

const props = {
  fps: 10,
  qrbox: 250,
  disableFlip: false,
  qrCodeSuccessCallback,
  qrCodeErrorCallback,
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
  const [inputValue, setInputValue] = useState<File | undefined>();

  const [data, setData] = useState("No result");

  useEffect(() => {
    // when component mounts
    const config = createConfig(props);
    //@ts-ignore
    const verbose = props.verbose === true;
    // Suceess callback is required.
    if (!props.qrCodeSuccessCallback) {
      throw "qrCodeSuccessCallback is required callback.";
    }

    const html5QrcodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId,
      config,
      verbose
    );

    html5QrcodeScanner.render(
      props.qrCodeSuccessCallback,
      props.qrCodeErrorCallback
    );

    // cleanup function when component will unmount
    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  }, []);

  return (
    <div className={common.container}>
      <h1>Camera</h1>

      {/* <label htmlFor="camera" className={styles.label}>
        Open
      </label>

      <input
        id="camera"
        type="file"
        className={styles.input}
        accept="image/*"
        capture="environment"
        onChange={(e) => {
          setInputValue(e.target.files?.[0]);
        }}
      />
      {inputValue && (
        <span className={styles.fileName}>{JSON.stringify(inputValue)}</span>
      )} */}

      <div id={qrcodeRegionId} />
    </div>
  );
};

export default QrScanner;
