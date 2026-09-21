'use client';

import { useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  Copy,
  Check,
  Download,
  Share2,
  Radio,
} from 'lucide-react';

interface QrCodeGeneratorProps {
  value: string;
  size?: number;
  title?: string;
  description?: string;
}

export function QrCodeGenerator({
  value,
  size = 120,
  title = 'Écouter HAI Radio',
  description = 'Scannez le QR code pour accéder à HAI Radio.',
}: QrCodeGeneratorProps): React.JSX.Element {
  const qrContainerRef = useRef<HTMLDivElement | null>(null);

  const [copied, setCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  /*
   * Copier le lien
   */
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(
        'Impossible de copier le lien :',
        error
      );
    }
  };

  /*
   * Partager
   */
  const handleShare = async () => {
    if (!navigator.share) {
      await handleCopy();
      return;
    }

    try {
      setIsSharing(true);

      await navigator.share({
        title: 'HAI Radio',
        text: 'Écoutez HAI Radio en direct.',
        url: value,
      });
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === 'AbortError'
      ) {
        return;
      }

      console.error(
        'Impossible de partager le lien :',
        error
      );
    } finally {
      setIsSharing(false);
    }
  };

  /*
   * Télécharger le QR Code
   */
  const handleDownload = () => {
    const svg =
      qrContainerRef.current?.querySelector('svg');

    if (!svg) return;

    const serializer = new XMLSerializer();

    const svgString = serializer.serializeToString(svg);

    const blob = new Blob(
      [svgString],
      {
        type: 'image/svg+xml;charset=utf-8',
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');

    link.href = url;
    link.download = 'hai-radio-qrcode.svg';

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col items-center">
      {/* =========================
          QR CODE
      ========================== */}
      <div
        ref={qrContainerRef}
        className="
          inline-flex
          flex-col
          items-center
          rounded-2xl
          bg-white
          p-4
          shadow-lg
          border
          border-gray-200
        "
      >
        {/* Logo / identité */}
        <div className="mb-3 flex items-center gap-2">
          <div
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              bg-[#052952]
              text-white
            "
          >
            <Radio size={17} />
          </div>

          <span
            className="
              text-sm
              font-black
              tracking-wide
              text-[#052952]
            "
          >
            HAI RADIO
          </span>
        </div>

        {/* QR */}
        <div
          className="
            rounded-xl
            bg-white
            p-2
          "
        >
          <QRCodeSVG
            value={value}
            size={size}
            level="M"
            includeMargin={true}
            bgColor="#ffffff"
            fgColor="#052952"
          />
        </div>

        {/* Titre */}
        <p
          className="
            mt-3
            text-center
            text-sm
            font-extrabold
            text-[#052952]
          "
        >
          {title}
        </p>

        {/* Description */}
        <p
          className="
            mt-1
            max-w-[220px]
            text-center
            text-xs
            leading-relaxed
            text-gray-500
          "
        >
          {description}
        </p>
      </div>

      {/* =========================
          ACTIONS
      ========================== */}
      <div
        className="
          mt-4
          flex
          flex-wrap
          items-center
          justify-center
          gap-2
        "
      >
        {/* Copier */}
        <button
          type="button"
          onClick={handleCopy}
          className="
            inline-flex
            items-center
            gap-2
            rounded-lg
            border
            border-gray-200
            bg-white
            px-3
            py-2
            text-xs
            font-bold
            text-[#052952]
            shadow-sm
            transition
            hover:border-[#0d4469]
            hover:bg-[#f4f9fc]
          "
        >
          {copied ? (
            <>
              <Check
                size={15}
                className="text-green-600"
              />
              Copié
            </>
          ) : (
            <>
              <Copy size={15} />
              Copier
            </>
          )}
        </button>

        {/* Partager */}
        <button
          type="button"
          onClick={handleShare}
          disabled={isSharing}
          className="
            inline-flex
            items-center
            gap-2
            rounded-lg
            bg-[#052952]
            px-3
            py-2
            text-xs
            font-bold
            text-white
            shadow-sm
            transition
            hover:bg-[#0d4469]
            disabled:opacity-60
          "
        >
          <Share2 size={15} />
          Partager
        </button>

        {/* Télécharger */}
        <button
          type="button"
          onClick={handleDownload}
          className="
            inline-flex
            items-center
            gap-2
            rounded-lg
            border
            border-gray-200
            bg-white
            px-3
            py-2
            text-xs
            font-bold
            text-[#052952]
            shadow-sm
            transition
            hover:border-[#0d4469]
            hover:bg-[#f4f9fc]
          "
        >
          <Download size={15} />
          Télécharger
        </button>
      </div>
    </div>
  );
}