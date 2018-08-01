var hero = {
    name: 'Hero',
    level: 5,
    str: 4,
    dex: 4,
    con: 4,
    wis: 4,
    regenActive: false,
    lifeStealActive: false,
    slowActive: false,
    enhanceStrActive: false,
    enhanceDexActive: false,
    defeated: false,
    victoryCount: 0,
    attackAction: function () {
        var heroManaBar = document.getElementById('heroManaBar');
        var heroHealthBar = document.getElementById('heroHealthBar');
        var enemyHealthBar = document.getElementById('enemyHealthBar');
        var toHit = handlers.calculateAttackRoll(hero);
        var damage = '';
        if (toHit >= enemy.armorClass) {
            damage = Math.floor(Math.random() * 10 + 1) + this.str;
            enemy.currentHitPoints -= damage;
            enemyHealthBar.value -= damage;
            document.getElementById("heroTextBar").textContent = 'You hit for ' + damage + ' damage!';
            if (hero.lifeStealActive === true) {
                var healing = Math.floor(Math.random() * 8 + 1);
                this.currentHitPoints += healing;
                heroHealthBar.value += healing;
                if (this.currentHitPoints > this.maxHitPoints) {
                    this.currentHitPoints = this.maxHitPoints;
                }
                document.getElementById("spellTextBar").textContent = 'Your attack saps your opponent\'s life force, healing ' + healing + ' HP.';
            }
        } else {
            document.getElementById("heroTextBar").textContent = 'You miss!';
        }
    },
    spellHeal: function () {
        var heroManaBar = document.getElementById('heroManaBar');
        var heroHealthBar = document.getElementById('heroHealthBar');
        var healing = '';
        healing = 2 * (Math.floor(Math.random() * 8 + 1)) + (this.wis * 3);
        this.currentHitPoints += healing;
        heroHealthBar.value += healing;
        this.currentManaPoints -= 20;
        heroManaBar.value -= 20;
        document.getElementById("heroTextBar").textContent = 'You heal for ' + healing + ' points';
        if (this.currentHitPoints > this.maxHitPoints) {
            this.currentHitPoints = this.maxHitPoints;
        }
    },
    spellFirebolt: function () {
        var heroManaBar = document.getElementById('heroManaBar');
        var enemyHealthBar = document.getElementById('enemyHealthBar');
        var enemySave = handlers.calculateSavingThrow(enemy, enemy.dex);
        var damage = '';
        if (enemySave >= hero.saveDc) {
            damage = Math.floor((Math.floor(Math.random() * 8 + 1) + Math.floor(Math.random() * 8 + 1) + this.wis * 2) / 2);
            document.getElementById("heroTextBar").textContent = enemy.name + ' partially dodges your Firebolt and takes ' + damage + ' damage!';
            enemy.currentHitPoints -= damage;
            enemyHealthBar.value -= damage;
        } else {
            damage = Math.floor(Math.random() * 8 + 1) + Math.floor(Math.random() * 8 + 1) + this.wis * 2;
            document.getElementById("heroTextBar").textContent = enemy.name + ' fails to dodge your Firebolt and takes ' + damage + ' damage!';
            enemy.currentHitPoints -= damage;
            enemyHealthBar.value -= damage;
        }
        this.currentManaPoints -= 15;
        heroManaBar.value -= 15;
    }
};

var enemy = {
    name: 'Orc',
    level: 5,
    str: 2,
    dex: 4,
    con: 6,
    strDrain: 0,
    dexDrain: 0,
    conDrain: 0,
    wisDrain: 0,
    slowActive: true,
    defeated: false,
    attackAction: function () {
        var heroHealthBar = document.getElementById('heroHealthBar');
        var toHit = handlers.calculateAttackRoll(enemy);
        var damage = '';
        if (toHit >= hero.armorClass) {
            damage = Math.floor(Math.random() * 10 + 1) + this.str;
            hero.currentHitPoints -= damage;
            heroHealthBar.value -= damage;
            document.getElementById("enemyTextBar").textContent = enemy.name + ' stabs you for ' + damage + ' damage!';
        } else {
            document.getElementById("enemyTextBar").textContent = enemy.name + ' misses!';
        }
    },
    specialAttack: function () {
        var heroHealthBar = document.getElementById('heroHealthBar');
        var heroSave = handlers.calculateSavingThrow(hero, hero.wis);
        var damage = '';
        if (heroSave >= enemy.saveDc) {
            damage = Math.floor(Math.random() * 8 + 1) + this.str;
            document.getElementById("enemyTextBar").textContent = 'The Orc lands a strike and attempts to intimidate you, but you remain stoic. Take ' + damage + ' damage!';
            hero.currentHitPoints -= damage;
            heroHealthBar.value -= damage;
        } else {
            damage = Math.floor(Math.random() * 8 + 1) + this.str;
            document.getElementById("enemyTextBar").textContent = 'The Orc unnerves you with an intimidating snarl before he strikes. Take ' + damage + ' damage!';
            enemy.str += 1;
            hero.currentHitPoints -= damage;
            heroHealthBar.value -= damage;
        }
    }
};

