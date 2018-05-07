import React from 'react';

const GameControls = ({calcAverage, resetCards, prevQuestion, nextQuestion}) => (
    <div className="buttons__options">
        <div className="buttons__option-block buttons__option-block_flip">
            <button className="buttons__item" onClick={calcAverage} >
                <svg version="1.1" className="buttons__icon-flip" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 49.499 49.499" style={{enableBackground:"new 0 0 49.499 49.499"}} xmlSpace="preserve" width="10px" height="10px">
                <g>
                    <path style={{fill:"#ffffff"}} d="M8.143,10.804C7.473,11.682,7,11.842,7,11.099V9.751c0-1.933-1.567-3.5-3.5-3.5S0,7.818,0,9.751v12
                        c0,1.933,1.567,3.5,3.5,3.5h12c1.933,0,3.5-1.567,3.5-3.5s-1.567-3.5-3.5-3.5c0,0-0.579,0-1.294,0s-0.916-0.817-0.31-1.74
                        c2.752-4.187,7.47-6.795,12.569-6.795c8.29,0,15.034,6.744,15.034,15.034c0,8.289-6.744,15.033-15.034,15.033c-2.209,0-4,1.791-4,4
                        s1.791,4,4,4c12.701,0.001,23.034-10.332,23.034-23.032c0-12.701-10.333-23.034-23.034-23.034
                        C19.204,1.716,12.445,5.167,8.143,10.804z"/>
                </g>
                </svg>
                <span className="buttons__text-flip">Flip cards</span>
            </button>
        </div>
        <div className="buttons__option-block buttons__option-block_previous">
            <button className="buttons__item" onClick={prevQuestion} >
                <svg className="buttons__icon-previous" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 492 492" style={{enableBackground:"new 0 0 492 492"}} xmlSpace="preserve">
                    <g>
                        <path d="M464.344,207.418l0.768,0.168H135.888l103.496-103.724c5.068-5.064,7.848-11.924,7.848-19.124    c0-7.2-2.78-14.012-7.848-19.088L223.28,49.538c-5.064-5.064-11.812-7.864-19.008-7.864c-7.2,0-13.952,2.78-19.016,7.844    L7.844,226.914C2.76,231.998-0.02,238.77,0,245.974c-0.02,7.244,2.76,14.02,7.844,19.096l177.412,177.412    c5.064,5.06,11.812,7.844,19.016,7.844c7.196,0,13.944-2.788,19.008-7.844l16.104-16.112c5.068-5.056,7.848-11.808,7.848-19.008    c0-7.196-2.78-13.592-7.848-18.652L134.72,284.406h329.992c14.828,0,27.288-12.78,27.288-27.6v-22.788    C492,219.198,479.172,207.418,464.344,207.418z" fill="#FFFFFF"/>
                    </g>
                </svg>
                <span className="buttons__text-previous">Previous question</span>
            </button>
        </div>
        <div className="buttons__option-block buttons__option-block_reset">
            <button className="buttons__item" onClick={resetCards} >
                <svg version="1.1" className="buttons__icon-reset" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 49.499 49.499" style={{enableBackground:"new 0 0 49.499 49.499"}} xmlSpace="preserve" width="10px" height="10px">
                <g>
                    <path style={{fill:"#ffffff"}} d="M8.143,10.804C7.473,11.682,7,11.842,7,11.099V9.751c0-1.933-1.567-3.5-3.5-3.5S0,7.818,0,9.751v12
                        c0,1.933,1.567,3.5,3.5,3.5h12c1.933,0,3.5-1.567,3.5-3.5s-1.567-3.5-3.5-3.5c0,0-0.579,0-1.294,0s-0.916-0.817-0.31-1.74
                        c2.752-4.187,7.47-6.795,12.569-6.795c8.29,0,15.034,6.744,15.034,15.034c0,8.289-6.744,15.033-15.034,15.033c-2.209,0-4,1.791-4,4
                        s1.791,4,4,4c12.701,0.001,23.034-10.332,23.034-23.032c0-12.701-10.333-23.034-23.034-23.034
                        C19.204,1.716,12.445,5.167,8.143,10.804z"/>
                </g>
                </svg>
                <span className="buttons__text-reset">Reset cards</span>
            </button>
        </div>
        <div className="buttons__option-block buttons__option-block_next">
            <button className="buttons__item" onClick={nextQuestion} >
                <svg className="buttons__icon-next" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 492.004 492.004" style={{enableBackground:"new 0 0 492.004 492.004"}} xmlSpace="preserve">
                    <g>
                        <path d="M484.14,226.886L306.46,49.202c-5.072-5.072-11.832-7.856-19.04-7.856c-7.216,0-13.972,2.788-19.044,7.856l-16.132,16.136    c-5.068,5.064-7.86,11.828-7.86,19.04c0,7.208,2.792,14.2,7.86,19.264L355.9,207.526H26.58C11.732,207.526,0,219.15,0,234.002    v22.812c0,14.852,11.732,27.648,26.58,27.648h330.496L252.248,388.926c-5.068,5.072-7.86,11.652-7.86,18.864    c0,7.204,2.792,13.88,7.86,18.948l16.132,16.084c5.072,5.072,11.828,7.836,19.044,7.836c7.208,0,13.968-2.8,19.04-7.872    l177.68-177.68c5.084-5.088,7.88-11.88,7.86-19.1C492.02,238.762,489.228,231.966,484.14,226.886z" fill="#FFFFFF"/>
                    </g>
                </svg>
                <span className="buttons__text-next">Next question</span>
            </button>
        </div>
    </div>
)
export default GameControls;
