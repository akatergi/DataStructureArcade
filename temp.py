def strSort(s):
    L = [c for c in s]
    L.sort()
    return ''.join(L)


def isTransformable(s, t):
    n = len(s)

    if n != len(t):
        return False
    if s == t:
        return True

    for i in range(n):
        for j in range(i+1, n+1):
            sub = t[i:j+1]
            s2 = strSort(sub)
            print(s[0:i], ",", s2, ",", s[j:n-1])
            # if(s2[0:i]+s2+s2[j+1:n] == s):
            #     return True

    return False


print(isTransformable("123", "132"))
