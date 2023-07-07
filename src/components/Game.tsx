import React, { useEffect, useState } from 'react';
import styles from './styles/game.module.css';

class Game extends React.Component<{}, {
    position: { x: number }; 
    ballPosition: {x : number, y : number, touched : boolean}; 
    ballDirection: {x : number, y : number};
    game : {score : number, gameIsEnded : boolean};
}> {

    constructor(props : any){
        super(props);
        this.state = {
            position: { x: 200 },
            ballPosition: {x : 250, y : 200, touched : false},
            ballDirection: {x : 0, y: -1},
            game : {score : 0, gameIsEnded : false}
        };

        this.newGame = this.newGame.bind(this);
    }

    handleMouseMove = (event : any) => {
        var bounds = event.target.getBoundingClientRect();
        var coordX = event.clientX - bounds.left;
        if(coordX >= 5 && coordX <= 395){
            this.setState({ position: { x: coordX }});
        }
        
    };
    
    componentDidMount() {
        setInterval(() => {
            this.moveBall();
        }, 1);
        
        document.title = "ping-pong"
    }

    moveBall(){
        const x = this.state.ballPosition.x;
        const y = this.state.ballPosition.y;
        const currentDirectionX = this.state.ballDirection.x;
        const currentDirectionY = this.state.ballDirection.y;

        const min = -1
        const max = 1
        const rand = min + Math.random() * (max - min);

        if(y <= 0){
            this.setState({ ballDirection: {x : rand, y: 1}});
        }else if(y >= 660 && x >= this.state.position.x && x <= this.state.position.x + 100 ){
            if(currentDirectionX > 0){
                this.setState({ ballDirection: {x : 1, y: -1}});
            }if(currentDirectionX < 0){
                this.setState({ ballDirection: {x : -1, y: -1}});
            }

            if(this.state.ballPosition.touched === false){
                this.state.game.score++
                this.state.ballPosition.touched = true
            }
            
            this.moveDirection(this.state.ballDirection.x , this.state.ballDirection.y, true);
            return

        }else if(y >= 690 ){
            this.setState({ ballDirection: {x : 0, y: 0}});
            this.state.game.gameIsEnded = true;
        }else if(x <= 0){

            if(currentDirectionY > 0){
                this.setState({ ballDirection: {x : 1, y: 1}});
            }if(currentDirectionY < 0){
                this.setState({ ballDirection: {x : 1, y: -1}});
            }

        }else if(x >= 490){
            if(currentDirectionY > 0){
                this.setState({ ballDirection: {x : -1, y: 1}});
            }if(currentDirectionY < 0){
                this.setState({ ballDirection: {x : -1, y: -1}});
            }
        }

        this.moveDirection(this.state.ballDirection.x , this.state.ballDirection.y, false);
    }

    moveDirection(coordX : number, coordY : number, updateTouched : boolean){
        const newX = this.state.ballPosition.x + coordX;
        const newY = this.state.ballPosition.y + coordY;
        this.setState({ ballPosition: { x: newX, y: newY , touched : updateTouched}});
    }

    newGame(){
        this.setState({ 
            position: { x: 200 },
            ballPosition: {x : 250, y : 200, touched : false},
            ballDirection: {x : 0, y: -1},
            game : {score : 0, gameIsEnded : false}
        });
    }

    render(): React.ReactNode {
        return (
            <>
                <div  className={styles.restartMenu} 
                    style={{
                        visibility: `${this.state.game.gameIsEnded ? 'visible' : 'hidden'}`
                    }}
                    >
                    <p onClick={this.newGame} style={{cursor: 'pointer', left : '2rem'}}>R</p> 
                    <p style={{left : '7rem'}}>{this.state.game.score}</p></div>

                <div className={styles.gameUI} 
                    onMouseMove={this.handleMouseMove}
                    style={{pointerEvents: `${this.state.game.gameIsEnded ? 'none' : 'auto'}`}}
                 >
                    
                    <p className={styles.bgScore}
                        style={{visibility: `${this.state.game.gameIsEnded ? 'hidden' : 'visible'}`}}
                    >{this.state.game.score}</p>

                    
                    
                    <div className={styles.player}
                        style={{
                            height: '10px',
                            width: '100px',
                            border: '1px solid black',
                            borderRadius: '15px',
                            backgroundColor: 'black',
                            left:`${this.state.position.x}px`,
                            top:`670px`,
                            position: 'absolute',
                            pointerEvents: 'none' 
                        }} 
                    />
    
                    <div className={styles.ball}
                        style={{
                            height: '10px',
                            width: '10px',
                            border: '1px solid black',
                            borderRadius: '15px',
                            backgroundColor: 'black',
                            left:`${this.state.ballPosition.x}px`,
                            top:`${this.state.ballPosition.y}px`,
                            position: 'absolute',
                            pointerEvents:'none'
                        }} 
                    />
            </div>
            </>
            
        );
    }
    
}

export default Game;

