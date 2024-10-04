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


  @staticmethod
  def generate_few_shots_prompt_fix(user_prompt, site_html):
    few_shots_prompt = f"""
    Instruções:
    Dado o html inteiro do site, e uma request, gere um novo html para o site inteiro, modificando todo o site de acordo com a request. Retorne apenas o código HTML do site modificado, sem adicionar texto extra. Certifique-se de adicionar um título para o site e um botão "deslogar" que não serão mudados com a request.

    Exemplo 1:
    Html: <div style="background-color: white; color: black; padding: 10px; text-align: left;">
       <h1>Receita de Bolo</h1>
       <p>Esta é uma receita simples de bolo.</p>
       <ul>
         <li>Misture os ingredientes secos em uma tigela grande.</li>
         <li>Adicione os ingredientes úmidos e misture bem.</li>
         <li>Despeje a massa em uma forma untada.</li>
         <li>Asse no forno a 180°C por 30-35 minutos.</li>
         <li>Deixe esfriar antes de servir.</li>
       </ul>
     </div>
    Request: Deixe o texto colorido e faça o texto centralizado.
    Resposta: <div style="background-color: white; color: black; padding: 10px; text-align: center;">
       <h1>Receita de Bolo</h1>
       <p>Esta é uma receita simples de bolo.</p>
       <ul>
         <li>Misture os ingredientes secos em uma tigela grande.</li>
         <li>Adicione os ingredientes úmidos e misture bem.</li>
         <li>Despeje a massa em uma forma untada.</li>
         <li>Asse no forno a 180°C por 30-35 minutos.</li>
         <li>Deixe esfriar antes de servir.</li>
       </ul>
     </div>

    Exemplo 2:
    Html: <div style="border-collapse: collapse; width: 100%;">
      <h1>Título do Site</h1>
      <button onclick="alert('Deslogar')">Deslogar</button>
      <table>
        <tr>
          <th style="border: 1px solid black; padding: 8px;">Dia</th>
          <th style="border: 1px solid black; padding: 8px;">Segunda</th>
          <th style="border: 1px solid black; padding: 8px;">Terça</th>
          <th style="border: 1px solid black; padding: 8px;">Quarta</th>
          <th style="border: 1px solid black; padding: 8px;">Quinta</th>
          <th style="border: 1px solid black; padding: 8px;">Sexta</th>
        </tr>
        <tr>
          <td style="border: 1px solid black; padding: 8px;">Trabalhador 1</td>
          <td style="border: 1px solid black; padding: 8px;">Disponível</td>
          <td style="border: 1px solid black; padding: 8px;">Indisponível</td>
          <td style="border: 1px solid black; padding: 8px;">Disponível</td>
          <td style="border: 1px solid black; padding: 8px;">Disponível</td>
          <td style="border: 1px solid black; padding: 8px;">Indisponível</td>
        </tr>
        <tr>
          <td style="border: 1px solid black; padding: 8px;">Trabalhador 2</td>
          <td style="border: 1px solid black; padding: 8px;">Indisponível</td>
          <td style="border: 1px solid black; padding: 8px;">Disponível</td>
          <td style="border: 1px solid black; padding: 8px;">Indisponível</td>
          <td style="border: 1px solid black; padding: 8px;">Disponível</td>
          <td style="border: 1px solid black; padding: 8px;">Disponível</td>
        </tr>
      </table>
    </div>
    Request: troque as linhas com as colunas
    Resposta: <div style="border-collapse: collapse; width: 100%;">
      <h1>Título do Site</h1>
      <button onclick="alert('Deslogar')">Deslogar</button>
      <table>
        <tr>
          <th style="border: 1px solid black; padding: 8px;">Trabalhador 2</th>
          <th style="border: 1px solid black; padding: 8px;">Trabalhador 1</th>
          <th style="border: 1px solid black; padding: 8px;">Dia</th>
        </tr>
        <tr>
          <td style="border: 1px solid black; padding: 8px;">Indisponível</td>
          <td style="border: 1px solid black; padding: 8px;">Disponível</td>
          <td style="border: 1px solid black; padding: 8px;">Segunda</td>
        </tr>
        <tr>
          <td style="border: 1px solid black; padding: 8px;">Disponível</td>
          <td style="border: 1px solid black; padding: 8px;">Indisponível</td>
          <td style="border: 1px solid black; padding: 8px;">Terça</td>
        </tr>
        <tr>
          <td style="border: 1px solid black; padding: 8px;">Indisponível</td>
          <td style="border: 1px solid black; padding: 8px;">Disponível</td>
          <td style="border: 1px solid black; padding: 8px;">Quarta</td>
        </tr>
        <tr>
          <td style="border: 1px solid black; padding: 8px;">Disponível</td>
          <td style="border: 1px solid black; padding: 8px;">Disponível</td>
          <td style="border: 1px solid black; padding: 8px;">Quinta</td>
        </tr>
        <tr>
          <td style="border: 1px solid black; padding: 8px;">Disponível</td>
          <td style="border: 1px solid black; padding: 8px;">Indisponível</td>
          <td style="border: 1px solid black; padding: 8px;">Sexta</td>
        </tr>
      </table>
    </div>
    
    Html: {site_html}
    Request: {user_prompt}
    Resposta: 
    """
    return few_shots_prompt


  def generate_response(self, prompt, request, site_html):
    if request == "fix":
      tokens = 2000
      few_shots_prompt = self.generate_few_shots_prompt_fix(prompt, site_html)
    else:
      few_shots_prompt = self.generate_few_shots_prompt(prompt)
      tokens = 1000
    response = self.model.generate(
        few_shots_prompt,
        chat_mode=False,
        max_tokens=tokens,
        temperature=0.5
    )
    return str(response["answer"])