var handlers = {
    calculateMaxHitPoints: function (character) {
        return character.level * (6 + character.con);
    },
    calculateMaxManaPoints: function (character) {
        return character.level * (6 + character.wis);
    },
    calculateArmorClass: function (character) {
        return 10 + character.dex + Math.round(character.level / 2);
    },
    calculateAttackRoll: function (character) {
        return Math.floor(Math.random() * 20 + 1) + character.str + Math.round(character.level / 2);
    },
    calculateSavingThrow: function (character, charStat) {
        //add stat argument to make code more flexible?
        return Math.floor(Math.random() * 21) + charStat + Math.round(character.level / 2);
    },
    calculateSaveDc: function (character, charStat) {
        return 10 + charStat + Math.round(character.level / 2);
    },
    healthMagicTracker: function () {
        document.getElementById("healthAndMagic").textContent = 'HP: ' + hero.currentHitPoints + '/' + hero.maxHitPoints + ' | ' + 'MP: ' + hero.currentManaPoints + '/' + hero.maxManaPoints;
    },
    setTrackers: function () {
        document.getElementById("level").textContent = hero.level;
        document.getElementById("str").textContent = hero.str;
        document.getElementById("dex").textContent = hero.dex;
        document.getElementById("con").textContent = hero.con;
        document.getElementById("wis").textContent = hero.wis;
        document.getElementById("ac").textContent = hero.armorClass;
        document.getElementById("regen").textContent = 'N/A';
        document.getElementById("lifeSteal").textContent = 'N/A';
        document.getElementById("slow").textContent = 'N/A';
        document.getElementById("enhanceStr").textContent = 'N/A';
        document.getElementById("enhanceDex").textContent = 'N/A';
        this.healthMagicTracker();
    },
    changeEnemyImage: function (source) {
        document.getElementById('enemyImage').src = source;
    },
    checkDefeated: function (character) {
        if (character.currentHitPoints <= 0) {
            character.defeated = true;
        }
    },
    gameOverMessage: function () {
        document.getElementById("heroTextBar").textContent = '';
        document.getElementById("enemyTextBar").textContent = 'GAME OVER';
    },
    victoryMessage: function () {
        document.getElementById("heroTextBar").textContent = '';
        document.getElementById("spellTextBar").textContent = '';
        document.getElementById("enemyTextBar").textContent = 'You have defeated the ' + enemy.name;
        this.disableButtons('actionButtons');
        this.disableButtons('actionButtons2');
    },
    createButton: function (textContent, className) {
        var button = document.createElement('button');
        button.textContent = textContent;
        button.className = className;
        return button;
    },
    displayPermanentButton: function (id, btnParam1, btnParam2, btnClass, myFunction) {
        document.querySelector(id).appendChild(this.createButton(btnParam1, btnParam2));
        var selectButton = document.querySelector(btnClass);
        selectButton.addEventListener('click', myFunction);
    },
    displayNextBossButton: function () {
        document.querySelector('#tempElements').appendChild(this.createButton('Next Boss', 'nextBossButton'));
        var selectButton = document.querySelector('.nextBossButton');
        selectButton.addEventListener('click', function () {
            nextBoss.levelUp();
            nextBoss.changeBoss();
            handlers.enableButtons('actionButtons');
            handlers.enableButtons('actionButtons2');
            this.remove();
            document.getElementById("enemyTextBar").textContent = '';
        });
    },
    updateHeroStats: function () {
        //Adding AC, HP, MP, and save DC to hero
        hero.armorClass = handlers.calculateArmorClass(hero);
        hero.maxHitPoints = handlers.calculateMaxHitPoints(hero);
        hero.maxManaPoints = handlers.calculateMaxManaPoints(hero);
        hero.saveDc = handlers.calculateSaveDc(hero, hero.wis);
        hero.currentHitPoints = hero.maxHitPoints;
        hero.currentManaPoints = hero.maxManaPoints;
    },
    updateEnemyStats: function () {
        //Adding AC and HP to enemy
        enemy.armorClass = handlers.calculateArmorClass(enemy);
        enemy.maxHitPoints = handlers.calculateMaxHitPoints(enemy);
        //add enemy spell save DC
        enemy.saveDc = handlers.calculateSaveDc(enemy, enemy.str);
        enemy.currentHitPoints = enemy.maxHitPoints;
        enemy.strDrain = 0;
        enemy.dexDrain = 0;
        enemy.conDrain = 0;
        enemy.wisDrain = 0;
    },
    debuff: function () {
        hero.regenActive = false;
        hero.lifeStealActive = false;
        hero.slowActive = false;
        if (hero.enhanceStrActive) {
            hero.str -= 2;
            hero.enhanceStrActive = false;
        }
        if (hero.enhanceDexActive) {
            hero.dex -= 2;
            hero.enhanceDexActive = false;
        }
    },
    coolDown: function (id) {
        var buttonDiv = document.getElementById(id).children;

        function resume(i) {
            setTimeout(function () {
                buttonDiv[i].disabled = false;
            }, 1500);
        }
        for (var i = 0; i < buttonDiv.length; i++) {
            buttonDiv[i].disabled = true;
            resume(i);
        }
    },
    disableButtons: function (id) {
        var buttonDiv = document.getElementById(id).children;
        for (var i = 0; i < buttonDiv.length; i++) {
            buttonDiv[i].disabled = true;
        }
    },
    enableButtons: function (id) {
        var buttonDiv = document.getElementById(id).children;
        for (var i = 0; i < buttonDiv.length; i++) {
            buttonDiv[i].disabled = false;
        }
    }
};

