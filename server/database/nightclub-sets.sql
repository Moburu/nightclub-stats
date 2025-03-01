--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2025-02-22 14:29:16

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 25370)
-- Name: set; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.set (
    id integer,
    tournament character varying(200),
    p1_tag character varying(100),
    p2_tag character varying(100),
    p1_score integer,
    p2_score integer,
    winner_tag character varying(100)
);


ALTER TABLE public.set OWNER TO postgres;

--
-- TOC entry 4776 (class 0 OID 25370)
-- Dependencies: 215
-- Data for Name: set; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.set (id, tournament, p1_tag, p2_tag, p1_score, p2_score, winner_tag) FROM stdin;
0	the-nightclub-s10e11-os-nyc	E-tie	Gl!tch	2	3	Gl!tch
1	the-nightclub-s10e11-os-nyc	Gl!tch	E-tie	2	3	E-tie
2	the-nightclub-s10e11-os-nyc	K8A	KingNut	2	0	K8A
3	the-nightclub-s10e11-os-nyc	Daniel	On0ghoho	2	0	Daniel
4	the-nightclub-s10e11-os-nyc	shitted on u :D	YokaiNels	1	2	YokaiNels
5	the-nightclub-s10e11-os-nyc	E-tie	Gl!tch	3	0	E-tie
6	the-nightclub-s10e11-os-nyc	E-tie	WRAP	2	0	E-tie
7	the-nightclub-s10e11-os-nyc	Gl!tch	Jib	2	1	Gl!tch
8	the-nightclub-s10e11-os-nyc	Luu	karol	2	0	Luu
9	the-nightclub-s10e11-os-nyc	Freezus	MichaelTheFresh	2	1	Freezus
10	the-nightclub-s10e11-os-nyc	Abe	Jango UU	2	0	Abe
11	the-nightclub-s10e11-os-nyc	karol	B9	1	2	B9
12	the-nightclub-s10e11-os-nyc	WRAP	Dark Egg	2	0	WRAP
13	the-nightclub-s10e11-os-nyc	Jango UU	LittleCoaks	2	1	Jango UU
14	the-nightclub-s10e11-os-nyc	KingNut	codeman	0	2	codeman
15	the-nightclub-s10e11-os-nyc	MichaelTheFresh	a horse who can drive	2	1	MichaelTheFresh
16	the-nightclub-s10e11-os-nyc	Jib	Breakfast	1	2	Breakfast
17	the-nightclub-s10e11-os-nyc	shitted on u :D	Jintendo	2	1	shitted on u :D
18	the-nightclub-s10e11-os-nyc	On0ghoho	Nathan	1	2	Nathan
19	the-nightclub-s10e11-os-nyc	Gl!tch	Daniel	3	0	Gl!tch
20	the-nightclub-s10e11-os-nyc	B9	EclipseW	2	0	B9
21	the-nightclub-s10e11-os-nyc	Combusting	Dark Egg	0	2	Dark Egg
22	the-nightclub-s10e11-os-nyc	codeman	set!	2	1	codeman
23	the-nightclub-s10e11-os-nyc	LittleCoaks	JetFall	2	0	LittleCoaks
24	the-nightclub-s10e11-os-nyc	a horse who can drive	beandy	2	0	a horse who can drive
25	the-nightclub-s10e11-os-nyc	Breakfast	Mackee	2	0	Breakfast
26	the-nightclub-s10e11-os-nyc	DrJwns	Jintendo	1	2	Jintendo
27	the-nightclub-s10e11-os-nyc	Nathan	Dasher	2	0	Nathan
28	the-nightclub-s10e11-os-nyc	Freezus	Daniel	2	3	Daniel
29	the-nightclub-s10e11-os-nyc	E-tie	Freezus	3	1	E-tie
30	the-nightclub-s10e11-os-nyc	Gl!tch	Daniel	3	2	Gl!tch
31	the-nightclub-s10e11-os-nyc	E-tie	beandy	2	0	E-tie
32	the-nightclub-s10e11-os-nyc	Gl!tch	Triple C	2	0	Gl!tch
33	the-nightclub-s10e11-os-nyc	WRAP	a horse who can drive	2	0	WRAP
34	the-nightclub-s10e11-os-nyc	Luu	Spritznok	2	0	Luu
35	the-nightclub-s10e11-os-nyc	Jib	Nathan	2	1	Jib
36	the-nightclub-s10e11-os-nyc	codeman	karol	0	2	karol
37	the-nightclub-s10e11-os-nyc	Abe	Jintendo	2	0	Abe
38	the-nightclub-s10e11-os-nyc	Jango UU	DrJwns	2	1	Jango UU
39	the-nightclub-s10e11-os-nyc	Freezus	Mister	2	0	Freezus
40	the-nightclub-s10e11-os-nyc	Daniel	Mackee	2	0	Daniel
41	the-nightclub-s10e11-os-nyc	MichaelTheFresh	Combusting	2	0	MichaelTheFresh
42	the-nightclub-s10e11-os-nyc	On0ghoho	Breakfast	2	1	On0ghoho
43	the-nightclub-s10e11-os-nyc	K8A	EclipseW	2	0	K8A
44	the-nightclub-s10e11-os-nyc	KingNut	B9	2	0	KingNut
45	the-nightclub-s10e11-os-nyc	shitted on u :D	JetFall	2	0	shitted on u :D
46	the-nightclub-s10e11-os-nyc	YokaiNels	LittleCoaks	2	0	YokaiNels
47	the-nightclub-s10e11-os-nyc	B9	Emp	2	0	B9
48	the-nightclub-s10e11-os-nyc	EclipseW	Pingas	2	0	EclipseW
49	the-nightclub-s10e11-os-nyc	Combusting	Anna	2	0	Combusting
50	the-nightclub-s10e11-os-nyc	LittleCoaks	Wombat	2	1	LittleCoaks
51	the-nightclub-s10e11-os-nyc	Mister	Dark Egg	1	2	Dark Egg
52	the-nightclub-s10e11-os-nyc	JetFall	mugsy	2	1	JetFall
53	the-nightclub-s10e11-os-nyc	Breakfast	DR.COCKTOPUS	2	0	Breakfast
54	the-nightclub-s10e11-os-nyc	codeman	sherbs	2	0	codeman
55	the-nightclub-s10e11-os-nyc	Mackee	CarVac	2	0	Mackee
56	the-nightclub-s10e11-os-nyc	Spritznok	set!	0	2	set!
57	the-nightclub-s10e11-os-nyc	a horse who can drive	jame	2	0	a horse who can drive
58	the-nightclub-s10e11-os-nyc	DrJwns	signifier	2	0	DrJwns
59	the-nightclub-s10e11-os-nyc	beandy	Karlwithak	2	0	beandy
60	the-nightclub-s10e11-os-nyc	Jintendo	SaltyFun	2	0	Jintendo
61	the-nightclub-s10e11-os-nyc	Nathan	hannah	2	0	Nathan
62	the-nightclub-s10e11-os-nyc	Triple C	Dasher	0	2	Dasher
63	the-nightclub-s10e11-os-nyc	Freezus	Abe	3	1	Freezus
64	the-nightclub-s10e11-os-nyc	Daniel	K8A	3	1	Daniel
65	the-nightclub-s10e11-os-nyc	HipInferno	Pingas	0	2	Pingas
66	the-nightclub-s10e11-os-nyc	Tony Montana	Wombat	0	2	Wombat
67	the-nightclub-s10e11-os-nyc	squilpy	Anna	0	2	Anna
68	the-nightclub-s10e11-os-nyc	Trent	Dark Egg	0	2	Dark Egg
69	the-nightclub-s10e11-os-nyc	sherbs	enby tom hardy	2	0	sherbs
70	the-nightclub-s10e11-os-nyc	LegalNodus	DR.COCKTOPUS	0	2	DR.COCKTOPUS
71	the-nightclub-s10e11-os-nyc	Brick	CarVac	1	2	CarVac
72	the-nightclub-s10e11-os-nyc	AllOfHer	set!	0	2	set!
73	the-nightclub-s10e11-os-nyc	bad dog no biscuit	jame	0	2	jame
74	the-nightclub-s10e11-os-nyc	SaltyFun	austin	2	1	SaltyFun
75	the-nightclub-s10e11-os-nyc	babygirl	Karlwithak	0	2	Karlwithak
76	the-nightclub-s10e11-os-nyc	MaCo	hannah	0	2	hannah
77	the-nightclub-s10e11-os-nyc	Special K	Dasher	0	2	Dasher
78	the-nightclub-s10e11-os-nyc	WRAP	Abe	0	3	Abe
79	the-nightclub-s10e11-os-nyc	K8A	Luu	3	2	K8A
80	the-nightclub-s10e11-os-nyc	Emp	beandy	1	2	beandy
81	the-nightclub-s10e11-os-nyc	E-tie	Luu	2	0	E-tie
82	the-nightclub-s10e11-os-nyc	Gl!tch	Tony Montana	2	0	Gl!tch
83	the-nightclub-s10e11-os-nyc	Triple C	Wombat	2	1	Triple C
84	the-nightclub-s10e11-os-nyc	WRAP	HipInferno	2	0	WRAP
85	the-nightclub-s10e11-os-nyc	Freezus	K8A	2	0	Freezus
86	the-nightclub-s10e11-os-nyc	Gl!tch	Abe	2	0	Gl!tch
87	the-nightclub-s10e11-os-nyc	a horse who can drive	Pingas	2	0	a horse who can drive
88	the-nightclub-s10e11-os-nyc	Jib	mugsy	2	0	Jib
89	the-nightclub-s10e11-os-nyc	Daniel	YokaiNels	2	1	Daniel
90	the-nightclub-s10e11-os-nyc	Luu	squilpy	2	0	Luu
91	the-nightclub-s10e11-os-nyc	Abe	LegalNodus	2	0	Abe
92	the-nightclub-s10e11-os-nyc	Spritznok	Anna	2	0	Spritznok
93	the-nightclub-s10e11-os-nyc	codeman	Trent	2	0	codeman
94	the-nightclub-s10e11-os-nyc	Jintendo	DR.COCKTOPUS	2	0	Jintendo
95	the-nightclub-s10e11-os-nyc	Jango UU	Brick	2	0	Jango UU
96	the-nightclub-s10e11-os-nyc	karol	Dark Egg	2	0	karol
97	the-nightclub-s10e11-os-nyc	DrJwns	CarVac	2	0	DrJwns
98	the-nightclub-s10e11-os-nyc	Freezus	sherbs	2	0	Freezus
99	the-nightclub-s10e11-os-nyc	Mister	enby tom hardy	2	1	Mister
100	the-nightclub-s10e11-os-nyc	Daniel	signifier	2	0	Daniel
101	the-nightclub-s10e11-os-nyc	MichaelTheFresh	AllOfHer	2	0	MichaelTheFresh
102	the-nightclub-s10e11-os-nyc	set!	Combusting	0	2	Combusting
103	the-nightclub-s10e11-os-nyc	On0ghoho	SaltyFun	2	0	On0ghoho
104	the-nightclub-s10e11-os-nyc	K8A	bad dog no biscuit	2	0	K8A
105	the-nightclub-s10e11-os-nyc	Breakfast	austin	2	0	Breakfast
106	the-nightclub-s10e11-os-nyc	shitted on u :D	MaCo	2	0	shitted on u :D
107	the-nightclub-s10e11-os-nyc	jame	EclipseW	0	2	EclipseW
108	the-nightclub-s10e11-os-nyc	KingNut	babygirl	2	0	KingNut
109	the-nightclub-s10e11-os-nyc	JetFall	hannah	2	1	JetFall
110	the-nightclub-s10e11-os-nyc	B9	Karlwithak	2	0	B9
111	the-nightclub-s10e11-os-nyc	YokaiNels	Special K	2	0	YokaiNels
112	the-nightclub-s10e11-os-nyc	LittleCoaks	Dasher	2	1	LittleCoaks
113	the-nightclub-s10e11-os-nyc	YokaiNels	WRAP	0	2	WRAP
114	the-nightclub-s10e11-os-nyc	Abe	MichaelTheFresh	2	1	Abe
115	the-nightclub-s10e11-os-nyc	K8A	Jango UU	2	0	K8A
116	the-nightclub-s10e11-os-nyc	Luu	shitted on u :D	2	0	Luu
117	the-nightclub-s10e11-os-nyc	WRAP	B9	2	0	WRAP
118	the-nightclub-s10e11-os-nyc	MichaelTheFresh	codeman	2	1	MichaelTheFresh
119	the-nightclub-s10e11-os-nyc	Breakfast	Jango UU	1	2	Jango UU
120	the-nightclub-s10e11-os-nyc	Nathan	shitted on u :D	0	2	shitted on u :D
\.


--
-- TOC entry 4782 (class 0 OID 0)
-- Dependencies: 215
-- Name: TABLE set; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.set TO read_only;


-- Completed on 2025-02-22 14:29:17

--
-- PostgreSQL database dump complete
--

