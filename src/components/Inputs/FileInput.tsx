import { useState, useRef } from "react";
import type { DragEvent, ChangeEvent } from "react";
import { cn } from "@styles/classNameMerge";
import { t, type Locale } from "../../i18n";

type FileInputProps = {
  onFileSelect?: (file: File | null) => void;
  // Optional callback for multiple selection
  onFilesSelect?: (files: File[]) => void;
  selectedFiles?: File[];
  acceptedTypes?: string[];
  maxSizeInMB?: number;
  className?: string;
  multiple?: boolean;
  locale?: Locale;
};

const CustomFileInput = ({
  onFileSelect,
  onFilesSelect,
  selectedFiles: externalSelectedFiles = [],
  acceptedTypes = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png", ".mp4"],
  maxSizeInMB = 10,
  className = "",
  multiple = true,
  locale,
}: FileInputProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  // If the component is controlled (externalSelectedFiles provided), use it; otherwise use internal state
  const files = externalSelectedFiles.length
    ? externalSelectedFiles
    : selectedFiles;

  const validateFile = (file: File): boolean => {
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      setError(`File size must be less than ${maxSizeInMB}MB`);
      return false;
    }

    const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;
    if (!acceptedTypes.includes(fileExtension)) {
      setError(
        `${t(locale, "contact-us.file-input.not-supported")} ${acceptedTypes.join(", ")}`,
      );
      return false;
    }

    setError("");
    return true;
  };

  const handleSelectionUpdate = (files: File[]) => {
    setSelectedFiles(files);
    // Back-compat and full list callback
    onFileSelect?.(files[0] ?? null);
    onFilesSelect?.(files);
  };

  const processFiles = (incomingList: FileList | File[]) => {
    const incoming = Array.from(incomingList);
    if (!incoming.length) return;

    const valid: File[] = [];
    let hadInvalid = false;
    for (const f of incoming) {
      if (validateFile(f)) valid.push(f);
      else hadInvalid = true;
    }

    if (hadInvalid) {
      setError(
        (prev) => prev || t(locale, "contact-us.file-input.files-not-added"),
      );
    }

    if (!valid.length) {
      handleSelectionUpdate([]);
      return;
    }

    if (multiple) {
      // Merge with existing and de-duplicate by name+size
      const merged = [...selectedFiles, ...valid];
      const seen = new Set<string>();
      const dedup = merged.filter((f) => {
        const key = `${f.name}-${f.size}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      handleSelectionUpdate(dedup);
    } else {
      handleSelectionUpdate([valid[0]]);
    }
  };

  const handleFileRemove = (name: string, size?: number) => {
    const next = selectedFiles.filter((f) =>
      size != null ? !(f.name === name && f.size === size) : f.name !== name,
    );
    handleSelectionUpdate(next);
    setError("");
    if (fileInputRef.current && next.length === 0) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length) {
      processFiles(files);
    }
  };

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      processFiles(files);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className={cn("relative w-full max-w-[520px]", className)}>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileInputChange}
        accept={acceptedTypes.join(",")}
        {...(multiple ? { multiple: true } : {})}
        className="sr-only"
      />

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative rounded-[28px] p-8 text-center transition-all duration-200 ${
          files.length
            ? "rounded-3xl border-none bg-white py-4"
            : isDragOver
              ? "border-blue-400 bg-blue-50"
              : "border-[#fbfbfb] bg-white"
        } ${!files.length || multiple ? "cursor-pointer hover:border-gray-300" : ""}`}
        onClick={!files.length || multiple ? handleBrowseClick : undefined}>
        {!files.length ? (
          <div className="space-y-4">
            <div className="text-teal-400">
              <h3 className="text-lg leading-[32px] font-semibold">
                {t(locale, "contact-us.file-input.choose-file")}
              </h3>
              <p className="mt-2 text-lg leading-[24px] text-teal-400">
                {acceptedTypes
                  .slice(0, 4)
                  .map((type) => type.replace(".", "").toUpperCase())
                  .join(", ")}
                {acceptedTypes.length > 4 &&
                  `, +${acceptedTypes.length - 4} ${t(locale, "contact-us.file-input.more")}`}
              </p>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); // Prevent event bubbling to parent div
                handleBrowseClick();
              }}
              className="inline-flex cursor-pointer items-center rounded-lg bg-white px-6 py-2 text-lg leading-[32px] font-semibold text-teal-400 underline transition-colors duration-200 hover:bg-gray-100">
              {t(locale, "contact-us.file-input.add")}
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4 px-2 py-2 text-left">
            {files.map((file) => (
              <div
                key={`${file.name}-${file.size}`}
                className="flex items-center justify-between gap-2">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-400">
                    <svg
                      className="h-5 w-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="max-w-[260px] truncate font-medium text-gray-800">
                      {file.name}
                    </p>
                    <p className="truncate text-sm text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFileRemove(file.name, file.size);
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  onPointerDown={(e) => e.stopPropagation()}
                  className="cursor-pointer rounded-full p-2 text-gray-400 transition-colors duration-200 hover:bg-teal-400 hover:text-white"
                  title="Remove file">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
            {multiple && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBrowseClick();
                  }}
                  className="inline-flex items-center rounded-lg bg-white px-4 py-2 text-lg leading-[32px] font-semibold text-teal-400 underline transition-colors duration-200 hover:bg-gray-100">
                  {t(locale, "contact-us.file-input.add-more")}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

      {!files.length && !error && (
        <p className="mt-2 text-center text-xs text-gray-200">
          {`${t(locale, "contact-us.file-input.max-file-size")} ${maxSizeInMB}MB`}
        </p>
      )}
    </div>
  );
};

export default CustomFileInput;