handlers.updateHeroStats();
handlers.updateEnemyStats();

var newSpells = {
    iceBeam: function () {
        var heroManaBar = document.getElementById('heroManaBar');
        var enemyHealthBar = document.getElementById('enemyHealthBar');
        var enemySave = handlers.calculateSavingThrow(enemy, enemy.dex);
        var damage = '';
        if (enemySave >= hero.saveDc) {
            damage = Math.floor((Math.floor(Math.random() * 6 + 1) + Math.floor(Math.random() * 6 + 1) + hero.wis) / 2);
            document.getElementById("heroTextBar").textContent = enemy.name + ' partially dodges your Ice Beam and takes ' + damage + ' damage!';
            enemy.currentHitPoints -= damage;
            enemyHealthBar.value -= damage;
        } else {
            damage = Math.floor(Math.random() * 6 + 1) + Math.floor(Math.random() * 6 + 1) + hero.wis;
            enemy.dex -= 1;
            document.getElementById("heroTextBar").textContent = enemy.name + ' fails to dodge your Ice Beam and takes ' + damage + ' damage! ' + enemy.name + '\'s dex is decreased!';
            enemy.armorClass = handlers.calculateArmorClass(enemy);
            enemy.currentHitPoints -= damage;
            enemyHealthBar.value -= damage;
        }
        hero.currentManaPoints -= 15;
        heroManaBar.value -= 15;
    },
    regen: function () {
        //spell effect in battle object
        //how to do text for both lifeSteal and regen at same time
        var heroManaBar = document.getElementById('heroManaBar');
        hero.regenActive = true;
        hero.currentManaPoints -= 15;
        heroManaBar.value -= 15;
        document.getElementById("heroTextBar").textContent = 'You cast Mana Regen';
        document.getElementById("regen").textContent = 'Active';
    },
    lifeSteal: function () {
        //spell effect in hero attackAction property
        var heroManaBar = document.getElementById('heroManaBar');
        hero.lifeStealActive = true;
        hero.currentManaPoints -= 15;
        heroManaBar.value -= 15;
        document.getElementById("heroTextBar").textContent = 'You cast Life Steal';
        document.getElementById("lifeSteal").textContent = 'Active';
    },
    slow: function () {
        var heroManaBar = document.getElementById('heroManaBar');
        hero.slowActive = true;
        hero.currentManaPoints -= 30;
        heroManaBar.value -= 30;
        document.getElementById("heroTextBar").textContent = 'You cast Slow';
        document.getElementById("slow").textContent = 'Active';
    },
    enhanceStr: function () {
        var heroManaBar = document.getElementById('heroManaBar');
        hero.str += 2;
        hero.enhanceStrActive = true;
        hero.currentManaPoints -= 10;
        heroManaBar.value -= 10;
        document.getElementById("heroTextBar").textContent = 'You cast Enhance Strength';
        document.getElementById("enhanceStr").textContent = 'Active';
        document.getElementById("str").textContent = hero.str;
    },
    enhanceDex: function () {
        var heroManaBar = document.getElementById('heroManaBar');
        hero.dex += 2;
        hero.enhanceDexActive = true;
        hero.currentManaPoints -= 10;
        heroManaBar.value -= 10;
        document.getElementById("heroTextBar").textContent = 'You cast Enhance Dexterity';
        document.getElementById("enhanceDex").textContent = 'Active';
        document.getElementById("dex").textContent = hero.dex;
    },
    addNewSpell: function () {
        //clean this up. make function
        var optionList = [];
        var spellList = document.createElement('select');
        spellList.id = 'spellList';
        var option0 = document.createElement('option');
        option0.text = 'Choose a New Spell';
        optionList.push(option0);
        var option1 = document.createElement('option');
        option1.text = 'Ice Beam';
        option1.value = 'iceBeam';
        optionList.push(option1);
        var option2 = document.createElement('option');
        option2.text = 'Life Steal';
        option2.value = 'lifeSteal';
        optionList.push(option2);
        var option3 = document.createElement('option');
        option3.text = 'Mana Regen';
        option3.value = 'regen';
        optionList.push(option3);
        var option4 = document.createElement('option');
        option4.text = 'slow';
        option4.value = 'slow';
        optionList.push(option4);
        var option5 = document.createElement('option');
        option5.text = 'enhanceStr';
        option5.value = 'enhanceStr';
        optionList.push(option5);
        var option6 = document.createElement('option');
        option6.text = 'enhanceDex';
        option6.value = 'enhanceDex';
        optionList.push(option6);

        optionList.forEach(function (element) {
            spellList.appendChild(element);
        });
        document.querySelector('#tempElements').appendChild(spellList);
        document.getElementById('spellList').addEventListener("change", spellSelect);

        function spellSelect() {
            var actionButtonCount = document.querySelector('#actionButtons').childElementCount;
            if (this.value === 'iceBeam') {
                if (hero.hasOwnProperty('iceBeam')) {
                    document.getElementById("enemyTextBar").textContent = 'You already have that spell';
                } else {
                    hero.iceBeam = newSpells.iceBeam;
                    if (actionButtonCount < 4) {
                        handlers.displayPermanentButton('#actionButtons', 'Ice Beam', 'iceBeam', '.iceBeam', battle.iceBeam);
                        handlers.disableButtons('actionButtons');
                    } else {
                        handlers.displayPermanentButton('#actionButtons2', 'Ice Beam', 'iceBeam', '.iceBeam', battle.iceBeam);
                        handlers.disableButtons('actionButtons2');
                    }
                    document.querySelector('#tempElements').removeChild(spellList);
                    handlers.displayNextBossButton();
                }
            } else if (this.value === 'lifeSteal') {
                if (hero.hasOwnProperty('lifeSteal')) {
                    document.getElementById("enemyTextBar").textContent = 'You already have that spell';
                } else {
                    hero.lifeSteal = newSpells.lifeSteal;
                    if (actionButtonCount < 4) {
                        handlers.displayPermanentButton('#actionButtons', 'Life Steal', 'lifeSteal', '.lifeSteal', battle.lifeSteal);
                        handlers.disableButtons('actionButtons');
                    } else {
                        handlers.displayPermanentButton('#actionButtons2', 'Life Steal', 'lifeSteal', '.lifeSteal', battle.lifeSteal);
                        handlers.disableButtons('actionButtons2');
                    }
                    document.querySelector('#tempElements').removeChild(spellList);
                    handlers.displayNextBossButton();
                }
            } else if (this.value === 'regen') {
                if (hero.hasOwnProperty('regen')) {
                    document.getElementById("enemyTextBar").textContent = 'You already have that spell';
                } else {
                    hero.regen = newSpells.regen;
                    if (actionButtonCount < 4) {
                        handlers.displayPermanentButton('#actionButtons', 'Mana Regen', 'regen', '.regen', battle.regen);
                        handlers.disableButtons('actionButtons');
                    } else {
                        handlers.displayPermanentButton('#actionButtons2', 'Mana Regen', 'regen', '.regen', battle.regen);
                        handlers.disableButtons('actionButtons2');
                    }
                    document.querySelector('#tempElements').removeChild(spellList);
                    handlers.displayNextBossButton();
                }
            } else if (this.value === 'slow') {
                if (hero.hasOwnProperty('slow')) {
                    document.getElementById("enemyTextBar").textContent = 'You already have that spell';
                } else {
                    hero.slow = newSpells.slow;
                    if (actionButtonCount < 4) {
                        handlers.displayPermanentButton('#actionButtons', 'Slow', 'slow', '.slow', battle.slow);
                        handlers.disableButtons('actionButtons');
                    } else {
                        handlers.displayPermanentButton('#actionButtons2', 'Slow', 'slow', '.slow', battle.slow);
                        handlers.disableButtons('actionButtons2');
                    }
                    document.querySelector('#tempElements').removeChild(spellList);
                    handlers.displayNextBossButton();
                }
            } else if (this.value === 'enhanceStr') {
                if (hero.hasOwnProperty('enhanceStr')) {
                    document.getElementById("enemyTextBar").textContent = 'You already have that spell';
                } else {
                    hero.enhanceStr = newSpells.enhanceStr;
                    if (actionButtonCount < 4) {
                        handlers.displayPermanentButton('#actionButtons', 'Enhance Str', 'enhanceStr', '.enhanceStr', battle.enhanceStr);
                        handlers.disableButtons('actionButtons');
                    } else {
                        handlers.displayPermanentButton('#actionButtons2', 'Enhance Str', 'enhanceStr', '.enhanceStr', battle.enhanceStr);
                        handlers.disableButtons('actionButtons2');
                    }
                    document.querySelector('#tempElements').removeChild(spellList);
                    handlers.displayNextBossButton();
                }
            } else if (this.value === 'enhanceDex') {
                if (hero.hasOwnProperty('enhanceDex')) {
                    document.getElementById("enemyTextBar").textContent = 'You already have that spell';
                } else {
                    hero.enhanceDex = newSpells.enhanceDex;
                    if (actionButtonCount < 4) {
                        handlers.displayPermanentButton('#actionButtons', 'Enhance Dex', 'enhanceDex', '.enhanceDex', battle.enhanceDex);
                        handlers.disableButtons('actionButtons');
                    } else {
                        handlers.displayPermanentButton('#actionButtons2', 'Enhance Dex', 'enhanceDex', '.enhanceDex', battle.enhanceDex);
                        handlers.disableButtons('actionButtons2');
                    }
                    document.querySelector('#tempElements').removeChild(spellList);
                    handlers.displayNextBossButton();
                }
            }
        }
    }
};

