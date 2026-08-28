import type { Block } from "../Types/Blocks";

interface PreviewProps {
  blocks: Block[];
}

const Preview = ({ blocks }: PreviewProps) => {
  return (
    <div className="absolute right-5 h-full w-1/3    rounded-2xl bg-white p-2 shadow-xl">
      <h2 className="mb-6 border-b pb-3 text-xl font-bold">
        Preview
      </h2>

      {blocks.length === 0 ? (
        <p className="text-gray-400">
          Nothing to preview yet.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {blocks.map((block) => {
            switch (block.type) {
              case "text":
                return (
                  <div key={block.id}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          typeof block.content === "string"
                            ? block.content
                            : "",
                      }}
                    />
                  </div>
                );

              case "shortText":
                return (
                  <div key={block.id}>
                    <p className="text-gray-700">
                      {block.content}
                    </p>
                  </div>
                );

              case "largeText":
                return (
                  <div key={block.id}>
                    <p className="whitespace-pre-wrap">
                      {block.content}
                    </p>
                  </div>
                );

              case "heading":
                return (
                  <div key={block.id}>
                    {block.headingLevel === "h2" ? (
                      <h2 className="text-2xl font-bold">
                        {block.content}
                      </h2>
                    ) : block.headingLevel === "h3" ? (
                      <h3 className="text-xl font-bold">
                        {block.content}
                      </h3>
                    ) : (
                      <h1 className="text-3xl font-bold">
                        {block.content}
                      </h1>
                    )}
                  </div>
                );

              case "radio":
                return (
                  <div key={block.id}>
                    <div className="flex flex-col gap-2">
                      {block.options?.map((option) => (
                        <label
                          key={option}
                          className="flex items-center gap-2"
                        >
                          <input
                            type="radio"
                            name={`radio-${block.id}`}
                            checked={
                              block.selectedOption === option
                            }
                            readOnly
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>
                );

              case "dropdown":
                return (
                  <div key={block.id}>
                    <select
                      className="w-full rounded-lg border p-2"
                      value={block.selectedOption || ""}
                      disabled
                    >
                      <option value="">
                        Select an option
                      </option>

                      {block.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                );

              case "Signature":
                return block.signature ? (
                  <div key={block.id}>
                    <img
                      src={block.signature}
                      alt="Signature"
                      className="max-h-40 max-w-full"
                    />
                  </div>
                ) : null;

              default:
                return null;
            }
          })}
        </div>
      )}
    </div>
  );
};

export default Preview;