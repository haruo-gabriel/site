import os
from dotenv import load_dotenv
import maritalk

class Maritaca:
  def __init__(self):
    load_dotenv()
    key = os.getenv("MARITACAAI-KEY")
    self.model = maritalk.MariTalk(
        key=key,
        model="sabia-3"  # No momento, suportamos os modelos sabia-3, sabia-2-medium e sabia-2-small
    )

  @staticmethod
  def generate_few_shots_prompt(user_prompt):
    few_shots_prompt = f"""
    Instruções:
    Gere uma resposta, um elemento <div> com estilos CSS embutidos. Certifique-se de escrever apenas a tag <div>...</div> e fechá-la completamente com </div>. Retorne apenas o código HTML do elemento <div>...</div>, sem adicionar texto extra.

    Exemplo 1:
    Descrição: um botão vermelho com texto branco
    Resposta: <div style="background-color: red; color: white; padding: 10px;">Botão</div>

    Exemplo 2:
    Descrição: um parágrafo com texto azul e fonte Arial.
    Resposta: <div style="color: blue; font-family: Arial">Este é um parágrafo.</div>

    Exemplo 3:
    Descrição: um cabeçalho com fundo amarelo e texto preto
    Resposta: <div style="background-color: yellow; color: black; text-align: center;">Cabeçalho</div>

    Exemplo 4:
    Descrição: um botão vermelho com texto rosa escrito "merda"
    Resposta: <div style="background-color: red; color: pink; padding: 10px; text-align: center;">merda</div>

    Descrição: {user_prompt}
    Resposta: 
    """
    return few_shots_prompt

  def generate_response(self, prompt):
    few_shots_prompt = self.generate_few_shots_prompt(prompt)
    response = self.model.generate(
        few_shots_prompt,
        chat_mode=False,
        max_tokens=300,
        temperature=0.5
    )
    return str(response["answer"])