var battle = {
    enemyTurn: function () {
        if (hero.regenActive === true) {
            var heroManaBar = document.getElementById('heroManaBar');
            hero.currentManaPoints += hero.wis;
            heroManaBar.value += hero.wis;
            if (hero.currentManaPoints > hero.maxManaPoints) {
                hero.currentManaPoints = hero.maxManaPoints;
            }
            document.getElementById("spellTextBar").textContent = 'Your regeneration spell restores ' + hero.wis + ' MP.';
        }
        var attackSelector = Math.floor(Math.random() * 4);
        if (attackSelector < 3) {
            enemy.attackAction();
        } else {
            enemy.specialAttack();
        }
        handlers.checkDefeated(hero);
        if (hero.defeated === true) {
            handlers.gameOverMessage();
            //fix this mess
            alert('GAME OVER');
            location.reload()
        }
        handlers.healthMagicTracker();
    },
    attack: function () {
        hero.attackAction();
        handlers.checkDefeated(enemy);
        if (enemy.defeated === true) {
            handlers.victoryMessage();
            newSpells.addNewSpell();
        } else {
            handlers.coolDown("actionButtons");
            handlers.coolDown("actionButtons2");
            //enemy attack
            if (hero.slowActive) {
                var slowChance = Math.floor(Math.random() * 5 + 1)
                if (slowChance === 5) {
                    setTimeout(function () {
                        document.getElementById("enemyTextBar").textContent = enemy.name + ' is too slow to act!';
                    }, 1500);
                } else {
                    setTimeout(this.enemyTurn, 1500);
                }
            } else {
                setTimeout(this.enemyTurn, 1500);
            }
            //end of attack
        }
        handlers.healthMagicTracker();
    },
    heal: function () {
        if (hero.currentManaPoints >= 20) {
            if (hero.currentHitPoints === hero.maxHitPoints) {
                document.getElementById("heroTextBar").textContent = 'You are already at full health';
            } else {
                handlers.coolDown("actionButtons");
                handlers.coolDown("actionButtons2");
                hero.spellHeal();
                //enemy attack
                if (hero.slowActive) {
                    var slowChance = Math.floor(Math.random() * 5 + 1)
                    if (slowChance === 5) {
                        setTimeout(function () {
                            document.getElementById("enemyTextBar").textContent = enemy.name + ' is too slow to act!';
                        }, 1500);
                    } else {
                        setTimeout(this.enemyTurn, 1500);
                    }
                } else {
                    setTimeout(this.enemyTurn, 1500);
                }
                //end of attack
                handlers.healthMagicTracker();
            }
        } else {
            document.getElementById("heroTextBar").textContent = 'Not enough MP';
        }
    },
    firebolt: function () {
        if (hero.currentManaPoints >= 15) {
            hero.spellFirebolt();
            handlers.checkDefeated(enemy);
            if (enemy.defeated === true) {
                handlers.victoryMessage();
                newSpells.addNewSpell();
            } else {
                handlers.coolDown("actionButtons");
                handlers.coolDown("actionButtons2");
                //enemy attack
                if (hero.slowActive) {
                    var slowChance = Math.floor(Math.random() * 5 + 1)
                    if (slowChance === 5) {
                        setTimeout(function () {
                            document.getElementById("enemyTextBar").textContent = enemy.name + ' is too slow to act!';
                        }, 1500);
                    } else {
                        setTimeout(this.enemyTurn, 1500);
                    }
                } else {
                    setTimeout(this.enemyTurn, 1500);
                }
                //end of attack
            }
            handlers.healthMagicTracker();
        } else {
            document.getElementById("heroTextBar").textContent = 'Not enough MP';
        }
    },
    iceBeam: function () {
        if (hero.currentManaPoints >= 15) {
            handlers.coolDown("actionButtons");
            handlers.coolDown("actionButtons2");
            hero.iceBeam();
            handlers.checkDefeated(enemy);
            if (enemy.defeated === true) {
                handlers.victoryMessage();
                newSpells.addNewSpell();
            } else {
                //enemy attack
                if (hero.slowActive) {
                    var slowChance = Math.floor(Math.random() * 5 + 1)
                    if (slowChance === 5) {
                        setTimeout(function () {
                            document.getElementById("enemyTextBar").textContent = enemy.name + ' is too slow to act!';
                        }, 1500);
                    } else {
                        //why can't I use 'this' for newer methods in this object?
                        setTimeout(battle.enemyTurn, 1500);
                    }
                } else {
                    setTimeout(battle.enemyTurn, 1500);
                }
                //end of attack
            }
            handlers.healthMagicTracker();
        } else {
            document.getElementById("heroTextBar").textContent = 'Not enough MP';
        }
    },
    lifeSteal: function () {
        if (hero.currentManaPoints >= 15) {
            if (hero.lifeStealActive) {
                document.getElementById("heroTextBar").textContent = 'Life Steal is already active!';
            } else {
                handlers.coolDown("actionButtons");
                handlers.coolDown("actionButtons2");
                hero.lifeSteal();
                //enemy attack
                if (hero.slowActive) {
                    var slowChance = Math.floor(Math.random() * 5 + 1)
                    if (slowChance === 5) {
                        setTimeout(function () {
                            document.getElementById("enemyTextBar").textContent = enemy.name + ' is too slow to act!';
                        }, 1500);
                    } else {
                        //why can't I use 'this' for newer methods in this object?
                        setTimeout(battle.enemyTurn, 1500);
                    }
                } else {
                    setTimeout(battle.enemyTurn, 1500);
                }
                //end of attack
                handlers.healthMagicTracker();
            }
        } else {
            document.getElementById("heroTextBar").textContent = 'Not enough MP';
        }
    },
    regen: function () {
        if (hero.currentManaPoints >= 15) {
            if (hero.regenActive) {
                document.getElementById("heroTextBar").textContent = 'Mana Regen is already active!';
            } else {
                handlers.coolDown("actionButtons");
                handlers.coolDown("actionButtons2");
                hero.regen();
                //enemy attack
                if (hero.slowActive) {
                    var slowChance = Math.floor(Math.random() * 5 + 1)
                    if (slowChance === 5) {
                        setTimeout(function () {
                            document.getElementById("enemyTextBar").textContent = enemy.name + ' is too slow to act!';
                        }, 1500);
                    } else {
                        //why can't I use 'this' for newer methods in this object?
                        setTimeout(battle.enemyTurn, 1500);
                    }
                } else {
                    setTimeout(battle.enemyTurn, 1500);
                }
                //end of attack
                handlers.healthMagicTracker();
            }
        } else {
            document.getElementById("heroTextBar").textContent = 'Not enough MP';
        }
    },
    slow: function () {
        if (hero.currentManaPoints >= 30) {
            if (hero.slowActive) {
                document.getElementById("heroTextBar").textContent = enemy.name + ' is already slowed!';
            } else {
                handlers.coolDown("actionButtons");
                handlers.coolDown("actionButtons2");
                hero.slow();
                //enemy attack
                if (hero.slowActive) {
                    var slowChance = Math.floor(Math.random() * 5 + 1)
                    if (slowChance === 5) {
                        setTimeout(function () {
                            document.getElementById("enemyTextBar").textContent = enemy.name + ' is too slow to act!';
                        }, 1500);
                    } else {
                        //why can't I use 'this' for newer methods in this object?
                        setTimeout(battle.enemyTurn, 1500);
                    }
                } else {
                    setTimeout(battle.enemyTurn, 1500);
                }
                //end of attack
                handlers.healthMagicTracker();
            }
        } else {
            document.getElementById("heroTextBar").textContent = 'Not enough MP';
        }
    },
    enhanceStr: function () {
        if (hero.currentManaPoints >= 10) {
            if (hero.enhanceStrActive) {
                document.getElementById("heroTextBar").textContent = 'Your strength is already enhanced!';
            } else {
                handlers.coolDown("actionButtons");
                handlers.coolDown("actionButtons2");
                hero.enhanceStr();
                //enemy attack
                if (hero.slowActive) {
                    var slowChance = Math.floor(Math.random() * 5 + 1)
                    if (slowChance === 5) {
                        setTimeout(function () {
                            document.getElementById("enemyTextBar").textContent = enemy.name + ' is too slow to act!';
                        }, 1500);
                    } else {
                        //why can't I use 'this' for newer methods in this object?
                        setTimeout(battle.enemyTurn, 1500);
                    }
                } else {
                    setTimeout(battle.enemyTurn, 1500);
                }
                //end of attack
                handlers.healthMagicTracker();
            }
        } else {
            document.getElementById("heroTextBar").textContent = 'Not enough MP';
        }
    },
    enhanceDex: function () {
        if (hero.currentManaPoints >= 10) {
            if (hero.enhanceDexActive) {
                document.getElementById("heroTextBar").textContent = 'Your dexterity is already enhanced!';
            } else {
                handlers.coolDown("actionButtons");
                handlers.coolDown("actionButtons2");
                hero.enhanceDex();
                //enemy attack
                if (hero.slowActive) {
                    var slowChance = Math.floor(Math.random() * 5 + 1)
                    if (slowChance === 5) {
                        setTimeout(function () {
                            document.getElementById("enemyTextBar").textContent = enemy.name + ' is too slow to act!';
                        }, 1500);
                    } else {
                        //why can't I use 'this' for newer methods in this object?
                        setTimeout(battle.enemyTurn, 1500);
                    }
                } else {
                    setTimeout(battle.enemyTurn, 1500);
                }
                //end of attack
                handlers.healthMagicTracker();
            }
        } else {
            document.getElementById("heroTextBar").textContent = 'Not enough MP';
        }
    }
};

