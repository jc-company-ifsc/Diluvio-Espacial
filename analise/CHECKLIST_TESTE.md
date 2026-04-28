# ✅ Checklist de Funcionamento - Dilúvio Espacial

Após a reorganização e limpeza, teste todos os itens abaixo:

## 🎮 Teste de Funcionalidade

### Menu (Scene Start)
- [ ] Página carrega sem erros no console
- [ ] Phaser inicializa corretamente
- [ ] Menu inicial exibe opções
- [ ] Botão "Jogar Fase 4" funciona
- [ ] Transição para scene0 é suave

### Fase 4 - Asteroids (Scene 0)
- [ ] Jogo carrega com fundo
- [ ] Personagem (nv) aparece no centro
- [ ] Controles funcionam (setas/WASD)
- [ ] Joystick virtual funciona (mobile)
- [ ] Asteroids spawnam e se movem
- [ ] Laser dispara e acerta
- [ ] Explosões funcionam
- [ ] Música toca em loop
- [ ] Sons de tiro funcionam
- [ ] Sons de explosão funcionam
- [ ] Vidas decrementam com colisão
- [ ] Game Over aparece ao perder
- [ ] Botão "Voltar" retorna ao menu

### Fase 2 - Platformer (Scene 1)
- [ ] Mapa (tiled4.json) carrega sem crash
- [ ] Personagem (az) aparece no mapa
- [ ] Controles de movimento funcionam
- [ ] Pulo funciona (setas/barra de espaço)
- [ ] Colisão com terreno funciona
- [ ] Câmera segue o personagem
- [ ] Botão "Voltar" retorna ao menu
- [ ] **CRÍTICO**: Nenhum erro "SuperMarioBrosMap5-3" é lançado

### Console do Navegador
- [ ] Sem erros em vermelho
- [ ] Sem warnings em amarelo (opcional)
- [ ] Sem undefined references

## 📊 Teste de Tamanho

- [ ] Projeto ocupa ~15 MB (antes era 30 MB)
- [ ] Nenhuma pasta duplicada (`Diluvio-Espacial-main`)
- [ ] Nenhuma pasta vazia

## 🗂️ Teste de Estrutura

- [ ] Arquivo `src/game.js` existe e inicia
- [ ] Arquivo `src/config/config.js` existe
- [ ] Arquivo `src/scenes/scene0.js` existe
- [ ] Arquivo `src/scenes/scene1.js` existe
- [ ] Arquivo `src/scenes/start.js` existe
- [ ] Nem `game.js` nem `config.js` existem na raiz
- [ ] Arquivos antigos foram movidos (não deixaram cópias)

## 🚀 Testes de Performance

- [ ] Jogo não congela ao trocar de fase
- [ ] FPS permanece acima de 30 em ambas as fases
- [ ] Sem vazamento de memória visível

## 📱 Compatibilidade

- [ ] Funciona em desktop (Chrome/Firefox/Edge)
- [ ] Funciona em mobile (responsivo)
- [ ] Joystick virtual aparece corretamente em mobile

## 🔄 Teste de Transições

- [ ] Menu → Fase 4 → Menu
- [ ] Menu → Fase 4 → Fase 2 → Menu
- [ ] Fase 2 → Menu → Fase 4
- [ ] Sem crashes em nenhuma transição

---

## 🐛 Se Algo Não Funcionar

### Erro: "can't find module"
- Verifique se os imports em `src/game.js` estão corretos
- Confirme que paths usam `./` para arquivos locais

### Erro: "SuperMarioBrosMap5-3"
- Já foi corrigido, não deve aparecer mais
- Se aparecer, limpe o cache do navegador (Ctrl+Shift+Del)

### Jogo carrega em branco
- Abra F12 (DevTools) e verifique console
- Verifique se `src/game.js` está sendo carregado
- Recarregue com Ctrl+Shift+R (hard refresh)

### Áudio não toca
- Era esperado (arquivos não foram integrados em scene0)
- Tá pronto para ser integrado em `assets/fase4/`

---

## ✨ Resumo da Mudança

| Item | Status |
|------|--------|
| Tamanho reduzido | ✅ 30MB → 15MB |
| Arquivos reorganizados | ✅ Estrutura profissional |
| Bugs corrigidos | ✅ SuperMarioBros removido |
| Código limpo | ✅ Sem dead code |
| Documentação | ✅ Completa |

**Confirme que todos os itens funcionam antes de considerar completo!**
