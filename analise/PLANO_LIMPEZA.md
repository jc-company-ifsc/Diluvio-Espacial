# 🧹 PLANO DE LIMPEZA - DILÚVIO ESPACIAL

## 1. LIMPEZA CRÍTICA (Remove 11 MB + Corrige Erros)

### Passo 1: Deletar Cópia do Projeto (⚠️ ANTES: Confirme backup)
```bash
# Remove 7.4 MB
rm -rf "assets/fase 2/jogo boi/Diluvio-Espacial-main/"

# Verificar que não quebrou nada:
grep -r "Diluvio-Espacial-main" *.js
# Resultado esperado: nenhuma linha encontrada
```

**Por que é seguro?**
- Todos os arquivos usáveis foram copiados para `assets/fase 2/jogo boi/` antes
- Os scripts atuais usam o caminho relativo correto

---

### Passo 2: Deletar Áudio Preparado (2.8 MB)
```bash
# Verifica que nenhum arquivo .mp3 disso é usado:
grep "aventura_fase_inteira\|chegou_ao_final\|cutscine\|game-over\|monstro_saindo\|morcego\|morte\|mudança_de_fase\|pulos" *.js
# Resultado esperado: nenhuma linha

# Deletar:
rm -rf "assets/fase 2/jogo boi/efeitos sonoros/"
```

---

### Passo 3: Deletar Fase 1 Não Referenciada (~510 KB)
```bash
# Verificar que fase1 não é usada:
grep -r "fase1\|fase\ 1" *.js
# Resultado esperado: nenhuma linha

# Deletar:
rm -rf assets/fase1/
```

---

### Passo 4: Corrigir Erro em scene1.js
**Arquivo:** `scene1.js`  
**Problema:** Linha que carrega arquivo não-existente  
**Solução:**

a) Encontrar a linha:
```bash
grep "SuperMarioBrosMap5-3" scene1.js
# Resultado esperado: 
# this.load.image('SuperMarioBrosMap5-3', 'assets/SuperMarioBrosMap5-3.png');
```

b) Opção A - Se não é usado no mapa, remover a linha
```javascript
// ❌ REMOVER ESTA LINHA:
// this.load.image('SuperMarioBrosMap5-3', 'assets/SuperMarioBrosMap5-3.png');
```

c) Opção B - Se é necessário para o tilemap, usar arquivo correto
```javascript
// ANTES:
this.load.image('SuperMarioBrosMap5-3', 'assets/SuperMarioBrosMap5-3.png');

// DEPOIS: (verificar qual arquivo é correto)
this.load.image('Tileset', 'assets/fase 2/jogo boi/FreePlatformerNA/Foreground/Tileset.png');
```

---

### Passo 5: Renomear/Limpar Referenciais de Sprite (Opcional)

**Problema:** `scene1.js` carrega sprite como "vd" mas do arquivo "az.png"

```javascript
// ATUAL (scene1.js, linha ~14):
this.load.spritesheet("vd", "assets/personagens/az.png", {
  frameWidth: 64,
  frameHeight: 64,
});

// Depois usada como:
this.player = this.physics.add.sprite(160, 100, "vd", 0);
this.player.anims.play("walk", true);
```

**Opção 1 - Manter (menos risco):**
- Deixar como está (funciona, mas confuso)

**Opção 2 - Renomear para clareza:**
```javascript
this.load.spritesheet("player", "assets/personagens/az.png", {
  frameWidth: 64,
  frameHeight: 64,
});

// Depois:
this.player = this.physics.add.sprite(160, 100, "player", 0);
```

---

## 2. REORGANIZAÇÃO DE PASTAS (Opcional mas Recomendado)

### Passo 1: Criar Nova Estrutura
```bash
mkdir -p src/scenes
mkdir -p assets/images/{characters,ui,backgrounds,props,tiles}
mkdir -p assets/tilemaps
mkdir -p assets/sources/psd
mkdir -p lib
```

### Passo 2: Mover Arquivos JS
```bash
# Mover para src/
mv config.js src/
mv game.js src/
mv index.html src/
mv main.css src/

# Mover scenes para subdirectório
mkdir -p src/scenes
mv start.js src/scenes/SceneStart.js
mv scene0.js src/scenes/SceneAsteroids.js
mv scene1.js src/scenes/ScenePlatform.js

# Mover bibliotecas
mkdir -p lib
mv phaser.min.js lib/
mv rexvirtualjoystickplugin.min.js lib/
```

