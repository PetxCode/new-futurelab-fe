
import React, { useEffect, useRef, useState } from 'react';
import * as Blockly from 'blockly';
import { javascriptGenerator, Order } from 'blockly/javascript';
import toast from 'react-hot-toast';

// --- SCRATCH BLOCKS DEFINITIONS ---

const defineScratchBlocks = () => {
    // MOTION
    Blockly.Blocks['motion_movesteps'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("move")
                .appendField(new Blockly.FieldNumber(10), "STEPS")
                .appendField("steps");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(225); // Motion Blue
            this.setTooltip("Move the sprite forward");
        }
    };

    Blockly.Blocks['motion_turnright'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("turn")
                .appendField(new Blockly.FieldImage("https://www.gstatic.com/codesite/ph/images/star_on.gif", 15, 15, "*")) // Placeholder icon
                .appendField("right")
                .appendField(new Blockly.FieldNumber(15), "DEGREES")
                .appendField("degrees");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(225);
        }
    };

    Blockly.Blocks['motion_turnleft'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("turn")
                .appendField("left") // Placeholder icon
                .appendField(new Blockly.FieldNumber(15), "DEGREES")
                .appendField("degrees");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(225);
        }
    };

    Blockly.Blocks['motion_gotoxy'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("go to x:")
                .appendField(new Blockly.FieldNumber(0), "X")
                .appendField("y:")
                .appendField(new Blockly.FieldNumber(0), "Y");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(225);
        }
    };

    Blockly.Blocks['motion_glideto'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("glide")
                .appendField(new Blockly.FieldNumber(1), "SECS")
                .appendField("secs to x:")
                .appendField(new Blockly.FieldNumber(0), "X")
                .appendField("y:")
                .appendField(new Blockly.FieldNumber(0), "Y");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(225);
        }
    };

    Blockly.Blocks['motion_pointindirection'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("point in direction")
                .appendField(new Blockly.FieldNumber(90), "DIRECTION");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(225);
        }
    };

    Blockly.Blocks['motion_changexby'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("change x by")
                .appendField(new Blockly.FieldNumber(10), "DX");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(225);
        }
    };

    Blockly.Blocks['motion_setx'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("set x to")
                .appendField(new Blockly.FieldNumber(0), "X");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(225);
        }
    };

    Blockly.Blocks['motion_changeyby'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("change y by")
                .appendField(new Blockly.FieldNumber(10), "DY");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(225);
        }
    };

    Blockly.Blocks['motion_sety'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("set y to")
                .appendField(new Blockly.FieldNumber(0), "Y");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(225);
        }
    };

    Blockly.Blocks['motion_ifonedgebounce'] = {
        init: function() {
            this.appendDummyInput().appendField("if on edge, bounce");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(225);
        }
    };

    // LOOKS
    Blockly.Blocks['looks_say'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("say")
                .appendField(new Blockly.FieldTextInput("Hello!"), "MESSAGE")
                .appendField("for")
                .appendField(new Blockly.FieldNumber(2), "SECS")
                .appendField("seconds");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(260); // Looks Purple
        }
    };

    Blockly.Blocks['looks_say_none'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("say")
                .appendField(new Blockly.FieldTextInput("Hello!"), "MESSAGE");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(260);
        }
    };

    Blockly.Blocks['looks_think'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("think")
                .appendField(new Blockly.FieldTextInput("Hmm..."), "MESSAGE")
                .appendField("for")
                .appendField(new Blockly.FieldNumber(2), "SECS")
                .appendField("seconds");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(260);
        }
    };

    Blockly.Blocks['looks_think_none'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("think")
                .appendField(new Blockly.FieldTextInput("Hmm..."), "MESSAGE");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(260);
        }
    };

    Blockly.Blocks['looks_changeeffectby'] = {
         init: function() {
            this.appendDummyInput()
                .appendField("change")
                .appendField(new Blockly.FieldDropdown([["color", "COLOR"], ["fisheye", "FISHEYE"], ["whirl", "WHIRL"], ["pixelate", "PIXELATE"], ["mosaic", "MOSAIC"], ["brightness", "BRIGHTNESS"], ["ghost", "GHOST"]]), "EFFECT")
                .appendField("effect by")
                .appendField(new Blockly.FieldNumber(25), "CHANGE");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(260);
         }
    };

    Blockly.Blocks['looks_seteffectto'] = {
        init: function() {
           this.appendDummyInput()
               .appendField("set")
               .appendField(new Blockly.FieldDropdown([["color", "COLOR"], ["fisheye", "FISHEYE"], ["whirl", "WHIRL"], ["pixelate", "PIXELATE"], ["mosaic", "MOSAIC"], ["brightness", "BRIGHTNESS"], ["ghost", "GHOST"]]), "EFFECT")
               .appendField("effect to")
               .appendField(new Blockly.FieldNumber(0), "VALUE");
           this.setPreviousStatement(true, null);
           this.setNextStatement(true, null);
           this.setColour(260);
        }
   };

   Blockly.Blocks['looks_cleargraphiceffects'] = {
        init: function() {
            this.appendDummyInput().appendField("clear graphic effects");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(260);
        }
    };

    Blockly.Blocks['looks_changesizeby'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("change size by")
                .appendField(new Blockly.FieldNumber(10), "CHANGE");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(260);
        }
    };

    Blockly.Blocks['looks_setsizeto'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("set size to")
                .appendField(new Blockly.FieldNumber(100), "SIZE")
                .appendField("%");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(260);
        }
    };

    Blockly.Blocks['looks_show'] = {
        init: function() {
            this.appendDummyInput().appendField("show");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(260);
        }
    };

    Blockly.Blocks['looks_hide'] = {
        init: function() {
            this.appendDummyInput().appendField("hide");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(260);
        }
    };

    Blockly.Blocks['looks_costumenumbername'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("costume")
                .appendField(new Blockly.FieldDropdown([["number", "NUMBER"], ["name", "NAME"]]), "TYPE");
            this.setOutput(true, "Number");
            this.setColour(260);
        }
    };

    Blockly.Blocks['looks_backdropnumbername'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("backdrop")
                .appendField(new Blockly.FieldDropdown([["number", "NUMBER"], ["name", "NAME"]]), "TYPE");
            this.setOutput(true, "Number");
            this.setColour(260);
        }
    };

    Blockly.Blocks['looks_size'] = {
        init: function() {
            this.appendDummyInput().appendField("size");
            this.setOutput(true, "Number");
            this.setColour(260);
        }
    };

    // EVENTS
    Blockly.Blocks['event_whenflagclicked'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("when")
                .appendField(new Blockly.FieldImage("https://upload.wikimedia.org/wikipedia/commons/8/8b/Green_flag.svg", 15, 15, "Green Flag"))
                .appendField("clicked");
            this.appendStatementInput("DO");
            this.setColour(20); // Events Yellow
        }
    };

    Blockly.Blocks['event_whenkeypressed'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("when")
                .appendField(new Blockly.FieldDropdown([
                    ["space", "SPACE"], ["up arrow", "UP"], ["down arrow", "DOWN"], 
                    ["right arrow", "RIGHT"], ["left arrow", "LEFT"], ["any", "ANY"]
                ]), "KEY")
                .appendField("key pressed");
            this.appendStatementInput("DO");
            this.setColour(20);
        }
    };

    Blockly.Blocks['event_whenspriteclicked'] = {
        init: function() {
            this.appendDummyInput().appendField("when this sprite clicked");
            this.appendStatementInput("DO");
            this.setColour(20);
        }
    };

    Blockly.Blocks['event_whenbroadcastreceived'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("when I receive")
                .appendField(new Blockly.FieldTextInput("message1"), "MESSAGE");
            this.appendStatementInput("DO");
            this.setColour(20);
        }
    };

    Blockly.Blocks['event_broadcast'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("broadcast")
                .appendField(new Blockly.FieldTextInput("message1"), "MESSAGE");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(20);
        }
    };

    Blockly.Blocks['event_broadcastandwait'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("broadcast")
                .appendField(new Blockly.FieldTextInput("message1"), "MESSAGE")
                .appendField("and wait");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(20);
        }
    };

    // CONTROL
    Blockly.Blocks['control_wait'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("wait")
                .appendField(new Blockly.FieldNumber(1), "DURATION")
                .appendField("seconds");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(40); // Control Orange
        }
    };

    Blockly.Blocks['control_repeat'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("repeat")
                .appendField(new Blockly.FieldNumber(10), "TIMES");
            this.appendStatementInput("DO");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(40);
        }
    };

    Blockly.Blocks['control_forever'] = {
        init: function() {
            this.appendDummyInput().appendField("forever");
            this.appendStatementInput("DO");
            this.setPreviousStatement(true, null);
            this.setColour(40);
        }
    };

    Blockly.Blocks['control_if'] = {
        init: function() {
            this.appendValueInput("IF").setCheck("Boolean").appendField("if");
            this.appendStatementInput("DO").appendField("then");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(40);
        }
    };

    Blockly.Blocks['control_ifelse'] = {
        init: function() {
            this.appendValueInput("IF").setCheck("Boolean").appendField("if");
            this.appendStatementInput("DO").appendField("then");
            this.appendStatementInput("ELSE").appendField("else");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(40);
        }
    };

    Blockly.Blocks['control_waituntil'] = {
        init: function() {
            this.appendValueInput("CONDITION").setCheck("Boolean").appendField("wait until");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(40);
        }
    };

    Blockly.Blocks['control_repeatuntil'] = {
        init: function() {
            this.appendValueInput("CONDITION").setCheck("Boolean").appendField("repeat until");
            this.appendStatementInput("DO");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(40);
        }
    };

    Blockly.Blocks['control_stop'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("stop")
                .appendField(new Blockly.FieldDropdown([
                    ["all", "ALL"], 
                    ["this script", "THIS"], 
                    ["other scripts in sprite", "OTHERS"]
                ]), "TYPE");
            this.setPreviousStatement(true, null);
            this.setColour(40);
        }
    };

    Blockly.Blocks['control_start_as_clone'] = {
        init: function() {
            this.appendDummyInput().appendField("when I start as a clone");
            this.appendStatementInput("DO");
            this.setColour(40);
        }
    };

    Blockly.Blocks['control_create_clone_of'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("create clone of")
                .appendField(new Blockly.FieldDropdown([["myself", "MYSELF"]]), "TARGET");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(40);
        }
    };

    Blockly.Blocks['control_delete_this_clone'] = {
        init: function() {
            this.appendDummyInput().appendField("delete this clone");
            this.setPreviousStatement(true, null);
            this.setColour(40);
        }
    };

    // SENSING (Blueish Green)
    Blockly.Blocks['sensing_touching'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("touching")
                .appendField(new Blockly.FieldDropdown([
                    ["mouse-pointer", "MOUSE"], ["edge", "EDGE"]
                ]), "TARGET")
                .appendField("?");
            this.setOutput(true, "Boolean");
            this.setColour(190);
        }
    };

    Blockly.Blocks['sensing_touchingcolor'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("touching color")
                .appendField(new Blockly.FieldTextInput("#ff0000"), "COLOR")
                .appendField("?");
            this.setOutput(true, "Boolean");
            this.setColour(190);
        }
    };

    Blockly.Blocks['sensing_coloristouchingcolor'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("color")
                .appendField(new Blockly.FieldTextInput("#00ff00"), "COL1")
                .appendField("is touching")
                .appendField(new Blockly.FieldTextInput("#ff0000"), "COL2")
                .appendField("?");
            this.setOutput(true, "Boolean");
            this.setColour(190);
        }
    };

    Blockly.Blocks['sensing_distanceto'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("distance to")
                .appendField(new Blockly.FieldDropdown([["mouse-pointer", "MOUSE"]]), "TARGET");
            this.setOutput(true, "Number");
            this.setColour(190);
        }
    };

    Blockly.Blocks['sensing_askandwait'] = {
        init: function() {
            this.appendValueInput("QUESTION").appendField("ask");
            this.appendDummyInput().appendField("and wait");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(190);
        }
    };

    Blockly.Blocks['sensing_answer'] = {
        init: function() {
            this.appendDummyInput().appendField("answer");
            this.setOutput(true, "String");
            this.setColour(190);
        }
    };

    Blockly.Blocks['sensing_keypressed'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("key")
                .appendField(new Blockly.FieldDropdown([
                    ["space", "SPACE"], ["up arrow", "UP"], ["down arrow", "DOWN"], 
                    ["right arrow", "RIGHT"], ["left arrow", "LEFT"], ["any", "ANY"]
                ]), "KEY")
                .appendField("pressed?");
            this.setOutput(true, "Boolean");
            this.setColour(190);
        }
    };

    Blockly.Blocks['sensing_mousedown'] = {
        init: function() {
            this.appendDummyInput().appendField("mouse down?");
            this.setOutput(true, "Boolean");
            this.setColour(190);
        }
    };

    Blockly.Blocks['sensing_mousex'] = {
        init: function() {
            this.appendDummyInput().appendField("mouse x");
            this.setOutput(true, "Number");
            this.setColour(190);
        }
    };

    Blockly.Blocks['sensing_mousey'] = {
        init: function() {
            this.appendDummyInput().appendField("mouse y");
            this.setOutput(true, "Number");
            this.setColour(190);
        }
    };

    Blockly.Blocks['sensing_setdragmode'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("set drag mode")
                .appendField(new Blockly.FieldDropdown([["draggable", "DRAGGABLE"], ["not draggable", "NOT_DRAGGABLE"]]), "MODE");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(190);
        }
    };

    Blockly.Blocks['sensing_loudness'] = {
        init: function() {
            this.appendDummyInput().appendField("loudness");
            this.setOutput(true, "Number");
            this.setColour(190);
        }
    };

    Blockly.Blocks['sensing_timer'] = {
        init: function() {
            this.appendDummyInput().appendField("timer");
            this.setOutput(true, "Number");
            this.setColour(190);
        }
    };

    Blockly.Blocks['sensing_resettimer'] = {
        init: function() {
            this.appendDummyInput().appendField("reset timer");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(190);
        }
    };

    Blockly.Blocks['sensing_of'] = {
        init: function() {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([
                    ["backdrop #", "BACKDROP_NUM"], ["backdrop name", "BACKDROP_NAME"],
                    ["volume", "VOLUME"], ["my variable", "VAR"]
                ]), "PROPERTY")
                .appendField("of")
                .appendField(new Blockly.FieldDropdown([["Stage", "STAGE"], ["Sprite1", "SPRITE"]]), "OBJECT");
            this.setOutput(true, null);
            this.setColour(190);
        }
    };

    Blockly.Blocks['sensing_current'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("current")
                .appendField(new Blockly.FieldDropdown([
                    ["year", "YEAR"], ["month", "MONTH"], ["date", "DATE"], 
                    ["day of week", "DAYOFWEEK"], ["hour", "HOUR"], 
                    ["minute", "MINUTE"], ["second", "SECOND"]
                ]), "MENU");
            this.setOutput(true, "Number");
            this.setColour(190);
        }
    };

    Blockly.Blocks['sensing_dayssince2000'] = {
        init: function() {
            this.appendDummyInput().appendField("days since 2000");
            this.setOutput(true, "Number");
            this.setColour(190);
        }
    };

    Blockly.Blocks['sensing_username'] = {
        init: function() {
            this.appendDummyInput().appendField("username");
            this.setOutput(true, "String");
            this.setColour(190);
        }
    };

    // OPERATORS (Green)
    Blockly.Blocks['operator_add'] = {
        init: function() {
            this.appendValueInput("A").setCheck("Number");
            this.appendDummyInput().appendField("+");
            this.appendValueInput("B").setCheck("Number");
            this.setOutput(true, "Number");
            this.setColour(120);
        }
    };

    Blockly.Blocks['operator_subtract'] = {
        init: function() {
            this.appendValueInput("A").setCheck("Number");
            this.appendDummyInput().appendField("-");
            this.appendValueInput("B").setCheck("Number");
            this.setOutput(true, "Number");
            this.setColour(120);
        }
    };

    Blockly.Blocks['operator_multiply'] = {
        init: function() {
            this.appendValueInput("A").setCheck("Number");
            this.appendDummyInput().appendField("*");
            this.appendValueInput("B").setCheck("Number");
            this.setOutput(true, "Number");
            this.setColour(120);
        }
    };

    Blockly.Blocks['operator_divide'] = {
        init: function() {
            this.appendValueInput("A").setCheck("Number");
            this.appendDummyInput().appendField("/");
            this.appendValueInput("B").setCheck("Number");
            this.setOutput(true, "Number");
            this.setColour(120);
        }
    };

    Blockly.Blocks['operator_random'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("pick random")
                .appendField(new Blockly.FieldNumber(1), "FROM")
                .appendField("to")
                .appendField(new Blockly.FieldNumber(10), "TO");
            this.setOutput(true, "Number");
            this.setColour(120);
        }
    };

    Blockly.Blocks['operator_gt'] = {
        init: function() {
            this.appendValueInput("A").setCheck("Number");
            this.appendDummyInput().appendField(">");
            this.appendValueInput("B").setCheck("Number");
            this.setOutput(true, "Boolean");
            this.setColour(120);
        }
    };

    Blockly.Blocks['operator_lt'] = {
        init: function() {
            this.appendValueInput("A").setCheck("Number");
            this.appendDummyInput().appendField("<");
            this.appendValueInput("B").setCheck("Number");
            this.setOutput(true, "Boolean");
            this.setColour(120);
        }
    };

    Blockly.Blocks['operator_equals'] = {
        init: function() {
            this.appendValueInput("A").setCheck(null);
            this.appendDummyInput().appendField("=");
            this.appendValueInput("B").setCheck(null);
            this.setOutput(true, "Boolean");
            this.setColour(120);
        }
    };

    Blockly.Blocks['operator_and'] = {
        init: function() {
            this.appendValueInput("A").setCheck("Boolean");
            this.appendDummyInput().appendField("and");
            this.appendValueInput("B").setCheck("Boolean");
            this.setOutput(true, "Boolean");
            this.setColour(120);
        }
    };

    Blockly.Blocks['operator_or'] = {
        init: function() {
            this.appendValueInput("A").setCheck("Boolean");
            this.appendDummyInput().appendField("or");
            this.appendValueInput("B").setCheck("Boolean");
            this.setOutput(true, "Boolean");
            this.setColour(120);
        }
    };

    Blockly.Blocks['operator_not'] = {
        init: function() {
            this.appendValueInput("A").setCheck("Boolean").appendField("not");
            this.setOutput(true, "Boolean");
            this.setColour(120);
        }
    };

    Blockly.Blocks['operator_join'] = {
        init: function() {
            this.appendValueInput("A").appendField("join");
            this.appendValueInput("B");
            this.setOutput(true, "String");
            this.setColour(120);
        }
    };

    Blockly.Blocks['operator_letter_of'] = {
        init: function() {
            this.appendValueInput("LETTER").setCheck("Number").appendField("letter");
            this.appendValueInput("STRING").appendField("of");
            this.setOutput(true, "String");
            this.setColour(120);
        }
    };

    Blockly.Blocks['operator_length'] = {
        init: function() {
            this.appendValueInput("VALUE").appendField("length of");
            this.setOutput(true, "Number");
            this.setColour(120);
        }
    };

    Blockly.Blocks['operator_contains'] = {
        init: function() {
            this.appendValueInput("STRING").appendField("");
            this.appendValueInput("CONTAINS").appendField("contains");
            this.appendDummyInput().appendField("?");
            this.setOutput(true, "Boolean");
            this.setColour(120);
        }
    };

    Blockly.Blocks['operator_mod'] = {
        init: function() {
            this.appendValueInput("A").setCheck("Number");
            this.appendDummyInput().appendField("mod");
            this.appendValueInput("B").setCheck("Number");
            this.setOutput(true, "Number");
            this.setColour(120);
        }
    };

    Blockly.Blocks['operator_round'] = {
        init: function() {
            this.appendValueInput("NUM").setCheck("Number").appendField("round");
            this.setOutput(true, "Number");
            this.setColour(120);
        }
    };

    Blockly.Blocks['operator_mathop'] = {
        init: function() {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([
                    ["abs", "ABS"], ["floor", "FLOOR"], ["ceiling", "CEIL"], 
                    ["sqrt", "SQRT"], ["sin", "SIN"], ["cos", "COS"], ["tan", "TAN"], 
                    ["asin", "ASIN"], ["acos", "ACOS"], ["atan", "ATAN"], 
                    ["ln", "LN"], ["log", "LOG"], ["e ^", "EXP"], ["10 ^", "10EXP"]
                ]), "OPERATOR")
                .appendField("of");
            this.appendValueInput("NUM").setCheck("Number");
            this.setOutput(true, "Number");
            this.setColour(120);
        }
    };
};

