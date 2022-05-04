function createFlower() {
    const rotateSpace = 1.5;
    const petalCount = Math.random() <= 0.5 ? 12 : 16;
    const isOdd = Math.random() <= 0.5;
    const realPetalCount = isOdd ? petalCount - 1 : petalCount;
    const halfPetalCount = Math.ceil(petalCount / 2);
    let currentRotate = (halfPetalCount - 1) * rotateSpace;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < halfPetalCount; i++) {
        const petalLeftEl = document.createElement('div');
        petalLeftEl.setAttribute('class', `petal petal_${i+1}`);
        petalLeftEl.setAttribute('style', `top: -40px;left:-43px;border-radius:0px 30px 0px 30px;transform: rotate(-${currentRotate}deg);z-index: ${i+1}`);
        fragment.appendChild(petalLeftEl);
        if (i !== 0 || !isOdd) {
            const petalRightEl = document.createElement('div');
            petalRightEl.setAttribute('class', `petal petal_${petalCount-i}`);
            petalRightEl.setAttribute('style', `top: -40px;right:-43px;border-radius:30px 0px 30px 0px;transform: rotate(${currentRotate}deg);z-index: ${i+1}`);
            fragment.appendChild(petalRightEl);
        }
        currentRotate -= rotateSpace;
    }

    document.querySelector('.random-petal').appendChild(fragment);
    // document.querySelector('.flower-box').setAttribute('style', 'display:block;');

    let deadPetalNum = 1;
    let restRetalNum = realPetalCount;
    let answerText = 'YES';
    document.querySelector('.petal-scope').addEventListener('click', () => {
        if (restRetalNum === -1) return;
        let deadPetalEl;
        if (restRetalNum === 0) {
            deadPetalEl = document.querySelector(`.petal_0`);
        } else {
            deadPetalEl = document.querySelector(`.petal_${deadPetalNum}`);
        }
        if (deadPetalEl) {
            let styleStr = '';
            if (restRetalNum === 0) {
                styleStr = `top:200px;left:-80px;transform:rotate(-90deg);opacity:0;`;
            } else if (deadPetalNum <= halfPetalCount) {
                styleStr = `top:200px;left:-100px;border-radius:0px 30px 0px 30px;transform:rotate(-90deg);opacity:0;`;
            } else {
                styleStr = `top:200px;right:-100px;border-radius:30px 0px 30px 0px;transform:rotate(90deg);opacity:0;`;
            }
            deadPetalEl.setAttribute('style', styleStr);

            if (isOdd) {
                if (deadPetalNum <= halfPetalCount) {
                    if (deadPetalNum === 1) {
                        deadPetalNum = 2;
                    } else {
                        deadPetalNum = realPetalCount + 2 - deadPetalNum;
                    }
                } else {
                    deadPetalNum = realPetalCount + 3 - deadPetalNum;
                }
            } else {
                if (deadPetalNum <= halfPetalCount) {
                    deadPetalNum = realPetalCount + 1 - deadPetalNum;
                } else {
                    deadPetalNum = realPetalCount + 2 - deadPetalNum;
                }
            }
            restRetalNum--;
            document.querySelector('.answer').innerHTML = answerText;
            answerText = answerText === 'YES' ? 'NO' : 'YES';
        }
    });
}


 window.onload = function() {
            document.querySelector('.qa-enter').addEventListener('click', function(e) {
                const flowerEl = document.querySelector('.flower-box');
                if (flowerEl) {
                    document.querySelector('.body').removeChild(flowerEl);
                }
                const inputValue = document.querySelector('.qa-inputer').value;
                if (!inputValue) return;
                const newFlower = document.createElement('div');
                    newFlower.setAttribute('class', 'flower-box');
                    newFlower.innerHTML = `
                        <div class="flower">
                            <div class="flower-body" id="flower-body">
                                <div class="rhizome"></div>
                                <div class="leaf_1"></div>
                                <div class="leaf_2"></div>
                                <div class="stamen"></div>
                                <div class="thorn thorn_1"></div>
                                <div class="thorn thorn_2"></div>
                                <div class="thorn thorn_3"></div>
                                <div class="thorn thorn_4"></div>
                                <div class="petal petal_0"></div>
                                <div class="petal-scope"></div>
                                <div class="random-petal"></div>
                            </div>
                        </div>
                    `;

                document.querySelector('.body').appendChild(newFlower);

                createFlower();
            });
        }
