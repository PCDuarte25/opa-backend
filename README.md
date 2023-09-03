# OPA-BACKEND

## Preparação do ambiente

* Criar arquivo `.env` baseado no arquivo `.env_example`
* Possivelmente em caso de problemas de permissão dar permissões de leitura/escrita para a db usando o comando
  `sudo chown -R <nome_usuario> /db/`

## Execução do ambiente

* Rode o comando `docker-compose up -d` (o `-d` serve para deixar o terminal livre)
* Cheque na url `localhost:9090` com o usuário: `root` senha: `admin` se as migrações foram criadas.
* Para derrubar o docker `docker-compose down`

## Migrações

* Sempre que criado uma migração e o comando do docker for rodado as migrações serão feitas (casos novas) ou mantidas (caso já existente)

## Boas práticas

* PRs bem feitos são prs que executam apenas uma nova feature ou refatoram apenas uma lógica ou corrigem um contexto específico de bug, se seu PR faz várias coisas, talvez seja uma boa separar em prs menores.
  Exemplo: `adiciona-tabela-person-database`
* Commits serão levados em conta o `conventional-commits` tendo por base:
  - feat: Adiciona algo novo ao código para produção;
  - refactor: Refatora algo que já existia sem mudar a lógica do código;
  - chore: Adiciona ou muda algo novo no código a nível interno;
  - fix: Corrige mudanças que estavam com erro, com bugs;
  - test: Tudo que envolve testagem de arquivos, ou aceitação.
  Exemplo: `feat: Adiciona nova tabela a database.`
* A nossa branch master é `read-only` ou seja é impossivel mergear diretamente nela, com isso sempre temos o nosso código protegido, para inserir mudanças no código é necessário criar um branch nova e pedir um **pull request** que uma vez aprovado poderá ser mergeado com a master.

## Guia de git e github para esse reposistório

* `git status` - mostra o status atual do git na pasta
* `git checkout <nome_da_branch>` - muda para uma branch específica
* `git checkout -b <nome_da_branch>` - cria uma branch específica
* `git pull origin <nome_da_branch>` - puxa as refs do código de uma branch no github
* `git push origin <nome_da_branch>` - envia os arquivos alterados de uma branch para o github (cria o pull request)
* `git add <path_do_arquivo>` - manda o arquivo escolhido para o staged ou seja, pronto para commit
* `git commit -m "mensagem do commit` - comita os arquivos staged na branch

### Lógica do dia a dia para a adição de novos PRs:

- 1. Antes de criar um PR novo vá na branch master `git checkout master` e dê um pull para se atualizar com a ref do github `git pull origin master`
- 2. Uma vez atualizado com a master do github você pode criar a sua branch que vai conter o código a ser adicionado `git checkout -b <nome_da_branch>`
- 3. Cheque o status local para saber se você realmente está numa branch nova criada com `git status`
- 4. Faça as mudanças no seu código sempre lembrando de adicionar ao staged  `git add <nome_do_arquivo>` e commitar `git commit -m "mensagem"` as mudanças para ter salvo um backup caso precise
- 5. Após terminar tudo do código e todos os comites feitos, cheque novamente com `git status` se não tem nenhuma pendência
- 6. Faça o push das mudanças para o github com `git push origin <nome_da_branch>`
- 7. No repositório do github vá na aba `pull requests` e lá vai ter um botão `create pull request` clique nele.
- 8. Na direita na aba **Assignees**  coloque você como responsável
- 9. No comentário do PR ajude quem vai fazer a review, diga o que você fez, e como fez se possível.
- 10. Crie o pull request e mande para alguem revisar, após aprovado o github vai liberar para ser mergeado com a master.


                         TMJ
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣤⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⠛⠉⠙⠻⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⣶⣶⣦⣤⡀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡇⠀⠀⠀⠀⢻⣇⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⠁⠀⠀⠈⢻⣷⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣧⠀⠀⠀⠀⠸⣿⠀⠀⠀⠀⠀⠀⠀⠀⣼⡏⠀⠀⠀⠀⢸⡿⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⠀⠀⠀⠀⠀⢻⣇⠀⠀⠀⠀⠀⠀⢰⣿⠀⠀⠀⠀⠀⣼⡇⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⡇⠀⠀⠀⠀⠸⣿⠀⠀⠀⠀⠀⠀⣸⡏⠀⠀⠀⠀⢠⣿⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⠀⠀⠀⠀⠀⣿⡇⠀⠀⠀⠀⠀⣿⠇⠀⠀⠀⠀⢸⡟⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⡀⠀⠀⠀⠀⠸⣷⠀⠀⠀⠀⢰⡟⠀⠀⠀⠀⠀⣿⡇⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⡇⠀⠀⠀⠀⠀⣿⡇⠀⠀⠀⣿⡇⠈⠀⠀⠀⢀⣿⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⠀⠀⠀⠀⠀⢸⣷⠀⠀⢠⣿⠀⠀⠀⠀⠀⣸⡇⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⣿⡇⠀⠀⠀⠀⠈⣿⡄⠀⢸⡟⠀⠀⠀⠀⠀⣿⠇⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣰⡿⠛⠉⠉⠉⣻⣇⠀⠀⠀⠀⠀⢸⣷⢠⣿⠃⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣀⣤⣶⣶⣿⡇⠀⠀⠀⠀⢸⣿⠀⠀⠀⠀⠀⠈⠻⠿⠋⠀⠀⠀⠀⠀⢸⣿⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⣾⠟⠉⠀⠀⣿⡇⠀⠀⠀⠀⠀⣿⣦⣠⣤⣄⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢸⣿⠀⠀⠀⠀⢿⡇⠀⠀⠀⢀⣾⠟⠋⠉⠉⠉⠛⠛⠿⢶⣦⣤⣀⠀⠀⠀⢸⣿⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠘⣿⡀⠀⠀⠀⢸⣿⠀⠀⠀⠸⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠙⠻⢷⣦⣼⡿⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⣿⣇⠀⠀⠀⠀⢻⣧⠀⠀⠀⢿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢻⣿⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢸⣿⡄⠀⠀⠀⠈⢿⣆⠀⠀⠈⠻⣷⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⡄⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢸⣿⣷⡀⠀⠀⠀⠀⢻⣷⡀⠀⠀⠈⢙⣿⣶⣦⣄⣀⣀⣀⣀⠀⠀⠀⠀⠀⢻⣧⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢸⣿⠙⢿⣤⣀⡀⠀⢀⣹⣿⣷⣶⡾⠟⠋⠀⠀⠉⠙⠛⢻⡏⠀⠀⠀⠀⠀⠈⣿⡆⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣿⡀⠀⠉⠛⠿⠿⠟⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣇⠀⠀⠀⠀⠀⠀⢹⡇⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡿⠇⠀⠀⠀⠀⠀⣿⡇⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠈⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⡟⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠸⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⡿⠁⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠙⣿⣄⠠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⡿⠁⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠈⢻⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣷⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣴⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠛⠿⣶⣤⣤⣤⣤⣤⣤⣤⡶⠿⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