const defineScratchGenerators = () => {
    javascriptGenerator.forBlock['motion_movesteps'] = (block: any) => {
        const steps = block.getFieldValue('STEPS');
        return `yield* sprite.moveSteps(${steps});\n`;
    };
    javascriptGenerator.forBlock['motion_turnright'] = (block: any) => {
        const degrees = block.getFieldValue('DEGREES');
        return `yield* sprite.turnRight(${degrees});\n`;
    };
    javascriptGenerator.forBlock['motion_turnleft'] = (block: any) => {
        const degrees = block.getFieldValue('DEGREES');
        return `yield* sprite.turnLeft(${degrees});\n`;
    };
    javascriptGenerator.forBlock['motion_gotoxy'] = (block: any) => {
        const x = block.getFieldValue('X');
        const y = block.getFieldValue('Y');
        return `yield* sprite.goTo(${x}, ${y});\n`;
    };
    javascriptGenerator.forBlock['motion_glideto'] = (block: any) => {
        const secs = block.getFieldValue('SECS');
        const x = block.getFieldValue('X');
        const y = block.getFieldValue('Y');
        return `yield* sprite.glide(${secs}, ${x}, ${y});\n`;
    };
    javascriptGenerator.forBlock['motion_pointindirection'] = (block: any) => {
        const dir = block.getFieldValue('DIRECTION');
        return `yield* sprite.pointInDirection(${dir});\n`;
    };
    javascriptGenerator.forBlock['motion_changexby'] = (block: any) => {
        const dx = block.getFieldValue('DX');
        return `yield* sprite.changeX(${dx});\n`;
    };
    javascriptGenerator.forBlock['motion_setx'] = (block: any) => {
        const x = block.getFieldValue('X');
        return `yield* sprite.setX(${x});\n`;
    };
    javascriptGenerator.forBlock['motion_changeyby'] = (block: any) => {
        const dy = block.getFieldValue('DY');
        return `yield* sprite.changeY(${dy});\n`;
    };
    javascriptGenerator.forBlock['motion_sety'] = (block: any) => {
        const y = block.getFieldValue('Y');
        return `yield* sprite.setY(${y});\n`;
    };
    javascriptGenerator.forBlock['motion_ifonedgebounce'] = () => {
        return `yield* sprite.ifOnEdgeBounce();\n`;
    };
    javascriptGenerator.forBlock['looks_say'] = (block: any) => {
        const msg = block.getFieldValue('MESSAGE');
        const secs = block.getFieldValue('SECS');
        return `yield* sprite.say("${msg}", ${secs});\n`;
    };
    javascriptGenerator.forBlock['looks_say_none'] = (block: any) => {
        const msg = block.getFieldValue('MESSAGE');
        return `yield* sprite.say("${msg}");\n`;
    };
    javascriptGenerator.forBlock['looks_think'] = (block: any) => {
        const msg = block.getFieldValue('MESSAGE');
        const secs = block.getFieldValue('SECS');
        return `yield* sprite.think("${msg}", ${secs});\n`;
    };
    javascriptGenerator.forBlock['looks_think_none'] = (block: any) => {
        const msg = block.getFieldValue('MESSAGE');
        return `yield* sprite.think("${msg}");\n`;
    };
    javascriptGenerator.forBlock['looks_changeeffectby'] = (block: any) => {
        const effect = block.getFieldValue('EFFECT');
        const change = block.getFieldValue('CHANGE');
        return `yield* sprite.changeEffect("${effect}", ${change});\n`;
    };
    javascriptGenerator.forBlock['looks_seteffectto'] = (block: any) => {
        const effect = block.getFieldValue('EFFECT');
        const val = block.getFieldValue('VALUE');
        return `yield* sprite.setEffect("${effect}", ${val});\n`;
    };
    javascriptGenerator.forBlock['looks_cleargraphiceffects'] = () => {
        return `yield* sprite.clearEffects();\n`;
    };
    javascriptGenerator.forBlock['looks_costumenumbername'] = (block: any) => {
        const type = block.getFieldValue('TYPE');
        return [`sprite.getCostume("${type}")`, Order.FUNCTION_CALL];
    };
    javascriptGenerator.forBlock['looks_backdropnumbername'] = (block: any) => {
        const type = block.getFieldValue('TYPE');
        return [`sprite.getBackdrop("${type}")`, Order.FUNCTION_CALL];
    };
    javascriptGenerator.forBlock['looks_size'] = () => {
        return [`sprite.getSize()`, Order.FUNCTION_CALL];
    };
    javascriptGenerator.forBlock['control_wait'] = (block: any) => {
        const duration = block.getFieldValue('DURATION');
        return `yield* sprite.wait(${duration});\n`;
    };
    javascriptGenerator.forBlock['control_repeat'] = (block: any) => {
        const repeats = block.getFieldValue('TIMES');
        const branch = javascriptGenerator.statementToCode(block, 'DO');
        return `for (let i = 0; i < ${repeats}; i++) {\n${branch} yield;\n}\n`;
    };
    javascriptGenerator.forBlock['control_forever'] = (block: any) => {
        const branch = javascriptGenerator.statementToCode(block, 'DO');
        return `while (true) {\n${branch} yield;\n}\n`;
    };
    javascriptGenerator.forBlock['control_if'] = (block: any) => {
        const cond = javascriptGenerator.valueToCode(block, 'IF', (javascriptGenerator as any).ORDER_ATOMIC) || 'false';
        const branch = javascriptGenerator.statementToCode(block, 'DO');
        return `if (${cond}) {\n${branch}}\n`;
    };
    javascriptGenerator.forBlock['control_ifelse'] = (block: any) => {
        const cond = javascriptGenerator.valueToCode(block, 'IF', (javascriptGenerator as any).ORDER_ATOMIC) || 'false';
        const branch = javascriptGenerator.statementToCode(block, 'DO');
        const elseBranch = javascriptGenerator.statementToCode(block, 'ELSE');
        return `if (${cond}) {\n${branch}} else {\n${elseBranch}}\n`;
    };

    javascriptGenerator.forBlock['control_waituntil'] = (block: any) => {
        const cond = javascriptGenerator.valueToCode(block, 'CONDITION', (javascriptGenerator as any).ORDER_ATOMIC) || 'false';
        return `while (!(${cond})) { yield; }\n`;
    };
    javascriptGenerator.forBlock['control_repeatuntil'] = (block: any) => {
        const cond = javascriptGenerator.valueToCode(block, 'CONDITION', (javascriptGenerator as any).ORDER_ATOMIC) || 'false';
        const branch = javascriptGenerator.statementToCode(block, 'DO');
        return `while (!(${cond})) {\n${branch} yield;\n}\n`;
    };
    javascriptGenerator.forBlock['control_stop'] = (block: any) => {
        const type = block.getFieldValue('TYPE');
        return `yield* sprite.stop("${type}");\n`;
    };
    javascriptGenerator.forBlock['control_start_as_clone'] = (block: any) => {
        const branch = javascriptGenerator.statementToCode(block, 'DO');
        return `yield* engine.registerHat("WHEN_I_START_AS_A_CLONE", function*() {\n${branch}\n});\n`;
    };
    javascriptGenerator.forBlock['control_create_clone_of'] = (block: any) => {
        const target = block.getFieldValue('TARGET');
        return `yield* sprite.createClone("${target}");\n`;
    };
    javascriptGenerator.forBlock['control_delete_this_clone'] = () => {
        return `yield* sprite.deleteClone();\n`;
    };
    
    // Generator for Operators
    javascriptGenerator.forBlock['operator_add'] = (block: any) => {
        const a = javascriptGenerator.valueToCode(block, 'A', Order.ATOMIC) || '0';
        const b = javascriptGenerator.valueToCode(block, 'B', Order.ATOMIC) || '0';
        return [`(Number(${a}) + Number(${b}))`, Order.ADDITION];
    };
    javascriptGenerator.forBlock['operator_subtract'] = (block: any) => {
        const a = javascriptGenerator.valueToCode(block, 'A', Order.ATOMIC) || '0';
        const b = javascriptGenerator.valueToCode(block, 'B', Order.ATOMIC) || '0';
        return [`(Number(${a}) - Number(${b}))`, Order.SUBTRACTION];
    };
    javascriptGenerator.forBlock['operator_multiply'] = (block: any) => {
        const a = javascriptGenerator.valueToCode(block, 'A', Order.ATOMIC) || '0';
        const b = javascriptGenerator.valueToCode(block, 'B', Order.ATOMIC) || '0';
        return [`(Number(${a}) * Number(${b}))`, Order.MULTIPLICATION];
    };
    javascriptGenerator.forBlock['operator_divide'] = (block: any) => {
        const a = javascriptGenerator.valueToCode(block, 'A', Order.ATOMIC) || '0';
        const b = javascriptGenerator.valueToCode(block, 'B', Order.ATOMIC) || '0';
        return [`(Number(${a}) / Number(${b}))`, Order.DIVISION];
    };
    javascriptGenerator.forBlock['operator_random'] = (block: any) => {
        const from = block.getFieldValue('FROM');
        const to = block.getFieldValue('TO');
        return [`(Math.floor(Math.random() * (${to} - ${from} + 1)) + ${from})`, Order.FUNCTION_CALL];
    };
    javascriptGenerator.forBlock['operator_gt'] = (block: any) => {
        const a = javascriptGenerator.valueToCode(block, 'A', Order.ATOMIC) || '0';
        const b = javascriptGenerator.valueToCode(block, 'B', Order.ATOMIC) || '0';
        return [`(Number(${a}) > Number(${b}))`, Order.RELATIONAL];
    };
    javascriptGenerator.forBlock['operator_lt'] = (block: any) => {
        const a = javascriptGenerator.valueToCode(block, 'A', Order.ATOMIC) || '0';
        const b = javascriptGenerator.valueToCode(block, 'B', Order.ATOMIC) || '0';
        return [`(Number(${a}) < Number(${b}))`, Order.RELATIONAL];
    };
    javascriptGenerator.forBlock['operator_equals'] = (block: any) => {
        const a = javascriptGenerator.valueToCode(block, 'A', Order.ATOMIC) || '0';
        const b = javascriptGenerator.valueToCode(block, 'B', Order.ATOMIC) || '0';
        return [`(${a} == ${b})`, Order.EQUALITY];
    };
    javascriptGenerator.forBlock['operator_and'] = (block: any) => {
        const a = javascriptGenerator.valueToCode(block, 'A', Order.LOGICAL_AND) || 'false';
        const b = javascriptGenerator.valueToCode(block, 'B', Order.LOGICAL_AND) || 'false';
        return [`(${a} && ${b})`, Order.LOGICAL_AND];
    };
    javascriptGenerator.forBlock['operator_or'] = (block: any) => {
        const a = javascriptGenerator.valueToCode(block, 'A', Order.LOGICAL_OR) || 'false';
        const b = javascriptGenerator.valueToCode(block, 'B', Order.LOGICAL_OR) || 'false';
        return [`(${a} || ${b})`, Order.LOGICAL_OR];
    };
    javascriptGenerator.forBlock['operator_not'] = (block: any) => {
        const a = javascriptGenerator.valueToCode(block, 'A', Order.LOGICAL_NOT) || 'false';
        return [`!${a}`, Order.LOGICAL_NOT];
    };

    javascriptGenerator.forBlock['operator_join'] = (block: any) => {
        const a = javascriptGenerator.valueToCode(block, 'A', Order.ATOMIC) || '""';
        const b = javascriptGenerator.valueToCode(block, 'B', Order.ATOMIC) || '""';
        return [`(String(${a}) + String(${b}))`, Order.ADDITION];
    };

    javascriptGenerator.forBlock['operator_letter_of'] = (block: any) => {
        const letter = javascriptGenerator.valueToCode(block, 'LETTER', Order.ATOMIC) || '1';
        const str = javascriptGenerator.valueToCode(block, 'STRING', Order.ATOMIC) || '""';
        return [`String(${str})[Number(${letter}) - 1]`, Order.MEMBER];
    };

    javascriptGenerator.forBlock['operator_length'] = (block: any) => {
        const val = javascriptGenerator.valueToCode(block, 'VALUE', Order.ATOMIC) || '""';
        return [`String(${val}).length`, Order.MEMBER];
    };

    javascriptGenerator.forBlock['operator_contains'] = (block: any) => {
        const str = javascriptGenerator.valueToCode(block, 'STRING', Order.ATOMIC) || '""';
        const contains = javascriptGenerator.valueToCode(block, 'CONTAINS', Order.ATOMIC) || '""';
        return [`String(${str}).includes(String(${contains}))`, Order.FUNCTION_CALL];
    };

    javascriptGenerator.forBlock['operator_mod'] = (block: any) => {
        const a = javascriptGenerator.valueToCode(block, 'A', Order.ATOMIC) || '0';
        const b = javascriptGenerator.valueToCode(block, 'B', Order.ATOMIC) || '0';
        return [`(Number(${a}) % Number(${b}))`, Order.MODULUS];
    };

    javascriptGenerator.forBlock['operator_round'] = (block: any) => {
        const num = javascriptGenerator.valueToCode(block, 'NUM', Order.ATOMIC) || '0';
        return [`Math.round(Number(${num}))`, Order.FUNCTION_CALL];
    };

    javascriptGenerator.forBlock['operator_mathop'] = (block: any) => {
        const op = block.getFieldValue('OPERATOR');
        const num = javascriptGenerator.valueToCode(block, 'NUM', Order.ATOMIC) || '0';
        let code = '';
        switch (op) {
            case 'ABS': code = `Math.abs(Number(${num}))`; break;
            case 'FLOOR': code = `Math.floor(Number(${num}))`; break;
            case 'CEIL': code = `Math.ceil(Number(${num}))`; break;
            case 'SQRT': code = `Math.sqrt(Number(${num}))`; break;
            case 'SIN': code = `Math.sin(Number(${num}) * Math.PI / 180)`; break;
            case 'COS': code = `Math.cos(Number(${num}) * Math.PI / 180)`; break;
            case 'TAN': code = `Math.tan(Number(${num}) * Math.PI / 180)`; break;
            case 'ASIN': code = `Math.asin(Number(${num})) * 180 / Math.PI`; break;
            case 'ACOS': code = `Math.acos(Number(${num})) * 180 / Math.PI`; break;
            case 'ATAN': code = `Math.atan(Number(${num})) * 180 / Math.PI`; break;
            case 'LN': code = `Math.log(Number(${num}))`; break;
            case 'LOG': code = `Math.log10(Number(${num}))`; break;
            case 'EXP': code = `Math.exp(Number(${num}))`; break;
            case '10EXP': code = `Math.pow(10, Number(${num}))`; break;
        }
        return [code, Order.FUNCTION_CALL];
    };
    
    // Sensing Generators
    javascriptGenerator.forBlock['sensing_touching'] = (block: any) => {
        const target = block.getFieldValue('TARGET');
        return [`sprite.isTouching("${target}")`, Order.FUNCTION_CALL];
    };
    javascriptGenerator.forBlock['sensing_touchingcolor'] = (block: any) => {
        const col = block.getFieldValue('COLOR');
        return [`sprite.isTouchingColor("${col}")`, Order.FUNCTION_CALL];
    };
    javascriptGenerator.forBlock['sensing_coloristouchingcolor'] = (block: any) => {
        const col1 = block.getFieldValue('COL1');
        const col2 = block.getFieldValue('COL2');
        return [`sprite.colorIsTouchingColor("${col1}", "${col2}")`, Order.FUNCTION_CALL];
    };
    javascriptGenerator.forBlock['sensing_distanceto'] = (block: any) => {
        const target = block.getFieldValue('TARGET');
        return [`sprite.getDistanceTo("${target}")`, Order.FUNCTION_CALL];
    };
    javascriptGenerator.forBlock['sensing_askandwait'] = (block: any) => {
        const question = javascriptGenerator.valueToCode(block, 'QUESTION', Order.ATOMIC) || '""';
        return `yield* sprite.ask(${question});\n`;
    };
    javascriptGenerator.forBlock['sensing_answer'] = () => {
        return [`sprite.getAnswer()`, Order.FUNCTION_CALL];
    };
    javascriptGenerator.forBlock['sensing_keypressed'] = (block: any) => {
        const key = block.getFieldValue('KEY');
        return [`sprite.isKeyPressed("${key}")`, Order.FUNCTION_CALL];
    };
    javascriptGenerator.forBlock['sensing_mousedown'] = () => {
        return [`sprite.isMouseDown()`, Order.FUNCTION_CALL];
    };
    javascriptGenerator.forBlock['sensing_mousex'] = () => {
        return [`sprite.getMouseX()`, Order.FUNCTION_CALL];
    };
    javascriptGenerator.forBlock['sensing_mousey'] = () => {
        return [`sprite.getMouseY()`, Order.FUNCTION_CALL];
    };
    javascriptGenerator.forBlock['sensing_setdragmode'] = (block: any) => {
        const mode = block.getFieldValue('MODE');
        return `sprite.setDragMode("${mode}");\n`;
    };
    javascriptGenerator.forBlock['sensing_loudness'] = () => {
        return [`0`, Order.ATOMIC];
    };
    javascriptGenerator.forBlock['sensing_timer'] = () => {
        return [`sprite.getTimer()`, Order.FUNCTION_CALL];
    };
    javascriptGenerator.forBlock['sensing_resettimer'] = () => {
        return `sprite.resetTimer();\n`;
    };
    javascriptGenerator.forBlock['sensing_current'] = (block: any) => {
        const menu = block.getFieldValue('MENU');
        return [`sprite.getCurrentTime("${menu}")`, Order.FUNCTION_CALL];
    };
    javascriptGenerator.forBlock['sensing_dayssince2000'] = () => {
        return [`sprite.getDaysSince2000()`, Order.FUNCTION_CALL];
    };
    javascriptGenerator.forBlock['sensing_username'] = () => {
        return [`"ScratchUser"`, Order.ATOMIC];
    };
    javascriptGenerator.forBlock['sensing_of'] = (block: any) => {
        const prop = block.getFieldValue('PROPERTY');
        const obj = block.getFieldValue('OBJECT');
        return [`sprite.getPropertyOf("${prop}", "${obj}")`, Order.FUNCTION_CALL];
    };
    javascriptGenerator.forBlock['event_whenflagclicked'] = (block: any) => {
        const branch = javascriptGenerator.statementToCode(block, 'DO'); 
        return `yield* engine.registerHat("WHEN_FLAG_CLICKED", function*() {\n${branch}\n});\n`;
    };
    javascriptGenerator.forBlock['event_whenkeypressed'] = (block: any) => {
        const key = block.getFieldValue('KEY');
        const branch = javascriptGenerator.statementToCode(block, 'DO');
        return `yield* engine.registerHat("WHEN_KEY_PRESSED_${key}", function*() {\n${branch}\n});\n`;
    };
    javascriptGenerator.forBlock['event_whenspriteclicked'] = (block: any) => {
        const branch = javascriptGenerator.statementToCode(block, 'DO');
        return `yield* engine.registerHat("WHEN_SPRITE_CLICKED", function*() {\n${branch}\n});\n`;
    };
    javascriptGenerator.forBlock['event_whenbroadcastreceived'] = (block: any) => {
        const msg = block.getFieldValue('MESSAGE');
        const branch = javascriptGenerator.statementToCode(block, 'DO');
        return `yield* engine.registerHat("BROADCAST_${msg}", function*() {\n${branch}\n});\n`;
    };
    javascriptGenerator.forBlock['event_broadcast'] = (block: any) => {
        const msg = block.getFieldValue('MESSAGE');
        return `yield* sprite.broadcast("${msg}");\n`;
    };
    javascriptGenerator.forBlock['event_broadcastandwait'] = (block: any) => {
        const msg = block.getFieldValue('MESSAGE');
        return `yield* sprite.broadcastAndWait("${msg}");\n`;
    };
};