var nextBoss = {
    levelUp: function () {
        hero.level += 1;
        hero.str += 1 + enemy.strDrain;
        hero.dex += 1 + enemy.dexDrain;
        hero.con += 1 + enemy.conDrain;
        hero.wis += 1 + enemy.wisDrain;
        hero.victoryCount += 1;
        //inventory???
        handlers.debuff();
        handlers.updateHeroStats();
        var heroManaBar = document.getElementById('heroManaBar');
        var heroHealthBar = document.getElementById('heroHealthBar');
        heroManaBar.max = hero.maxManaPoints;
        heroManaBar.value = hero.currentManaPoints;
        heroHealthBar.max = hero.maxHitPoints;
        heroHealthBar.value = hero.currentHitPoints;

    },
    changeBoss: function () {
        enemy.defeated = false;
        handlers.setTrackers();
        if (hero.victoryCount === 1) {
            //Boss 2      
            enemy.name = 'Minotaur';
            enemy.level = 6;
            enemy.str = 6;
            enemy.dex = 2;
            enemy.con = 10;
            enemy.attackAction = function () {
                var heroHealthBar = document.getElementById('heroHealthBar');
                var toHit = handlers.calculateAttackRoll(enemy);
                var damage = '';
                if (toHit >= hero.armorClass) {
                    damage = Math.floor(Math.random() * 12 + 1) + this.str;
                    hero.currentHitPoints -= damage;
                    heroHealthBar.value -= damage;
                    document.getElementById("enemyTextBar").textContent = enemy.name + ' slashes you for ' + damage + ' damage!';
                } else {
                    document.getElementById("enemyTextBar").textContent = enemy.name + ' misses!';
                }
            };
            enemy.specialAttack = function () {
                var heroHealthBar = document.getElementById('heroHealthBar');
                var heroSave = handlers.calculateSavingThrow(hero, hero.dex);
                var damage = '';
                if (heroSave >= enemy.saveDc) {
                    damage = Math.floor((Math.floor(Math.random() * 6 + 1) + Math.floor(Math.random() * 6 + 1) + this.str) / 2);
                    document.getElementById("enemyTextBar").textContent = 'You partially dodge the Minotaur\'s gore attack and take ' + damage + ' damage!';
                    hero.currentHitPoints -= damage;
                    heroHealthBar.value -= damage;
                } else {
                    damage = Math.floor(Math.random() * 6 + 1) + Math.floor(Math.random() * 6 + 1) + this.str;
                    document.getElementById("enemyTextBar").textContent = 'You fail to dodge the Minotaur\'s gore attack and take ' + damage + ' damage!';
                    hero.currentHitPoints -= damage;
                    heroHealthBar.value -= damage;
                }
            };
            handlers.changeEnemyImage('https://www.dropbox.com/s/ysfzche433l0pw6/Minotaur-resized.gif?raw=1');
            document.getElementById("enemyName").textContent = 'Stage 2- ' + enemy.name;
        } else if (hero.victoryCount === 2) {
            //boss 3
            enemy.name = 'Ice Golem';
            enemy.level = 8;
            enemy.str = 7;
            enemy.dex = 4;
            enemy.con = 10;
            enemy.attackAction = function () {
                var heroHealthBar = document.getElementById('heroHealthBar');
                var toHit = handlers.calculateAttackRoll(enemy);
                var damage = '';
                if (toHit >= hero.armorClass) {
                    damage = Math.floor((Math.random() * 4 + 1) + (Math.random() * 4 + 1) + (Math.random() * 4 + 1) + (Math.random() * 4 + 1)) + this.str;
                    hero.currentHitPoints -= damage;
                    heroHealthBar.value -= damage;
                    document.getElementById("enemyTextBar").textContent = enemy.name + ' slams you for ' + damage + ' damage!';
                } else {
                    document.getElementById("enemyTextBar").textContent = enemy.name + ' misses!';
                }
            };
            enemy.specialAttack = function () {
                var heroHealthBar = document.getElementById('heroHealthBar');
                var heroSave = handlers.calculateSavingThrow(hero, hero.con);
                var damage = '';
                if (heroSave >= enemy.saveDc) {
                    damage = Math.floor((Math.floor(Math.random() * 6 + 1) + Math.floor(Math.random() * 6 + 1) + this.str) / 2);
                    document.getElementById("enemyTextBar").textContent = 'The ' + enemy.name + ' constricts you in an Icy Grip but you resist the chill. Take ' + damage + ' damage!';
                    hero.currentHitPoints -= damage;
                    heroHealthBar.value -= damage;
                } else {
                    damage = Math.floor(Math.random() * 6 + 1) + Math.floor(Math.random() * 6 + 1) + this.str;
                    document.getElementById("enemyTextBar").textContent = 'You are grappled by the ' + enemy.name + ' and fail to resist it\'s Icy Grip. You take ' + damage + ' damage and your dex decreases!';
                    if (hero.dex > 1) {
                        hero.dex -= 1;
                        enemy.dexDrain += 1;
                        hero.armorClass = handlers.calculateArmorClass(hero);
                        document.getElementById("dex").textContent = hero.dex;
                        document.getElementById("ac").textContent = hero.armorClass;
                    }
                    hero.currentHitPoints -= damage;
                    heroHealthBar.value -= damage;
                }
            };
            handlers.changeEnemyImage('https://www.dropbox.com/s/yguobh1682w17wy/Golem-resized.png?raw=1');
            document.getElementById("enemyName").textContent = 'Stage 3- ' + enemy.name;
        } else if (hero.victoryCount === 3) {
            //boss 4
            enemy.name = 'Dragon';
            enemy.level = 10;
            enemy.str = 9;
            enemy.dex = 4;
            enemy.con = 12;
            enemy.attackAction = function () {
                var heroHealthBar = document.getElementById('heroHealthBar');
                var toHit = handlers.calculateAttackRoll(enemy);
                var damage = '';
                if (toHit >= hero.armorClass) {
                    damage = Math.floor(Math.random() * 12 + 1) + Math.floor(Math.random() * 12 + 1) + this.str;
                    hero.currentHitPoints -= damage;
                    heroHealthBar.value -= damage;
                    document.getElementById("enemyTextBar").textContent = enemy.name + ' claws you for ' + damage + ' damage!';
                } else {
                    document.getElementById("enemyTextBar").textContent = enemy.name + ' misses!';
                }
            };
            enemy.specialAttack = function () {
                var heroHealthBar = document.getElementById('heroHealthBar');
                var heroSave = handlers.calculateSavingThrow(hero, hero.dex);
                var damage = '';
                if (heroSave >= enemy.saveDc) {
                    damage = Math.floor((Math.floor(Math.random() * 6 + 1) + Math.floor(Math.random() * 6 + 1) + Math.floor(Math.random() * 6 + 1) + Math.floor(Math.random() * 6 + 1) + this.str) / 2);
                    document.getElementById("enemyTextBar").textContent = 'The dragon breathes a cone of fire but you manage to partially dodge. Take ' + damage + ' damage!';
                    hero.currentHitPoints -= damage;
                    heroHealthBar.value -= damage;
                } else {
                    damage = Math.floor(Math.random() * 6 + 1) + Math.floor(Math.random() * 6 + 1) + Math.floor(Math.random() * 6 + 1) + Math.floor(Math.random() * 6 + 1) + this.str;
                    document.getElementById("enemyTextBar").textContent = 'The dragon breathes a cone of fire and you are too slow to dodge, Take ' + damage + ' damage!';
                    hero.currentHitPoints -= damage;
                    heroHealthBar.value -= damage;
                }
            };
            handlers.changeEnemyImage('https://opengameart.org/sites/default/files/pisilohepunane3_preview.png');
            document.getElementById("enemyName").textContent = 'Stage 4- ' + enemy.name;
        } else if (hero.victoryCount === 4) {
            //boss 5
            enemy.name = 'Death Knights';
            enemy.level = 12;
            enemy.str = 10;
            enemy.dex = 8;
            enemy.con = 15;
            enemy.attackAction = function () {
                var heroHealthBar = document.getElementById('heroHealthBar');
                var toHit = handlers.calculateAttackRoll(enemy);
                var damage = '';
                if (toHit >= hero.armorClass) {
                    damage = Math.floor(Math.random() * 12 + 1) + Math.floor(Math.random() * 12 + 1) + this.str * 2;
                    hero.currentHitPoints -= damage;
                    heroHealthBar.value -= damage;
                    document.getElementById("enemyTextBar").textContent = 'The ' + enemy.name + ' slash at you from all angles for ' + damage + ' damage!';
                } else {
                    document.getElementById("enemyTextBar").textContent = enemy.name + ' miss!';
                }
            };
            enemy.specialAttack = function () {
                var heroHealthBar = document.getElementById('heroHealthBar');
                var heroManaBar = document.getElementById('heroManaBar');
                var heroSave = handlers.calculateSavingThrow(hero, hero.wis);
                var damage = '';
                if (heroSave >= enemy.saveDc) {
                    damage = Math.floor((Math.floor(Math.random() * 6 + 1) + this.str) / 2);
                    document.getElementById("enemyTextBar").textContent = 'The ' + enemy.name + ' hit you with Withering Touch but you partially resist Take ' + damage + ' damage and lose 10 mana!';
                    hero.currentHitPoints -= damage;
                    heroHealthBar.value -= damage;
                    hero.currentManaPoints -= 10;
                    heroManaBar.value -= 10;
                } else {
                    damage = Math.floor(Math.random() * 6 + 1) + this.str;
                    document.getElementById("enemyTextBar").textContent = 'The ' + enemy.name + ' drain part of your life essence with Withering Touch. Take ' + damage + ' damage and lose 10 mana! Your max health has decreased by 10!';
                    hero.currentHitPoints -= damage;
                    heroHealthBar.value -= damage;
                    hero.currentManaPoints -= 10;
                    heroManaBar.value -= 10;
                    //add code to temporarily decress hero.maxHitPoints and not just the health bar
                    heroHealthBar.max -= 10;
                }
            };
            handlers.changeEnemyImage('https://www.dropbox.com/s/921dnstlhy6xip1/Dark-Legion-resized.png?raw=1');
            document.getElementById("enemyName").textContent = 'Stage 5- ' + enemy.name;
        }
        handlers.updateEnemyStats();
        var enemyHealthBar = document.getElementById('enemyHealthBar');
        enemyHealthBar.max = enemy.maxHitPoints;
        enemyHealthBar.value = enemy.currentHitPoints;
    }
};