### Passo 3: Mover Assets
```bash
# Personagens
cp assets/personagens/* assets/images/characters/

# UI
mv assets/start.png assets/images/ui/

# Fase 4 (asteroids)
mkdir -p assets/images/phase1/{sprites,effects}
mv assets/fase4/*.png assets/images/phase1/sprites/

# Áudio da Fase 1
mkdir -p assets/audio/phase1
mv assets/fase4/music4.mp3 assets/audio/phase1/
mv assets/fase4/laser.mp3 assets/audio/phase1/
mv assets/fase4/explosion.mp3 assets/audio/phase1/

# Fase 2 (platformer) - backgrounds e props
mkdir -p assets/images/phase2/{backgrounds,props,tileset}

# Backgrounds da caverna
cp "assets/fase 2/jogo boi/Diluvio-Espacial-main/Assets/Caverna/background1.png" assets/images/phase2/backgrounds/caverna_bg1.png
cp "assets/fase 2/jogo boi/Diluvio-Espacial-main/Assets/Caverna/background3.png" assets/images/phase2/backgrounds/caverna_bg3.png
# ... etc

# Props
cp "assets/fase 2/jogo boi/Diluvio-Espacial-main/Assets/Caverna/props1.png" assets/images/phase2/props/
cp "assets/fase 2/jogo boi/Diluvio-Espacial-main/Assets/Caverna/props2.png" assets/images/phase2/props/

# Tileset
cp "assets/fase 2/jogo boi/FreePlatformerNA/Foreground/"*.png assets/images/phase2/tileset/

# Tilemaps
mv "assets/fase 2/tiled4.json" assets/tilemaps/phase2_platform.json

# Arquivos de origem (PSD)
mkdir -p assets/sources/psd
find "assets/fase 2/jogo boi/Diluvio-Espacial-main" -name "*.psd" -exec mv {} assets/sources/psd/ \;
find "assets/fase1/PSD" -name "*.psd" -exec mv {} assets/sources/psd/ \;
```

### Passo 4: Deletar Estrutura Antiga
```bash
# Após mover tudo:
rm -rf "assets/fase 2/jogo boi/"
rm -rf assets/fase4/
rm -rf assets/personagens/
rm -rf "assets/fase1/"
rm -f assets/mapa.json
rm -f "assets/fase 2/Tiled3"*
rm -f "assets/fase 2/"*.tmx

# Limpar se arquivo CSS estiver vazio:
if [ $(wc -c < main.css) -le 50 ]; then
  rm main.css
  touch src/main.css
fi
```

---

## 3. ATUALIZAR CÓDIGO

### Atualizar `src/game.js`
```javascript
// ANTES:
import config from "./config.js";
import scene0 from "./scene0.js";
import scene1 from "./scene1.js";
import start from "./start.js";

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add("start", start);
    this.scene.add("scene0", scene0);
    this.scene.add("scene1", scene1);
    this.scene.start("start");
  }
}

// DEPOIS:
import config from "./config.js";
import SceneStart from "./scenes/SceneStart.js";
import SceneAsteroids from "./scenes/SceneAsteroids.js";
import ScenePlatform from "./scenes/ScenePlatform.js";

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add("start", SceneStart);
    this.scene.add("asteroids", SceneAsteroids);
    this.scene.add("platform", ScenePlatform);
    this.scene.start("start");
  }
}

window.onload = () => {
  window.game = new Game();
};
```

### Atualizar `src/index.html`
```html
<!-- ANTES: -->
<script src="./phaser.min.js"></script>
<script src="./rexvirtualjoystickplugin.min.js"></script>
<script type="module" src="./game.js"></script>

<!-- DEPOIS: -->
<script src="../lib/phaser.min.js"></script>
<script src="../lib/rexvirtualjoystickplugin.min.js"></script>
<script type="module" src="./game.js"></script>
```

### Atualizar `src/scenes/SceneStart.js` (ex start.js)
```javascript
// ANTES:
preload() {
  this.load.setPath("assets/");
  this.load.image("start", "start.png");
}

// DEPOIS:
preload() {
  this.load.image("start", "assets/images/ui/start.png");
}
```

### Atualizar `src/scenes/SceneAsteroids.js` (ex scene0.js)
```javascript
// ANTES:
preload() {
  this.load.image("background", "assets/fase4/fundo4.png");
  this.load.spritesheet("nv", "assets/personagens/nv.png", {
  // ...
  this.load.audio("music4", "assets/fase4/music4.mp3");

// DEPOIS:
preload() {
  this.load.image("background", "assets/images/phase1/sprites/fundo4.png");
  this.load.spritesheet("nv", "assets/images/characters/nv.png", {
  // ...
  this.load.audio("music4", "assets/audio/phase1/music4.mp3");
}
```