// --- COMPONENT ---

const ScratchPad: React.FC = () => {
    const blocklyDivRef = useRef<HTMLDivElement>(null);
    const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Sprite State
    const spriteRef = useRef({
        x: 0, 
        y: 0, 
        dir: 90, // Scratch uses 90 = right
        size: 100,
        colorHue: 0,
        effects: {
            color: 0,
            fisheye: 0,
            whirl: 0,
            pixelate: 0,
            mosaic: 0,
            brightness: 0,
            ghost: 0
        },
        visible: true,
        bubbleText: null as string | null,
        bubbleType: 'say' as 'say' | 'think',
        bubbleTimer: 0
    });

    const [isPlaying, setIsPlaying] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // Track mouse on canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            // Convert to Scratch coordinates (-240 to 240, -180 to 180)
            const x = (e.clientX - rect.left - rect.width/2);
            const y = -(e.clientY - rect.top - rect.height/2);
            setMousePos({ x, y });
        };
        const handleMouseDown = (e: MouseEvent) => {
            if (!isPlaying) return;
            const rect = canvas.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width/2);
            const y = -(e.clientY - rect.top - rect.height/2);
            
            // Basic Hitbox Check
            const dist = Math.sqrt(Math.pow(spriteRef.current.x - x, 2) + Math.pow(spriteRef.current.y - y, 2));
            if (dist < 30 * (spriteRef.current.size/100)) {
                triggerEvent("WHEN_SPRITE_CLICKED");
            }
        };
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mousedown', handleMouseDown);
        return () => {
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mousedown', handleMouseDown);
        };
    }, []);

    // Animation Loop
    useEffect(() => {
        let animId: number;
        
        const render = () => {
             const canvas = canvasRef.current;
             if (!canvas) return;
             const ctx = canvas.getContext('2d');
             if (!ctx) return;

             // Clear Stage (Dark background)
             const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
             gradient.addColorStop(0, '#1e293b');
             gradient.addColorStop(1, '#0f172a');
             ctx.fillStyle = gradient;
             ctx.fillRect(0, 0, canvas.width, canvas.height);

             // Draw Grid (Darker)
             ctx.strokeStyle = '#334155';
             ctx.lineWidth = 1;
             ctx.beginPath();
             for(let x=0; x<canvas.width; x+=48) { ctx.moveTo(x,0); ctx.lineTo(x,canvas.height); }
             for(let y=0; y<canvas.height; y+=36) { ctx.moveTo(0,y); ctx.lineTo(0,canvas.width); }
             ctx.stroke();

             // Transform Coordinates to Center (0,0 is center in Scratch)
             ctx.save();
             ctx.translate(canvas.width/2, canvas.height/2);
             
             // Draw Sprite Instances (Original + Clones)
             const allSprites = [spriteRef.current, ...Array.from(clonesRef.current)];
             
             allSprites.forEach(s => {
                if (s.visible) {
                    ctx.save();
                    ctx.translate(s.x, -s.y); 
                    ctx.rotate((s.dir - 90) * Math.PI / 180); 
                    ctx.scale(s.size/100, s.size/100);

                    // Draw Actor
                    ctx.fillStyle = `hsl(${s.colorHue}, 100%, 50%)`; 
                    if (s.colorHue === 0) ctx.fillStyle = '#ffab1a'; 
                    
                    ctx.beginPath(); ctx.ellipse(0, 0, 20, 15, 0, 0, Math.PI*2); ctx.fill();
                    ctx.beginPath(); ctx.arc(0, -15, 12, 0, Math.PI*2); ctx.fill();
                    ctx.beginPath(); ctx.moveTo(-8, -22); ctx.lineTo(-12, -30); ctx.lineTo(-4, -25); ctx.fill();
                    ctx.beginPath(); ctx.moveTo(8, -22); ctx.lineTo(12, -30); ctx.lineTo(4, -25); ctx.fill();
                    ctx.strokeStyle = ctx.fillStyle; ctx.lineWidth = 4; ctx.lineCap = 'round';
                    ctx.beginPath(); ctx.moveTo(-18, 5); ctx.quadraticCurveTo(-30, 0, -35, -10); ctx.stroke();
                    
                    ctx.restore(); 

                    // Speech Bubble
                    if (s.bubbleText) {
                        const bx = s.x + 30;
                        const by = -s.y - 40;
                        ctx.fillStyle = 'white'; ctx.strokeStyle = '#333'; ctx.lineWidth = 2;
                        if (s.bubbleType === 'say') {
                            ctx.beginPath(); ctx.roundRect(bx, by, 100, 40, 10); ctx.stroke(); ctx.fill();
                            ctx.beginPath(); ctx.moveTo(bx, by+20); ctx.lineTo(bx-10, by+30); ctx.lineTo(bx+10, by+35); ctx.fill();
                        } else {
                            ctx.beginPath(); ctx.roundRect(bx, by, 100, 40, 20); ctx.stroke(); ctx.fill();
                            ctx.beginPath(); ctx.arc(bx-5, by+35, 6, 0, Math.PI*2); ctx.fill(); ctx.stroke();
                            ctx.beginPath(); ctx.arc(bx-15, by+45, 4, 0, Math.PI*2); ctx.fill(); ctx.stroke();
                        }
                        ctx.fillStyle = '#000'; ctx.font = '12px Inter, sans-serif';
                        ctx.fillText(s.bubbleText, bx+10, by+25, 80);
                    }
                }
             });

             ctx.restore(); // Undo Center Transform

             animId = requestAnimationFrame(render);
        };
        
        render();
        return () => cancelAnimationFrame(animId);
    }, []);

    useEffect(() => {
        if (!blocklyDivRef.current) return;

        defineScratchBlocks();
        defineScratchGenerators();

        const toolbox = {
            kind: 'categoryToolbox',
            contents: [
                {
                    kind: 'category',
                    name: 'Motion',
                    colour: '225',
                    contents: [
                        { kind: 'block', type: 'motion_movesteps' },
                        { kind: 'block', type: 'motion_turnright' },
                        { kind: 'block', type: 'motion_turnleft' },
                        { kind: 'block', type: 'motion_gotoxy' },
                        { kind: 'block', type: 'motion_glideto' },
                        { kind: 'block', type: 'motion_pointindirection' },
                        { kind: 'block', type: 'motion_changexby' },
                        { kind: 'block', type: 'motion_setx' },
                        { kind: 'block', type: 'motion_changeyby' },
                        { kind: 'block', type: 'motion_sety' },
                        { kind: 'block', type: 'motion_ifonedgebounce' }
                    ]
                },
                {
                    kind: 'category',
                    name: 'Looks',
                    colour: '260',
                    contents: [
                        { kind: 'block', type: 'looks_say' },
                        { kind: 'block', type: 'looks_say_none' },
                        { kind: 'block', type: 'looks_think' },
                        { kind: 'block', type: 'looks_think_none' },
                        { kind: 'block', type: 'looks_changeeffectby' },
                        { kind: 'block', type: 'looks_seteffectto' },
                        { kind: 'block', type: 'looks_cleargraphiceffects' },
                        { kind: 'block', type: 'looks_changesizeby' },
                        { kind: 'block', type: 'looks_setsizeto' },
                        { kind: 'block', type: 'looks_show' },
                        { kind: 'block', type: 'looks_hide' },
                        { kind: 'block', type: 'looks_costumenumbername' },
                        { kind: 'block', type: 'looks_backdropnumbername' },
                        { kind: 'block', type: 'looks_size' }
                    ]
                },
                {
                    kind: 'category',
                    name: 'Events',
                    colour: '20',
                    contents: [
                        { kind: 'block', type: 'event_whenflagclicked' },
                        { kind: 'block', type: 'event_whenkeypressed' },
                        { kind: 'block', type: 'event_whenspriteclicked' },
                        { kind: 'block', type: 'event_whenbroadcastreceived' },
                        { kind: 'block', type: 'event_broadcast' },
                        { kind: 'block', type: 'event_broadcastandwait' }
                    ]
                },
                {
                    kind: 'category',
                    name: 'Control',
                    colour: '40',
                    contents: [
                        { kind: 'block', type: 'control_wait' },
                        { kind: 'block', type: 'control_repeat' },
                        { kind: 'block', type: 'control_forever' },
                        { kind: 'block', type: 'control_if' },
                        { kind: 'block', type: 'control_ifelse' },
                        { kind: 'block', type: 'control_waituntil' },
                        { kind: 'block', type: 'control_repeatuntil' },
                        { kind: 'block', type: 'control_stop' },
                        { kind: 'block', type: 'control_start_as_clone' },
                        { kind: 'block', type: 'control_create_clone_of' },
                        { kind: 'block', type: 'control_delete_this_clone' }
                    ]
                },
                {
                    kind: 'category',
                    name: 'Sensing',
                    colour: '190',
                    contents: [
                        { kind: 'block', type: 'sensing_touching' },
                        { kind: 'block', type: 'sensing_touchingcolor' },
                        { kind: 'block', type: 'sensing_coloristouchingcolor' },
                        { kind: 'block', type: 'sensing_distanceto' },
                        { kind: 'block', type: 'sensing_askandwait' },
                        { kind: 'block', type: 'sensing_answer' },
                        { kind: 'block', type: 'sensing_keypressed' },
                        { kind: 'block', type: 'sensing_mousedown' },
                        { kind: 'block', type: 'sensing_mousex' },
                        { kind: 'block', type: 'sensing_mousey' },
                        { kind: 'block', type: 'sensing_setdragmode' },
                        { kind: 'block', type: 'sensing_loudness' },
                        { kind: 'block', type: 'sensing_timer' },
                        { kind: 'block', type: 'sensing_resettimer' },
                        { kind: 'block', type: 'sensing_of' },
                        { kind: 'block', type: 'sensing_current' },
                        { kind: 'block', type: 'sensing_dayssince2000' },
                        { kind: 'block', type: 'sensing_username' }
                    ]
                },
                {
                    kind: 'category',
                    name: 'Operators',
                    colour: '120',
                    contents: [
                        { kind: 'block', type: 'operator_add' },
                        { kind: 'block', type: 'operator_subtract' },
                        { kind: 'block', type: 'operator_multiply' },
                        { kind: 'block', type: 'operator_divide' },
                        { kind: 'block', type: 'operator_random' },
                        { kind: 'block', type: 'operator_gt' },
                        { kind: 'block', type: 'operator_lt' },
                        { kind: 'block', type: 'operator_equals' },
                        { kind: 'block', type: 'operator_and' },
                        { kind: 'block', type: 'operator_or' },
                        { kind: 'block', type: 'operator_not' },
                        { kind: 'block', type: 'operator_join' },
                        { kind: 'block', type: 'operator_letter_of' },
                        { kind: 'block', type: 'operator_length' },
                        { kind: 'block', type: 'operator_contains' },
                        { kind: 'block', type: 'operator_mod' },
                        { kind: 'block', type: 'operator_round' },
                        { kind: 'block', type: 'operator_mathop' }
                    ]
                }
            ]
        };

        if (!workspaceRef.current) {
            workspaceRef.current = Blockly.inject(blocklyDivRef.current, {
                toolbox,
                zoom: { controls: true, wheel: true, startScale: 0.75 },
                renderer: 'zelos',
                grid: { spacing: 25, length: 3, colour: '#ccc', snap: true }
            });
            
            // Initial Block
            const initialXml = `<xml><block type="event_whenflagclicked" x="50" y="50"></block></xml>`;
            Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(initialXml), workspaceRef.current!);
        }
        
        const handleResize = () => {
            if (workspaceRef.current) Blockly.svgResize(workspaceRef.current);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // --- EXECUTION ENGINE ---
    
    const threadsRef = useRef<Set<{ gen: Generator, target: any, id: string }>>(new Set());
    const eventHandlersRef = useRef<Map<string, ((s: any) => Generator)[]>>(new Map());
    const clonesRef = useRef<Set<any>>(new Set());
    const currentThreadRef = useRef<any>(null);

    // Engine States for Sensing
    const mousePosRef = useRef({ x: 0, y: 0 });
    const isMouseDownRef = useRef(false);
    const keysPressedRef = useRef<Set<string>>(new Set());
    const timerStartRef = useRef(Date.now());
    const answerRef = useRef("");
    const dragModeRef = useRef<"DRAGGABLE" | "NOT_DRAGGABLE">("NOT_DRAGGABLE");

    // Main Execution Loop (Engine Ticks)
    useEffect(() => {
        let timer: any;
        const tick = () => {
            if (isPlaying) {
                const threads = Array.from(threadsRef.current);
                for (const thread of threads) {
                    currentThreadRef.current = thread;
                    try {
                        const result = thread.gen.next();
                        if (result.done) {
                            threadsRef.current.delete(thread);
                        }
                    } catch (e) {
                        if (e === "STOP_THIS_SCRIPT") {
                            threadsRef.current.delete(thread);
                        } else {
                            console.error("Thread Error:", e);
                            threadsRef.current.delete(thread);
                        }
                    }
                }
                currentThreadRef.current = null;
            }
            timer = setTimeout(tick, 1000/30);
        };
        tick();
        return () => clearTimeout(timer);
    }, [isPlaying]);

    // Keyboard & Mouse Listeners
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isPlaying) return;
            const key = e.key.toUpperCase();
            keysPressedRef.current.add(key === ' ' ? 'SPACE' : key);
            triggerEvent(`WHEN_KEY_PRESSED_${key === ' ' ? 'SPACE' : key}`);
            triggerEvent("WHEN_KEY_PRESSED_ANY");
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            const key = e.key.toUpperCase();
            keysPressedRef.current.delete(key === ' ' ? 'SPACE' : key);
        };
        const handleMouseMove = (e: MouseEvent) => {
            if (!canvasRef.current) return;
            const rect = canvasRef.current.getBoundingClientRect();
            // Convert to Scratch coordinates (-240 to 240, -180 to 180)
            const x = e.clientX - rect.left - rect.width / 2;
            const y = -(e.clientY - rect.top - rect.height / 2);
            mousePosRef.current = { x, y };
        };
        const handleMouseDown = () => { isMouseDownRef.current = true; };
        const handleMouseUp = () => { isMouseDownRef.current = false; };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isPlaying]);

    const triggerEvent = (eventName: string, target?: any) => {
        const handlers = eventHandlersRef.current.get(eventName);
        if (!handlers) return;

        const targets = target ? [target] : [spriteRef.current, ...Array.from(clonesRef.current)];
        
        targets.forEach(t => {
            const api = createSpriteApi(t);
            handlers.forEach(h => {
                threadsRef.current.add({ 
                    gen: h(api), 
                    target: t,
                    id: Math.random().toString(36).substr(2, 9)
                });
            });
        });
    };

    const createSpriteApi = (targetSprite: any) => ({
        moveSteps: function*(steps: number) {
            const rad = (targetSprite.dir - 90) * (Math.PI / 180);
            const dx = Math.cos(rad) * steps;
            const dy = Math.sin(rad) * steps;
            const frames = 10;
            for(let i=0; i<frames; i++) {
                targetSprite.x += dx/frames;
                targetSprite.y -= dy/frames;
                yield;
            }
        },
        turnRight: function*(deg: number) {
            const frames = 5;
            for(let i=0; i<frames; i++) {
                targetSprite.dir += deg/frames;
                yield;
            }
        },
        turnLeft: function*(deg: number) {
            const frames = 5;
            for(let i=0; i<frames; i++) {
                targetSprite.dir -= deg/frames;
                yield;
            }
        },
        goTo: function*(x: number, y: number) {
            targetSprite.x = x;
            targetSprite.y = y;
            yield;
        },
        changeX: function*(dx: number) {
            targetSprite.x += dx;
            yield;
        },
        setX: function*(x: number) {
            targetSprite.x = x;
            yield;
        },
        changeY: function*(dy: number) {
            targetSprite.y += dy;
            yield;
        },
        setY: function*(y: number) {
            targetSprite.y = y;
            yield;
        },
        pointInDirection: function*(dir: number) {
            targetSprite.dir = dir;
            yield;
        },
        glide: function*(secs: number, tx: number, ty: number) {
            const startX = targetSprite.x;
            const startY = targetSprite.y;
            const totalFrames = secs * 30;
            for(let i=1; i<=totalFrames; i++) {
                targetSprite.x = startX + (tx - startX) * (i/totalFrames);
                targetSprite.y = startY + (ty - startY) * (i/totalFrames);
                yield;
            }
        },
        ifOnEdgeBounce: function*() {
            const halfW = 240;
            const halfH = 180;
            if (Math.abs(targetSprite.x) > halfW) {
                targetSprite.dir = 360 - targetSprite.dir;
                targetSprite.x = targetSprite.x > 0 ? halfW : -halfW;
            }
            if (Math.abs(targetSprite.y) > halfH) {
                targetSprite.dir = 180 - targetSprite.dir;
                targetSprite.y = targetSprite.y > 0 ? halfH : -halfH;
            }
            yield;
        },
        say: function*(text: string, secs?: number) {
            targetSprite.bubbleText = text;
            targetSprite.bubbleType = 'say';
            if (secs === undefined) return;
            const frames = secs * 30;
            for(let i=0; i<frames; i++) yield;
            targetSprite.bubbleText = null;
        },
        think: function*(text: string, secs?: number) {
            targetSprite.bubbleText = text;
            targetSprite.bubbleType = 'think';
            if (secs === undefined) return;
            const frames = secs * 30;
            for(let i=0; i<frames; i++) yield;
            targetSprite.bubbleText = null;
        },
        show: function*() { targetSprite.visible = true; yield; },
        hide: function*() { targetSprite.visible = false; yield; },
        changeSize: function*(val: number) { targetSprite.size += val; yield; },
        setSize: function*(val: number) { targetSprite.size = val; yield; },
        changeEffect: function*(effect: string, val: number) {
            const key = effect.toLowerCase() as keyof typeof targetSprite.effects;
            if (key === 'color') targetSprite.colorHue += val;
            else (targetSprite.effects as any)[key] += val;
            yield;
        },
        setEffect: function*(effect: string, val: number) {
            const key = effect.toLowerCase() as keyof typeof targetSprite.effects;
            if (key === 'color') targetSprite.colorHue = val;
            else (targetSprite.effects as any)[key] = val;
            yield;
        },
        clearEffects: function*() {
            targetSprite.colorHue = 0;
            Object.keys(targetSprite.effects).forEach(k => {
                (targetSprite.effects as any)[k] = 0;
            });
            yield;
        },
        getCostume: (type: string) => type === 'NUMBER' ? 1 : 'costume1',
        getBackdrop: (type: string) => type === 'NUMBER' ? 1 : 'backdrop1',
        getSize: () => targetSprite.size,
        wait: function*(secs: number) {
            const frames = secs * 30;
            for(let i=0; i<frames; i++) yield;
        },
        isTouchingMouse: () => {
            const m = mousePosRef.current;
            const dist = Math.sqrt(Math.pow(targetSprite.x - m.x, 2) + Math.pow(targetSprite.y - m.y, 2));
            return dist < 20 * (targetSprite.size / 100);
        },
        isTouching: (target: string) => {
            if (target === 'MOUSE') {
                const m = mousePosRef.current;
                const dist = Math.sqrt(Math.pow(targetSprite.x - m.x, 2) + Math.pow(targetSprite.y - m.y, 2));
                return dist < 25 * (targetSprite.size / 100);
            }
            if (target === 'EDGE') {
                return Math.abs(targetSprite.x) > 230 || Math.abs(targetSprite.y) > 170;
            }
            return false;
        },
        isTouchingColor: (col: string) => {
            // Simplified: true if close to center and color hue matches roughly? 
            // In a real engine we'd check canvas pixels. 
            // For now, return false to avoid errors, or implement a hack.
            return false;
        },
        colorIsTouchingColor: (c1: string, c2: string) => false,
        getDistanceTo: (target: string) => {
            if (target === 'MOUSE') {
                const m = mousePosRef.current;
                return Math.sqrt(Math.pow(targetSprite.x - m.x, 2) + Math.pow(targetSprite.y - m.y, 2));
            }
            return 0;
        },
        ask: function*(question: string) {
            const ans = window.prompt(question);
            if (ans !== null) answerRef.current = ans;
            yield;
        },
        getAnswer: () => answerRef.current,
        isKeyPressed: (key: string) => {
            if (key === 'ANY') return keysPressedRef.current.size > 0;
            return keysPressedRef.current.has(key);
        },
        isMouseDown: () => isMouseDownRef.current,
        getMouseX: () => mousePosRef.current.x,
        getMouseY: () => mousePosRef.current.y,
        setDragMode: (mode: string) => {
            dragModeRef.current = mode as any;
        },
        getTimer: () => (Date.now() - timerStartRef.current) / 1000,
        resetTimer: () => { timerStartRef.current = Date.now(); },
        getCurrentTime: (menu: string) => {
            const d = new Date();
            switch (menu) {
                case 'YEAR': return d.getFullYear();
                case 'MONTH': return d.getMonth() + 1;
                case 'DATE': return d.getDate();
                case 'DAYOFWEEK': return d.getDay() + 1;
                case 'HOUR': return d.getHours();
                case 'MINUTE': return d.getMinutes();
                case 'SECOND': return d.getSeconds();
                default: return 0;
            }
        },
        getDaysSince2000: () => {
            const msPerDay = 24 * 60 * 60 * 1000;
            const start = new Date(2000, 0, 1);
            return (Date.now() - start.getTime()) / msPerDay;
        },
        getPropertyOf: (prop: string, obj: string) => {
            if (obj === 'STAGE') {
                if (prop === 'BACKDROP_NUM') return 1;
                if (prop === 'BACKDROP_NAME') return 'backdrop1';
            }
            if (prop === 'X_POS') return targetSprite.x;
            if (prop === 'Y_POS') return targetSprite.y;
            return 0;
        },
        broadcast: function*(msg: string) {
            triggerEvent(`BROADCAST_${msg}`);
            yield;
        },
        broadcastAndWait: function*(msg: string) {
            const eventName = `BROADCAST_${msg}`;
            const handlers = eventHandlersRef.current.get(eventName) || [];
            const activeThreads: any[] = [];
            
            const targets = [spriteRef.current, ...Array.from(clonesRef.current)];
            targets.forEach(t => {
                const api = createSpriteApi(t);
                handlers.forEach(h => {
                    const thread = { gen: h(api), target: t, id: Math.random().toString() };
                    threadsRef.current.add(thread);
                    activeThreads.push(thread);
                });
            });

            while (activeThreads.some(t => threadsRef.current.has(t))) {
                yield;
            }
        },
        stop: function*(type: string) {
            if (type === 'ALL') {
                threadsRef.current.clear();
                setIsPlaying(false);
            } else if (type === 'THIS') {
                throw "STOP_THIS_SCRIPT";
            } else if (type === 'OTHERS') {
                const current = currentThreadRef.current;
                for (const t of threadsRef.current) {
                    if (t.target === targetSprite && t !== current) {
                        threadsRef.current.delete(t);
                    }
                }
            }
            yield;
        },
        createClone: function*(target: string) {
            if (target === 'MYSELF') {
                const newClone = JSON.parse(JSON.stringify(targetSprite));
                // Ensure clones don't copy specific ID or bubble timers if any
                clonesRef.current.add(newClone);
                triggerEvent("WHEN_I_START_AS_A_CLONE", newClone);
            }
            yield;
        },
        deleteClone: function*() {
            if (clonesRef.current.has(targetSprite)) {
                clonesRef.current.delete(targetSprite);
                // Also stop all threads for this clone
                for (const t of threadsRef.current) {
                    if (t.target === targetSprite) {
                        threadsRef.current.delete(t);
                    }
                }
            }
            yield;
        }
    });

    const runCode = async () => {
        if (isPlaying) return;
        
        // Reset state
        threadsRef.current.clear();
        eventHandlersRef.current.clear();
        clonesRef.current.clear();
        timerStartRef.current = Date.now();
        answerRef.current = "";
        setIsPlaying(true);
        
        const code = javascriptGenerator.workspaceToCode(workspaceRef.current!);
        
        const engine = {
            registerHat: function*(eventName: string, handler: (s: any) => Generator) {
                const existing = eventHandlersRef.current.get(eventName) || [];
                eventHandlersRef.current.set(eventName, [...existing, handler]);
                yield;
            }
        };

        // Standard Scratch behavior: The registration code runs once.
        // It registers closures that take 'sprite' as an argument.
        try {
            const wrappedCode = `
                return (function*() {
                    ${code}
                })();
            `;
            // We pass global sprite/engine just to collect registrations
            // The generators for hats look like: yield* engine.registerHat("NAME", function*(sprite) { ... })
            const runFn = new Function('sprite', 'engine', wrappedCode);
            const registrationGen = runFn({}, engine);
            
            for (const _ of registrationGen) { /* no-op */ }

            triggerEvent("WHEN_FLAG_CLICKED");
            
        } catch (e) {
            console.error(e);
            toast.error("Execution Error");
            setIsPlaying(false);
        }
    };

    const handleStop = () => {
        setIsPlaying(false);
        threadsRef.current.clear();
        spriteRef.current.bubbleText = null;
        toast("Stopped", { icon: '🛑' });
    };

    const [isStageVisible, setIsStageVisible] = useState(true);

    const toggleStage = () => {
        setIsStageVisible(!isStageVisible);
        // Timeout to allow transition to finish before resizing blockly
        setTimeout(() => {
            if (workspaceRef.current) Blockly.svgResize(workspaceRef.current);
        }, 300);
    };

    return (
        <div className="flex h-full w-full bg-slate-950 font-sans text-slate-200">
            {/* LEFT: STAGE & PREVIEW */}
            <div 
                className={`${isStageVisible ? 'w-[480px] border-r' : 'w-0 overflow-hidden border-none'} flex flex-col border-slate-800 bg-slate-900 transition-all duration-300 ease-in-out relative`}
            >
                <div className="bg-slate-900 p-2 flex justify-between items-center border-b border-slate-800 min-w-[480px]">
                    <div className="flex space-x-2">
                        <button 
                            onClick={runCode}
                            disabled={isPlaying}
                            className="w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-white shadow-sm transition-transform active:scale-95 disabled:opacity-50">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </button>
                        <button 
                            onClick={handleStop}
                            className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white shadow-sm transition-transform active:scale-95">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h12v12H6z"/></svg>
                        </button>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="font-bold text-slate-500 text-xs uppercase tracking-widest">Creative Lab</span>
                        <button 
                            onClick={toggleStage}
                            className="text-slate-500 hover:text-white transition-colors"
                            title="Hide Stage"
                        >
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                        </button>
                    </div>
                </div>
                
                <div className="p-4 bg-slate-950 flex justify-center items-center min-w-[480px]">
                    <div className="relative border-4 border-slate-800 rounded-lg overflow-hidden shadow-2xl bg-slate-900">
                        <canvas 
                            ref={canvasRef} 
                            width={480} 
                            height={360} 
                            className="bg-slate-900"
                        />
                         <div className="absolute top-2 right-2 flex flex-col gap-1 pointer-events-none">
                            <span className="bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur font-mono">x: {Math.round(spriteRef.current.x)} y: {Math.round(spriteRef.current.y)}</span>
                            <span className="bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur font-mono">dir: {Math.round(spriteRef.current.dir)}°</span>
                         </div>
                    </div>
                </div>

                <div className="flex-1 p-4 bg-slate-900 border-t border-slate-800 overflow-y-auto min-w-[480px]">
                    <h3 className="text-xs font-bold text-slate-500 uppercase mb-2">Sprite Properties</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-800 p-2 rounded border border-slate-700">
                            <label className="text-[10px] font-bold text-slate-500 block">Sprite Name</label>
                            <span className="text-sm font-bold text-slate-200">Cat Actor</span>
                        </div>
                        <div className="flex gap-2">
                             <div className="bg-slate-800 p-2 rounded border border-slate-700 flex-1">
                                <label className="text-[10px] font-bold text-slate-500 block">X</label>
                                <input type="number" className="w-full bg-transparent text-sm font-bold text-slate-200 outline-none" 
                                    defaultValue={0} 
                                    onChange={(e) => spriteRef.current.x = Number(e.target.value)}
                                />
                             </div>
                             <div className="bg-slate-800 p-2 rounded border border-slate-700 flex-1">
                                <label className="text-[10px] font-bold text-slate-500 block">Y</label>
                                <input type="number" className="w-full bg-transparent text-sm font-bold text-slate-200 outline-none" 
                                    defaultValue={0}
                                    onChange={(e) => spriteRef.current.y = Number(e.target.value)} 
                                />
                             </div>
                        </div>
                         <div className="flex gap-2">
                             <div className="bg-slate-800 p-2 rounded border border-slate-700 flex-1">
                                <label className="text-[10px] font-bold text-slate-500 block">Size</label>
                                <input type="number" className="w-full bg-transparent text-sm font-bold text-slate-200 outline-none" 
                                    defaultValue={100} 
                                    onChange={(e) => spriteRef.current.size = Number(e.target.value)}
                                />
                             </div>
                             <div className="bg-slate-800 p-2 rounded border border-slate-700 flex-1">
                                <label className="text-[10px] font-bold text-slate-500 block">Direction</label>
                                <input type="number" className="w-full bg-transparent text-sm font-bold text-slate-200 outline-none" 
                                    defaultValue={90}
                                    onChange={(e) => spriteRef.current.dir = Number(e.target.value)} 
                                />
                             </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT: BLOCKLY WORKSPACE */}
            <div className="flex-1 flex flex-col relative bg-slate-950">
                 {!isStageVisible && (
                    <button 
                        onClick={toggleStage}
                        className="absolute top-4 right-4 z-10 bg-slate-800 text-white p-2 rounded-full shadow-lg hover:bg-slate-700 transition-colors"
                        title="Show Stage"
                    >
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                )}
                <div ref={blocklyDivRef} className="absolute inset-0" />
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .blocklyToolboxDiv { background-color: #0f172a !important; border-right: 1px solid #1e293b; }
                .blocklyTreeLabel { font-family: 'Inter', sans-serif; font-weight: 600; font-size: 12px; color: #94a3b8; }
                .blocklyTreeSelected { background-color: #1e293b !important; border-left: 3px solid #3b82f6; }
                .blocklyTreeSelected .blocklyTreeLabel { color: #f8fafc; }
                .blocklyFlyoutBackground { fill: #1e293b !important; fill-opacity: 0.9 !important; }
                .blocklyMainBackground { stroke: none !important; fill: #020617 !important; }
                .blocklyScrollbarHandle { fill: #334155 !important; }
            `}} />
        </div>
    );
};

export default ScratchPad;
