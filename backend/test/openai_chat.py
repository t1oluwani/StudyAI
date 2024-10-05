from openai import OpenAI

# Load OpenAI API key from secret file
with open("./keys/secret_key.txt", "r") as f:
    api_key = f.read().strip()

client = OpenAI(api_key=api_key) # Create OpenAI instance

completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "user", "content": "Write a poem about a sunset."},
    ]
)

print(completion.choices[0].message.content)