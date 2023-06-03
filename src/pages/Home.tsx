import { useState } from 'react';

const Home: React.FC = () => {
    const [text, setText] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    }
   const obfuscate = async () => {
        try {
            const response = await fetch("https://obfuscate-kuzz4.ondigitalocean.app/tc-obfuscate/obfuscate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    inputText: text,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                setText(data.modifiedData);
            } else {
                throw new Error("Request failed");
            }
        } catch (error) {
            console.error(error);
        }
    };
    const deobfuscate = () => {
       try {
            const response = await fetch("https://obfuscate-kuzz4.ondigitalocean.app/tc-obfuscate/deobfuscate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    inputText: text,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                setText(data.modifiedData);
            } else {
                throw new Error("Request failed");
            }
        } catch (error) {
            console.error(error);
        }
    };
    const copy = () => {
        navigator.clipboard.writeText(text);
    };
    
    return (
        <div className="home">
            <div className="header">
                AI Cloaker
            </div>
            <textarea
                placeholder="Insert text you want to make undetectable here..."
                value={text}
                onChange={handleChange}
                spellCheck={false}
            />
            <div className="actions">
                <button onClick={deobfuscate}>Uncloak</button>
                <button onClick={obfuscate}>Cloak</button>
                <button onClick={copy}>Copy</button>
            </div>
        </div>
    );
};

export default Home;