### Atualizar `src/scenes/ScenePlatform.js` (ex scene1.js)
```javascript
// ANTES:
preload() {
  this.load.tilemapTiledJSON('map', 'assets/fase 2/tiled4.json');
  this.load.image('background3', 'assets/fase 2/jogo boi/Diluvio-Espacial-main/Assets/Caverna/background3.png');
  this.load.image('SuperMarioBrosMap5-3', 'assets/SuperMarioBrosMap5-3.png'); // ❌ NÃO EXISTE
  this.load.spritesheet("vd", "assets/personagens/az.png", {

// DEPOIS:
preload() {
  this.load.tilemapTiledJSON('map', 'assets/tilemaps/phase2_platform.json');
  this.load.image('background1', 'assets/images/phase2/backgrounds/caverna_bg1.png');
  this.load.image('background3', 'assets/images/phase2/backgrounds/caverna_bg3.png');
  this.load.image('background4a', 'assets/images/phase2/backgrounds/caverna_bg4a.png');
  this.load.image('mainlev_build', 'assets/images/phase2/props/mainlev_build.png');
  this.load.image('props1', 'assets/images/phase2/props/props1.png');
  this.load.image('props2', 'assets/images/phase2/props/props2.png');
  this.load.image('CloudsBack', 'assets/images/phase2/tileset/CloudsBack.png');
  this.load.image('BGFront', 'assets/images/phase2/tileset/BGFront.png');
  this.load.image('CloudsFront', 'assets/images/phase2/tileset/CloudsFront.png');
  this.load.image('Tileset', 'assets/images/phase2/tileset/Tileset.png');
  this.load.image('TilesExamples', 'assets/images/phase2/tileset/TilesExamples.png');
  this.load.image('Trees', 'assets/images/phase2/tileset/Trees.png');
  // ❌ DELETAR: this.load.image('SuperMarioBrosMap5-3', 'assets/SuperMarioBrosMap5-3.png');
  this.load.spritesheet("player", "assets/images/characters/az.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
}
```

---

## 4. CRIAR .gitignore

**Arquivo:** `.gitignore`
```
# Arquivos de origem (não devem estar no build)
*.psd
*.xcf
*.ai
*.clip
*.aseprite

# Diretórios de origem/artwork
/assets/sources/
/design/
/artwork/

# Dependências Node (futuro)
node_modules/
package-lock.json
yarn.lock

# Arquivos de IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Arquivos de sistema
.DS_Store
Thumbs.db

# Builds
/dist/
/build/
*.zip
```

---

## 5. CHECKLIST DE TESTES

- [ ] `src/game.js` inicializa corretamente
- [ ] Scene Start (menu) carrega e mostra imagem
- [ ] Cena Asteroids funciona (joystick, asteroids, disparo)
- [ ] Cena Platformer funciona (mapa carrega, player se move)
- [ ] Sem erros de console
- [ ] Sem erros de 404 para assets
- [ ] Tamanho final do projeto reduzido para ~19 MB
- [ ] .gitignore ignorando arquivos PSD

---

## 6. COMANDOS RÁPIDOS

**Para deletar tudo de uma vez (⚠️ CUIDADO):**
```bash
cd /workspaces/Diluvio-Espacial

# Backup (HIGHLY RECOMMENDED)
git status
git add .
git commit -m "Backup antes de limpeza"

# Deletar tudo de uma vez
rm -rf "assets/fase 2/jogo boi/Diluvio-Espacial-main/"
rm -rf "assets/fase 2/jogo boi/efeitos sonoros/"
rm -rf assets/fase1/
rm -rf "assets/fase 2/Tiled3"*
rm -rf "assets/fase 2/"*.tmx
rm -f assets/mapa.json
rm -rf assets/fase4/

# Verificar o que ficou:
find assets -type f | sort

# Fazer nova estrutura:
mkdir -p assets/images/{characters,ui,backgrounds,props,tileset}
mkdir -p assets/audio
mkdir -p assets/tilemaps
```

---

## 7. RESULTADO FINAL

**Antes:**
- Tamanho: 30 MB
- Estrutura: Caótica, muitas duplicações

**Depois:**
- Tamanho: ~19 MB (-37%)
- Estrutura: Limpa, organizada, escalável
- Código: Updated, sem erros de referência
- Manutenibilidade: Muito melhor

