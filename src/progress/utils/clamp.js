/**
 * Created by AlexLiu on 11/15/15.
 */

export default (n, min, max) => {
    if(n < min){
        return min;
    }else if(n > max){
        return max;
    }else {
        return n;
    }
}