# Open the file and read it
with open("input.txt", "r") as file:
    coords = {x + 1j * y: c for y, r in enumerate(file) for x, c in enumerate(r.strip())}

g = lambda c: coords.get(c, "")

s1 = s2 = 0
for c in coords:
    for d in [1, 1j, 1+1j, 1-1j, -1, -1j, -1+1j, -1-1j]:
        s1 += g(c) + g(c + d) + g(c + d * 2) + g(c + d * 3) == "XMAS"
        if d.imag and d.real:
            s2 += g(c + d) + g(c) + g(c - d) == "MAS" and g(c + d * 1j) + g(c - d * 1j) == "MS"

print(s1, s2, sep="\n")

with open("output.txt", "w") as file:
    file.write(f"XMAS Sum is: {s1}\nMAS Sum is: {s2}")