import { useState } from "react";
import { CreateConnectorFn, useConnect, useSignMessage } from "wagmi";
import { injected, metaMask } from "wagmi/connectors";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { connect } = useConnect();
  const [error, setError] = useState<string | null>(null);
  const { signMessage } = useSignMessage({
    mutation: {
      onSuccess: (data) => {
        alert(data);
      },
    },
  });
  const handleConnect = (walletName: string, connector: CreateConnectorFn) => {
    setError(null); // Reset error state

    switch (walletName) {
      case "MetaMask":
        if (!window.ethereum) {
          setError("MetaMask is not installed. Please install it to continue.");
        }
        break;
      case "Phantom":
        // @ts-ignore
        if (!window.solana?.isPhantom) {
          setError("Phantom is not installed. Please install it to continue.");
        }
        break;
      case "Rabby":
        if (!window.ethereum?.isRabby) {
          setError("Rabby is not installed. Please install it to continue.");
        }
        break;
      default:
        break;
    }

    if (!error) {
      connect(
        { connector },
        {
          onError: (error) => setError(error.message),
          onSettled: (data) => console.log(data),
          onSuccess: (data) => {
            signMessage({ message: "Theaseasdsdladasjdkh32123123" });
          },
        }
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Connect Wallet
        </h2>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleConnect("MetaMask", metaMask())}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            MetaMask
          </button>
          <button
            onClick={() =>
              handleConnect("Phantom", injected({ target: "phantom" }))
            }
            className="w-full px-4 py-2 text-white bg-purple-500 rounded hover:bg-purple-600"
          >
            Phantom
          </button>
          <button
            onClick={() =>
              handleConnect("Rabby", injected({ target: "rabby" }))
            }
            className="w-full px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            Rabby
          </button>
        </div>

        {error && (
          <div className="mt-6 text-center text-red-500">
            <p>{error}</p>
            <a
              href={
                error.includes("MetaMask")
                  ? "https://metamask.io/download/"
                  : error.includes("Phantom")
                  ? "https://phantom.app/"
                  : "https://rabby.io/"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-blue-500 hover:underline"
            >
              Install{" "}
              {error.includes("MetaMask")
                ? "MetaMask"
                : error.includes("Phantom")
                ? "Phantom"
                : "Rabby"}
            </a>
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-6 w-full px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};
