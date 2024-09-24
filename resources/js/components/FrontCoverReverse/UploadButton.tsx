import { useRef, useState } from "react";
import Dialog from "../Dialog";
import { addNotification } from "../Notifications";
import { fetchUploadDataPokemon } from "../../utils/fetchMethods";

const UploadButton = () => {
    const buttonRef = useRef<HTMLLabelElement>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const fileContent = useRef<string>("");
    const [isSending, setIsSending] = useState<boolean>(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputElement = event.currentTarget;
        const files = event.target.files;

        if (files && files.length > 0) {
            const reader = new FileReader();

            reader.onload = (event) => {
                fileContent.current = event.target?.result as string;
                dialogRef.current instanceof HTMLDialogElement &&
                    (dialogRef.current.open = true);
                inputElement.value = "";
            };

            reader.onerror = (error) => {
                console.error(error);
                addNotification(
                    inputElement,
                    "There was en error to read the file",
                    "error"
                );
                inputElement.value = "";
            };

            reader.readAsText(files[0]);
        }
    };

    const sendingPokemon = (deleteCurrentPokemon = false) => {
        const buttonElement = buttonRef.current;

        if (buttonElement instanceof HTMLLabelElement && !isSending) {
            buttonElement.classList.add("loading");
            setIsSending(true);

            fetchUploadDataPokemon(
                fileContent.current as string,
                deleteCurrentPokemon
            )
                .then((response) => {
                    const myPokemonScreenElement =
                        document.querySelector(".pokemon-screen");

                    if (myPokemonScreenElement instanceof HTMLElement) {
                        myPokemonScreenElement.dispatchEvent(
                            new Event("resetGrid")
                        );
                    }

                    addNotification(
                        buttonElement,
                        response as string,
                        "success"
                    );
                    setIsSending(false);
                })
                .catch((error) => {
                    addNotification(buttonElement, error, "error");
                    setIsSending(false);
                });
        }

        fileContent.current = "";
    };

    return (
        <>
            <label
                ref={buttonRef}
                className={`simple-button ${
                    isSending ? "pointer-events-none" : ""
                }`}
            >
                <input
                    type="file"
                    accept="application/json"
                    hidden
                    onChange={handleFileChange}
                    disabled={isSending}
                />
                <svg
                    className={`icon ${isSending ? "animate-up-down" : ""}`}
                    height="25"
                    width="25"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                >
                    <use xlinkHref="#icon-arrow"></use>
                </svg>
            </label>

            <Dialog
                id="pokedex-import"
                ref={dialogRef}
                message={
                    <>
                        You are about to add Pokémon to your Pokédex.
                        <br />
                        Please select an option to continue:
                    </>
                }
                acceptButtonText="Add without deleting current Pokémon"
                cancelButtonText="Cancel"
                onAccept={() => sendingPokemon()}
                onCancel={() => {
                    fileContent.current = "";
                }}
                additionalButtons={
                    <button
                        className="dialog-btn"
                        onClick={() => sendingPokemon(true)}
                    >
                        Add with deleting current Pokémon
                    </button>
                }
            />
        </>
    );
};

export default UploadButton;
