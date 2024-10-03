import os
from dotenv import load_dotenv
import maritalk

class MaritacaResponseGenerator:
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
    Gere um elemento <div> com estilos CSS embutidos.
    Sempre escreva apenas a tag <div>...</div>.
    Sempre feche a tag <div> completamente com </div>.
    Retorne apenas o código HTML do elemento <div>...</div> com os estilos CSS embutidos. Não retorne textos a mais.

    Exemplo 1:
    Descrição: Um botão vermelho com texto branco
    <div style="background-color: red; color: white; padding: 10px; text-align: center;">Botão</div>

    Exemplo 2:
    Descrição: Um parágrafo com texto azul e fonte Arial.
    <div style="color: blue; font-family: Arial; padding: 10px;">Este é um parágrafo.</div>

    Exemplo 3:
    Descrição: Um cabeçalho com fundo amarelo e texto preto
    <div style="background-color: yellow; color: black; padding: 10px; text-align: center;">Cabeçalho</div>

    Exemplo 4:
    Descrição: Um botão vermelho com texto rosa escrito "merda"
    <div style="background-color: red; color: pink; padding: 10px; text-align: center;">merda</div>

    Descrição: {user_prompt}
    """
    return few_shots_prompt

  def generate_response(self, prompt):
    few_shots_prompt = self.generate_few_shots_prompt(prompt)
    response = self.model.generate(
        few_shots_prompt,
        chat_mode=False,
        max_tokens=300
    )
    return str(response["answer"])