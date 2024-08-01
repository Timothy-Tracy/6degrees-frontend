import React, { useState } from 'react';
import { Button } from 'reactstrap';

const CopyToClipboardButton = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Button onClick={handleCopy}>
      {isCopied ? 'Copied!' : 'Copy to Clipboard'}
    </Button>
  );
};

export default CopyToClipboardButton;