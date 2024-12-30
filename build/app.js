(() => {
	'use strict';
	var t = {
		n: (e) => {
			var i = e && e.__esModule ? () => e.default : () => e;
			return t.d(i, { a: i }), i;
		},
		d: (e, i) => {
			for (var n in i)
				t.o(i, n) &&
					!t.o(e, n) &&
					Object.defineProperty(e, n, { enumerable: !0, get: i[n] });
		},
		o: (t, e) => Object.prototype.hasOwnProperty.call(t, e),
	};
	const e = window.wp.element,
		i = window.React;
	var n = (t) => 'checkbox' === t.type,
		r = (t) => t instanceof Date,
		s = (t) => null == t;
	const o = (t) => 'object' == typeof t;
	var a = (t) => !s(t) && !Array.isArray(t) && o(t) && !r(t),
		l = (t) =>
			a(t) && t.target
				? n(t.target)
					? t.target.checked
					: t.target.value
				: t,
		h = (t, e) =>
			t.has(((t) => t.substring(0, t.search(/\.\d+(\.|$)/)) || t)(e)),
		c =
			'undefined' != typeof window &&
			void 0 !== window.HTMLElement &&
			'undefined' != typeof document;
	function u(t) {
		let e;
		const i = Array.isArray(t),
			n = 'undefined' != typeof FileList && t instanceof FileList;
		if (t instanceof Date) e = new Date(t);
		else if (t instanceof Set) e = new Set(t);
		else {
			if ((c && (t instanceof Blob || n)) || (!i && !a(t))) return t;
			if (
				((e = i ? [] : {}),
				i ||
					((t) => {
						const e = t.constructor && t.constructor.prototype;
						return a(e) && e.hasOwnProperty('isPrototypeOf');
					})(t))
			)
				for (const i in t) t.hasOwnProperty(i) && (e[i] = u(t[i]));
			else e = t;
		}
		return e;
	}
	var d = (t) => (Array.isArray(t) ? t.filter(Boolean) : []),
		f = (t) => void 0 === t,
		O = (t, e, i) => {
			if (!e || !a(t)) return i;
			const n = d(e.split(/[,[\].]+?/)).reduce(
				(t, e) => (s(t) ? t : t[e]),
				t
			);
			return f(n) || n === t ? (f(t[e]) ? i : t[e]) : n;
		},
		p = (t) => 'boolean' == typeof t,
		m = (t) => /^\w*$/.test(t),
		g = (t) => d(t.replace(/["|']|\]/g, '').split(/\.|\[/)),
		b = (t, e, i) => {
			let n = -1;
			const r = m(e) ? [e] : g(e),
				s = r.length,
				o = s - 1;
			for (; ++n < s; ) {
				const e = r[n];
				let s = i;
				if (n !== o) {
					const i = t[e];
					s =
						a(i) || Array.isArray(i)
							? i
							: isNaN(+r[n + 1])
								? {}
								: [];
				}
				if (
					'__proto__' === e ||
					'constructor' === e ||
					'prototype' === e
				)
					return;
				(t[e] = s), (t = t[e]);
			}
			return t;
		};
	const y = 'blur',
		v = 'onChange',
		w = 'onSubmit',
		S = 'all',
		x = 'pattern',
		Q = 'required',
		k = i.createContext(null),
		$ = () => i.useContext(k),
		P = (t) => {
			const { children: e, ...n } = t;
			return i.createElement(k.Provider, { value: n }, e);
		};
	var Z = (t, e, i, n = !0) => {
			const r = { defaultValues: e._defaultValues };
			for (const s in t)
				Object.defineProperty(r, s, {
					get: () => {
						const r = s;
						return (
							e._proxyFormState[r] !== S &&
								(e._proxyFormState[r] = !n || S),
							i && (i[r] = !0),
							t[r]
						);
					},
				});
			return r;
		},
		T = (t) => a(t) && !Object.keys(t).length,
		C = (t, e, i, n) => {
			i(t);
			const { name: r, ...s } = t;
			return (
				T(s) ||
				Object.keys(s).length >= Object.keys(e).length ||
				Object.keys(s).find((t) => e[t] === (!n || S))
			);
		},
		A = (t) => (Array.isArray(t) ? t : [t]),
		X = (t, e, i) =>
			!t ||
			!e ||
			t === e ||
			A(t).some(
				(t) => t && (i ? t === e : t.startsWith(e) || e.startsWith(t))
			);
	function M(t) {
		const e = i.useRef(t);
		(e.current = t),
			i.useEffect(() => {
				const i =
					!t.disabled &&
					e.current.subject &&
					e.current.subject.subscribe({ next: e.current.next });
				return () => {
					i && i.unsubscribe();
				};
			}, [t.disabled]);
	}
	var R = (t) => 'string' == typeof t,
		_ = (t, e, i, n, r) =>
			R(t)
				? (n && e.watch.add(t), O(i, t, r))
				: Array.isArray(t)
					? t.map((t) => (n && e.watch.add(t), O(i, t)))
					: (n && (e.watchAll = !0), i);
	const V = (t) =>
		t.render(
			(function (t) {
				const e = $(),
					{
						name: n,
						disabled: r,
						control: s = e.control,
						shouldUnregister: o,
					} = t,
					a = h(s._names.array, n),
					c = (function (t) {
						const e = $(),
							{
								control: n = e.control,
								name: r,
								defaultValue: s,
								disabled: o,
								exact: a,
							} = t || {},
							l = i.useRef(r);
						(l.current = r),
							M({
								disabled: o,
								subject: n._subjects.values,
								next: (t) => {
									X(l.current, t.name, a) &&
										c(
											u(
												_(
													l.current,
													n._names,
													t.values || n._formValues,
													!1,
													s
												)
											)
										);
								},
							});
						const [h, c] = i.useState(n._getWatch(r, s));
						return i.useEffect(() => n._removeUnmounted()), h;
					})({
						control: s,
						name: n,
						defaultValue: O(
							s._formValues,
							n,
							O(s._defaultValues, n, t.defaultValue)
						),
						exact: !0,
					}),
					d = (function (t) {
						const e = $(),
							{
								control: n = e.control,
								disabled: r,
								name: s,
								exact: o,
							} = t || {},
							[a, l] = i.useState(n._formState),
							h = i.useRef(!0),
							c = i.useRef({
								isDirty: !1,
								isLoading: !1,
								dirtyFields: !1,
								touchedFields: !1,
								validatingFields: !1,
								isValidating: !1,
								isValid: !1,
								errors: !1,
							}),
							u = i.useRef(s);
						return (
							(u.current = s),
							M({
								disabled: r,
								next: (t) =>
									h.current &&
									X(u.current, t.name, o) &&
									C(t, c.current, n._updateFormState) &&
									l({ ...n._formState, ...t }),
								subject: n._subjects.state,
							}),
							i.useEffect(
								() => (
									(h.current = !0),
									c.current.isValid && n._updateValid(!0),
									() => {
										h.current = !1;
									}
								),
								[n]
							),
							i.useMemo(() => Z(a, n, c.current, !1), [a, n])
						);
					})({ control: s, name: n, exact: !0 }),
					m = i.useRef(
						s.register(n, {
							...t.rules,
							value: c,
							...(p(t.disabled) ? { disabled: t.disabled } : {}),
						})
					),
					g = i.useMemo(
						() =>
							Object.defineProperties(
								{},
								{
									invalid: {
										enumerable: !0,
										get: () => !!O(d.errors, n),
									},
									isDirty: {
										enumerable: !0,
										get: () => !!O(d.dirtyFields, n),
									},
									isTouched: {
										enumerable: !0,
										get: () => !!O(d.touchedFields, n),
									},
									isValidating: {
										enumerable: !0,
										get: () => !!O(d.validatingFields, n),
									},
									error: {
										enumerable: !0,
										get: () => O(d.errors, n),
									},
								}
							),
						[d, n]
					),
					v = i.useMemo(
						() => ({
							name: n,
							value: c,
							...(p(r) || d.disabled
								? { disabled: d.disabled || r }
								: {}),
							onChange: (t) =>
								m.current.onChange({
									target: { value: l(t), name: n },
									type: 'change',
								}),
							onBlur: () =>
								m.current.onBlur({
									target: {
										value: O(s._formValues, n),
										name: n,
									},
									type: y,
								}),
							ref: (t) => {
								const e = O(s._fields, n);
								e &&
									t &&
									(e._f.ref = {
										focus: () => t.focus(),
										select: () => t.select(),
										setCustomValidity: (e) =>
											t.setCustomValidity(e),
										reportValidity: () =>
											t.reportValidity(),
									});
							},
						}),
						[n, s._formValues, r, d.disabled, c, s._fields]
					);
				return (
					i.useEffect(() => {
						const t = s._options.shouldUnregister || o,
							e = (t, e) => {
								const i = O(s._fields, t);
								i && i._f && (i._f.mount = e);
							};
						if ((e(n, !0), t)) {
							const t = u(O(s._options.defaultValues, n));
							b(s._defaultValues, n, t),
								f(O(s._formValues, n)) &&
									b(s._formValues, n, t);
						}
						return () => {
							(a ? t && !s._state.action : t)
								? s.unregister(n)
								: e(n, !1);
						};
					}, [n, s, a, o]),
					i.useEffect(() => {
						p(r) &&
							O(s._fields, n) &&
							s._updateDisabledField({
								disabled: r,
								fields: s._fields,
								name: n,
								value: O(s._fields, n)._f.value,
							});
					}, [r, n, s]),
					i.useMemo(
						() => ({ field: v, formState: d, fieldState: g }),
						[v, d, g]
					)
				);
			})(t)
		);
	var q = (t, e, i, n, r) =>
			e
				? {
						...i[t],
						types: {
							...(i[t] && i[t].types ? i[t].types : {}),
							[n]: r || !0,
						},
					}
				: {},
		j = () => {
			const t =
				'undefined' == typeof performance
					? Date.now()
					: 1e3 * performance.now();
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
				/[xy]/g,
				(e) => {
					const i = (16 * Math.random() + t) % 16 | 0;
					return ('x' == e ? i : (3 & i) | 8).toString(16);
				}
			);
		},
		D = (t, e, i = {}) =>
			i.shouldFocus || f(i.shouldFocus)
				? i.focusName || `${t}.${f(i.focusIndex) ? e : i.focusIndex}.`
				: '',
		E = (t) => ({
			isOnSubmit: !t || t === w,
			isOnBlur: 'onBlur' === t,
			isOnChange: t === v,
			isOnAll: t === S,
			isOnTouch: 'onTouched' === t,
		}),
		W = (t, e, i) =>
			!i &&
			(e.watchAll ||
				e.watch.has(t) ||
				[...e.watch].some(
					(e) => t.startsWith(e) && /^\.\w+/.test(t.slice(e.length))
				));
	const Y = (t, e, i, n) => {
		for (const r of i || Object.keys(t)) {
			const i = O(t, r);
			if (i) {
				const { _f: t, ...s } = i;
				if (t) {
					if (t.refs && t.refs[0] && e(t.refs[0], r) && !n) return !0;
					if (t.ref && e(t.ref, t.name) && !n) return !0;
					if (Y(s, e)) break;
				} else if (a(s) && Y(s, e)) break;
			}
		}
	};
	var z = (t, e, i) => {
			const n = A(O(t, i));
			return b(n, 'root', e[i]), b(t, i, n), t;
		},
		L = (t) => 'file' === t.type,
		B = (t) => 'function' == typeof t,
		U = (t) => {
			if (!c) return !1;
			const e = t ? t.ownerDocument : 0;
			return (
				t instanceof
				(e && e.defaultView ? e.defaultView.HTMLElement : HTMLElement)
			);
		},
		N = (t) => R(t),
		G = (t) => 'radio' === t.type,
		I = (t) => t instanceof RegExp;
	const F = { value: !1, isValid: !1 },
		H = { value: !0, isValid: !0 };
	var K = (t) => {
		if (Array.isArray(t)) {
			if (t.length > 1) {
				const e = t
					.filter((t) => t && t.checked && !t.disabled)
					.map((t) => t.value);
				return { value: e, isValid: !!e.length };
			}
			return t[0].checked && !t[0].disabled
				? t[0].attributes && !f(t[0].attributes.value)
					? f(t[0].value) || '' === t[0].value
						? H
						: { value: t[0].value, isValid: !0 }
					: H
				: F;
		}
		return F;
	};
	const J = { isValid: !1, value: null };
	var tt = (t) =>
		Array.isArray(t)
			? t.reduce(
					(t, e) =>
						e && e.checked && !e.disabled
							? { isValid: !0, value: e.value }
							: t,
					J
				)
			: J;
	function et(t, e, i = 'validate') {
		if (N(t) || (Array.isArray(t) && t.every(N)) || (p(t) && !t))
			return { type: i, message: N(t) ? t : '', ref: e };
	}
	var it = (t) => (a(t) && !I(t) ? t : { value: t, message: '' }),
		nt = async (t, e, i, r, o) => {
			const {
					ref: l,
					refs: h,
					required: c,
					maxLength: u,
					minLength: d,
					min: m,
					max: g,
					pattern: b,
					validate: y,
					name: v,
					valueAsNumber: w,
					mount: S,
					disabled: k,
				} = t._f,
				$ = O(e, v);
			if (!S || k) return {};
			const P = h ? h[0] : l,
				Z = (t) => {
					r &&
						P.reportValidity &&
						(P.setCustomValidity(p(t) ? '' : t || ''),
						P.reportValidity());
				},
				C = {},
				A = G(l),
				X = n(l),
				M = A || X,
				_ =
					((w || L(l)) && f(l.value) && f($)) ||
					(U(l) && '' === l.value) ||
					'' === $ ||
					(Array.isArray($) && !$.length),
				V = q.bind(null, v, i, C),
				j = (t, e, i, n = 'maxLength', r = 'minLength') => {
					const s = t ? e : i;
					C[v] = {
						type: t ? n : r,
						message: s,
						ref: l,
						...V(t ? n : r, s),
					};
				};
			if (
				o
					? !Array.isArray($) || !$.length
					: c &&
						((!M && (_ || s($))) ||
							(p($) && !$) ||
							(X && !K(h).isValid) ||
							(A && !tt(h).isValid))
			) {
				const { value: t, message: e } = N(c)
					? { value: !!c, message: c }
					: it(c);
				if (
					t &&
					((C[v] = { type: Q, message: e, ref: P, ...V(Q, e) }), !i)
				)
					return Z(e), C;
			}
			if (!(_ || (s(m) && s(g)))) {
				let t, e;
				const n = it(g),
					r = it(m);
				if (s($) || isNaN($)) {
					const i = l.valueAsDate || new Date($),
						s = (t) =>
							new Date(new Date().toDateString() + ' ' + t),
						o = 'time' == l.type,
						a = 'week' == l.type;
					R(n.value) &&
						$ &&
						(t = o
							? s($) > s(n.value)
							: a
								? $ > n.value
								: i > new Date(n.value)),
						R(r.value) &&
							$ &&
							(e = o
								? s($) < s(r.value)
								: a
									? $ < r.value
									: i < new Date(r.value));
				} else {
					const i = l.valueAsNumber || ($ ? +$ : $);
					s(n.value) || (t = i > n.value),
						s(r.value) || (e = i < r.value);
				}
				if (
					(t || e) &&
					(j(!!t, n.message, r.message, 'max', 'min'), !i)
				)
					return Z(C[v].message), C;
			}
			if ((u || d) && !_ && (R($) || (o && Array.isArray($)))) {
				const t = it(u),
					e = it(d),
					n = !s(t.value) && $.length > +t.value,
					r = !s(e.value) && $.length < +e.value;
				if ((n || r) && (j(n, t.message, e.message), !i))
					return Z(C[v].message), C;
			}
			if (b && !_ && R($)) {
				const { value: t, message: e } = it(b);
				if (
					I(t) &&
					!$.match(t) &&
					((C[v] = { type: x, message: e, ref: l, ...V(x, e) }), !i)
				)
					return Z(e), C;
			}
			if (y)
				if (B(y)) {
					const t = et(await y($, e), P);
					if (
						t &&
						((C[v] = { ...t, ...V('validate', t.message) }), !i)
					)
						return Z(t.message), C;
				} else if (a(y)) {
					let t = {};
					for (const n in y) {
						if (!T(t) && !i) break;
						const r = et(await y[n]($, e), P, n);
						r &&
							((t = { ...r, ...V(n, r.message) }),
							Z(r.message),
							i && (C[v] = t));
					}
					if (!T(t) && ((C[v] = { ref: P, ...t }), !i)) return C;
				}
			return Z(!0), C;
		},
		rt = (t, e) => [...t, ...A(e)],
		st = (t) => (Array.isArray(t) ? t.map(() => {}) : void 0);
	function ot(t, e, i) {
		return [...t.slice(0, e), ...A(i), ...t.slice(e)];
	}
	var at = (t, e, i) =>
			Array.isArray(t)
				? (f(t[i]) && (t[i] = void 0),
					t.splice(i, 0, t.splice(e, 1)[0]),
					t)
				: [],
		lt = (t, e) => [...A(e), ...A(t)],
		ht = (t, e) =>
			f(e)
				? []
				: (function (t, e) {
						let i = 0;
						const n = [...t];
						for (const t of e) n.splice(t - i, 1), i++;
						return d(n).length ? n : [];
					})(
						t,
						A(e).sort((t, e) => t - e)
					),
		ct = (t, e, i) => {
			[t[e], t[i]] = [t[i], t[e]];
		};
	function ut(t, e) {
		const i = Array.isArray(e) ? e : m(e) ? [e] : g(e),
			n =
				1 === i.length
					? t
					: (function (t, e) {
							const i = e.slice(0, -1).length;
							let n = 0;
							for (; n < i; ) t = f(t) ? n++ : t[e[n++]];
							return t;
						})(t, i),
			r = i.length - 1,
			s = i[r];
		return (
			n && delete n[s],
			0 !== r &&
				((a(n) && T(n)) ||
					(Array.isArray(n) &&
						(function (t) {
							for (const e in t)
								if (t.hasOwnProperty(e) && !f(t[e])) return !1;
							return !0;
						})(n))) &&
				ut(t, i.slice(0, -1)),
			t
		);
	}
	var dt = (t, e, i) => ((t[e] = i), t),
		ft = () => {
			let t = [];
			return {
				get observers() {
					return t;
				},
				next: (e) => {
					for (const i of t) i.next && i.next(e);
				},
				subscribe: (e) => (
					t.push(e),
					{
						unsubscribe: () => {
							t = t.filter((t) => t !== e);
						},
					}
				),
				unsubscribe: () => {
					t = [];
				},
			};
		},
		Ot = (t) => s(t) || !o(t);
	function pt(t, e) {
		if (Ot(t) || Ot(e)) return t === e;
		if (r(t) && r(e)) return t.getTime() === e.getTime();
		const i = Object.keys(t),
			n = Object.keys(e);
		if (i.length !== n.length) return !1;
		for (const s of i) {
			const i = t[s];
			if (!n.includes(s)) return !1;
			if ('ref' !== s) {
				const t = e[s];
				if (
					(r(i) && r(t)) ||
					(a(i) && a(t)) ||
					(Array.isArray(i) && Array.isArray(t))
						? !pt(i, t)
						: i !== t
				)
					return !1;
			}
		}
		return !0;
	}
	var mt = (t) => 'select-multiple' === t.type,
		gt = (t) => U(t) && t.isConnected,
		bt = (t) => {
			for (const e in t) if (B(t[e])) return !0;
			return !1;
		};
	function yt(t, e = {}) {
		const i = Array.isArray(t);
		if (a(t) || i)
			for (const i in t)
				Array.isArray(t[i]) || (a(t[i]) && !bt(t[i]))
					? ((e[i] = Array.isArray(t[i]) ? [] : {}), yt(t[i], e[i]))
					: s(t[i]) || (e[i] = !0);
		return e;
	}
	function vt(t, e, i) {
		const n = Array.isArray(t);
		if (a(t) || n)
			for (const n in t)
				Array.isArray(t[n]) || (a(t[n]) && !bt(t[n]))
					? f(e) || Ot(i[n])
						? (i[n] = Array.isArray(t[n])
								? yt(t[n], [])
								: { ...yt(t[n]) })
						: vt(t[n], s(e) ? {} : e[n], i[n])
					: (i[n] = !pt(t[n], e[n]));
		return i;
	}
	var wt = (t, e) => vt(t, e, yt(e)),
		St = (t, { valueAsNumber: e, valueAsDate: i, setValueAs: n }) =>
			f(t)
				? t
				: e
					? '' === t
						? NaN
						: t
							? +t
							: t
					: i && R(t)
						? new Date(t)
						: n
							? n(t)
							: t;
	function xt(t) {
		const e = t.ref;
		if (!(t.refs ? t.refs.every((t) => t.disabled) : e.disabled))
			return L(e)
				? e.files
				: G(e)
					? tt(t.refs).value
					: mt(e)
						? [...e.selectedOptions].map(({ value: t }) => t)
						: n(e)
							? K(t.refs).value
							: St(f(e.value) ? t.ref.value : e.value, t);
	}
	var Qt = (t) =>
		f(t)
			? t
			: I(t)
				? t.source
				: a(t)
					? I(t.value)
						? t.value.source
						: t.value
					: t;
	const kt = 'AsyncFunction';
	function $t(t, e, i) {
		const n = O(t, i);
		if (n || m(i)) return { error: n, name: i };
		const r = i.split('.');
		for (; r.length; ) {
			const n = r.join('.'),
				s = O(e, n),
				o = O(t, n);
			if (s && !Array.isArray(s) && i !== n) return { name: i };
			if (o && o.type) return { name: n, error: o };
			r.pop();
		}
		return { name: i };
	}
	const Pt = { mode: w, reValidateMode: v, shouldFocusError: !0 };
	function Zt(t = {}) {
		let e,
			i = { ...Pt, ...t },
			o = {
				submitCount: 0,
				isDirty: !1,
				isLoading: B(i.defaultValues),
				isValidating: !1,
				isSubmitted: !1,
				isSubmitting: !1,
				isSubmitSuccessful: !1,
				isValid: !1,
				touchedFields: {},
				dirtyFields: {},
				validatingFields: {},
				errors: i.errors || {},
				disabled: i.disabled || !1,
			},
			m = {},
			g =
				((a(i.defaultValues) || a(i.values)) &&
					u(i.defaultValues || i.values)) ||
				{},
			v = i.shouldUnregister ? {} : u(g),
			w = { action: !1, mount: !1, watch: !1 },
			x = {
				mount: new Set(),
				unMount: new Set(),
				array: new Set(),
				watch: new Set(),
			},
			Q = 0;
		const k = {
				isDirty: !1,
				dirtyFields: !1,
				validatingFields: !1,
				touchedFields: !1,
				isValidating: !1,
				isValid: !1,
				errors: !1,
			},
			$ = { values: ft(), array: ft(), state: ft() },
			P = E(i.mode),
			Z = E(i.reValidateMode),
			C = i.criteriaMode === S,
			X = async (t) => {
				if (!i.disabled && (k.isValid || t)) {
					const t = i.resolver
						? T((await j()).errors)
						: await D(m, !0);
					t !== o.isValid && $.state.next({ isValid: t });
				}
			},
			M = (t, e) => {
				i.disabled ||
					(!k.isValidating && !k.validatingFields) ||
					((t || Array.from(x.mount)).forEach((t) => {
						t &&
							(e
								? b(o.validatingFields, t, e)
								: ut(o.validatingFields, t));
					}),
					$.state.next({
						validatingFields: o.validatingFields,
						isValidating: !T(o.validatingFields),
					}));
			},
			V = (t, e, i, n) => {
				const r = O(m, t);
				if (r) {
					const s = O(v, t, f(i) ? O(g, t) : i);
					f(s) || (n && n.defaultChecked) || e
						? b(v, t, e ? s : xt(r._f))
						: F(t, s),
						w.mount && X();
				}
			},
			q = (t, e, n, r, s) => {
				let a = !1,
					l = !1;
				const h = { name: t };
				if (!i.disabled) {
					const i = !!(O(m, t) && O(m, t)._f && O(m, t)._f.disabled);
					if (!n || r) {
						k.isDirty &&
							((l = o.isDirty),
							(o.isDirty = h.isDirty = N()),
							(a = l !== h.isDirty));
						const n = i || pt(O(g, t), e);
						(l = !(i || !O(o.dirtyFields, t))),
							n || i
								? ut(o.dirtyFields, t)
								: b(o.dirtyFields, t, !0),
							(h.dirtyFields = o.dirtyFields),
							(a = a || (k.dirtyFields && l !== !n));
					}
					if (n) {
						const e = O(o.touchedFields, t);
						e ||
							(b(o.touchedFields, t, n),
							(h.touchedFields = o.touchedFields),
							(a = a || (k.touchedFields && e !== n)));
					}
					a && s && $.state.next(h);
				}
				return a ? h : {};
			},
			j = async (t) => {
				M(t, !0);
				const e = await i.resolver(
					v,
					i.context,
					((t, e, i, n) => {
						const r = {};
						for (const i of t) {
							const t = O(e, i);
							t && b(r, i, t._f);
						}
						return {
							criteriaMode: i,
							names: [...t],
							fields: r,
							shouldUseNativeValidation: n,
						};
					})(
						t || x.mount,
						m,
						i.criteriaMode,
						i.shouldUseNativeValidation
					)
				);
				return M(t), e;
			},
			D = async (t, e, n = { valid: !0 }) => {
				for (const s in t) {
					const l = t[s];
					if (l) {
						const { _f: t, ...h } = l;
						if (t) {
							const h = x.array.has(t.name),
								c =
									l._f &&
									!!(r = l._f) &&
									!!r.validate &&
									!!(
										(B(r.validate) &&
											r.validate.constructor.name ===
												kt) ||
										(a(r.validate) &&
											Object.values(r.validate).find(
												(t) => t.constructor.name === kt
											))
									);
							c && k.validatingFields && M([s], !0);
							const u = await nt(
								l,
								v,
								C,
								i.shouldUseNativeValidation && !e,
								h
							);
							if (
								(c && k.validatingFields && M([s]),
								u[t.name] && ((n.valid = !1), e))
							)
								break;
							!e &&
								(O(u, t.name)
									? h
										? z(o.errors, u, t.name)
										: b(o.errors, t.name, u[t.name])
									: ut(o.errors, t.name));
						}
						!T(h) && (await D(h, e, n));
					}
				}
				var r;
				return n.valid;
			},
			N = (t, e) => !i.disabled && (t && e && b(v, t, e), !pt(it(), g)),
			I = (t, e, i) =>
				_(
					t,
					x,
					{ ...(w.mount ? v : f(e) ? g : R(t) ? { [t]: e } : e) },
					i,
					e
				),
			F = (t, e, i = {}) => {
				const r = O(m, t);
				let o = e;
				if (r) {
					const i = r._f;
					i &&
						(!i.disabled && b(v, t, St(e, i)),
						(o = U(i.ref) && s(e) ? '' : e),
						mt(i.ref)
							? [...i.ref.options].forEach(
									(t) => (t.selected = o.includes(t.value))
								)
							: i.refs
								? n(i.ref)
									? i.refs.length > 1
										? i.refs.forEach(
												(t) =>
													(!t.defaultChecked ||
														!t.disabled) &&
													(t.checked = Array.isArray(
														o
													)
														? !!o.find(
																(e) =>
																	e ===
																	t.value
															)
														: o === t.value)
											)
										: i.refs[0] && (i.refs[0].checked = !!o)
									: i.refs.forEach(
											(t) => (t.checked = t.value === o)
										)
								: L(i.ref)
									? (i.ref.value = '')
									: ((i.ref.value = o),
										i.ref.type ||
											$.values.next({
												name: t,
												values: { ...v },
											})));
				}
				(i.shouldDirty || i.shouldTouch) &&
					q(t, o, i.shouldTouch, i.shouldDirty, !0),
					i.shouldValidate && et(t);
			},
			H = (t, e, i) => {
				for (const n in e) {
					const s = e[n],
						o = `${t}.${n}`,
						l = O(m, o);
					(x.array.has(t) || a(s) || (l && !l._f)) && !r(s)
						? H(o, s, i)
						: F(o, s, i);
				}
			},
			K = (t, e, i = {}) => {
				const n = O(m, t),
					r = x.array.has(t),
					a = u(e);
				b(v, t, a),
					r
						? ($.array.next({ name: t, values: { ...v } }),
							(k.isDirty || k.dirtyFields) &&
								i.shouldDirty &&
								$.state.next({
									name: t,
									dirtyFields: wt(g, v),
									isDirty: N(t, a),
								}))
						: !n || n._f || s(a)
							? F(t, a, i)
							: H(t, a, i),
					W(t, x) && $.state.next({ ...o }),
					$.values.next({
						name: w.mount ? t : void 0,
						values: { ...v },
					});
			},
			J = async (t) => {
				w.mount = !0;
				const n = t.target;
				let s = n.name,
					a = !0;
				const h = O(m, s),
					c = (t) => {
						a =
							Number.isNaN(t) ||
							(r(t) && isNaN(t.getTime())) ||
							pt(t, O(v, s, t));
					};
				if (h) {
					let r, d;
					const f = n.type ? xt(h._f) : l(t),
						g = t.type === y || 'focusout' === t.type,
						w =
							!(
								((u = h._f).mount &&
									(u.required ||
										u.min ||
										u.max ||
										u.maxLength ||
										u.minLength ||
										u.pattern ||
										u.validate)) ||
								i.resolver ||
								O(o.errors, s) ||
								h._f.deps
							) ||
							((t, e, i, n, r) =>
								!r.isOnAll &&
								(!i && r.isOnTouch
									? !(e || t)
									: (i ? n.isOnBlur : r.isOnBlur)
										? !t
										: !(i ? n.isOnChange : r.isOnChange) ||
											t))(
								g,
								O(o.touchedFields, s),
								o.isSubmitted,
								Z,
								P
							),
						S = W(s, x, g);
					b(v, s, f),
						g
							? (h._f.onBlur && h._f.onBlur(t), e && e(0))
							: h._f.onChange && h._f.onChange(t);
					const A = q(s, f, g, !1),
						R = !T(A) || S;
					if (
						(!g &&
							$.values.next({
								name: s,
								type: t.type,
								values: { ...v },
							}),
						w)
					)
						return (
							k.isValid && ('onBlur' === i.mode ? g && X() : X()),
							R && $.state.next({ name: s, ...(S ? {} : A) })
						);
					if ((!g && S && $.state.next({ ...o }), i.resolver)) {
						const { errors: t } = await j([s]);
						if ((c(f), a)) {
							const e = $t(o.errors, m, s),
								i = $t(t, m, e.name || s);
							(r = i.error), (s = i.name), (d = T(t));
						}
					} else
						M([s], !0),
							(r = (
								await nt(h, v, C, i.shouldUseNativeValidation)
							)[s]),
							M([s]),
							c(f),
							a &&
								(r
									? (d = !1)
									: k.isValid && (d = await D(m, !0)));
					a &&
						(h._f.deps && et(h._f.deps),
						((t, n, r, s) => {
							const a = O(o.errors, t),
								l = k.isValid && p(n) && o.isValid !== n;
							var h;
							if (
								(i.delayError && r
									? ((h = () =>
											((t, e) => {
												b(o.errors, t, e),
													$.state.next({
														errors: o.errors,
													});
											})(t, r)),
										(e = (t) => {
											clearTimeout(Q),
												(Q = setTimeout(h, t));
										}),
										e(i.delayError))
									: (clearTimeout(Q),
										(e = null),
										r
											? b(o.errors, t, r)
											: ut(o.errors, t)),
								(r ? !pt(a, r) : a) || !T(s) || l)
							) {
								const e = {
									...s,
									...(l && p(n) ? { isValid: n } : {}),
									errors: o.errors,
									name: t,
								};
								(o = { ...o, ...e }), $.state.next(e);
							}
						})(s, d, r, A));
				}
				var u;
			},
			tt = (t, e) => {
				if (O(o.errors, e) && t.focus) return t.focus(), 1;
			},
			et = async (t, e = {}) => {
				let n, r;
				const s = A(t);
				if (i.resolver) {
					const e = await (async (t) => {
						const { errors: e } = await j(t);
						if (t)
							for (const i of t) {
								const t = O(e, i);
								t ? b(o.errors, i, t) : ut(o.errors, i);
							}
						else o.errors = e;
						return e;
					})(f(t) ? t : s);
					(n = T(e)), (r = t ? !s.some((t) => O(e, t)) : n);
				} else
					t
						? ((r = (
								await Promise.all(
									s.map(async (t) => {
										const e = O(m, t);
										return await D(
											e && e._f ? { [t]: e } : e
										);
									})
								)
							).every(Boolean)),
							(r || o.isValid) && X())
						: (r = n = await D(m));
				return (
					$.state.next({
						...(!R(t) || (k.isValid && n !== o.isValid)
							? {}
							: { name: t }),
						...(i.resolver || !t ? { isValid: n } : {}),
						errors: o.errors,
					}),
					e.shouldFocus && !r && Y(m, tt, t ? s : x.mount),
					r
				);
			},
			it = (t) => {
				const e = { ...(w.mount ? v : g) };
				return f(t) ? e : R(t) ? O(e, t) : t.map((t) => O(e, t));
			},
			rt = (t, e) => ({
				invalid: !!O((e || o).errors, t),
				isDirty: !!O((e || o).dirtyFields, t),
				error: O((e || o).errors, t),
				isValidating: !!O(o.validatingFields, t),
				isTouched: !!O((e || o).touchedFields, t),
			}),
			st = (t, e, i) => {
				const n = (O(m, t, { _f: {} })._f || {}).ref,
					r = O(o.errors, t) || {},
					{ ref: s, message: a, type: l, ...h } = r;
				b(o.errors, t, { ...h, ...e, ref: n }),
					$.state.next({ name: t, errors: o.errors, isValid: !1 }),
					i && i.shouldFocus && n && n.focus && n.focus();
			},
			ot = (t, e = {}) => {
				for (const n of t ? A(t) : x.mount)
					x.mount.delete(n),
						x.array.delete(n),
						e.keepValue || (ut(m, n), ut(v, n)),
						!e.keepError && ut(o.errors, n),
						!e.keepDirty && ut(o.dirtyFields, n),
						!e.keepTouched && ut(o.touchedFields, n),
						!e.keepIsValidating && ut(o.validatingFields, n),
						!i.shouldUnregister && !e.keepDefaultValue && ut(g, n);
				$.values.next({ values: { ...v } }),
					$.state.next({
						...o,
						...(e.keepDirty ? { isDirty: N() } : {}),
					}),
					!e.keepIsValid && X();
			},
			at = ({ disabled: t, name: e, field: i, fields: n, value: r }) => {
				if ((p(t) && w.mount) || t) {
					const s = t ? void 0 : f(r) ? xt(i ? i._f : O(n, e)._f) : r;
					(t || (!t && !f(s))) && b(v, e, s), q(e, s, !1, !1, !0);
				}
			},
			lt = (t, e = {}) => {
				let r = O(m, t);
				const s = p(e.disabled) || p(i.disabled);
				return (
					b(m, t, {
						...(r || {}),
						_f: {
							...(r && r._f ? r._f : { ref: { name: t } }),
							name: t,
							mount: !0,
							...e,
						},
					}),
					x.mount.add(t),
					r
						? at({
								field: r,
								disabled: p(e.disabled)
									? e.disabled
									: i.disabled,
								name: t,
								value: e.value,
							})
						: V(t, !0, e.value),
					{
						...(s ? { disabled: e.disabled || i.disabled } : {}),
						...(i.progressive
							? {
									required: !!e.required,
									min: Qt(e.min),
									max: Qt(e.max),
									minLength: Qt(e.minLength),
									maxLength: Qt(e.maxLength),
									pattern: Qt(e.pattern),
								}
							: {}),
						name: t,
						onChange: J,
						onBlur: J,
						ref: (s) => {
							if (s) {
								lt(t, e), (r = O(m, t));
								const i =
										(f(s.value) &&
											s.querySelectorAll &&
											s.querySelectorAll(
												'input,select,textarea'
											)[0]) ||
										s,
									o = ((t) => G(t) || n(t))(i),
									a = r._f.refs || [];
								if (o ? a.find((t) => t === i) : i === r._f.ref)
									return;
								b(m, t, {
									_f: {
										...r._f,
										...(o
											? {
													refs: [
														...a.filter(gt),
														i,
														...(Array.isArray(
															O(g, t)
														)
															? [{}]
															: []),
													],
													ref: {
														type: i.type,
														name: t,
													},
												}
											: { ref: i }),
									},
								}),
									V(t, !1, void 0, i);
							} else
								(r = O(m, t, {})),
									r._f && (r._f.mount = !1),
									(i.shouldUnregister ||
										e.shouldUnregister) &&
										(!h(x.array, t) || !w.action) &&
										x.unMount.add(t);
						},
					}
				);
			},
			ht = () => i.shouldFocusError && Y(m, tt, x.mount),
			ct = (t, e) => async (n) => {
				let r;
				if (
					(n &&
						(n.preventDefault && n.preventDefault(),
						n.persist && n.persist()),
					i.disabled)
				)
					return void (e && (await e({ ...o.errors }, n)));
				let s = u(v);
				if (($.state.next({ isSubmitting: !0 }), i.resolver)) {
					const { errors: t, values: e } = await j();
					(o.errors = t), (s = e);
				} else await D(m);
				if ((ut(o.errors, 'root'), T(o.errors))) {
					$.state.next({ errors: {} });
					try {
						await t(s, n);
					} catch (t) {
						r = t;
					}
				} else e && (await e({ ...o.errors }, n)), ht(), setTimeout(ht);
				if (
					($.state.next({
						isSubmitted: !0,
						isSubmitting: !1,
						isSubmitSuccessful: T(o.errors) && !r,
						submitCount: o.submitCount + 1,
						errors: o.errors,
					}),
					r)
				)
					throw r;
			},
			dt = (t, e = {}) => {
				const n = t ? u(t) : g,
					r = u(n),
					s = T(t),
					a = s ? g : r;
				if ((e.keepDefaultValues || (g = n), !e.keepValues)) {
					if (e.keepDirtyValues) {
						const t = new Set([
							...x.mount,
							...Object.keys(wt(g, v)),
						]);
						for (const e of Array.from(t))
							O(o.dirtyFields, e)
								? b(a, e, O(v, e))
								: K(e, O(a, e));
					} else {
						if (c && f(t))
							for (const t of x.mount) {
								const e = O(m, t);
								if (e && e._f) {
									const t = Array.isArray(e._f.refs)
										? e._f.refs[0]
										: e._f.ref;
									if (U(t)) {
										const e = t.closest('form');
										if (e) {
											e.reset();
											break;
										}
									}
								}
							}
						m = {};
					}
					(v = i.shouldUnregister
						? e.keepDefaultValues
							? u(g)
							: {}
						: u(a)),
						$.array.next({ values: { ...a } }),
						$.values.next({ values: { ...a } });
				}
				(x = {
					mount: e.keepDirtyValues ? x.mount : new Set(),
					unMount: new Set(),
					array: new Set(),
					watch: new Set(),
					watchAll: !1,
					focus: '',
				}),
					(w.mount =
						!k.isValid || !!e.keepIsValid || !!e.keepDirtyValues),
					(w.watch = !!i.shouldUnregister),
					$.state.next({
						submitCount: e.keepSubmitCount ? o.submitCount : 0,
						isDirty:
							!s &&
							(e.keepDirty
								? o.isDirty
								: !(!e.keepDefaultValues || pt(t, g))),
						isSubmitted: !!e.keepIsSubmitted && o.isSubmitted,
						dirtyFields: s
							? {}
							: e.keepDirtyValues
								? e.keepDefaultValues && v
									? wt(g, v)
									: o.dirtyFields
								: e.keepDefaultValues && t
									? wt(g, t)
									: e.keepDirty
										? o.dirtyFields
										: {},
						touchedFields: e.keepTouched ? o.touchedFields : {},
						errors: e.keepErrors ? o.errors : {},
						isSubmitSuccessful:
							!!e.keepIsSubmitSuccessful && o.isSubmitSuccessful,
						isSubmitting: !1,
					});
			},
			Ot = (t, e) => dt(B(t) ? t(v) : t, e);
		return {
			control: {
				register: lt,
				unregister: ot,
				getFieldState: rt,
				handleSubmit: ct,
				setError: st,
				_executeSchema: j,
				_getWatch: I,
				_getDirty: N,
				_updateValid: X,
				_removeUnmounted: () => {
					for (const t of x.unMount) {
						const e = O(m, t);
						e &&
							(e._f.refs
								? e._f.refs.every((t) => !gt(t))
								: !gt(e._f.ref)) &&
							ot(t);
					}
					x.unMount = new Set();
				},
				_updateFieldArray: (t, e = [], n, r, s = !0, a = !0) => {
					if (r && n && !i.disabled) {
						if (((w.action = !0), a && Array.isArray(O(m, t)))) {
							const e = n(O(m, t), r.argA, r.argB);
							s && b(m, t, e);
						}
						if (a && Array.isArray(O(o.errors, t))) {
							const e = n(O(o.errors, t), r.argA, r.argB);
							s && b(o.errors, t, e),
								((t, e) => {
									!d(O(t, e)).length && ut(t, e);
								})(o.errors, t);
						}
						if (
							k.touchedFields &&
							a &&
							Array.isArray(O(o.touchedFields, t))
						) {
							const e = n(O(o.touchedFields, t), r.argA, r.argB);
							s && b(o.touchedFields, t, e);
						}
						k.dirtyFields && (o.dirtyFields = wt(g, v)),
							$.state.next({
								name: t,
								isDirty: N(t, e),
								dirtyFields: o.dirtyFields,
								errors: o.errors,
								isValid: o.isValid,
							});
					} else b(v, t, e);
				},
				_updateDisabledField: at,
				_getFieldArray: (t) =>
					d(
						O(
							w.mount ? v : g,
							t,
							i.shouldUnregister ? O(g, t, []) : []
						)
					),
				_reset: dt,
				_resetDefaultValues: () =>
					B(i.defaultValues) &&
					i.defaultValues().then((t) => {
						Ot(t, i.resetOptions), $.state.next({ isLoading: !1 });
					}),
				_updateFormState: (t) => {
					o = { ...o, ...t };
				},
				_disableForm: (t) => {
					p(t) &&
						($.state.next({ disabled: t }),
						Y(
							m,
							(e, i) => {
								const n = O(m, i);
								n &&
									((e.disabled = n._f.disabled || t),
									Array.isArray(n._f.refs) &&
										n._f.refs.forEach((e) => {
											e.disabled = n._f.disabled || t;
										}));
							},
							0,
							!1
						));
				},
				_subjects: $,
				_proxyFormState: k,
				_setErrors: (t) => {
					(o.errors = t),
						$.state.next({ errors: o.errors, isValid: !1 });
				},
				get _fields() {
					return m;
				},
				get _formValues() {
					return v;
				},
				get _state() {
					return w;
				},
				set _state(t) {
					w = t;
				},
				get _defaultValues() {
					return g;
				},
				get _names() {
					return x;
				},
				set _names(t) {
					x = t;
				},
				get _formState() {
					return o;
				},
				set _formState(t) {
					o = t;
				},
				get _options() {
					return i;
				},
				set _options(t) {
					i = { ...i, ...t };
				},
			},
			trigger: et,
			register: lt,
			handleSubmit: ct,
			watch: (t, e) =>
				B(t)
					? $.values.subscribe({ next: (i) => t(I(void 0, e), i) })
					: I(t, e, !0),
			setValue: K,
			getValues: it,
			reset: Ot,
			resetField: (t, e = {}) => {
				O(m, t) &&
					(f(e.defaultValue)
						? K(t, u(O(g, t)))
						: (K(t, e.defaultValue), b(g, t, u(e.defaultValue))),
					e.keepTouched || ut(o.touchedFields, t),
					e.keepDirty ||
						(ut(o.dirtyFields, t),
						(o.isDirty = e.defaultValue ? N(t, u(O(g, t))) : N())),
					e.keepError || (ut(o.errors, t), k.isValid && X()),
					$.state.next({ ...o }));
			},
			clearErrors: (t) => {
				t && A(t).forEach((t) => ut(o.errors, t)),
					$.state.next({ errors: t ? o.errors : {} });
			},
			unregister: ot,
			setError: st,
			setFocus: (t, e = {}) => {
				const i = O(m, t),
					n = i && i._f;
				if (n) {
					const t = n.refs ? n.refs[0] : n.ref;
					t.focus &&
						(t.focus(),
						e.shouldSelect && B(t.select) && t.select());
				}
			},
			getFieldState: rt,
		};
	}
	const Tt = window.wp.components,
		Ct = window.wp.i18n,
		At = window.ReactJSXRuntime,
		Xt = ({ title: t, description: e }) =>
			(0, At.jsxs)('div', {
				children: [
					(0, At.jsx)(Tt.__experimentalHeading, {
						level: 5,
						weight: '600',
						children: t,
					}),
					(0, At.jsx)(Tt.__experimentalText, {
						color: '#757575',
						children: e,
					}),
				],
			}),
		Mt = ({ sectionTitle: t, sectionDescription: e, children: i }) =>
			(0, At.jsx)('div', {
				className: 'XXJ5dLHd21BPHVAstEpw',
				children: (0, At.jsxs)(Tt.__experimentalVStack, {
					spacing: 4,
					children: [
						(0, At.jsx)(Xt, { title: t, description: e }),
						i,
					],
				}),
			}),
		Rt = ({ settingsGroup: t, fieldName: e }) => {
			const { control: i } = $();
			return (0, At.jsx)(V, {
				name: `${t}.${e}`,
				control: i,
				render: ({ field: t }) =>
					(0, At.jsx)(Tt.__experimentalNumberControl, {
						...t,
						onChange: (e) => t.onChange(parseInt(e, 10) || 0),
						__next40pxDefaultSize: !0,
					}),
			});
		},
		_t = ({ settingsGroup: t, fieldName: e }) => {
			const { control: i } = $();
			return (0, At.jsx)(V, {
				name: `${t}.${e}`,
				control: i,
				render: ({ field: t }) =>
					(0, At.jsx)(Tt.ToggleControl, {
						...t,
						label: (0, Ct.__)('Activate', 'timbertail'),
						checked: t.value,
						__nextHasNoMarginBottom: !0,
					}),
			});
		},
		Vt = ({ settingsGroup: t, fieldName: e }) => {
			const { control: i } = $();
			return (0, At.jsx)(V, {
				name: `${t}.${e}`,
				control: i,
				render: ({ field: t }) =>
					(0, At.jsx)(Tt.FormTokenField, {
						...t,
						label: '',
						__next40pxDefaultSize: !0,
						__nextHasNoMarginBottom: !0,
					}),
			});
		},
		qt = () => {
			const t = [
				{
					fieldName: 'excerptLength',
					sectionTitle: (0, Ct.__)('Excerpt length', 'timbertail'),
					sectionDescription: (0, Ct.__)(
						'Change the excerpt length. By default, WordPress excerpts show the first 55 words of a post.',
						'timbertail'
					),
					component: Rt,
				},
				{
					fieldName: 'customBodyClasses',
					sectionTitle: (0, Ct.__)(
						'Custom CSS classes for body tag',
						'timbertail'
					),
					sectionDescription: (0, Ct.__)(
						'Add one or multiple custom CSS classes for the body tag.',
						'timbertail'
					),
					component: Vt,
				},
				{
					fieldName: 'disableWordpressVersion',
					sectionTitle: (0, Ct.__)('WordPress version', 'timbertail'),
					sectionDescription: (0, Ct.__)(
						'To make it harder for malicious actors to detect which version of WordPress you are using, remove the WordPress version number from appearing anywhere in your site’s frontend code.',
						'timbertail'
					),
					component: _t,
				},
				{
					fieldName: 'addSvgSupport',
					sectionTitle: (0, Ct.__)('SVG Support', 'timbertail'),
					sectionDescription: (0, Ct.__)(
						'Enable SVG file type uploads.',
						'timbertail'
					),
					component: _t,
				},
				{
					fieldName: 'disableXmlRpc',
					sectionTitle: (0, Ct.__)('XML-RPC Support', 'timbertail'),
					sectionDescription: (0, Ct.__)(
						'Disable XML-RPC for security purposes.',
						'timbertail'
					),
					component: _t,
				},
				{
					fieldName: 'disableAdminBar',
					sectionTitle: (0, Ct.__)(
						'Admin Bar on Frontend',
						'timbertail'
					),
					sectionDescription: (0, Ct.__)(
						'Disable the admin bar for all users except site administrators.',
						'timbertail'
					),
					component: _t,
				},
				{
					fieldName: 'disableFileEdit',
					sectionTitle: (0, Ct.__)(
						'Plugin and Theme Editor',
						'timbertail'
					),
					sectionDescription: (0, Ct.__)(
						'Disable the plugin/theme editor.',
						'timbertail'
					),
					component: _t,
				},
			];
			return (0, At.jsx)(At.Fragment, {
				children: t.map(
					({
						fieldName: t,
						sectionTitle: e,
						sectionDescription: i,
						component: n,
					}) =>
						(0, At.jsx)(
							Mt,
							{
								sectionTitle: e,
								sectionDescription: i,
								children: (0, At.jsx)(n, {
									settingsGroup: 'commonSettings',
									fieldName: t,
								}),
							},
							t
						)
				),
			});
		},
		jt = 1024;
	let Dt = 0;
	class Et {
		constructor(t, e) {
			(this.from = t), (this.to = e);
		}
	}
	class Wt {
		constructor(t = {}) {
			(this.id = Dt++),
				(this.perNode = !!t.perNode),
				(this.deserialize =
					t.deserialize ||
					(() => {
						throw new Error(
							"This node type doesn't define a deserialize function"
						);
					}));
		}
		add(t) {
			if (this.perNode)
				throw new RangeError("Can't add per-node props to node types");
			return (
				'function' != typeof t && (t = Lt.match(t)),
				(e) => {
					let i = t(e);
					return void 0 === i ? null : [this, i];
				}
			);
		}
	}
	(Wt.closedBy = new Wt({ deserialize: (t) => t.split(' ') })),
		(Wt.openedBy = new Wt({ deserialize: (t) => t.split(' ') })),
		(Wt.group = new Wt({ deserialize: (t) => t.split(' ') })),
		(Wt.isolate = new Wt({
			deserialize: (t) => {
				if (t && 'rtl' != t && 'ltr' != t && 'auto' != t)
					throw new RangeError('Invalid value for isolate: ' + t);
				return t || 'auto';
			},
		})),
		(Wt.contextHash = new Wt({ perNode: !0 })),
		(Wt.lookAhead = new Wt({ perNode: !0 })),
		(Wt.mounted = new Wt({ perNode: !0 }));
	class Yt {
		constructor(t, e, i) {
			(this.tree = t), (this.overlay = e), (this.parser = i);
		}
		static get(t) {
			return t && t.props && t.props[Wt.mounted.id];
		}
	}
	const zt = Object.create(null);
	class Lt {
		constructor(t, e, i, n = 0) {
			(this.name = t), (this.props = e), (this.id = i), (this.flags = n);
		}
		static define(t) {
			let e = t.props && t.props.length ? Object.create(null) : zt,
				i =
					(t.top ? 1 : 0) |
					(t.skipped ? 2 : 0) |
					(t.error ? 4 : 0) |
					(null == t.name ? 8 : 0),
				n = new Lt(t.name || '', e, t.id, i);
			if (t.props)
				for (let i of t.props)
					if ((Array.isArray(i) || (i = i(n)), i)) {
						if (i[0].perNode)
							throw new RangeError(
								"Can't store a per-node prop on a node type"
							);
						e[i[0].id] = i[1];
					}
			return n;
		}
		prop(t) {
			return this.props[t.id];
		}
		get isTop() {
			return (1 & this.flags) > 0;
		}
		get isSkipped() {
			return (2 & this.flags) > 0;
		}
		get isError() {
			return (4 & this.flags) > 0;
		}
		get isAnonymous() {
			return (8 & this.flags) > 0;
		}
		is(t) {
			if ('string' == typeof t) {
				if (this.name == t) return !0;
				let e = this.prop(Wt.group);
				return !!e && e.indexOf(t) > -1;
			}
			return this.id == t;
		}
		static match(t) {
			let e = Object.create(null);
			for (let i in t) for (let n of i.split(' ')) e[n] = t[i];
			return (t) => {
				for (
					let i = t.prop(Wt.group), n = -1;
					n < (i ? i.length : 0);
					n++
				) {
					let r = e[n < 0 ? t.name : i[n]];
					if (r) return r;
				}
			};
		}
	}
	Lt.none = new Lt('', Object.create(null), 0, 8);
	class Bt {
		constructor(t) {
			this.types = t;
			for (let e = 0; e < t.length; e++)
				if (t[e].id != e)
					throw new RangeError(
						'Node type ids should correspond to array positions when creating a node set'
					);
		}
		extend(...t) {
			let e = [];
			for (let i of this.types) {
				let n = null;
				for (let e of t) {
					let t = e(i);
					t &&
						(n || (n = Object.assign({}, i.props)),
						(n[t[0].id] = t[1]));
				}
				e.push(n ? new Lt(i.name, n, i.id, i.flags) : i);
			}
			return new Bt(e);
		}
	}
	const Ut = new WeakMap(),
		Nt = new WeakMap();
	var Gt;
	!(function (t) {
		(t[(t.ExcludeBuffers = 1)] = 'ExcludeBuffers'),
			(t[(t.IncludeAnonymous = 2)] = 'IncludeAnonymous'),
			(t[(t.IgnoreMounts = 4)] = 'IgnoreMounts'),
			(t[(t.IgnoreOverlays = 8)] = 'IgnoreOverlays');
	})(Gt || (Gt = {}));
	class It {
		constructor(t, e, i, n, r) {
			if (
				((this.type = t),
				(this.children = e),
				(this.positions = i),
				(this.length = n),
				(this.props = null),
				r && r.length)
			) {
				this.props = Object.create(null);
				for (let [t, e] of r)
					this.props['number' == typeof t ? t : t.id] = e;
			}
		}
		toString() {
			let t = Yt.get(this);
			if (t && !t.overlay) return t.tree.toString();
			let e = '';
			for (let t of this.children) {
				let i = t.toString();
				i && (e && (e += ','), (e += i));
			}
			return this.type.name
				? (/\W/.test(this.type.name) && !this.type.isError
						? JSON.stringify(this.type.name)
						: this.type.name) + (e.length ? '(' + e + ')' : '')
				: e;
		}
		cursor(t = 0) {
			return new le(this.topNode, t);
		}
		cursorAt(t, e = 0, i = 0) {
			let n = Ut.get(this) || this.topNode,
				r = new le(n);
			return r.moveTo(t, e), Ut.set(this, r._tree), r;
		}
		get topNode() {
			return new ee(this, 0, 0, null);
		}
		resolve(t, e = 0) {
			let i = Jt(Ut.get(this) || this.topNode, t, e, !1);
			return Ut.set(this, i), i;
		}
		resolveInner(t, e = 0) {
			let i = Jt(Nt.get(this) || this.topNode, t, e, !0);
			return Nt.set(this, i), i;
		}
		resolveStack(t, e = 0) {
			return (function (t, e, i) {
				let n = t.resolveInner(e, i),
					r = null;
				for (
					let t = n instanceof ee ? n : n.context.parent;
					t;
					t = t.parent
				)
					if (t.index < 0) {
						let s = t.parent;
						(r || (r = [n])).push(s.resolve(e, i)), (t = s);
					} else {
						let s = Yt.get(t.tree);
						if (
							s &&
							s.overlay &&
							s.overlay[0].from <= e &&
							s.overlay[s.overlay.length - 1].to >= e
						) {
							let o = new ee(
								s.tree,
								s.overlay[0].from + t.from,
								-1,
								t
							);
							(r || (r = [n])).push(Jt(o, e, i, !1));
						}
					}
				return r ? oe(r) : n;
			})(this, t, e);
		}
		iterate(t) {
			let { enter: e, leave: i, from: n = 0, to: r = this.length } = t,
				s = t.mode || 0,
				o = (s & Gt.IncludeAnonymous) > 0;
			for (let t = this.cursor(s | Gt.IncludeAnonymous); ; ) {
				let s = !1;
				if (
					t.from <= r &&
					t.to >= n &&
					((!o && t.type.isAnonymous) || !1 !== e(t))
				) {
					if (t.firstChild()) continue;
					s = !0;
				}
				for (
					;
					s && i && (o || !t.type.isAnonymous) && i(t),
						!t.nextSibling();

				) {
					if (!t.parent()) return;
					s = !0;
				}
			}
		}
		prop(t) {
			return t.perNode
				? this.props
					? this.props[t.id]
					: void 0
				: this.type.prop(t);
		}
		get propValues() {
			let t = [];
			if (this.props)
				for (let e in this.props) t.push([+e, this.props[e]]);
			return t;
		}
		balance(t = {}) {
			return this.children.length <= 8
				? this
				: de(
						Lt.none,
						this.children,
						this.positions,
						0,
						this.children.length,
						0,
						this.length,
						(t, e, i) =>
							new It(this.type, t, e, i, this.propValues),
						t.makeTree || ((t, e, i) => new It(Lt.none, t, e, i))
					);
		}
		static build(t) {
			return (function (t) {
				var e;
				let {
						buffer: i,
						nodeSet: n,
						maxBufferLength: r = jt,
						reused: s = [],
						minRepeatType: o = n.types.length,
					} = t,
					a = Array.isArray(i) ? new Ft(i, i.length) : i,
					l = n.types,
					h = 0,
					c = 0;
				function u(t, e, i, m, g, b) {
					let { id: y, start: v, end: w, size: S } = a,
						x = c,
						Q = h;
					for (; S < 0; ) {
						if ((a.next(), -1 == S)) {
							let e = s[y];
							return i.push(e), void m.push(v - t);
						}
						if (-3 == S) return void (h = y);
						if (-4 == S) return void (c = y);
						throw new RangeError(`Unrecognized record size: ${S}`);
					}
					let k,
						$,
						P = l[y],
						Z = v - t;
					if (
						w - v <= r &&
						($ = (function (t, e) {
							let i = a.fork(),
								n = 0,
								s = 0,
								l = 0,
								h = i.end - r,
								c = { size: 0, start: 0, skip: 0 };
							t: for (let r = i.pos - t; i.pos > r; ) {
								let t = i.size;
								if (i.id == e && t >= 0) {
									(c.size = n),
										(c.start = s),
										(c.skip = l),
										(l += 4),
										(n += 4),
										i.next();
									continue;
								}
								let a = i.pos - t;
								if (t < 0 || a < r || i.start < h) break;
								let u = i.id >= o ? 4 : 0,
									d = i.start;
								for (i.next(); i.pos > a; ) {
									if (i.size < 0) {
										if (-3 != i.size) break t;
										u += 4;
									} else i.id >= o && (u += 4);
									i.next();
								}
								(s = d), (n += t), (l += u);
							}
							return (
								(e < 0 || n == t) &&
									((c.size = n), (c.start = s), (c.skip = l)),
								c.size > 4 ? c : void 0
							);
						})(a.pos - e, g))
					) {
						let e = new Uint16Array($.size - $.skip),
							i = a.pos - $.size,
							r = e.length;
						for (; a.pos > i; ) r = p($.start, e, r);
						(k = new Ht(e, w - $.start, n)), (Z = $.start - t);
					} else {
						let t = a.pos - S;
						a.next();
						let e = [],
							i = [],
							n = y >= o ? y : -1,
							s = 0,
							l = w;
						for (; a.pos > t; )
							n >= 0 && a.id == n && a.size >= 0
								? (a.end <= l - r &&
										(f(e, i, v, s, a.end, l, n, x, Q),
										(s = e.length),
										(l = a.end)),
									a.next())
								: b > 2500
									? d(v, t, e, i)
									: u(v, t, e, i, n, b + 1);
						if (
							(n >= 0 &&
								s > 0 &&
								s < e.length &&
								f(e, i, v, s, v, l, n, x, Q),
							e.reverse(),
							i.reverse(),
							n > -1 && s > 0)
						) {
							let t = (function (t, e) {
								return (i, n, r) => {
									let s,
										o,
										a = 0,
										l = i.length - 1;
									if (l >= 0 && (s = i[l]) instanceof It) {
										if (!l && s.type == t && s.length == r)
											return s;
										(o = s.prop(Wt.lookAhead)) &&
											(a = n[l] + s.length + o);
									}
									return O(t, i, n, r, a, e);
								};
							})(P, Q);
							k = de(P, e, i, 0, e.length, 0, w - v, t, t);
						} else k = O(P, e, i, w - v, x - w, Q);
					}
					i.push(k), m.push(Z);
				}
				function d(t, e, i, s) {
					let o = [],
						l = 0,
						h = -1;
					for (; a.pos > e; ) {
						let { id: t, start: e, end: i, size: n } = a;
						if (n > 4) a.next();
						else {
							if (h > -1 && e < h) break;
							h < 0 && (h = i - r),
								o.push(t, e, i),
								l++,
								a.next();
						}
					}
					if (l) {
						let e = new Uint16Array(4 * l),
							r = o[o.length - 2];
						for (let t = o.length - 3, i = 0; t >= 0; t -= 3)
							(e[i++] = o[t]),
								(e[i++] = o[t + 1] - r),
								(e[i++] = o[t + 2] - r),
								(e[i++] = i);
						i.push(new Ht(e, o[2] - r, n)), s.push(r - t);
					}
				}
				function f(t, e, i, r, s, o, a, l, h) {
					let c = [],
						u = [];
					for (; t.length > r; )
						c.push(t.pop()), u.push(e.pop() + i - s);
					t.push(O(n.types[a], c, u, o - s, l - o, h)), e.push(s - i);
				}
				function O(t, e, i, n, r, s, o) {
					if (s) {
						let t = [Wt.contextHash, s];
						o = o ? [t].concat(o) : [t];
					}
					if (r > 25) {
						let t = [Wt.lookAhead, r];
						o = o ? [t].concat(o) : [t];
					}
					return new It(t, e, i, n, o);
				}
				function p(t, e, i) {
					let { id: n, start: r, end: s, size: l } = a;
					if ((a.next(), l >= 0 && n < o)) {
						let o = i;
						if (l > 4) {
							let n = a.pos - (l - 4);
							for (; a.pos > n; ) i = p(t, e, i);
						}
						(e[--i] = o),
							(e[--i] = s - t),
							(e[--i] = r - t),
							(e[--i] = n);
					} else -3 == l ? (h = n) : -4 == l && (c = n);
					return i;
				}
				let m = [],
					g = [];
				for (; a.pos > 0; )
					u(t.start || 0, t.bufferStart || 0, m, g, -1, 0);
				let b =
					null !== (e = t.length) && void 0 !== e
						? e
						: m.length
							? g[0] + m[0].length
							: 0;
				return new It(l[t.topID], m.reverse(), g.reverse(), b);
			})(t);
		}
	}
	It.empty = new It(Lt.none, [], [], 0);
	class Ft {
		constructor(t, e) {
			(this.buffer = t), (this.index = e);
		}
		get id() {
			return this.buffer[this.index - 4];
		}
		get start() {
			return this.buffer[this.index - 3];
		}
		get end() {
			return this.buffer[this.index - 2];
		}
		get size() {
			return this.buffer[this.index - 1];
		}
		get pos() {
			return this.index;
		}
		next() {
			this.index -= 4;
		}
		fork() {
			return new Ft(this.buffer, this.index);
		}
	}
	class Ht {
		constructor(t, e, i) {
			(this.buffer = t), (this.length = e), (this.set = i);
		}
		get type() {
			return Lt.none;
		}
		toString() {
			let t = [];
			for (let e = 0; e < this.buffer.length; )
				t.push(this.childString(e)), (e = this.buffer[e + 3]);
			return t.join(',');
		}
		childString(t) {
			let e = this.buffer[t],
				i = this.buffer[t + 3],
				n = this.set.types[e],
				r = n.name;
			if (
				(/\W/.test(r) && !n.isError && (r = JSON.stringify(r)),
				i == (t += 4))
			)
				return r;
			let s = [];
			for (; t < i; )
				s.push(this.childString(t)), (t = this.buffer[t + 3]);
			return r + '(' + s.join(',') + ')';
		}
		findChild(t, e, i, n, r) {
			let { buffer: s } = this,
				o = -1;
			for (
				let a = t;
				a != e && !(Kt(r, n, s[a + 1], s[a + 2]) && ((o = a), i > 0));
				a = s[a + 3]
			);
			return o;
		}
		slice(t, e, i) {
			let n = this.buffer,
				r = new Uint16Array(e - t),
				s = 0;
			for (let o = t, a = 0; o < e; ) {
				(r[a++] = n[o++]), (r[a++] = n[o++] - i);
				let e = (r[a++] = n[o++] - i);
				(r[a++] = n[o++] - t), (s = Math.max(s, e));
			}
			return new Ht(r, s, this.set);
		}
	}
	function Kt(t, e, i, n) {
		switch (t) {
			case -2:
				return i < e;
			case -1:
				return n >= e && i < e;
			case 0:
				return i < e && n > e;
			case 1:
				return i <= e && n > e;
			case 2:
				return n > e;
			case 4:
				return !0;
		}
	}
	function Jt(t, e, i, n) {
		for (
			var r;
			t.from == t.to ||
			(i < 1 ? t.from >= e : t.from > e) ||
			(i > -1 ? t.to <= e : t.to < e);

		) {
			let e = !n && t instanceof ee && t.index < 0 ? null : t.parent;
			if (!e) return t;
			t = e;
		}
		let s = n ? 0 : Gt.IgnoreOverlays;
		if (n)
			for (let n = t, o = n.parent; o; n = o, o = n.parent)
				n instanceof ee &&
					n.index < 0 &&
					(null === (r = o.enter(e, i, s)) || void 0 === r
						? void 0
						: r.from) != n.from &&
					(t = o);
		for (;;) {
			let n = t.enter(e, i, s);
			if (!n) return t;
			t = n;
		}
	}
	class te {
		cursor(t = 0) {
			return new le(this, t);
		}
		getChild(t, e = null, i = null) {
			let n = ie(this, t, e, i);
			return n.length ? n[0] : null;
		}
		getChildren(t, e = null, i = null) {
			return ie(this, t, e, i);
		}
		resolve(t, e = 0) {
			return Jt(this, t, e, !1);
		}
		resolveInner(t, e = 0) {
			return Jt(this, t, e, !0);
		}
		matchContext(t) {
			return ne(this.parent, t);
		}
		enterUnfinishedNodesBefore(t) {
			let e = this.childBefore(t),
				i = this;
			for (; e; ) {
				let t = e.lastChild;
				if (!t || t.to != e.to) break;
				t.type.isError && t.from == t.to
					? ((i = e), (e = t.prevSibling))
					: (e = t);
			}
			return i;
		}
		get node() {
			return this;
		}
		get next() {
			return this.parent;
		}
	}
	class ee extends te {
		constructor(t, e, i, n) {
			super(),
				(this._tree = t),
				(this.from = e),
				(this.index = i),
				(this._parent = n);
		}
		get type() {
			return this._tree.type;
		}
		get name() {
			return this._tree.type.name;
		}
		get to() {
			return this.from + this._tree.length;
		}
		nextChild(t, e, i, n, r = 0) {
			for (let s = this; ; ) {
				for (
					let { children: o, positions: a } = s._tree,
						l = e > 0 ? o.length : -1;
					t != l;
					t += e
				) {
					let l = o[t],
						h = a[t] + s.from;
					if (Kt(n, i, h, h + l.length))
						if (l instanceof Ht) {
							if (r & Gt.ExcludeBuffers) continue;
							let o = l.findChild(
								0,
								l.buffer.length,
								e,
								i - h,
								n
							);
							if (o > -1)
								return new se(new re(s, l, t, h), null, o);
						} else if (
							r & Gt.IncludeAnonymous ||
							!l.type.isAnonymous ||
							he(l)
						) {
							let o;
							if (
								!(r & Gt.IgnoreMounts) &&
								(o = Yt.get(l)) &&
								!o.overlay
							)
								return new ee(o.tree, h, t, s);
							let a = new ee(l, h, t, s);
							return r & Gt.IncludeAnonymous ||
								!a.type.isAnonymous
								? a
								: a.nextChild(
										e < 0 ? l.children.length - 1 : 0,
										e,
										i,
										n
									);
						}
				}
				if (r & Gt.IncludeAnonymous || !s.type.isAnonymous) return null;
				if (
					((t =
						s.index >= 0
							? s.index + e
							: e < 0
								? -1
								: s._parent._tree.children.length),
					(s = s._parent),
					!s)
				)
					return null;
			}
		}
		get firstChild() {
			return this.nextChild(0, 1, 0, 4);
		}
		get lastChild() {
			return this.nextChild(this._tree.children.length - 1, -1, 0, 4);
		}
		childAfter(t) {
			return this.nextChild(0, 1, t, 2);
		}
		childBefore(t) {
			return this.nextChild(this._tree.children.length - 1, -1, t, -2);
		}
		enter(t, e, i = 0) {
			let n;
			if (
				!(i & Gt.IgnoreOverlays) &&
				(n = Yt.get(this._tree)) &&
				n.overlay
			) {
				let i = t - this.from;
				for (let { from: t, to: r } of n.overlay)
					if ((e > 0 ? t <= i : t < i) && (e < 0 ? r >= i : r > i))
						return new ee(
							n.tree,
							n.overlay[0].from + this.from,
							-1,
							this
						);
			}
			return this.nextChild(0, 1, t, e, i);
		}
		nextSignificantParent() {
			let t = this;
			for (; t.type.isAnonymous && t._parent; ) t = t._parent;
			return t;
		}
		get parent() {
			return this._parent ? this._parent.nextSignificantParent() : null;
		}
		get nextSibling() {
			return this._parent && this.index >= 0
				? this._parent.nextChild(this.index + 1, 1, 0, 4)
				: null;
		}
		get prevSibling() {
			return this._parent && this.index >= 0
				? this._parent.nextChild(this.index - 1, -1, 0, 4)
				: null;
		}
		get tree() {
			return this._tree;
		}
		toTree() {
			return this._tree;
		}
		toString() {
			return this._tree.toString();
		}
	}
	function ie(t, e, i, n) {
		let r = t.cursor(),
			s = [];
		if (!r.firstChild()) return s;
		if (null != i)
			for (let t = !1; !t; )
				if (((t = r.type.is(i)), !r.nextSibling())) return s;
		for (;;) {
			if (null != n && r.type.is(n)) return s;
			if ((r.type.is(e) && s.push(r.node), !r.nextSibling()))
				return null == n ? s : [];
		}
	}
	function ne(t, e, i = e.length - 1) {
		for (let n = t; i >= 0; n = n.parent) {
			if (!n) return !1;
			if (!n.type.isAnonymous) {
				if (e[i] && e[i] != n.name) return !1;
				i--;
			}
		}
		return !0;
	}
	class re {
		constructor(t, e, i, n) {
			(this.parent = t),
				(this.buffer = e),
				(this.index = i),
				(this.start = n);
		}
	}
	class se extends te {
		get name() {
			return this.type.name;
		}
		get from() {
			return (
				this.context.start + this.context.buffer.buffer[this.index + 1]
			);
		}
		get to() {
			return (
				this.context.start + this.context.buffer.buffer[this.index + 2]
			);
		}
		constructor(t, e, i) {
			super(),
				(this.context = t),
				(this._parent = e),
				(this.index = i),
				(this.type = t.buffer.set.types[t.buffer.buffer[i]]);
		}
		child(t, e, i) {
			let { buffer: n } = this.context,
				r = n.findChild(
					this.index + 4,
					n.buffer[this.index + 3],
					t,
					e - this.context.start,
					i
				);
			return r < 0 ? null : new se(this.context, this, r);
		}
		get firstChild() {
			return this.child(1, 0, 4);
		}
		get lastChild() {
			return this.child(-1, 0, 4);
		}
		childAfter(t) {
			return this.child(1, t, 2);
		}
		childBefore(t) {
			return this.child(-1, t, -2);
		}
		enter(t, e, i = 0) {
			if (i & Gt.ExcludeBuffers) return null;
			let { buffer: n } = this.context,
				r = n.findChild(
					this.index + 4,
					n.buffer[this.index + 3],
					e > 0 ? 1 : -1,
					t - this.context.start,
					e
				);
			return r < 0 ? null : new se(this.context, this, r);
		}
		get parent() {
			return this._parent || this.context.parent.nextSignificantParent();
		}
		externalSibling(t) {
			return this._parent
				? null
				: this.context.parent.nextChild(
						this.context.index + t,
						t,
						0,
						4
					);
		}
		get nextSibling() {
			let { buffer: t } = this.context,
				e = t.buffer[this.index + 3];
			return e <
				(this._parent
					? t.buffer[this._parent.index + 3]
					: t.buffer.length)
				? new se(this.context, this._parent, e)
				: this.externalSibling(1);
		}
		get prevSibling() {
			let { buffer: t } = this.context,
				e = this._parent ? this._parent.index + 4 : 0;
			return this.index == e
				? this.externalSibling(-1)
				: new se(
						this.context,
						this._parent,
						t.findChild(e, this.index, -1, 0, 4)
					);
		}
		get tree() {
			return null;
		}
		toTree() {
			let t = [],
				e = [],
				{ buffer: i } = this.context,
				n = this.index + 4,
				r = i.buffer[this.index + 3];
			if (r > n) {
				let s = i.buffer[this.index + 1];
				t.push(i.slice(n, r, s)), e.push(0);
			}
			return new It(this.type, t, e, this.to - this.from);
		}
		toString() {
			return this.context.buffer.childString(this.index);
		}
	}
	function oe(t) {
		if (!t.length) return null;
		let e = 0,
			i = t[0];
		for (let n = 1; n < t.length; n++) {
			let r = t[n];
			(r.from > i.from || r.to < i.to) && ((i = r), (e = n));
		}
		let n = i instanceof ee && i.index < 0 ? null : i.parent,
			r = t.slice();
		return n ? (r[e] = n) : r.splice(e, 1), new ae(r, i);
	}
	class ae {
		constructor(t, e) {
			(this.heads = t), (this.node = e);
		}
		get next() {
			return oe(this.heads);
		}
	}
	class le {
		get name() {
			return this.type.name;
		}
		constructor(t, e = 0) {
			if (
				((this.mode = e),
				(this.buffer = null),
				(this.stack = []),
				(this.index = 0),
				(this.bufferNode = null),
				t instanceof ee)
			)
				this.yieldNode(t);
			else {
				(this._tree = t.context.parent), (this.buffer = t.context);
				for (let e = t._parent; e; e = e._parent)
					this.stack.unshift(e.index);
				(this.bufferNode = t), this.yieldBuf(t.index);
			}
		}
		yieldNode(t) {
			return (
				!!t &&
				((this._tree = t),
				(this.type = t.type),
				(this.from = t.from),
				(this.to = t.to),
				!0)
			);
		}
		yieldBuf(t, e) {
			this.index = t;
			let { start: i, buffer: n } = this.buffer;
			return (
				(this.type = e || n.set.types[n.buffer[t]]),
				(this.from = i + n.buffer[t + 1]),
				(this.to = i + n.buffer[t + 2]),
				!0
			);
		}
		yield(t) {
			return (
				!!t &&
				(t instanceof ee
					? ((this.buffer = null), this.yieldNode(t))
					: ((this.buffer = t.context),
						this.yieldBuf(t.index, t.type)))
			);
		}
		toString() {
			return this.buffer
				? this.buffer.buffer.childString(this.index)
				: this._tree.toString();
		}
		enterChild(t, e, i) {
			if (!this.buffer)
				return this.yield(
					this._tree.nextChild(
						t < 0 ? this._tree._tree.children.length - 1 : 0,
						t,
						e,
						i,
						this.mode
					)
				);
			let { buffer: n } = this.buffer,
				r = n.findChild(
					this.index + 4,
					n.buffer[this.index + 3],
					t,
					e - this.buffer.start,
					i
				);
			return !(r < 0) && (this.stack.push(this.index), this.yieldBuf(r));
		}
		firstChild() {
			return this.enterChild(1, 0, 4);
		}
		lastChild() {
			return this.enterChild(-1, 0, 4);
		}
		childAfter(t) {
			return this.enterChild(1, t, 2);
		}
		childBefore(t) {
			return this.enterChild(-1, t, -2);
		}
		enter(t, e, i = this.mode) {
			return this.buffer
				? !(i & Gt.ExcludeBuffers) && this.enterChild(1, t, e)
				: this.yield(this._tree.enter(t, e, i));
		}
		parent() {
			if (!this.buffer)
				return this.yieldNode(
					this.mode & Gt.IncludeAnonymous
						? this._tree._parent
						: this._tree.parent
				);
			if (this.stack.length) return this.yieldBuf(this.stack.pop());
			let t =
				this.mode & Gt.IncludeAnonymous
					? this.buffer.parent
					: this.buffer.parent.nextSignificantParent();
			return (this.buffer = null), this.yieldNode(t);
		}
		sibling(t) {
			if (!this.buffer)
				return (
					!!this._tree._parent &&
					this.yield(
						this._tree.index < 0
							? null
							: this._tree._parent.nextChild(
									this._tree.index + t,
									t,
									0,
									4,
									this.mode
								)
					)
				);
			let { buffer: e } = this.buffer,
				i = this.stack.length - 1;
			if (t < 0) {
				let t = i < 0 ? 0 : this.stack[i] + 4;
				if (this.index != t)
					return this.yieldBuf(e.findChild(t, this.index, -1, 0, 4));
			} else {
				let t = e.buffer[this.index + 3];
				if (t < (i < 0 ? e.buffer.length : e.buffer[this.stack[i] + 3]))
					return this.yieldBuf(t);
			}
			return (
				i < 0 &&
				this.yield(
					this.buffer.parent.nextChild(
						this.buffer.index + t,
						t,
						0,
						4,
						this.mode
					)
				)
			);
		}
		nextSibling() {
			return this.sibling(1);
		}
		prevSibling() {
			return this.sibling(-1);
		}
		atLastNode(t) {
			let e,
				i,
				{ buffer: n } = this;
			if (n) {
				if (t > 0) {
					if (this.index < n.buffer.buffer.length) return !1;
				} else
					for (let t = 0; t < this.index; t++)
						if (n.buffer.buffer[t + 3] < this.index) return !1;
				({ index: e, parent: i } = n);
			} else ({ index: e, _parent: i } = this._tree);
			for (; i; { index: e, _parent: i } = i)
				if (e > -1)
					for (
						let n = e + t, r = t < 0 ? -1 : i._tree.children.length;
						n != r;
						n += t
					) {
						let t = i._tree.children[n];
						if (
							this.mode & Gt.IncludeAnonymous ||
							t instanceof Ht ||
							!t.type.isAnonymous ||
							he(t)
						)
							return !1;
					}
			return !0;
		}
		move(t, e) {
			if (e && this.enterChild(t, 0, 4)) return !0;
			for (;;) {
				if (this.sibling(t)) return !0;
				if (this.atLastNode(t) || !this.parent()) return !1;
			}
		}
		next(t = !0) {
			return this.move(1, t);
		}
		prev(t = !0) {
			return this.move(-1, t);
		}
		moveTo(t, e = 0) {
			for (
				;
				(this.from == this.to ||
					(e < 1 ? this.from >= t : this.from > t) ||
					(e > -1 ? this.to <= t : this.to < t)) &&
				this.parent();

			);
			for (; this.enterChild(1, t, e); );
			return this;
		}
		get node() {
			if (!this.buffer) return this._tree;
			let t = this.bufferNode,
				e = null,
				i = 0;
			if (t && t.context == this.buffer)
				t: for (let n = this.index, r = this.stack.length; r >= 0; ) {
					for (let s = t; s; s = s._parent)
						if (s.index == n) {
							if (n == this.index) return s;
							(e = s), (i = r + 1);
							break t;
						}
					n = this.stack[--r];
				}
			for (let t = i; t < this.stack.length; t++)
				e = new se(this.buffer, e, this.stack[t]);
			return (this.bufferNode = new se(this.buffer, e, this.index));
		}
		get tree() {
			return this.buffer ? null : this._tree._tree;
		}
		iterate(t, e) {
			for (let i = 0; ; ) {
				let n = !1;
				if (this.type.isAnonymous || !1 !== t(this)) {
					if (this.firstChild()) {
						i++;
						continue;
					}
					this.type.isAnonymous || (n = !0);
				}
				for (;;) {
					if ((n && e && e(this), (n = this.type.isAnonymous), !i))
						return;
					if (this.nextSibling()) break;
					this.parent(), i--, (n = !0);
				}
			}
		}
		matchContext(t) {
			if (!this.buffer) return ne(this.node.parent, t);
			let { buffer: e } = this.buffer,
				{ types: i } = e.set;
			for (let n = t.length - 1, r = this.stack.length - 1; n >= 0; r--) {
				if (r < 0) return ne(this._tree, t, n);
				let s = i[e.buffer[this.stack[r]]];
				if (!s.isAnonymous) {
					if (t[n] && t[n] != s.name) return !1;
					n--;
				}
			}
			return !0;
		}
	}
	function he(t) {
		return t.children.some(
			(t) => t instanceof Ht || !t.type.isAnonymous || he(t)
		);
	}
	const ce = new WeakMap();
	function ue(t, e) {
		if (!t.isAnonymous || e instanceof Ht || e.type != t) return 1;
		let i = ce.get(e);
		if (null == i) {
			i = 1;
			for (let n of e.children) {
				if (n.type != t || !(n instanceof It)) {
					i = 1;
					break;
				}
				i += ue(t, n);
			}
			ce.set(e, i);
		}
		return i;
	}
	function de(t, e, i, n, r, s, o, a, l) {
		let h = 0;
		for (let i = n; i < r; i++) h += ue(t, e[i]);
		let c = Math.ceil((1.5 * h) / 8),
			u = [],
			d = [];
		return (
			(function e(i, n, r, o, a) {
				for (let h = r; h < o; ) {
					let r = h,
						f = n[h],
						O = ue(t, i[h]);
					for (h++; h < o; h++) {
						let e = ue(t, i[h]);
						if (O + e >= c) break;
						O += e;
					}
					if (h == r + 1) {
						if (O > c) {
							let t = i[r];
							e(
								t.children,
								t.positions,
								0,
								t.children.length,
								n[r] + a
							);
							continue;
						}
						u.push(i[r]);
					} else {
						let e = n[h - 1] + i[h - 1].length - f;
						u.push(de(t, i, n, r, h, f, e, null, l));
					}
					d.push(f + a - s);
				}
			})(e, i, n, r, 0),
			(a || l)(u, d, o)
		);
	}
	class fe {
		constructor() {
			this.map = new WeakMap();
		}
		setBuffer(t, e, i) {
			let n = this.map.get(t);
			n || this.map.set(t, (n = new Map())), n.set(e, i);
		}
		getBuffer(t, e) {
			let i = this.map.get(t);
			return i && i.get(e);
		}
		set(t, e) {
			t instanceof se
				? this.setBuffer(t.context.buffer, t.index, e)
				: t instanceof ee && this.map.set(t.tree, e);
		}
		get(t) {
			return t instanceof se
				? this.getBuffer(t.context.buffer, t.index)
				: t instanceof ee
					? this.map.get(t.tree)
					: void 0;
		}
		cursorSet(t, e) {
			t.buffer
				? this.setBuffer(t.buffer.buffer, t.index, e)
				: this.map.set(t.tree, e);
		}
		cursorGet(t) {
			return t.buffer
				? this.getBuffer(t.buffer.buffer, t.index)
				: this.map.get(t.tree);
		}
	}
	class Oe {
		constructor(t, e, i, n, r = !1, s = !1) {
			(this.from = t),
				(this.to = e),
				(this.tree = i),
				(this.offset = n),
				(this.open = (r ? 1 : 0) | (s ? 2 : 0));
		}
		get openStart() {
			return (1 & this.open) > 0;
		}
		get openEnd() {
			return (2 & this.open) > 0;
		}
		static addTree(t, e = [], i = !1) {
			let n = [new Oe(0, t.length, t, 0, !1, i)];
			for (let i of e) i.to > t.length && n.push(i);
			return n;
		}
		static applyChanges(t, e, i = 128) {
			if (!e.length) return t;
			let n = [],
				r = 1,
				s = t.length ? t[0] : null;
			for (let o = 0, a = 0, l = 0; ; o++) {
				let h = o < e.length ? e[o] : null,
					c = h ? h.fromA : 1e9;
				if (c - a >= i)
					for (; s && s.from < c; ) {
						let e = s;
						if (a >= e.from || c <= e.to || l) {
							let t = Math.max(e.from, a) - l,
								i = Math.min(e.to, c) - l;
							e =
								t >= i
									? null
									: new Oe(
											t,
											i,
											e.tree,
											e.offset + l,
											o > 0,
											!!h
										);
						}
						if ((e && n.push(e), s.to > c)) break;
						s = r < t.length ? t[r++] : null;
					}
				if (!h) break;
				(a = h.toA), (l = h.toA - h.toB);
			}
			return n;
		}
	}
	class pe {
		startParse(t, e, i) {
			return (
				'string' == typeof t && (t = new me(t)),
				(i = i
					? i.length
						? i.map((t) => new Et(t.from, t.to))
						: [new Et(0, 0)]
					: [new Et(0, t.length)]),
				this.createParse(t, e || [], i)
			);
		}
		parse(t, e, i) {
			let n = this.startParse(t, e, i);
			for (;;) {
				let t = n.advance();
				if (t) return t;
			}
		}
	}
	class me {
		constructor(t) {
			this.string = t;
		}
		get length() {
			return this.string.length;
		}
		chunk(t) {
			return this.string.slice(t);
		}
		get lineChunks() {
			return !1;
		}
		read(t, e) {
			return this.string.slice(t, e);
		}
	}
	class ge {
		constructor(t, e, i, n, r) {
			(this.parser = t),
				(this.parse = e),
				(this.overlay = i),
				(this.target = n),
				(this.from = r);
		}
	}
	function be(t) {
		if (!t.length || t.some((t) => t.from >= t.to))
			throw new RangeError(
				'Invalid inner parse ranges given: ' + JSON.stringify(t)
			);
	}
	class ye {
		constructor(t, e, i, n, r, s, o) {
			(this.parser = t),
				(this.predicate = e),
				(this.mounts = i),
				(this.index = n),
				(this.start = r),
				(this.target = s),
				(this.prev = o),
				(this.depth = 0),
				(this.ranges = []);
		}
	}
	const ve = new Wt({ perNode: !0 });
	class we {
		constructor(t, e, i, n, r) {
			(this.nest = e),
				(this.input = i),
				(this.fragments = n),
				(this.ranges = r),
				(this.inner = []),
				(this.innerDone = 0),
				(this.baseTree = null),
				(this.stoppedAt = null),
				(this.baseParse = t);
		}
		advance() {
			if (this.baseParse) {
				let t = this.baseParse.advance();
				if (!t) return null;
				if (
					((this.baseParse = null),
					(this.baseTree = t),
					this.startInner(),
					null != this.stoppedAt)
				)
					for (let t of this.inner) t.parse.stopAt(this.stoppedAt);
			}
			if (this.innerDone == this.inner.length) {
				let t = this.baseTree;
				return (
					null != this.stoppedAt &&
						(t = new It(
							t.type,
							t.children,
							t.positions,
							t.length,
							t.propValues.concat([[ve, this.stoppedAt]])
						)),
					t
				);
			}
			let t = this.inner[this.innerDone],
				e = t.parse.advance();
			if (e) {
				this.innerDone++;
				let i = Object.assign(Object.create(null), t.target.props);
				(i[Wt.mounted.id] = new Yt(e, t.overlay, t.parser)),
					(t.target.props = i);
			}
			return null;
		}
		get parsedPos() {
			if (this.baseParse) return 0;
			let t = this.input.length;
			for (let e = this.innerDone; e < this.inner.length; e++)
				this.inner[e].from < t &&
					(t = Math.min(t, this.inner[e].parse.parsedPos));
			return t;
		}
		stopAt(t) {
			if (((this.stoppedAt = t), this.baseParse))
				this.baseParse.stopAt(t);
			else
				for (let e = this.innerDone; e < this.inner.length; e++)
					this.inner[e].parse.stopAt(t);
		}
		startInner() {
			let t = new $e(this.fragments),
				e = null,
				i = null,
				n = new le(
					new ee(this.baseTree, this.ranges[0].from, 0, null),
					Gt.IncludeAnonymous | Gt.IgnoreMounts
				);
			t: for (let r, s; ; ) {
				let o,
					a = !0;
				if (null != this.stoppedAt && n.from >= this.stoppedAt) a = !1;
				else if (t.hasNode(n)) {
					if (e) {
						let t = e.mounts.find(
							(t) =>
								t.frag.from <= n.from &&
								t.frag.to >= n.to &&
								t.mount.overlay
						);
						if (t)
							for (let i of t.mount.overlay) {
								let r = i.from + t.pos,
									s = i.to + t.pos;
								r >= n.from &&
									s <= n.to &&
									!e.ranges.some(
										(t) => t.from < s && t.to > r
									) &&
									e.ranges.push({ from: r, to: s });
							}
					}
					a = !1;
				} else if (i && (s = Se(i.ranges, n.from, n.to))) a = 2 != s;
				else if (
					!n.type.isAnonymous &&
					(r = this.nest(n, this.input)) &&
					(n.from < n.to || !r.overlay)
				) {
					n.tree || Qe(n);
					let s = t.findMounts(n.from, r.parser);
					if ('function' == typeof r.overlay)
						e = new ye(
							r.parser,
							r.overlay,
							s,
							this.inner.length,
							n.from,
							n.tree,
							e
						);
					else {
						let t = Pe(
							this.ranges,
							r.overlay ||
								(n.from < n.to ? [new Et(n.from, n.to)] : [])
						);
						t.length && be(t),
							(!t.length && r.overlay) ||
								this.inner.push(
									new ge(
										r.parser,
										t.length
											? r.parser.startParse(
													this.input,
													Te(s, t),
													t
												)
											: r.parser.startParse(''),
										r.overlay
											? r.overlay.map(
													(t) =>
														new Et(
															t.from - n.from,
															t.to - n.from
														)
												)
											: null,
										n.tree,
										t.length ? t[0].from : n.from
									)
								),
							r.overlay
								? t.length &&
									(i = { ranges: t, depth: 0, prev: i })
								: (a = !1);
					}
				} else if (
					e &&
					(o = e.predicate(n)) &&
					(!0 === o && (o = new Et(n.from, n.to)), o.from < o.to)
				) {
					let t = e.ranges.length - 1;
					t >= 0 && e.ranges[t].to == o.from
						? (e.ranges[t] = { from: e.ranges[t].from, to: o.to })
						: e.ranges.push(o);
				}
				if (a && n.firstChild()) e && e.depth++, i && i.depth++;
				else
					for (; !n.nextSibling(); ) {
						if (!n.parent()) break t;
						if (e && !--e.depth) {
							let t = Pe(this.ranges, e.ranges);
							t.length &&
								(be(t),
								this.inner.splice(
									e.index,
									0,
									new ge(
										e.parser,
										e.parser.startParse(
											this.input,
											Te(e.mounts, t),
											t
										),
										e.ranges.map(
											(t) =>
												new Et(
													t.from - e.start,
													t.to - e.start
												)
										),
										e.target,
										t[0].from
									)
								)),
								(e = e.prev);
						}
						i && !--i.depth && (i = i.prev);
					}
			}
		}
	}
	function Se(t, e, i) {
		for (let n of t) {
			if (n.from >= i) break;
			if (n.to > e) return n.from <= e && n.to >= i ? 2 : 1;
		}
		return 0;
	}
	function xe(t, e, i, n, r, s) {
		if (e < i) {
			let o = t.buffer[e + 1];
			n.push(t.slice(e, i, o)), r.push(o - s);
		}
	}
	function Qe(t) {
		let { node: e } = t,
			i = [],
			n = e.context.buffer;
		do {
			i.push(t.index), t.parent();
		} while (!t.tree);
		let r = t.tree,
			s = r.children.indexOf(n),
			o = r.children[s],
			a = o.buffer,
			l = [s];
		r.children[s] = (function t(n, r, s, h, c, u) {
			let d = i[u],
				f = [],
				O = [];
			xe(o, n, d, f, O, h);
			let p = a[d + 1],
				m = a[d + 2];
			l.push(f.length);
			let g = u
				? t(d + 4, a[d + 3], o.set.types[a[d]], p, m - p, u - 1)
				: e.toTree();
			return (
				f.push(g),
				O.push(p - h),
				xe(o, a[d + 3], r, f, O, h),
				new It(s, f, O, c)
			);
		})(0, a.length, Lt.none, 0, o.length, i.length - 1);
		for (let e of l) {
			let i = t.tree.children[e],
				n = t.tree.positions[e];
			t.yield(new ee(i, n + t.from, e, t._tree));
		}
	}
	class ke {
		constructor(t, e) {
			(this.offset = e),
				(this.done = !1),
				(this.cursor = t.cursor(Gt.IncludeAnonymous | Gt.IgnoreMounts));
		}
		moveTo(t) {
			let { cursor: e } = this,
				i = t - this.offset;
			for (; !this.done && e.from < i; )
				(e.to >= t &&
					e.enter(i, 1, Gt.IgnoreOverlays | Gt.ExcludeBuffers)) ||
					e.next(!1) ||
					(this.done = !0);
		}
		hasNode(t) {
			if (
				(this.moveTo(t.from),
				!this.done &&
					this.cursor.from + this.offset == t.from &&
					this.cursor.tree)
			)
				for (let e = this.cursor.tree; ; ) {
					if (e == t.tree) return !0;
					if (
						!(
							e.children.length &&
							0 == e.positions[0] &&
							e.children[0] instanceof It
						)
					)
						break;
					e = e.children[0];
				}
			return !1;
		}
	}
	class $e {
		constructor(t) {
			var e;
			if (
				((this.fragments = t),
				(this.curTo = 0),
				(this.fragI = 0),
				t.length)
			) {
				let i = (this.curFrag = t[0]);
				(this.curTo =
					null !== (e = i.tree.prop(ve)) && void 0 !== e ? e : i.to),
					(this.inner = new ke(i.tree, -i.offset));
			} else this.curFrag = this.inner = null;
		}
		hasNode(t) {
			for (; this.curFrag && t.from >= this.curTo; ) this.nextFrag();
			return (
				this.curFrag &&
				this.curFrag.from <= t.from &&
				this.curTo >= t.to &&
				this.inner.hasNode(t)
			);
		}
		nextFrag() {
			var t;
			if ((this.fragI++, this.fragI == this.fragments.length))
				this.curFrag = this.inner = null;
			else {
				let e = (this.curFrag = this.fragments[this.fragI]);
				(this.curTo =
					null !== (t = e.tree.prop(ve)) && void 0 !== t ? t : e.to),
					(this.inner = new ke(e.tree, -e.offset));
			}
		}
		findMounts(t, e) {
			var i;
			let n = [];
			if (this.inner) {
				this.inner.cursor.moveTo(t, 1);
				for (let t = this.inner.cursor.node; t; t = t.parent) {
					let r =
						null === (i = t.tree) || void 0 === i
							? void 0
							: i.prop(Wt.mounted);
					if (r && r.parser == e)
						for (
							let e = this.fragI;
							e < this.fragments.length;
							e++
						) {
							let i = this.fragments[e];
							if (i.from >= t.to) break;
							i.tree == this.curFrag.tree &&
								n.push({
									frag: i,
									pos: t.from - i.offset,
									mount: r,
								});
						}
				}
			}
			return n;
		}
	}
	function Pe(t, e) {
		let i = null,
			n = e;
		for (let r = 1, s = 0; r < t.length; r++) {
			let o = t[r - 1].to,
				a = t[r].from;
			for (; s < n.length; s++) {
				let t = n[s];
				if (t.from >= a) break;
				t.to <= o ||
					(i || (n = i = e.slice()),
					t.from < o
						? ((i[s] = new Et(t.from, o)),
							t.to > a && i.splice(s + 1, 0, new Et(a, t.to)))
						: t.to > a
							? (i[s--] = new Et(a, t.to))
							: i.splice(s--, 1));
			}
		}
		return n;
	}
	function Ze(t, e, i, n) {
		let r = 0,
			s = 0,
			o = !1,
			a = !1,
			l = -1e9,
			h = [];
		for (;;) {
			let c = r == t.length ? 1e9 : o ? t[r].to : t[r].from,
				u = s == e.length ? 1e9 : a ? e[s].to : e[s].from;
			if (o != a) {
				let t = Math.max(l, i),
					e = Math.min(c, u, n);
				t < e && h.push(new Et(t, e));
			}
			if (((l = Math.min(c, u)), 1e9 == l)) break;
			c == l && (o ? ((o = !1), r++) : (o = !0)),
				u == l && (a ? ((a = !1), s++) : (a = !0));
		}
		return h;
	}
	function Te(t, e) {
		let i = [];
		for (let { pos: n, mount: r, frag: s } of t) {
			let t = n + (r.overlay ? r.overlay[0].from : 0),
				o = t + r.tree.length,
				a = Math.max(s.from, t),
				l = Math.min(s.to, o);
			if (r.overlay) {
				let o = Ze(
					e,
					r.overlay.map((t) => new Et(t.from + n, t.to + n)),
					a,
					l
				);
				for (let e = 0, n = a; ; e++) {
					let a = e == o.length,
						h = a ? l : o[e].from;
					if (
						(h > n &&
							i.push(
								new Oe(
									n,
									h,
									r.tree,
									-t,
									s.from >= n || s.openStart,
									s.to <= h || s.openEnd
								)
							),
						a)
					)
						break;
					n = o[e].to;
				}
			} else
				i.push(
					new Oe(
						a,
						l,
						r.tree,
						-t,
						s.from >= t || s.openStart,
						s.to <= o || s.openEnd
					)
				);
		}
		return i;
	}
	class Ce {
		constructor(t, e, i, n, r, s, o, a, l, h = 0, c) {
			(this.p = t),
				(this.stack = e),
				(this.state = i),
				(this.reducePos = n),
				(this.pos = r),
				(this.score = s),
				(this.buffer = o),
				(this.bufferBase = a),
				(this.curContext = l),
				(this.lookAhead = h),
				(this.parent = c);
		}
		toString() {
			return `[${this.stack.filter((t, e) => e % 3 == 0).concat(this.state)}]@${this.pos}${this.score ? '!' + this.score : ''}`;
		}
		static start(t, e, i = 0) {
			let n = t.parser.context;
			return new Ce(
				t,
				[],
				e,
				i,
				i,
				0,
				[],
				0,
				n ? new Ae(n, n.start) : null,
				0,
				null
			);
		}
		get context() {
			return this.curContext ? this.curContext.context : null;
		}
		pushState(t, e) {
			this.stack.push(
				this.state,
				e,
				this.bufferBase + this.buffer.length
			),
				(this.state = t);
		}
		reduce(t) {
			var e;
			let i = t >> 19,
				n = 65535 & t,
				{ parser: r } = this.p,
				s = this.reducePos < this.pos - 25;
			s && this.setLookAhead(this.pos);
			let o = r.dynamicPrecedence(n);
			if ((o && (this.score += o), 0 == i))
				return (
					this.pushState(
						r.getGoto(this.state, n, !0),
						this.reducePos
					),
					n < r.minRepeatTerm &&
						this.storeNode(
							n,
							this.reducePos,
							this.reducePos,
							s ? 8 : 4,
							!0
						),
					void this.reduceContext(n, this.reducePos)
				);
			let a = this.stack.length - 3 * (i - 1) - (262144 & t ? 6 : 0),
				l = a ? this.stack[a - 2] : this.p.ranges[0].from,
				h = this.reducePos - l;
			h >= 2e3 &&
				!(null === (e = this.p.parser.nodeSet.types[n]) || void 0 === e
					? void 0
					: e.isAnonymous) &&
				(l == this.p.lastBigReductionStart
					? (this.p.bigReductionCount++,
						(this.p.lastBigReductionSize = h))
					: this.p.lastBigReductionSize < h &&
						((this.p.bigReductionCount = 1),
						(this.p.lastBigReductionStart = l),
						(this.p.lastBigReductionSize = h)));
			let c = a ? this.stack[a - 1] : 0,
				u = this.bufferBase + this.buffer.length - c;
			if (n < r.minRepeatTerm || 131072 & t) {
				let t = r.stateFlag(this.state, 1) ? this.pos : this.reducePos;
				this.storeNode(n, l, t, u + 4, !0);
			}
			if (262144 & t) this.state = this.stack[a];
			else {
				let t = this.stack[a - 3];
				this.state = r.getGoto(t, n, !0);
			}
			for (; this.stack.length > a; ) this.stack.pop();
			this.reduceContext(n, l);
		}
		storeNode(t, e, i, n = 4, r = !1) {
			if (
				0 == t &&
				(!this.stack.length ||
					this.stack[this.stack.length - 1] <
						this.buffer.length + this.bufferBase)
			) {
				let t = this,
					n = this.buffer.length;
				if (
					(0 == n &&
						t.parent &&
						((n = t.bufferBase - t.parent.bufferBase),
						(t = t.parent)),
					n > 0 && 0 == t.buffer[n - 4] && t.buffer[n - 1] > -1)
				) {
					if (e == i) return;
					if (t.buffer[n - 2] >= e) return void (t.buffer[n - 2] = i);
				}
			}
			if (r && this.pos != i) {
				let r = this.buffer.length;
				if (r > 0 && 0 != this.buffer[r - 4]) {
					let t = !1;
					for (let e = r; e > 0 && this.buffer[e - 2] > i; e -= 4)
						if (this.buffer[e - 1] >= 0) {
							t = !0;
							break;
						}
					if (t)
						for (; r > 0 && this.buffer[r - 2] > i; )
							(this.buffer[r] = this.buffer[r - 4]),
								(this.buffer[r + 1] = this.buffer[r - 3]),
								(this.buffer[r + 2] = this.buffer[r - 2]),
								(this.buffer[r + 3] = this.buffer[r - 1]),
								(r -= 4),
								n > 4 && (n -= 4);
				}
				(this.buffer[r] = t),
					(this.buffer[r + 1] = e),
					(this.buffer[r + 2] = i),
					(this.buffer[r + 3] = n);
			} else this.buffer.push(t, e, i, n);
		}
		shift(t, e, i, n) {
			if (131072 & t) this.pushState(65535 & t, this.pos);
			else if (262144 & t)
				(this.pos = n),
					this.shiftContext(e, i),
					e <= this.p.parser.maxNode && this.buffer.push(e, i, n, 4);
			else {
				let r = t,
					{ parser: s } = this.p;
				(n > this.pos || e <= s.maxNode) &&
					((this.pos = n), s.stateFlag(r, 1) || (this.reducePos = n)),
					this.pushState(r, i),
					this.shiftContext(e, i),
					e <= s.maxNode && this.buffer.push(e, i, n, 4);
			}
		}
		apply(t, e, i, n) {
			65536 & t ? this.reduce(t) : this.shift(t, e, i, n);
		}
		useNode(t, e) {
			let i = this.p.reused.length - 1;
			(i < 0 || this.p.reused[i] != t) && (this.p.reused.push(t), i++);
			let n = this.pos;
			(this.reducePos = this.pos = n + t.length),
				this.pushState(e, n),
				this.buffer.push(i, n, this.reducePos, -1),
				this.curContext &&
					this.updateContext(
						this.curContext.tracker.reuse(
							this.curContext.context,
							t,
							this,
							this.p.stream.reset(this.pos - t.length)
						)
					);
		}
		split() {
			let t = this,
				e = t.buffer.length;
			for (; e > 0 && t.buffer[e - 2] > t.reducePos; ) e -= 4;
			let i = t.buffer.slice(e),
				n = t.bufferBase + e;
			for (; t && n == t.bufferBase; ) t = t.parent;
			return new Ce(
				this.p,
				this.stack.slice(),
				this.state,
				this.reducePos,
				this.pos,
				this.score,
				i,
				n,
				this.curContext,
				this.lookAhead,
				t
			);
		}
		recoverByDelete(t, e) {
			let i = t <= this.p.parser.maxNode;
			i && this.storeNode(t, this.pos, e, 4),
				this.storeNode(0, this.pos, e, i ? 8 : 4),
				(this.pos = this.reducePos = e),
				(this.score -= 190);
		}
		canShift(t) {
			for (let e = new Xe(this); ; ) {
				let i =
					this.p.parser.stateSlot(e.state, 4) ||
					this.p.parser.hasAction(e.state, t);
				if (0 == i) return !1;
				if (!(65536 & i)) return !0;
				e.reduce(i);
			}
		}
		recoverByInsert(t) {
			if (this.stack.length >= 300) return [];
			let e = this.p.parser.nextStates(this.state);
			if (e.length > 8 || this.stack.length >= 120) {
				let i = [];
				for (let n, r = 0; r < e.length; r += 2)
					(n = e[r + 1]) != this.state &&
						this.p.parser.hasAction(n, t) &&
						i.push(e[r], n);
				if (this.stack.length < 120)
					for (let t = 0; i.length < 8 && t < e.length; t += 2) {
						let n = e[t + 1];
						i.some((t, e) => 1 & e && t == n) || i.push(e[t], n);
					}
				e = i;
			}
			let i = [];
			for (let t = 0; t < e.length && i.length < 4; t += 2) {
				let n = e[t + 1];
				if (n == this.state) continue;
				let r = this.split();
				r.pushState(n, this.pos),
					r.storeNode(0, r.pos, r.pos, 4, !0),
					r.shiftContext(e[t], this.pos),
					(r.reducePos = this.pos),
					(r.score -= 200),
					i.push(r);
			}
			return i;
		}
		forceReduce() {
			let { parser: t } = this.p,
				e = t.stateSlot(this.state, 5);
			if (!(65536 & e)) return !1;
			if (!t.validAction(this.state, e)) {
				let i = e >> 19,
					n = 65535 & e,
					r = this.stack.length - 3 * i;
				if (r < 0 || t.getGoto(this.stack[r], n, !1) < 0) {
					let t = this.findForcedReduction();
					if (null == t) return !1;
					e = t;
				}
				this.storeNode(0, this.pos, this.pos, 4, !0),
					(this.score -= 100);
			}
			return (this.reducePos = this.pos), this.reduce(e), !0;
		}
		findForcedReduction() {
			let { parser: t } = this.p,
				e = [],
				i = (n, r) => {
					if (!e.includes(n))
						return (
							e.push(n),
							t.allActions(n, (e) => {
								if (393216 & e);
								else if (65536 & e) {
									let i = (e >> 19) - r;
									if (i > 1) {
										let n = 65535 & e,
											r = this.stack.length - 3 * i;
										if (
											r >= 0 &&
											t.getGoto(this.stack[r], n, !1) >= 0
										)
											return (i << 19) | 65536 | n;
									}
								} else {
									let t = i(e, r + 1);
									if (null != t) return t;
								}
							})
						);
				};
			return i(this.state, 0);
		}
		forceAll() {
			for (; !this.p.parser.stateFlag(this.state, 2); )
				if (!this.forceReduce()) {
					this.storeNode(0, this.pos, this.pos, 4, !0);
					break;
				}
			return this;
		}
		get deadEnd() {
			if (3 != this.stack.length) return !1;
			let { parser: t } = this.p;
			return (
				65535 == t.data[t.stateSlot(this.state, 1)] &&
				!t.stateSlot(this.state, 4)
			);
		}
		restart() {
			this.storeNode(0, this.pos, this.pos, 4, !0),
				(this.state = this.stack[0]),
				(this.stack.length = 0);
		}
		sameState(t) {
			if (this.state != t.state || this.stack.length != t.stack.length)
				return !1;
			for (let e = 0; e < this.stack.length; e += 3)
				if (this.stack[e] != t.stack[e]) return !1;
			return !0;
		}
		get parser() {
			return this.p.parser;
		}
		dialectEnabled(t) {
			return this.p.parser.dialect.flags[t];
		}
		shiftContext(t, e) {
			this.curContext &&
				this.updateContext(
					this.curContext.tracker.shift(
						this.curContext.context,
						t,
						this,
						this.p.stream.reset(e)
					)
				);
		}
		reduceContext(t, e) {
			this.curContext &&
				this.updateContext(
					this.curContext.tracker.reduce(
						this.curContext.context,
						t,
						this,
						this.p.stream.reset(e)
					)
				);
		}
		emitContext() {
			let t = this.buffer.length - 1;
			(t < 0 || -3 != this.buffer[t]) &&
				this.buffer.push(this.curContext.hash, this.pos, this.pos, -3);
		}
		emitLookAhead() {
			let t = this.buffer.length - 1;
			(t < 0 || -4 != this.buffer[t]) &&
				this.buffer.push(this.lookAhead, this.pos, this.pos, -4);
		}
		updateContext(t) {
			if (t != this.curContext.context) {
				let e = new Ae(this.curContext.tracker, t);
				e.hash != this.curContext.hash && this.emitContext(),
					(this.curContext = e);
			}
		}
		setLookAhead(t) {
			t > this.lookAhead && (this.emitLookAhead(), (this.lookAhead = t));
		}
		close() {
			this.curContext &&
				this.curContext.tracker.strict &&
				this.emitContext(),
				this.lookAhead > 0 && this.emitLookAhead();
		}
	}
	class Ae {
		constructor(t, e) {
			(this.tracker = t),
				(this.context = e),
				(this.hash = t.strict ? t.hash(e) : 0);
		}
	}
	class Xe {
		constructor(t) {
			(this.start = t),
				(this.state = t.state),
				(this.stack = t.stack),
				(this.base = this.stack.length);
		}
		reduce(t) {
			let e = 65535 & t,
				i = t >> 19;
			0 == i
				? (this.stack == this.start.stack &&
						(this.stack = this.stack.slice()),
					this.stack.push(this.state, 0, 0),
					(this.base += 3))
				: (this.base -= 3 * (i - 1));
			let n = this.start.p.parser.getGoto(
				this.stack[this.base - 3],
				e,
				!0
			);
			this.state = n;
		}
	}
	class Me {
		constructor(t, e, i) {
			(this.stack = t),
				(this.pos = e),
				(this.index = i),
				(this.buffer = t.buffer),
				0 == this.index && this.maybeNext();
		}
		static create(t, e = t.bufferBase + t.buffer.length) {
			return new Me(t, e, e - t.bufferBase);
		}
		maybeNext() {
			let t = this.stack.parent;
			null != t &&
				((this.index = this.stack.bufferBase - t.bufferBase),
				(this.stack = t),
				(this.buffer = t.buffer));
		}
		get id() {
			return this.buffer[this.index - 4];
		}
		get start() {
			return this.buffer[this.index - 3];
		}
		get end() {
			return this.buffer[this.index - 2];
		}
		get size() {
			return this.buffer[this.index - 1];
		}
		next() {
			(this.index -= 4),
				(this.pos -= 4),
				0 == this.index && this.maybeNext();
		}
		fork() {
			return new Me(this.stack, this.pos, this.index);
		}
	}
	function Re(t, e = Uint16Array) {
		if ('string' != typeof t) return t;
		let i = null;
		for (let n = 0, r = 0; n < t.length; ) {
			let s = 0;
			for (;;) {
				let e = t.charCodeAt(n++),
					i = !1;
				if (126 == e) {
					s = 65535;
					break;
				}
				e >= 92 && e--, e >= 34 && e--;
				let r = e - 32;
				if ((r >= 46 && ((r -= 46), (i = !0)), (s += r), i)) break;
				s *= 46;
			}
			i ? (i[r++] = s) : (i = new e(s));
		}
		return i;
	}
	class _e {
		constructor() {
			(this.start = -1),
				(this.value = -1),
				(this.end = -1),
				(this.extended = -1),
				(this.lookAhead = 0),
				(this.mask = 0),
				(this.context = 0);
		}
	}
	const Ve = new _e();
	class qe {
		constructor(t, e) {
			(this.input = t),
				(this.ranges = e),
				(this.chunk = ''),
				(this.chunkOff = 0),
				(this.chunk2 = ''),
				(this.chunk2Pos = 0),
				(this.next = -1),
				(this.token = Ve),
				(this.rangeIndex = 0),
				(this.pos = this.chunkPos = e[0].from),
				(this.range = e[0]),
				(this.end = e[e.length - 1].to),
				this.readNext();
		}
		resolveOffset(t, e) {
			let i = this.range,
				n = this.rangeIndex,
				r = this.pos + t;
			for (; r < i.from; ) {
				if (!n) return null;
				let t = this.ranges[--n];
				(r -= i.from - t.to), (i = t);
			}
			for (; e < 0 ? r > i.to : r >= i.to; ) {
				if (n == this.ranges.length - 1) return null;
				let t = this.ranges[++n];
				(r += t.from - i.to), (i = t);
			}
			return r;
		}
		clipPos(t) {
			if (t >= this.range.from && t < this.range.to) return t;
			for (let e of this.ranges) if (e.to > t) return Math.max(t, e.from);
			return this.end;
		}
		peek(t) {
			let e,
				i,
				n = this.chunkOff + t;
			if (n >= 0 && n < this.chunk.length)
				(e = this.pos + t), (i = this.chunk.charCodeAt(n));
			else {
				let n = this.resolveOffset(t, 1);
				if (null == n) return -1;
				if (
					((e = n),
					e >= this.chunk2Pos &&
						e < this.chunk2Pos + this.chunk2.length)
				)
					i = this.chunk2.charCodeAt(e - this.chunk2Pos);
				else {
					let t = this.rangeIndex,
						n = this.range;
					for (; n.to <= e; ) n = this.ranges[++t];
					(this.chunk2 = this.input.chunk((this.chunk2Pos = e))),
						e + this.chunk2.length > n.to &&
							(this.chunk2 = this.chunk2.slice(0, n.to - e)),
						(i = this.chunk2.charCodeAt(0));
				}
			}
			return (
				e >= this.token.lookAhead && (this.token.lookAhead = e + 1), i
			);
		}
		acceptToken(t, e = 0) {
			let i = e ? this.resolveOffset(e, -1) : this.pos;
			if (null == i || i < this.token.start)
				throw new RangeError('Token end out of bounds');
			(this.token.value = t), (this.token.end = i);
		}
		acceptTokenTo(t, e) {
			(this.token.value = t), (this.token.end = e);
		}
		getChunk() {
			if (
				this.pos >= this.chunk2Pos &&
				this.pos < this.chunk2Pos + this.chunk2.length
			) {
				let { chunk: t, chunkPos: e } = this;
				(this.chunk = this.chunk2),
					(this.chunkPos = this.chunk2Pos),
					(this.chunk2 = t),
					(this.chunk2Pos = e),
					(this.chunkOff = this.pos - this.chunkPos);
			} else {
				(this.chunk2 = this.chunk), (this.chunk2Pos = this.chunkPos);
				let t = this.input.chunk(this.pos),
					e = this.pos + t.length;
				(this.chunk =
					e > this.range.to
						? t.slice(0, this.range.to - this.pos)
						: t),
					(this.chunkPos = this.pos),
					(this.chunkOff = 0);
			}
		}
		readNext() {
			return this.chunkOff >= this.chunk.length &&
				(this.getChunk(), this.chunkOff == this.chunk.length)
				? (this.next = -1)
				: (this.next = this.chunk.charCodeAt(this.chunkOff));
		}
		advance(t = 1) {
			for (this.chunkOff += t; this.pos + t >= this.range.to; ) {
				if (this.rangeIndex == this.ranges.length - 1)
					return this.setDone();
				(t -= this.range.to - this.pos),
					(this.range = this.ranges[++this.rangeIndex]),
					(this.pos = this.range.from);
			}
			return (
				(this.pos += t),
				this.pos >= this.token.lookAhead &&
					(this.token.lookAhead = this.pos + 1),
				this.readNext()
			);
		}
		setDone() {
			return (
				(this.pos = this.chunkPos = this.end),
				(this.range =
					this.ranges[(this.rangeIndex = this.ranges.length - 1)]),
				(this.chunk = ''),
				(this.next = -1)
			);
		}
		reset(t, e) {
			if (
				(e
					? ((this.token = e),
						(e.start = t),
						(e.lookAhead = t + 1),
						(e.value = e.extended = -1))
					: (this.token = Ve),
				this.pos != t)
			) {
				if (((this.pos = t), t == this.end))
					return this.setDone(), this;
				for (; t < this.range.from; )
					this.range = this.ranges[--this.rangeIndex];
				for (; t >= this.range.to; )
					this.range = this.ranges[++this.rangeIndex];
				t >= this.chunkPos && t < this.chunkPos + this.chunk.length
					? (this.chunkOff = t - this.chunkPos)
					: ((this.chunk = ''), (this.chunkOff = 0)),
					this.readNext();
			}
			return this;
		}
		read(t, e) {
			if (t >= this.chunkPos && e <= this.chunkPos + this.chunk.length)
				return this.chunk.slice(t - this.chunkPos, e - this.chunkPos);
			if (t >= this.chunk2Pos && e <= this.chunk2Pos + this.chunk2.length)
				return this.chunk2.slice(
					t - this.chunk2Pos,
					e - this.chunk2Pos
				);
			if (t >= this.range.from && e <= this.range.to)
				return this.input.read(t, e);
			let i = '';
			for (let n of this.ranges) {
				if (n.from >= e) break;
				n.to > t &&
					(i += this.input.read(
						Math.max(n.from, t),
						Math.min(n.to, e)
					));
			}
			return i;
		}
	}
	class je {
		constructor(t, e) {
			(this.data = t), (this.id = e);
		}
		token(t, e) {
			let { parser: i } = e.p;
			We(this.data, t, e, this.id, i.data, i.tokenPrecTable);
		}
	}
	je.prototype.contextual = je.prototype.fallback = je.prototype.extend = !1;
	class De {
		constructor(t, e, i) {
			(this.precTable = e),
				(this.elseToken = i),
				(this.data = 'string' == typeof t ? Re(t) : t);
		}
		token(t, e) {
			let i = t.pos,
				n = 0;
			for (;;) {
				let i = t.next < 0,
					r = t.resolveOffset(1, 1);
				if (
					(We(this.data, t, e, 0, this.data, this.precTable),
					t.token.value > -1)
				)
					break;
				if (null == this.elseToken) return;
				if ((i || n++, null == r)) break;
				t.reset(r, t.token);
			}
			n && (t.reset(i, t.token), t.acceptToken(this.elseToken, n));
		}
	}
	De.prototype.contextual = je.prototype.fallback = je.prototype.extend = !1;
	class Ee {
		constructor(t, e = {}) {
			(this.token = t),
				(this.contextual = !!e.contextual),
				(this.fallback = !!e.fallback),
				(this.extend = !!e.extend);
		}
	}
	function We(t, e, i, n, r, s) {
		let o = 0,
			a = 1 << n,
			{ dialect: l } = i.p.parser;
		t: for (; a & t[o]; ) {
			let i = t[o + 1];
			for (let n = o + 3; n < i; n += 2)
				if ((t[n + 1] & a) > 0) {
					let i = t[n];
					if (
						l.allows(i) &&
						(-1 == e.token.value ||
							e.token.value == i ||
							ze(i, e.token.value, r, s))
					) {
						e.acceptToken(i);
						break;
					}
				}
			let n = e.next,
				h = 0,
				c = t[o + 2];
			if (!(e.next < 0 && c > h && 65535 == t[i + 3 * c - 3])) {
				for (; h < c; ) {
					let r = (h + c) >> 1,
						s = i + r + (r << 1),
						a = t[s],
						l = t[s + 1] || 65536;
					if (n < a) c = r;
					else {
						if (!(n >= l)) {
							(o = t[s + 2]), e.advance();
							continue t;
						}
						h = r + 1;
					}
				}
				break;
			}
			o = t[i + 3 * c - 1];
		}
	}
	function Ye(t, e, i) {
		for (let n, r = e; 65535 != (n = t[r]); r++) if (n == i) return r - e;
		return -1;
	}
	function ze(t, e, i, n) {
		let r = Ye(i, n, e);
		return r < 0 || Ye(i, n, t) < r;
	}
	const Le =
		'undefined' != typeof process &&
		process.env &&
		/\bparse\b/.test(process.env.LOG);
	let Be = null;
	function Ue(t, e, i) {
		let n = t.cursor(Gt.IncludeAnonymous);
		for (n.moveTo(e); ; )
			if (!(i < 0 ? n.childBefore(e) : n.childAfter(e)))
				for (;;) {
					if ((i < 0 ? n.to < e : n.from > e) && !n.type.isError)
						return i < 0
							? Math.max(0, Math.min(n.to - 1, e - 25))
							: Math.min(t.length, Math.max(n.from + 1, e + 25));
					if (i < 0 ? n.prevSibling() : n.nextSibling()) break;
					if (!n.parent()) return i < 0 ? 0 : t.length;
				}
	}
	class Ne {
		constructor(t, e) {
			(this.fragments = t),
				(this.nodeSet = e),
				(this.i = 0),
				(this.fragment = null),
				(this.safeFrom = -1),
				(this.safeTo = -1),
				(this.trees = []),
				(this.start = []),
				(this.index = []),
				this.nextFragment();
		}
		nextFragment() {
			let t = (this.fragment =
				this.i == this.fragments.length
					? null
					: this.fragments[this.i++]);
			if (t) {
				for (
					this.safeFrom = t.openStart
						? Ue(t.tree, t.from + t.offset, 1) - t.offset
						: t.from,
						this.safeTo = t.openEnd
							? Ue(t.tree, t.to + t.offset, -1) - t.offset
							: t.to;
					this.trees.length;

				)
					this.trees.pop(), this.start.pop(), this.index.pop();
				this.trees.push(t.tree),
					this.start.push(-t.offset),
					this.index.push(0),
					(this.nextStart = this.safeFrom);
			} else this.nextStart = 1e9;
		}
		nodeAt(t) {
			if (t < this.nextStart) return null;
			for (; this.fragment && this.safeTo <= t; ) this.nextFragment();
			if (!this.fragment) return null;
			for (;;) {
				let e = this.trees.length - 1;
				if (e < 0) return this.nextFragment(), null;
				let i = this.trees[e],
					n = this.index[e];
				if (n == i.children.length) {
					this.trees.pop(), this.start.pop(), this.index.pop();
					continue;
				}
				let r = i.children[n],
					s = this.start[e] + i.positions[n];
				if (s > t) return (this.nextStart = s), null;
				if (r instanceof It) {
					if (s == t) {
						if (s < this.safeFrom) return null;
						let t = s + r.length;
						if (t <= this.safeTo) {
							let e = r.prop(Wt.lookAhead);
							if (!e || t + e < this.fragment.to) return r;
						}
					}
					this.index[e]++,
						s + r.length >= Math.max(this.safeFrom, t) &&
							(this.trees.push(r),
							this.start.push(s),
							this.index.push(0));
				} else this.index[e]++, (this.nextStart = s + r.length);
			}
		}
	}
	class Ge {
		constructor(t, e) {
			(this.stream = e),
				(this.tokens = []),
				(this.mainToken = null),
				(this.actions = []),
				(this.tokens = t.tokenizers.map((t) => new _e()));
		}
		getActions(t) {
			let e = 0,
				i = null,
				{ parser: n } = t.p,
				{ tokenizers: r } = n,
				s = n.stateSlot(t.state, 3),
				o = t.curContext ? t.curContext.hash : 0,
				a = 0;
			for (let n = 0; n < r.length; n++) {
				if (!((1 << n) & s)) continue;
				let l = r[n],
					h = this.tokens[n];
				if (
					(!i || l.fallback) &&
					((l.contextual ||
						h.start != t.pos ||
						h.mask != s ||
						h.context != o) &&
						(this.updateCachedToken(h, l, t),
						(h.mask = s),
						(h.context = o)),
					h.lookAhead > h.end + 25 && (a = Math.max(h.lookAhead, a)),
					0 != h.value)
				) {
					let n = e;
					if (
						(h.extended > -1 &&
							(e = this.addActions(t, h.extended, h.end, e)),
						(e = this.addActions(t, h.value, h.end, e)),
						!l.extend && ((i = h), e > n))
					)
						break;
				}
			}
			for (; this.actions.length > e; ) this.actions.pop();
			return (
				a && t.setLookAhead(a),
				i ||
					t.pos != this.stream.end ||
					((i = new _e()),
					(i.value = t.p.parser.eofTerm),
					(i.start = i.end = t.pos),
					(e = this.addActions(t, i.value, i.end, e))),
				(this.mainToken = i),
				this.actions
			);
		}
		getMainToken(t) {
			if (this.mainToken) return this.mainToken;
			let e = new _e(),
				{ pos: i, p: n } = t;
			return (
				(e.start = i),
				(e.end = Math.min(i + 1, n.stream.end)),
				(e.value = i == n.stream.end ? n.parser.eofTerm : 0),
				e
			);
		}
		updateCachedToken(t, e, i) {
			let n = this.stream.clipPos(i.pos);
			if ((e.token(this.stream.reset(n, t), i), t.value > -1)) {
				let { parser: e } = i.p;
				for (let n = 0; n < e.specialized.length; n++)
					if (e.specialized[n] == t.value) {
						let r = e.specializers[n](
							this.stream.read(t.start, t.end),
							i
						);
						if (r >= 0 && i.p.parser.dialect.allows(r >> 1)) {
							1 & r ? (t.extended = r >> 1) : (t.value = r >> 1);
							break;
						}
					}
			} else (t.value = 0), (t.end = this.stream.clipPos(n + 1));
		}
		putAction(t, e, i, n) {
			for (let e = 0; e < n; e += 3) if (this.actions[e] == t) return n;
			return (
				(this.actions[n++] = t),
				(this.actions[n++] = e),
				(this.actions[n++] = i),
				n
			);
		}
		addActions(t, e, i, n) {
			let { state: r } = t,
				{ parser: s } = t.p,
				{ data: o } = s;
			for (let t = 0; t < 2; t++)
				for (let a = s.stateSlot(r, t ? 2 : 1); ; a += 3) {
					if (65535 == o[a]) {
						if (1 != o[a + 1]) {
							0 == n &&
								2 == o[a + 1] &&
								(n = this.putAction(ei(o, a + 2), e, i, n));
							break;
						}
						a = ei(o, a + 2);
					}
					o[a] == e && (n = this.putAction(ei(o, a + 1), e, i, n));
				}
			return n;
		}
	}
	class Ie {
		constructor(t, e, i, n) {
			(this.parser = t),
				(this.input = e),
				(this.ranges = n),
				(this.recovering = 0),
				(this.nextStackID = 9812),
				(this.minStackPos = 0),
				(this.reused = []),
				(this.stoppedAt = null),
				(this.lastBigReductionStart = -1),
				(this.lastBigReductionSize = 0),
				(this.bigReductionCount = 0),
				(this.stream = new qe(e, n)),
				(this.tokens = new Ge(t, this.stream)),
				(this.topTerm = t.top[1]);
			let { from: r } = n[0];
			(this.stacks = [Ce.start(this, t.top[0], r)]),
				(this.fragments =
					i.length && this.stream.end - r > 4 * t.bufferLength
						? new Ne(i, t.nodeSet)
						: null);
		}
		get parsedPos() {
			return this.minStackPos;
		}
		advance() {
			let t,
				e,
				i = this.stacks,
				n = this.minStackPos,
				r = (this.stacks = []);
			if (this.bigReductionCount > 300 && 1 == i.length) {
				let [t] = i;
				for (
					;
					t.forceReduce() &&
					t.stack.length &&
					t.stack[t.stack.length - 2] >= this.lastBigReductionStart;

				);
				this.bigReductionCount = this.lastBigReductionSize = 0;
			}
			for (let s = 0; s < i.length; s++) {
				let o = i[s];
				for (;;) {
					if (((this.tokens.mainToken = null), o.pos > n)) r.push(o);
					else {
						if (this.advanceStack(o, r, i)) continue;
						{
							t || ((t = []), (e = [])), t.push(o);
							let i = this.tokens.getMainToken(o);
							e.push(i.value, i.end);
						}
					}
					break;
				}
			}
			if (!r.length) {
				let e =
					t &&
					(function (t) {
						let e = null;
						for (let i of t) {
							let t = i.p.stoppedAt;
							(i.pos == i.p.stream.end ||
								(null != t && i.pos > t)) &&
								i.p.parser.stateFlag(i.state, 2) &&
								(!e || e.score < i.score) &&
								(e = i);
						}
						return e;
					})(t);
				if (e)
					return (
						Le && console.log('Finish with ' + this.stackID(e)),
						this.stackToTree(e)
					);
				if (this.parser.strict)
					throw (
						(Le &&
							t &&
							console.log(
								'Stuck with token ' +
									(this.tokens.mainToken
										? this.parser.getName(
												this.tokens.mainToken.value
											)
										: 'none')
							),
						new SyntaxError('No parse at ' + n))
					);
				this.recovering || (this.recovering = 5);
			}
			if (this.recovering && t) {
				let i =
					null != this.stoppedAt && t[0].pos > this.stoppedAt
						? t[0]
						: this.runRecovery(t, e, r);
				if (i)
					return (
						Le && console.log('Force-finish ' + this.stackID(i)),
						this.stackToTree(i.forceAll())
					);
			}
			if (this.recovering) {
				let t = 1 == this.recovering ? 1 : 3 * this.recovering;
				if (r.length > t)
					for (r.sort((t, e) => e.score - t.score); r.length > t; )
						r.pop();
				r.some((t) => t.reducePos > n) && this.recovering--;
			} else if (r.length > 1) {
				t: for (let t = 0; t < r.length - 1; t++) {
					let e = r[t];
					for (let i = t + 1; i < r.length; i++) {
						let n = r[i];
						if (
							e.sameState(n) ||
							(e.buffer.length > 500 && n.buffer.length > 500)
						) {
							if (
								!(
									(e.score - n.score ||
										e.buffer.length - n.buffer.length) > 0
								)
							) {
								r.splice(t--, 1);
								continue t;
							}
							r.splice(i--, 1);
						}
					}
				}
				r.length > 12 && r.splice(12, r.length - 12);
			}
			this.minStackPos = r[0].pos;
			for (let t = 1; t < r.length; t++)
				r[t].pos < this.minStackPos && (this.minStackPos = r[t].pos);
			return null;
		}
		stopAt(t) {
			if (null != this.stoppedAt && this.stoppedAt < t)
				throw new RangeError("Can't move stoppedAt forward");
			this.stoppedAt = t;
		}
		advanceStack(t, e, i) {
			let n = t.pos,
				{ parser: r } = this,
				s = Le ? this.stackID(t) + ' -> ' : '';
			if (null != this.stoppedAt && n > this.stoppedAt)
				return t.forceReduce() ? t : null;
			if (this.fragments) {
				let e = t.curContext && t.curContext.tracker.strict,
					i = e ? t.curContext.hash : 0;
				for (let o = this.fragments.nodeAt(n); o; ) {
					let n =
						this.parser.nodeSet.types[o.type.id] == o.type
							? r.getGoto(t.state, o.type.id)
							: -1;
					if (
						n > -1 &&
						o.length &&
						(!e || (o.prop(Wt.contextHash) || 0) == i)
					)
						return (
							t.useNode(o, n),
							Le &&
								console.log(
									s +
										this.stackID(t) +
										` (via reuse of ${r.getName(o.type.id)})`
								),
							!0
						);
					if (
						!(o instanceof It) ||
						0 == o.children.length ||
						o.positions[0] > 0
					)
						break;
					let a = o.children[0];
					if (!(a instanceof It && 0 == o.positions[0])) break;
					o = a;
				}
			}
			let o = r.stateSlot(t.state, 4);
			if (o > 0)
				return (
					t.reduce(o),
					Le &&
						console.log(
							s +
								this.stackID(t) +
								` (via always-reduce ${r.getName(65535 & o)})`
						),
					!0
				);
			if (t.stack.length >= 8400)
				for (; t.stack.length > 6e3 && t.forceReduce(); );
			let a = this.tokens.getActions(t);
			for (let o = 0; o < a.length; ) {
				let l = a[o++],
					h = a[o++],
					c = a[o++],
					u = o == a.length || !i,
					d = u ? t : t.split(),
					f = this.tokens.mainToken;
				if (
					(d.apply(l, h, f ? f.start : d.pos, c),
					Le &&
						console.log(
							s +
								this.stackID(d) +
								` (via ${65536 & l ? `reduce of ${r.getName(65535 & l)}` : 'shift'} for ${r.getName(h)} @ ${n}${d == t ? '' : ', split'})`
						),
					u)
				)
					return !0;
				d.pos > n ? e.push(d) : i.push(d);
			}
			return !1;
		}
		advanceFully(t, e) {
			let i = t.pos;
			for (;;) {
				if (!this.advanceStack(t, null, null)) return !1;
				if (t.pos > i) return Fe(t, e), !0;
			}
		}
		runRecovery(t, e, i) {
			let n = null,
				r = !1;
			for (let s = 0; s < t.length; s++) {
				let o = t[s],
					a = e[s << 1],
					l = e[1 + (s << 1)],
					h = Le ? this.stackID(o) + ' -> ' : '';
				if (o.deadEnd) {
					if (r) continue;
					if (
						((r = !0),
						o.restart(),
						Le && console.log(h + this.stackID(o) + ' (restarted)'),
						this.advanceFully(o, i))
					)
						continue;
				}
				let c = o.split(),
					u = h;
				for (
					let t = 0;
					c.forceReduce() &&
					t < 10 &&
					(Le &&
						console.log(
							u + this.stackID(c) + ' (via force-reduce)'
						),
					!this.advanceFully(c, i));
					t++
				)
					Le && (u = this.stackID(c) + ' -> ');
				for (let t of o.recoverByInsert(a))
					Le &&
						console.log(
							h + this.stackID(t) + ' (via recover-insert)'
						),
						this.advanceFully(t, i);
				this.stream.end > o.pos
					? (l == o.pos && (l++, (a = 0)),
						o.recoverByDelete(a, l),
						Le &&
							console.log(
								h +
									this.stackID(o) +
									` (via recover-delete ${this.parser.getName(a)})`
							),
						Fe(o, i))
					: (!n || n.score < o.score) && (n = o);
			}
			return n;
		}
		stackToTree(t) {
			return (
				t.close(),
				It.build({
					buffer: Me.create(t),
					nodeSet: this.parser.nodeSet,
					topID: this.topTerm,
					maxBufferLength: this.parser.bufferLength,
					reused: this.reused,
					start: this.ranges[0].from,
					length: t.pos - this.ranges[0].from,
					minRepeatType: this.parser.minRepeatTerm,
				})
			);
		}
		stackID(t) {
			let e = (Be || (Be = new WeakMap())).get(t);
			return (
				e || Be.set(t, (e = String.fromCodePoint(this.nextStackID++))),
				e + t
			);
		}
	}
	function Fe(t, e) {
		for (let i = 0; i < e.length; i++) {
			let n = e[i];
			if (n.pos == t.pos && n.sameState(t))
				return void (e[i].score < t.score && (e[i] = t));
		}
		e.push(t);
	}
	class He {
		constructor(t, e, i) {
			(this.source = t), (this.flags = e), (this.disabled = i);
		}
		allows(t) {
			return !this.disabled || 0 == this.disabled[t];
		}
	}
	const Ke = (t) => t;
	class Je {
		constructor(t) {
			(this.start = t.start),
				(this.shift = t.shift || Ke),
				(this.reduce = t.reduce || Ke),
				(this.reuse = t.reuse || Ke),
				(this.hash = t.hash || (() => 0)),
				(this.strict = !1 !== t.strict);
		}
	}
	class ti extends pe {
		constructor(t) {
			if ((super(), (this.wrappers = []), 14 != t.version))
				throw new RangeError(
					`Parser version (${t.version}) doesn't match runtime version (14)`
				);
			let e = t.nodeNames.split(' ');
			this.minRepeatTerm = e.length;
			for (let i = 0; i < t.repeatNodeCount; i++) e.push('');
			let i = Object.keys(t.topRules).map((e) => t.topRules[e][1]),
				n = [];
			for (let t = 0; t < e.length; t++) n.push([]);
			function r(t, e, i) {
				n[t].push([e, e.deserialize(String(i))]);
			}
			if (t.nodeProps)
				for (let e of t.nodeProps) {
					let t = e[0];
					'string' == typeof t && (t = Wt[t]);
					for (let i = 1; i < e.length; ) {
						let n = e[i++];
						if (n >= 0) r(n, t, e[i++]);
						else {
							let s = e[i + -n];
							for (let o = -n; o > 0; o--) r(e[i++], t, s);
							i++;
						}
					}
				}
			(this.nodeSet = new Bt(
				e.map((e, r) =>
					Lt.define({
						name: r >= this.minRepeatTerm ? void 0 : e,
						id: r,
						props: n[r],
						top: i.indexOf(r) > -1,
						error: 0 == r,
						skipped:
							t.skippedNodes && t.skippedNodes.indexOf(r) > -1,
					})
				)
			)),
				t.propSources &&
					(this.nodeSet = this.nodeSet.extend(...t.propSources)),
				(this.strict = !1),
				(this.bufferLength = jt);
			let s = Re(t.tokenData);
			(this.context = t.context),
				(this.specializerSpecs = t.specialized || []),
				(this.specialized = new Uint16Array(
					this.specializerSpecs.length
				));
			for (let t = 0; t < this.specializerSpecs.length; t++)
				this.specialized[t] = this.specializerSpecs[t].term;
			(this.specializers = this.specializerSpecs.map(ii)),
				(this.states = Re(t.states, Uint32Array)),
				(this.data = Re(t.stateData)),
				(this.goto = Re(t.goto)),
				(this.maxTerm = t.maxTerm),
				(this.tokenizers = t.tokenizers.map((t) =>
					'number' == typeof t ? new je(s, t) : t
				)),
				(this.topRules = t.topRules),
				(this.dialects = t.dialects || {}),
				(this.dynamicPrecedences = t.dynamicPrecedences || null),
				(this.tokenPrecTable = t.tokenPrec),
				(this.termNames = t.termNames || null),
				(this.maxNode = this.nodeSet.types.length - 1),
				(this.dialect = this.parseDialect()),
				(this.top = this.topRules[Object.keys(this.topRules)[0]]);
		}
		createParse(t, e, i) {
			let n = new Ie(this, t, e, i);
			for (let r of this.wrappers) n = r(n, t, e, i);
			return n;
		}
		getGoto(t, e, i = !1) {
			let n = this.goto;
			if (e >= n[0]) return -1;
			for (let r = n[e + 1]; ; ) {
				let e = n[r++],
					s = 1 & e,
					o = n[r++];
				if (s && i) return o;
				for (let i = r + (e >> 1); r < i; r++) if (n[r] == t) return o;
				if (s) return -1;
			}
		}
		hasAction(t, e) {
			let i = this.data;
			for (let n = 0; n < 2; n++)
				for (let r, s = this.stateSlot(t, n ? 2 : 1); ; s += 3) {
					if (65535 == (r = i[s])) {
						if (1 != i[s + 1]) {
							if (2 == i[s + 1]) return ei(i, s + 2);
							break;
						}
						r = i[(s = ei(i, s + 2))];
					}
					if (r == e || 0 == r) return ei(i, s + 1);
				}
			return 0;
		}
		stateSlot(t, e) {
			return this.states[6 * t + e];
		}
		stateFlag(t, e) {
			return (this.stateSlot(t, 0) & e) > 0;
		}
		validAction(t, e) {
			return !!this.allActions(t, (t) => t == e || null);
		}
		allActions(t, e) {
			let i = this.stateSlot(t, 4),
				n = i ? e(i) : void 0;
			for (let i = this.stateSlot(t, 1); null == n; i += 3) {
				if (65535 == this.data[i]) {
					if (1 != this.data[i + 1]) break;
					i = ei(this.data, i + 2);
				}
				n = e(ei(this.data, i + 1));
			}
			return n;
		}
		nextStates(t) {
			let e = [];
			for (let i = this.stateSlot(t, 1); ; i += 3) {
				if (65535 == this.data[i]) {
					if (1 != this.data[i + 1]) break;
					i = ei(this.data, i + 2);
				}
				if (!(1 & this.data[i + 2])) {
					let t = this.data[i + 1];
					e.some((e, i) => 1 & i && e == t) ||
						e.push(this.data[i], t);
				}
			}
			return e;
		}
		configure(t) {
			let e = Object.assign(Object.create(ti.prototype), this);
			if (
				(t.props && (e.nodeSet = this.nodeSet.extend(...t.props)),
				t.top)
			) {
				let i = this.topRules[t.top];
				if (!i) throw new RangeError(`Invalid top rule name ${t.top}`);
				e.top = i;
			}
			return (
				t.tokenizers &&
					(e.tokenizers = this.tokenizers.map((e) => {
						let i = t.tokenizers.find((t) => t.from == e);
						return i ? i.to : e;
					})),
				t.specializers &&
					((e.specializers = this.specializers.slice()),
					(e.specializerSpecs = this.specializerSpecs.map((i, n) => {
						let r = t.specializers.find(
							(t) => t.from == i.external
						);
						if (!r) return i;
						let s = Object.assign(Object.assign({}, i), {
							external: r.to,
						});
						return (e.specializers[n] = ii(s)), s;
					}))),
				t.contextTracker && (e.context = t.contextTracker),
				t.dialect && (e.dialect = this.parseDialect(t.dialect)),
				null != t.strict && (e.strict = t.strict),
				t.wrap && (e.wrappers = e.wrappers.concat(t.wrap)),
				null != t.bufferLength && (e.bufferLength = t.bufferLength),
				e
			);
		}
		hasWrappers() {
			return this.wrappers.length > 0;
		}
		getName(t) {
			return this.termNames
				? this.termNames[t]
				: String(
						(t <= this.maxNode && this.nodeSet.types[t].name) || t
					);
		}
		get eofTerm() {
			return this.maxNode + 1;
		}
		get topNode() {
			return this.nodeSet.types[this.top[1]];
		}
		dynamicPrecedence(t) {
			let e = this.dynamicPrecedences;
			return null == e ? 0 : e[t] || 0;
		}
		parseDialect(t) {
			let e = Object.keys(this.dialects),
				i = e.map(() => !1);
			if (t)
				for (let n of t.split(' ')) {
					let t = e.indexOf(n);
					t >= 0 && (i[t] = !0);
				}
			let n = null;
			for (let t = 0; t < e.length; t++)
				if (!i[t])
					for (
						let i, r = this.dialects[e[t]];
						65535 != (i = this.data[r++]);

					)
						(n || (n = new Uint8Array(this.maxTerm + 1)))[i] = 1;
			return new He(t, i, n);
		}
		static deserialize(t) {
			return new ti(t);
		}
	}
	function ei(t, e) {
		return t[e] | (t[e + 1] << 16);
	}
	function ii(t) {
		if (t.external) {
			let e = t.extend ? 1 : 0;
			return (i, n) => (t.external(i, n) << 1) | e;
		}
		return t.get;
	}
	let ni = 0;
	class ri {
		constructor(t, e, i, n) {
			(this.name = t),
				(this.set = e),
				(this.base = i),
				(this.modified = n),
				(this.id = ni++);
		}
		toString() {
			let { name: t } = this;
			for (let e of this.modified) e.name && (t = `${e.name}(${t})`);
			return t;
		}
		static define(t, e) {
			let i = 'string' == typeof t ? t : '?';
			if ((t instanceof ri && (e = t), null == e ? void 0 : e.base))
				throw new Error('Can not derive from a modified tag');
			let n = new ri(i, [], null, []);
			if ((n.set.push(n), e)) for (let t of e.set) n.set.push(t);
			return n;
		}
		static defineModifier(t) {
			let e = new oi(t);
			return (t) =>
				t.modified.indexOf(e) > -1
					? t
					: oi.get(
							t.base || t,
							t.modified.concat(e).sort((t, e) => t.id - e.id)
						);
		}
	}
	let si = 0;
	class oi {
		constructor(t) {
			(this.name = t), (this.instances = []), (this.id = si++);
		}
		static get(t, e) {
			if (!e.length) return t;
			let i = e[0].instances.find((i) => {
				return (
					i.base == t &&
					((n = e),
					(r = i.modified),
					n.length == r.length && n.every((t, e) => t == r[e]))
				);
				var n, r;
			});
			if (i) return i;
			let n = [],
				r = new ri(t.name, n, t, e);
			for (let t of e) t.instances.push(r);
			let s = (function (t) {
				let e = [[]];
				for (let i = 0; i < t.length; i++)
					for (let n = 0, r = e.length; n < r; n++)
						e.push(e[n].concat(t[i]));
				return e.sort((t, e) => e.length - t.length);
			})(e);
			for (let e of t.set)
				if (!e.modified.length) for (let t of s) n.push(oi.get(e, t));
			return r;
		}
	}
	function ai(t) {
		let e = Object.create(null);
		for (let i in t) {
			let n = t[i];
			Array.isArray(n) || (n = [n]);
			for (let t of i.split(' '))
				if (t) {
					let i = [],
						r = 2,
						s = t;
					for (let e = 0; ; ) {
						if ('...' == s && e > 0 && e + 3 == t.length) {
							r = 1;
							break;
						}
						let n = /^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(s);
						if (!n) throw new RangeError('Invalid path: ' + t);
						if (
							(i.push(
								'*' == n[0]
									? ''
									: '"' == n[0][0]
										? JSON.parse(n[0])
										: n[0]
							),
							(e += n[0].length),
							e == t.length)
						)
							break;
						let o = t[e++];
						if (e == t.length && '!' == o) {
							r = 0;
							break;
						}
						if ('/' != o)
							throw new RangeError('Invalid path: ' + t);
						s = t.slice(e);
					}
					let o = i.length - 1,
						a = i[o];
					if (!a) throw new RangeError('Invalid path: ' + t);
					let l = new hi(n, r, o > 0 ? i.slice(0, o) : null);
					e[a] = l.sort(e[a]);
				}
		}
		return li.add(e);
	}
	const li = new Wt();
	class hi {
		constructor(t, e, i, n) {
			(this.tags = t),
				(this.mode = e),
				(this.context = i),
				(this.next = n);
		}
		get opaque() {
			return 0 == this.mode;
		}
		get inherit() {
			return 1 == this.mode;
		}
		sort(t) {
			return !t || t.depth < this.depth
				? ((this.next = t), this)
				: ((t.next = this.sort(t.next)), t);
		}
		get depth() {
			return this.context ? this.context.length : 0;
		}
	}
	function ci(t, e) {
		let i = Object.create(null);
		for (let e of t)
			if (Array.isArray(e.tag)) for (let t of e.tag) i[t.id] = e.class;
			else i[e.tag.id] = e.class;
		let { scope: n, all: r = null } = e || {};
		return {
			style: (t) => {
				let e = r;
				for (let n of t)
					for (let t of n.set) {
						let n = i[t.id];
						if (n) {
							e = e ? e + ' ' + n : n;
							break;
						}
					}
				return e;
			},
			scope: n,
		};
	}
	function ui(t, e, i, n = 0, r = t.length) {
		let s = new di(n, Array.isArray(e) ? e : [e], i);
		s.highlightRange(t.cursor(), n, r, '', s.highlighters), s.flush(r);
	}
	hi.empty = new hi([], 2, null);
	class di {
		constructor(t, e, i) {
			(this.at = t),
				(this.highlighters = e),
				(this.span = i),
				(this.class = '');
		}
		startSpan(t, e) {
			e != this.class &&
				(this.flush(t), t > this.at && (this.at = t), (this.class = e));
		}
		flush(t) {
			t > this.at && this.class && this.span(this.at, t, this.class);
		}
		highlightRange(t, e, i, n, r) {
			let { type: s, from: o, to: a } = t;
			if (o >= i || a <= e) return;
			s.isTop &&
				(r = this.highlighters.filter((t) => !t.scope || t.scope(s)));
			let l = n,
				h =
					(function (t) {
						let e = t.type.prop(li);
						for (; e && e.context && !t.matchContext(e.context); )
							e = e.next;
						return e || null;
					})(t) || hi.empty,
				c = (function (t, e) {
					let i = null;
					for (let n of t) {
						let t = n.style(e);
						t && (i = i ? i + ' ' + t : t);
					}
					return i;
				})(r, h.tags);
			if (
				(c &&
					(l && (l += ' '),
					(l += c),
					1 == h.mode && (n += (n ? ' ' : '') + c)),
				this.startSpan(Math.max(e, o), l),
				h.opaque)
			)
				return;
			let u = t.tree && t.tree.prop(Wt.mounted);
			if (u && u.overlay) {
				let s = t.node.enter(u.overlay[0].from + o, 1),
					h = this.highlighters.filter(
						(t) => !t.scope || t.scope(u.tree.type)
					),
					c = t.firstChild();
				for (let d = 0, f = o; ; d++) {
					let O = d < u.overlay.length ? u.overlay[d] : null,
						p = O ? O.from + o : a,
						m = Math.max(e, f),
						g = Math.min(i, p);
					if (m < g && c)
						for (
							;
							t.from < g &&
							(this.highlightRange(t, m, g, n, r),
							this.startSpan(Math.min(g, t.to), l),
							!(t.to >= p) && t.nextSibling());

						);
					if (!O || p > i) break;
					(f = O.to + o),
						f > e &&
							(this.highlightRange(
								s.cursor(),
								Math.max(e, O.from + o),
								Math.min(i, f),
								'',
								h
							),
							this.startSpan(Math.min(i, f), l));
				}
				c && t.parent();
			} else if (t.firstChild()) {
				u && (n = '');
				do {
					if (!(t.to <= e)) {
						if (t.from >= i) break;
						this.highlightRange(t, e, i, n, r),
							this.startSpan(Math.min(i, t.to), l);
					}
				} while (t.nextSibling());
				t.parent();
			}
		}
	}
	const fi = ri.define,
		Oi = fi(),
		pi = fi(),
		mi = fi(pi),
		gi = fi(pi),
		bi = fi(),
		yi = fi(bi),
		vi = fi(bi),
		wi = fi(),
		Si = fi(wi),
		xi = fi(),
		Qi = fi(),
		ki = fi(),
		$i = fi(ki),
		Pi = fi(),
		Zi = {
			comment: Oi,
			lineComment: fi(Oi),
			blockComment: fi(Oi),
			docComment: fi(Oi),
			name: pi,
			variableName: fi(pi),
			typeName: mi,
			tagName: fi(mi),
			propertyName: gi,
			attributeName: fi(gi),
			className: fi(pi),
			labelName: fi(pi),
			namespace: fi(pi),
			macroName: fi(pi),
			literal: bi,
			string: yi,
			docString: fi(yi),
			character: fi(yi),
			attributeValue: fi(yi),
			number: vi,
			integer: fi(vi),
			float: fi(vi),
			bool: fi(bi),
			regexp: fi(bi),
			escape: fi(bi),
			color: fi(bi),
			url: fi(bi),
			keyword: xi,
			self: fi(xi),
			null: fi(xi),
			atom: fi(xi),
			unit: fi(xi),
			modifier: fi(xi),
			operatorKeyword: fi(xi),
			controlKeyword: fi(xi),
			definitionKeyword: fi(xi),
			moduleKeyword: fi(xi),
			operator: Qi,
			derefOperator: fi(Qi),
			arithmeticOperator: fi(Qi),
			logicOperator: fi(Qi),
			bitwiseOperator: fi(Qi),
			compareOperator: fi(Qi),
			updateOperator: fi(Qi),
			definitionOperator: fi(Qi),
			typeOperator: fi(Qi),
			controlOperator: fi(Qi),
			punctuation: ki,
			separator: fi(ki),
			bracket: $i,
			angleBracket: fi($i),
			squareBracket: fi($i),
			paren: fi($i),
			brace: fi($i),
			content: wi,
			heading: Si,
			heading1: fi(Si),
			heading2: fi(Si),
			heading3: fi(Si),
			heading4: fi(Si),
			heading5: fi(Si),
			heading6: fi(Si),
			contentSeparator: fi(wi),
			list: fi(wi),
			quote: fi(wi),
			emphasis: fi(wi),
			strong: fi(wi),
			link: fi(wi),
			monospace: fi(wi),
			strikethrough: fi(wi),
			inserted: fi(),
			deleted: fi(),
			changed: fi(),
			invalid: fi(),
			meta: Pi,
			documentMeta: fi(Pi),
			annotation: fi(Pi),
			processingInstruction: fi(Pi),
			definition: ri.defineModifier('definition'),
			constant: ri.defineModifier('constant'),
			function: ri.defineModifier('function'),
			standard: ri.defineModifier('standard'),
			local: ri.defineModifier('local'),
			special: ri.defineModifier('special'),
		};
	for (let t in Zi) {
		let e = Zi[t];
		e instanceof ri && (e.name = t);
	}
	ci([
		{ tag: Zi.link, class: 'tok-link' },
		{ tag: Zi.heading, class: 'tok-heading' },
		{ tag: Zi.emphasis, class: 'tok-emphasis' },
		{ tag: Zi.strong, class: 'tok-strong' },
		{ tag: Zi.keyword, class: 'tok-keyword' },
		{ tag: Zi.atom, class: 'tok-atom' },
		{ tag: Zi.bool, class: 'tok-bool' },
		{ tag: Zi.url, class: 'tok-url' },
		{ tag: Zi.labelName, class: 'tok-labelName' },
		{ tag: Zi.inserted, class: 'tok-inserted' },
		{ tag: Zi.deleted, class: 'tok-deleted' },
		{ tag: Zi.literal, class: 'tok-literal' },
		{ tag: Zi.string, class: 'tok-string' },
		{ tag: Zi.number, class: 'tok-number' },
		{
			tag: [Zi.regexp, Zi.escape, Zi.special(Zi.string)],
			class: 'tok-string2',
		},
		{ tag: Zi.variableName, class: 'tok-variableName' },
		{ tag: Zi.local(Zi.variableName), class: 'tok-variableName tok-local' },
		{
			tag: Zi.definition(Zi.variableName),
			class: 'tok-variableName tok-definition',
		},
		{ tag: Zi.special(Zi.variableName), class: 'tok-variableName2' },
		{
			tag: Zi.definition(Zi.propertyName),
			class: 'tok-propertyName tok-definition',
		},
		{ tag: Zi.typeName, class: 'tok-typeName' },
		{ tag: Zi.namespace, class: 'tok-namespace' },
		{ tag: Zi.className, class: 'tok-className' },
		{ tag: Zi.macroName, class: 'tok-macroName' },
		{ tag: Zi.propertyName, class: 'tok-propertyName' },
		{ tag: Zi.operator, class: 'tok-operator' },
		{ tag: Zi.comment, class: 'tok-comment' },
		{ tag: Zi.meta, class: 'tok-meta' },
		{ tag: Zi.invalid, class: 'tok-invalid' },
		{ tag: Zi.punctuation, class: 'tok-punctuation' },
	]);
	const Ti = {
			area: !0,
			base: !0,
			br: !0,
			col: !0,
			command: !0,
			embed: !0,
			frame: !0,
			hr: !0,
			img: !0,
			input: !0,
			keygen: !0,
			link: !0,
			meta: !0,
			param: !0,
			source: !0,
			track: !0,
			wbr: !0,
			menuitem: !0,
		},
		Ci = {
			dd: !0,
			li: !0,
			optgroup: !0,
			option: !0,
			p: !0,
			rp: !0,
			rt: !0,
			tbody: !0,
			td: !0,
			tfoot: !0,
			th: !0,
			tr: !0,
		},
		Ai = {
			dd: { dd: !0, dt: !0 },
			dt: { dd: !0, dt: !0 },
			li: { li: !0 },
			option: { option: !0, optgroup: !0 },
			optgroup: { optgroup: !0 },
			p: {
				address: !0,
				article: !0,
				aside: !0,
				blockquote: !0,
				dir: !0,
				div: !0,
				dl: !0,
				fieldset: !0,
				footer: !0,
				form: !0,
				h1: !0,
				h2: !0,
				h3: !0,
				h4: !0,
				h5: !0,
				h6: !0,
				header: !0,
				hgroup: !0,
				hr: !0,
				menu: !0,
				nav: !0,
				ol: !0,
				p: !0,
				pre: !0,
				section: !0,
				table: !0,
				ul: !0,
			},
			rp: { rp: !0, rt: !0 },
			rt: { rp: !0, rt: !0 },
			tbody: { tbody: !0, tfoot: !0 },
			td: { td: !0, th: !0 },
			tfoot: { tbody: !0 },
			th: { td: !0, th: !0 },
			thead: { tbody: !0, tfoot: !0 },
			tr: { tr: !0 },
		};
	function Xi(t) {
		return 9 == t || 10 == t || 13 == t || 32 == t;
	}
	let Mi = null,
		Ri = null,
		_i = 0;
	function Vi(t, e) {
		let i = t.pos + e;
		if (_i == i && Ri == t) return Mi;
		let n = t.peek(e);
		for (; Xi(n); ) n = t.peek(++e);
		let r = '';
		for (
			;
			45 == (s = n) ||
			46 == s ||
			58 == s ||
			(s >= 65 && s <= 90) ||
			95 == s ||
			(s >= 97 && s <= 122) ||
			s >= 161;

		)
			(r += String.fromCharCode(n)), (n = t.peek(++e));
		var s;
		return (
			(Ri = t),
			(_i = i),
			(Mi = r ? r.toLowerCase() : n == qi || n == ji ? void 0 : null)
		);
	}
	const qi = 63,
		ji = 33;
	function Di(t, e) {
		(this.name = t), (this.parent = e);
	}
	const Ei = [6, 10, 7, 8, 9],
		Wi = new Je({
			start: null,
			shift: (t, e, i, n) =>
				Ei.indexOf(e) > -1 ? new Di(Vi(n, 1) || '', t) : t,
			reduce: (t, e) => (20 == e && t ? t.parent : t),
			reuse(t, e, i, n) {
				let r = e.type.id;
				return 6 == r || 36 == r ? new Di(Vi(n, 1) || '', t) : t;
			},
			strict: !1,
		}),
		Yi = new Ee(
			(t, e) => {
				if (60 != t.next)
					return void (t.next < 0 && e.context && t.acceptToken(57));
				t.advance();
				let i = 47 == t.next;
				i && t.advance();
				let n = Vi(t, 0);
				if (void 0 === n) return;
				if (!n) return t.acceptToken(i ? 14 : 6);
				let r = e.context ? e.context.name : null;
				if (i) {
					if (n == r) return t.acceptToken(11);
					if (r && Ci[r]) return t.acceptToken(57, -2);
					if (e.dialectEnabled(0)) return t.acceptToken(12);
					for (let t = e.context; t; t = t.parent)
						if (t.name == n) return;
					t.acceptToken(13);
				} else {
					if ('script' == n) return t.acceptToken(7);
					if ('style' == n) return t.acceptToken(8);
					if ('textarea' == n) return t.acceptToken(9);
					if (Ti.hasOwnProperty(n)) return t.acceptToken(10);
					r && Ai[r] && Ai[r][n]
						? t.acceptToken(57, -1)
						: t.acceptToken(6);
				}
			},
			{ contextual: !0 }
		),
		zi = new Ee((t) => {
			for (let e = 0, i = 0; ; i++) {
				if (t.next < 0) {
					i && t.acceptToken(58);
					break;
				}
				if (45 == t.next) e++;
				else {
					if (62 == t.next && e >= 2) {
						i >= 3 && t.acceptToken(58, -2);
						break;
					}
					e = 0;
				}
				t.advance();
			}
		}),
		Li = new Ee((t, e) => {
			if (47 == t.next && 62 == t.peek(1)) {
				let i =
					e.dialectEnabled(1) ||
					(function (t) {
						for (; t; t = t.parent)
							if ('svg' == t.name || 'math' == t.name) return !0;
						return !1;
					})(e.context);
				t.acceptToken(i ? 5 : 4, 2);
			} else 62 == t.next && t.acceptToken(4, 1);
		});
	function Bi(t, e, i) {
		let n = 2 + t.length;
		return new Ee((r) => {
			for (let s = 0, o = 0, a = 0; ; a++) {
				if (r.next < 0) {
					a && r.acceptToken(e);
					break;
				}
				if (
					(0 == s && 60 == r.next) ||
					(1 == s && 47 == r.next) ||
					(s >= 2 && s < n && r.next == t.charCodeAt(s - 2))
				)
					s++, o++;
				else if ((2 != s && s != n) || !Xi(r.next)) {
					if (s == n && 62 == r.next) {
						a > o
							? r.acceptToken(e, -o)
							: r.acceptToken(i, -(o - 2));
						break;
					}
					if ((10 == r.next || 13 == r.next) && a) {
						r.acceptToken(e, 1);
						break;
					}
					s = o = 0;
				} else o++;
				r.advance();
			}
		});
	}
	const Ui = Bi('script', 54, 1),
		Ni = Bi('style', 55, 2),
		Gi = Bi('textarea', 56, 3),
		Ii = ai({
			'Text RawText': Zi.content,
			'StartTag StartCloseTag SelfClosingEndTag EndTag': Zi.angleBracket,
			TagName: Zi.tagName,
			'MismatchedCloseTag/TagName': [Zi.tagName, Zi.invalid],
			AttributeName: Zi.attributeName,
			'AttributeValue UnquotedAttributeValue': Zi.attributeValue,
			Is: Zi.definitionOperator,
			'EntityReference CharacterReference': Zi.character,
			Comment: Zi.blockComment,
			ProcessingInst: Zi.processingInstruction,
			DoctypeDecl: Zi.documentMeta,
		}),
		Fi = ti.deserialize({
			version: 14,
			states: ",xOVO!rOOO!WQ#tO'#CqO!]Q#tO'#CzO!bQ#tO'#C}O!gQ#tO'#DQO!lQ#tO'#DSO!qOaO'#CpO!|ObO'#CpO#XOdO'#CpO$eO!rO'#CpOOO`'#Cp'#CpO$lO$fO'#DTO$tQ#tO'#DVO$yQ#tO'#DWOOO`'#Dk'#DkOOO`'#DY'#DYQVO!rOOO%OQ&rO,59]O%ZQ&rO,59fO%fQ&rO,59iO%qQ&rO,59lO%|Q&rO,59nOOOa'#D^'#D^O&XOaO'#CxO&dOaO,59[OOOb'#D_'#D_O&lObO'#C{O&wObO,59[OOOd'#D`'#D`O'POdO'#DOO'[OdO,59[OOO`'#Da'#DaO'dO!rO,59[O'kQ#tO'#DROOO`,59[,59[OOOp'#Db'#DbO'pO$fO,59oOOO`,59o,59oO'xQ#|O,59qO'}Q#|O,59rOOO`-E7W-E7WO(SQ&rO'#CsOOQW'#DZ'#DZO(bQ&rO1G.wOOOa1G.w1G.wOOO`1G/Y1G/YO(mQ&rO1G/QOOOb1G/Q1G/QO(xQ&rO1G/TOOOd1G/T1G/TO)TQ&rO1G/WOOO`1G/W1G/WO)`Q&rO1G/YOOOa-E7[-E7[O)kQ#tO'#CyOOO`1G.v1G.vOOOb-E7]-E7]O)pQ#tO'#C|OOOd-E7^-E7^O)uQ#tO'#DPOOO`-E7_-E7_O)zQ#|O,59mOOOp-E7`-E7`OOO`1G/Z1G/ZOOO`1G/]1G/]OOO`1G/^1G/^O*PQ,UO,59_OOQW-E7X-E7XOOOa7+$c7+$cOOO`7+$t7+$tOOOb7+$l7+$lOOOd7+$o7+$oOOO`7+$r7+$rO*[Q#|O,59eO*aQ#|O,59hO*fQ#|O,59kOOO`1G/X1G/XO*kO7[O'#CvO*|OMhO'#CvOOQW1G.y1G.yOOO`1G/P1G/POOO`1G/S1G/SOOO`1G/V1G/VOOOO'#D['#D[O+_O7[O,59bOOQW,59b,59bOOOO'#D]'#D]O+pOMhO,59bOOOO-E7Y-E7YOOQW1G.|1G.|OOOO-E7Z-E7Z",
			stateData:
				',]~O!^OS~OUSOVPOWQOXROYTO[]O][O^^O`^Oa^Ob^Oc^Ox^O{_O!dZO~OfaO~OfbO~OfcO~OfdO~OfeO~O!WfOPlP!ZlP~O!XiOQoP!ZoP~O!YlORrP!ZrP~OUSOVPOWQOXROYTOZqO[]O][O^^O`^Oa^Ob^Oc^Ox^O!dZO~O!ZrO~P#dO![sO!euO~OfvO~OfwO~OS|OT}OhyO~OS!POT}OhyO~OS!ROT}OhyO~OS!TOT}OhyO~OS}OT}OhyO~O!WfOPlX!ZlX~OP!WO!Z!XO~O!XiOQoX!ZoX~OQ!ZO!Z!XO~O!YlORrX!ZrX~OR!]O!Z!XO~O!Z!XO~P#dOf!_O~O![sO!e!aO~OS!bO~OS!cO~Oi!dOSgXTgXhgX~OS!fOT!gOhyO~OS!hOT!gOhyO~OS!iOT!gOhyO~OS!jOT!gOhyO~OS!gOT!gOhyO~Of!kO~Of!lO~Of!mO~OS!nO~Ok!qO!`!oO!b!pO~OS!rO~OS!sO~OS!tO~Oa!uOb!uOc!uO!`!wO!a!uO~Oa!xOb!xOc!xO!b!wO!c!xO~Oa!uOb!uOc!uO!`!{O!a!uO~Oa!xOb!xOc!xO!b!{O!c!xO~OT~bac!dx{!d~',
			goto: '%p!`PPPPPPPPPPPPPPPPPPPP!a!gP!mPP!yP!|#P#S#Y#]#`#f#i#l#r#x!aP!a!aP$O$U$l$r$x%O%U%[%bPPPPPPPP%hX^OX`pXUOX`pezabcde{!O!Q!S!UR!q!dRhUR!XhXVOX`pRkVR!XkXWOX`pRnWR!XnXXOX`pQrXR!XpXYOX`pQ`ORx`Q{aQ!ObQ!QcQ!SdQ!UeZ!e{!O!Q!S!UQ!v!oR!z!vQ!y!pR!|!yQgUR!VgQjVR!YjQmWR![mQpXR!^pQtZR!`tS_O`ToXp',
			nodeNames:
				'⚠ StartCloseTag StartCloseTag StartCloseTag EndTag SelfClosingEndTag StartTag StartTag StartTag StartTag StartTag StartCloseTag StartCloseTag StartCloseTag IncompleteCloseTag Document Text EntityReference CharacterReference InvalidEntity Element OpenTag TagName Attribute AttributeName Is AttributeValue UnquotedAttributeValue ScriptText CloseTag OpenTag StyleText CloseTag OpenTag TextareaText CloseTag OpenTag CloseTag SelfClosingTag Comment ProcessingInst MismatchedCloseTag CloseTag DoctypeDecl',
			maxTerm: 67,
			context: Wi,
			nodeProps: [
				[
					'closedBy',
					-10,
					1,
					2,
					3,
					7,
					8,
					9,
					10,
					11,
					12,
					13,
					'EndTag',
					6,
					'EndTag SelfClosingEndTag',
					-4,
					21,
					30,
					33,
					36,
					'CloseTag',
				],
				[
					'openedBy',
					4,
					'StartTag StartCloseTag',
					5,
					'StartTag',
					-4,
					29,
					32,
					35,
					37,
					'OpenTag',
				],
				[
					'group',
					-9,
					14,
					17,
					18,
					19,
					20,
					39,
					40,
					41,
					42,
					'Entity',
					16,
					'Entity TextContent',
					-3,
					28,
					31,
					34,
					'TextContent Entity',
				],
				[
					'isolate',
					-11,
					21,
					29,
					30,
					32,
					33,
					35,
					36,
					37,
					38,
					41,
					42,
					'ltr',
					-3,
					26,
					27,
					39,
					'',
				],
			],
			propSources: [Ii],
			skippedNodes: [0],
			repeatNodeCount: 9,
			tokenData:
				"!<p!aR!YOX$qXY,QYZ,QZ[$q[]&X]^,Q^p$qpq,Qqr-_rs3_sv-_vw3}wxHYx}-_}!OH{!O!P-_!P!Q$q!Q![-_![!]Mz!]!^-_!^!_!$S!_!`!;x!`!a&X!a!c-_!c!}Mz!}#R-_#R#SMz#S#T1k#T#oMz#o#s-_#s$f$q$f%W-_%W%oMz%o%p-_%p&aMz&a&b-_&b1pMz1p4U-_4U4dMz4d4e-_4e$ISMz$IS$I`-_$I`$IbMz$Ib$Kh-_$Kh%#tMz%#t&/x-_&/x&EtMz&Et&FV-_&FV;'SMz;'S;:j!#|;:j;=`3X<%l?&r-_?&r?AhMz?Ah?BY$q?BY?MnMz?MnO$q!Z$|c`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr$qrs&}sv$qvw+Pwx(tx!^$q!^!_*V!_!a&X!a#S$q#S#T&X#T;'S$q;'S;=`+z<%lO$q!R&bX`P!a`!cpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&Xq'UV`P!cpOv&}wx'kx!^&}!^!_(V!_;'S&};'S;=`(n<%lO&}P'pT`POv'kw!^'k!_;'S'k;'S;=`(P<%lO'kP(SP;=`<%l'kp([S!cpOv(Vx;'S(V;'S;=`(h<%lO(Vp(kP;=`<%l(Vq(qP;=`<%l&}a({W`P!a`Or(trs'ksv(tw!^(t!^!_)e!_;'S(t;'S;=`*P<%lO(t`)jT!a`Or)esv)ew;'S)e;'S;=`)y<%lO)e`)|P;=`<%l)ea*SP;=`<%l(t!Q*^V!a`!cpOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!Q*vP;=`<%l*V!R*|P;=`<%l&XW+UYkWOX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+PW+wP;=`<%l+P!Z+}P;=`<%l$q!a,]``P!a`!cp!^^OX&XXY,QYZ,QZ]&X]^,Q^p&Xpq,Qqr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!_-ljhS`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_*V!_!a&X!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q[/ebhSkWOX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+PS0rXhSqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0mS1bP;=`<%l0m[1hP;=`<%l/^!V1vchS`P!a`!cpOq&Xqr1krs&}sv1kvw0mwx(tx!P1k!P!Q&X!Q!^1k!^!_*V!_!a&X!a#s1k#s$f&X$f;'S1k;'S;=`3R<%l?Ah1k?Ah?BY&X?BY?Mn1k?MnO&X!V3UP;=`<%l1k!_3[P;=`<%l-_!Z3hV!`h`P!cpOv&}wx'kx!^&}!^!_(V!_;'S&};'S;=`(n<%lO&}!_4WihSkWc!ROX5uXZ7SZ[5u[^7S^p5uqr8trs7Sst>]tw8twx7Sx!P8t!P!Q5u!Q!]8t!]!^/^!^!a7S!a#S8t#S#T;{#T#s8t#s$f5u$f;'S8t;'S;=`>V<%l?Ah8t?Ah?BY5u?BY?Mn8t?MnO5u!Z5zbkWOX5uXZ7SZ[5u[^7S^p5uqr5urs7Sst+Ptw5uwx7Sx!]5u!]!^7w!^!a7S!a#S5u#S#T7S#T;'S5u;'S;=`8n<%lO5u!R7VVOp7Sqs7St!]7S!]!^7l!^;'S7S;'S;=`7q<%lO7S!R7qOa!R!R7tP;=`<%l7S!Z8OYkWa!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+P!Z8qP;=`<%l5u!_8{ihSkWOX5uXZ7SZ[5u[^7S^p5uqr8trs7Sst/^tw8twx7Sx!P8t!P!Q5u!Q!]8t!]!^:j!^!a7S!a#S8t#S#T;{#T#s8t#s$f5u$f;'S8t;'S;=`>V<%l?Ah8t?Ah?BY5u?BY?Mn8t?MnO5u!_:sbhSkWa!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!V<QchSOp7Sqr;{rs7Sst0mtw;{wx7Sx!P;{!P!Q7S!Q!];{!]!^=]!^!a7S!a#s;{#s$f7S$f;'S;{;'S;=`>P<%l?Ah;{?Ah?BY7S?BY?Mn;{?MnO7S!V=dXhSa!Rqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0m!V>SP;=`<%l;{!_>YP;=`<%l8t!_>dhhSkWOX@OXZAYZ[@O[^AY^p@OqrBwrsAYswBwwxAYx!PBw!P!Q@O!Q!]Bw!]!^/^!^!aAY!a#SBw#S#TE{#T#sBw#s$f@O$f;'SBw;'S;=`HS<%l?AhBw?Ah?BY@O?BY?MnBw?MnO@O!Z@TakWOX@OXZAYZ[@O[^AY^p@Oqr@OrsAYsw@OwxAYx!]@O!]!^Az!^!aAY!a#S@O#S#TAY#T;'S@O;'S;=`Bq<%lO@O!RA]UOpAYq!]AY!]!^Ao!^;'SAY;'S;=`At<%lOAY!RAtOb!R!RAwP;=`<%lAY!ZBRYkWb!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+P!ZBtP;=`<%l@O!_COhhSkWOX@OXZAYZ[@O[^AY^p@OqrBwrsAYswBwwxAYx!PBw!P!Q@O!Q!]Bw!]!^Dj!^!aAY!a#SBw#S#TE{#T#sBw#s$f@O$f;'SBw;'S;=`HS<%l?AhBw?Ah?BY@O?BY?MnBw?MnO@O!_DsbhSkWb!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!VFQbhSOpAYqrE{rsAYswE{wxAYx!PE{!P!QAY!Q!]E{!]!^GY!^!aAY!a#sE{#s$fAY$f;'SE{;'S;=`G|<%l?AhE{?Ah?BYAY?BY?MnE{?MnOAY!VGaXhSb!Rqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0m!VHPP;=`<%lE{!_HVP;=`<%lBw!ZHcW!bx`P!a`Or(trs'ksv(tw!^(t!^!_)e!_;'S(t;'S;=`*P<%lO(t!aIYlhS`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!OKQ!O!P-_!P!Q$q!Q!^-_!^!_*V!_!a&X!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!aK_khS`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_*V!_!`&X!`!aMS!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!TM_X`P!a`!cp!eQOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!aNZ!ZhSfQ`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!OMz!O!PMz!P!Q$q!Q![Mz![!]Mz!]!^-_!^!_*V!_!a&X!a!c-_!c!}Mz!}#R-_#R#SMz#S#T1k#T#oMz#o#s-_#s$f$q$f$}-_$}%OMz%O%W-_%W%oMz%o%p-_%p&aMz&a&b-_&b1pMz1p4UMz4U4dMz4d4e-_4e$ISMz$IS$I`-_$I`$IbMz$Ib$Je-_$Je$JgMz$Jg$Kh-_$Kh%#tMz%#t&/x-_&/x&EtMz&Et&FV-_&FV;'SMz;'S;:j!#|;:j;=`3X<%l?&r-_?&r?AhMz?Ah?BY$q?BY?MnMz?MnO$q!a!$PP;=`<%lMz!R!$ZY!a`!cpOq*Vqr!$yrs(Vsv*Vwx)ex!a*V!a!b!4t!b;'S*V;'S;=`*s<%lO*V!R!%Q]!a`!cpOr*Vrs(Vsv*Vwx)ex}*V}!O!%y!O!f*V!f!g!']!g#W*V#W#X!0`#X;'S*V;'S;=`*s<%lO*V!R!&QX!a`!cpOr*Vrs(Vsv*Vwx)ex}*V}!O!&m!O;'S*V;'S;=`*s<%lO*V!R!&vV!a`!cp!dPOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!'dX!a`!cpOr*Vrs(Vsv*Vwx)ex!q*V!q!r!(P!r;'S*V;'S;=`*s<%lO*V!R!(WX!a`!cpOr*Vrs(Vsv*Vwx)ex!e*V!e!f!(s!f;'S*V;'S;=`*s<%lO*V!R!(zX!a`!cpOr*Vrs(Vsv*Vwx)ex!v*V!v!w!)g!w;'S*V;'S;=`*s<%lO*V!R!)nX!a`!cpOr*Vrs(Vsv*Vwx)ex!{*V!{!|!*Z!|;'S*V;'S;=`*s<%lO*V!R!*bX!a`!cpOr*Vrs(Vsv*Vwx)ex!r*V!r!s!*}!s;'S*V;'S;=`*s<%lO*V!R!+UX!a`!cpOr*Vrs(Vsv*Vwx)ex!g*V!g!h!+q!h;'S*V;'S;=`*s<%lO*V!R!+xY!a`!cpOr!+qrs!,hsv!+qvw!-Swx!.[x!`!+q!`!a!/j!a;'S!+q;'S;=`!0Y<%lO!+qq!,mV!cpOv!,hvx!-Sx!`!,h!`!a!-q!a;'S!,h;'S;=`!.U<%lO!,hP!-VTO!`!-S!`!a!-f!a;'S!-S;'S;=`!-k<%lO!-SP!-kO{PP!-nP;=`<%l!-Sq!-xS!cp{POv(Vx;'S(V;'S;=`(h<%lO(Vq!.XP;=`<%l!,ha!.aX!a`Or!.[rs!-Ssv!.[vw!-Sw!`!.[!`!a!.|!a;'S!.[;'S;=`!/d<%lO!.[a!/TT!a`{POr)esv)ew;'S)e;'S;=`)y<%lO)ea!/gP;=`<%l!.[!R!/sV!a`!cp{POr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!0]P;=`<%l!+q!R!0gX!a`!cpOr*Vrs(Vsv*Vwx)ex#c*V#c#d!1S#d;'S*V;'S;=`*s<%lO*V!R!1ZX!a`!cpOr*Vrs(Vsv*Vwx)ex#V*V#V#W!1v#W;'S*V;'S;=`*s<%lO*V!R!1}X!a`!cpOr*Vrs(Vsv*Vwx)ex#h*V#h#i!2j#i;'S*V;'S;=`*s<%lO*V!R!2qX!a`!cpOr*Vrs(Vsv*Vwx)ex#m*V#m#n!3^#n;'S*V;'S;=`*s<%lO*V!R!3eX!a`!cpOr*Vrs(Vsv*Vwx)ex#d*V#d#e!4Q#e;'S*V;'S;=`*s<%lO*V!R!4XX!a`!cpOr*Vrs(Vsv*Vwx)ex#X*V#X#Y!+q#Y;'S*V;'S;=`*s<%lO*V!R!4{Y!a`!cpOr!4trs!5ksv!4tvw!6Vwx!8]x!a!4t!a!b!:]!b;'S!4t;'S;=`!;r<%lO!4tq!5pV!cpOv!5kvx!6Vx!a!5k!a!b!7W!b;'S!5k;'S;=`!8V<%lO!5kP!6YTO!a!6V!a!b!6i!b;'S!6V;'S;=`!7Q<%lO!6VP!6lTO!`!6V!`!a!6{!a;'S!6V;'S;=`!7Q<%lO!6VP!7QOxPP!7TP;=`<%l!6Vq!7]V!cpOv!5kvx!6Vx!`!5k!`!a!7r!a;'S!5k;'S;=`!8V<%lO!5kq!7yS!cpxPOv(Vx;'S(V;'S;=`(h<%lO(Vq!8YP;=`<%l!5ka!8bX!a`Or!8]rs!6Vsv!8]vw!6Vw!a!8]!a!b!8}!b;'S!8];'S;=`!:V<%lO!8]a!9SX!a`Or!8]rs!6Vsv!8]vw!6Vw!`!8]!`!a!9o!a;'S!8];'S;=`!:V<%lO!8]a!9vT!a`xPOr)esv)ew;'S)e;'S;=`)y<%lO)ea!:YP;=`<%l!8]!R!:dY!a`!cpOr!4trs!5ksv!4tvw!6Vwx!8]x!`!4t!`!a!;S!a;'S!4t;'S;=`!;r<%lO!4t!R!;]V!a`!cpxPOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!;uP;=`<%l!4t!V!<TXiS`P!a`!cpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X",
			tokenizers: [Ui, Ni, Gi, Li, Yi, zi, 0, 1, 2, 3, 4, 5],
			topRules: { Document: [0, 15] },
			dialects: { noMatch: 0, selfClosing: 509 },
			tokenPrec: 511,
		});
	function Hi(t, e) {
		let i = Object.create(null);
		for (let n of t.getChildren(23)) {
			let t = n.getChild(24),
				r = n.getChild(26) || n.getChild(27);
			t &&
				(i[e.read(t.from, t.to)] = r
					? 26 == r.type.id
						? e.read(r.from + 1, r.to - 1)
						: e.read(r.from, r.to)
					: '');
		}
		return i;
	}
	function Ki(t, e) {
		let i = t.getChild(22);
		return i ? e.read(i.from, i.to) : ' ';
	}
	function Ji(t, e, i) {
		let n;
		for (let r of i)
			if (!r.attrs || r.attrs(n || (n = Hi(t.node.parent.firstChild, e))))
				return { parser: r.parser };
		return null;
	}
	function tn(t = [], e = []) {
		let i = [],
			n = [],
			r = [],
			s = [];
		for (let e of t)
			('script' == e.tag
				? i
				: 'style' == e.tag
					? n
					: 'textarea' == e.tag
						? r
						: s
			).push(e);
		let o = e.length ? Object.create(null) : null;
		for (let t of e) (o[t.name] || (o[t.name] = [])).push(t);
		return (
			(a = (t, e) => {
				let a = t.type.id;
				if (28 == a) return Ji(t, e, i);
				if (31 == a) return Ji(t, e, n);
				if (34 == a) return Ji(t, e, r);
				if (20 == a && s.length) {
					let i,
						n = t.node,
						r = n.firstChild,
						o = r && Ki(r, e);
					if (o)
						for (let t of s)
							if (
								t.tag == o &&
								(!t.attrs || t.attrs(i || (i = Hi(r, e))))
							) {
								let e = n.lastChild,
									i = 37 == e.type.id ? e.from : n.to;
								if (i > r.to)
									return {
										parser: t.parser,
										overlay: [{ from: r.to, to: i }],
									};
							}
				}
				if (o && 23 == a) {
					let i,
						n = t.node;
					if ((i = n.firstChild)) {
						let t = o[e.read(i.from, i.to)];
						if (t)
							for (let i of t) {
								if (i.tagName && i.tagName != Ki(n.parent, e))
									continue;
								let t = n.lastChild;
								if (26 == t.type.id) {
									let e = t.from + 1,
										n = t.lastChild,
										r = t.to - (n && n.isError ? 0 : 1);
									if (r > e)
										return {
											parser: i.parser,
											overlay: [{ from: e, to: r }],
										};
								} else if (27 == t.type.id)
									return {
										parser: i.parser,
										overlay: [{ from: t.from, to: t.to }],
									};
							}
					}
				}
				return null;
			}),
			(t, e, i, n) => new we(t, a, e, i, n)
		);
		var a;
	}
	const en = [
		9, 10, 11, 12, 13, 32, 133, 160, 5760, 8192, 8193, 8194, 8195, 8196,
		8197, 8198, 8199, 8200, 8201, 8202, 8232, 8233, 8239, 8287, 12288,
	];
	function nn(t) {
		return (t >= 65 && t <= 90) || (t >= 97 && t <= 122) || t >= 161;
	}
	function rn(t) {
		return t >= 48 && t <= 57;
	}
	const sn = new Ee((t, e) => {
			for (let i = !1, n = 0, r = 0; ; r++) {
				let { next: s } = t;
				if (nn(s) || 45 == s || 95 == s || (i && rn(s)))
					!i && (45 != s || r > 0) && (i = !0),
						n === r && 45 == s && n++,
						t.advance();
				else {
					if (92 != s || 10 == t.peek(1)) {
						i &&
							t.acceptToken(
								40 == s
									? 100
									: 2 == n && e.canShift(2)
										? 2
										: 101
							);
						break;
					}
					t.advance(), t.next > -1 && t.advance(), (i = !0);
				}
			}
		}),
		on = new Ee((t) => {
			if (en.includes(t.peek(-1))) {
				let { next: e } = t;
				(nn(e) ||
					95 == e ||
					35 == e ||
					46 == e ||
					91 == e ||
					(58 == e && nn(t.peek(1))) ||
					45 == e ||
					38 == e) &&
					t.acceptToken(99);
			}
		}),
		an = new Ee((t) => {
			if (!en.includes(t.peek(-1))) {
				let { next: e } = t;
				if ((37 == e && (t.advance(), t.acceptToken(1)), nn(e))) {
					do {
						t.advance();
					} while (nn(t.next) || rn(t.next));
					t.acceptToken(1);
				}
			}
		}),
		ln = ai({
			'AtKeyword import charset namespace keyframes media supports':
				Zi.definitionKeyword,
			'from to selector': Zi.keyword,
			NamespaceName: Zi.namespace,
			KeyframeName: Zi.labelName,
			KeyframeRangeName: Zi.operatorKeyword,
			TagName: Zi.tagName,
			ClassName: Zi.className,
			PseudoClassName: Zi.constant(Zi.className),
			IdName: Zi.labelName,
			'FeatureName PropertyName': Zi.propertyName,
			AttributeName: Zi.attributeName,
			NumberLiteral: Zi.number,
			KeywordQuery: Zi.keyword,
			UnaryQueryOp: Zi.operatorKeyword,
			'CallTag ValueName': Zi.atom,
			VariableName: Zi.variableName,
			Callee: Zi.operatorKeyword,
			Unit: Zi.unit,
			'UniversalSelector NestingSelector': Zi.definitionOperator,
			MatchOp: Zi.compareOperator,
			'ChildOp SiblingOp, LogicOp': Zi.logicOperator,
			BinOp: Zi.arithmeticOperator,
			Important: Zi.modifier,
			Comment: Zi.blockComment,
			ColorLiteral: Zi.color,
			'ParenthesizedContent StringLiteral': Zi.string,
			':': Zi.punctuation,
			'PseudoOp #': Zi.derefOperator,
			'; ,': Zi.separator,
			'( )': Zi.paren,
			'[ ]': Zi.squareBracket,
			'{ }': Zi.brace,
		}),
		hn = {
			__proto__: null,
			lang: 32,
			'nth-child': 32,
			'nth-last-child': 32,
			'nth-of-type': 32,
			'nth-last-of-type': 32,
			dir: 32,
			'host-context': 32,
			url: 60,
			'url-prefix': 60,
			domain: 60,
			regexp: 60,
			selector: 138,
		},
		cn = {
			__proto__: null,
			'@import': 118,
			'@media': 142,
			'@charset': 146,
			'@namespace': 150,
			'@keyframes': 156,
			'@supports': 168,
		},
		un = { __proto__: null, not: 132, only: 132 },
		dn = ti.deserialize({
			version: 14,
			states: ":jQYQ[OOO#_Q[OOP#fOWOOOOQP'#Cd'#CdOOQP'#Cc'#CcO#kQ[O'#CfO$_QXO'#CaO$fQ[O'#ChO$qQ[O'#DTO$vQ[O'#DWOOQP'#Em'#EmO${QdO'#DgO%jQ[O'#DtO${QdO'#DvO%{Q[O'#DxO&WQ[O'#D{O&`Q[O'#ERO&nQ[O'#ETOOQS'#El'#ElOOQS'#EW'#EWQYQ[OOO&uQXO'#CdO'jQWO'#DcO'oQWO'#EsO'zQ[O'#EsQOQWOOP(UO#tO'#C_POOO)C@[)C@[OOQP'#Cg'#CgOOQP,59Q,59QO#kQ[O,59QO(aQ[O'#E[O({QWO,58{O)TQ[O,59SO$qQ[O,59oO$vQ[O,59rO(aQ[O,59uO(aQ[O,59wO(aQ[O,59xO)`Q[O'#DbOOQS,58{,58{OOQP'#Ck'#CkOOQO'#DR'#DROOQP,59S,59SO)gQWO,59SO)lQWO,59SOOQP'#DV'#DVOOQP,59o,59oOOQO'#DX'#DXO)qQ`O,59rOOQS'#Cp'#CpO${QdO'#CqO)yQvO'#CsO+ZQtO,5:ROOQO'#Cx'#CxO)lQWO'#CwO+oQWO'#CyO+tQ[O'#DOOOQS'#Ep'#EpOOQO'#Dj'#DjO+|Q[O'#DqO,[QWO'#EtO&`Q[O'#DoO,jQWO'#DrOOQO'#Eu'#EuO)OQWO,5:`O,oQpO,5:bOOQS'#Dz'#DzO,wQWO,5:dO,|Q[O,5:dOOQO'#D}'#D}O-UQWO,5:gO-ZQWO,5:mO-cQWO,5:oOOQS-E8U-E8UO-kQdO,59}O-{Q[O'#E^O.YQWO,5;_O.YQWO,5;_POOO'#EV'#EVP.eO#tO,58yPOOO,58y,58yOOQP1G.l1G.lO/[QXO,5:vOOQO-E8Y-E8YOOQS1G.g1G.gOOQP1G.n1G.nO)gQWO1G.nO)lQWO1G.nOOQP1G/Z1G/ZO/iQ`O1G/^O0SQXO1G/aO0jQXO1G/cO1QQXO1G/dO1hQWO,59|O1mQ[O'#DSO1tQdO'#CoOOQP1G/^1G/^O${QdO1G/^O1{QpO,59]OOQS,59_,59_O${QdO,59aO2TQWO1G/mOOQS,59c,59cO2YQ!bO,59eOOQS'#DP'#DPOOQS'#EY'#EYO2eQ[O,59jOOQS,59j,59jO2mQWO'#DjO2xQWO,5:VO2}QWO,5:]O&`Q[O,5:XO&`Q[O'#E_O3VQWO,5;`O3bQWO,5:ZO(aQ[O,5:^OOQS1G/z1G/zOOQS1G/|1G/|OOQS1G0O1G0OO3sQWO1G0OO3xQdO'#EOOOQS1G0R1G0ROOQS1G0X1G0XOOQS1G0Z1G0ZO4TQtO1G/iOOQO1G/i1G/iOOQO,5:x,5:xO4kQ[O,5:xOOQO-E8[-E8[O4xQWO1G0yPOOO-E8T-E8TPOOO1G.e1G.eOOQP7+$Y7+$YOOQP7+$x7+$xO${QdO7+$xOOQS1G/h1G/hO5TQXO'#ErO5[QWO,59nO5aQtO'#EXO6XQdO'#EoO6cQWO,59ZO6hQpO7+$xOOQS1G.w1G.wOOQS1G.{1G.{OOQS7+%X7+%XOOQS1G/P1G/PO6pQWO1G/POOQS-E8W-E8WOOQS1G/U1G/UO${QdO1G/qOOQO1G/w1G/wOOQO1G/s1G/sO6uQWO,5:yOOQO-E8]-E8]O7TQXO1G/xOOQS7+%j7+%jO7[QYO'#CsOOQO'#EQ'#EQO7gQ`O'#EPOOQO'#EP'#EPO7rQWO'#E`O7zQdO,5:jOOQS,5:j,5:jO8VQtO'#E]O${QdO'#E]O9WQdO7+%TOOQO7+%T7+%TOOQO1G0d1G0dO9kQpO<<HdO9sQWO,5;^OOQP1G/Y1G/YOOQS-E8V-E8VO${QdO'#EZO9{QWO,5;ZOOQT1G.u1G.uOOQP<<Hd<<HdOOQS7+$k7+$kO:TQdO7+%]OOQO7+%d7+%dOOQO,5:k,5:kO3{QdO'#EaO7rQWO,5:zOOQS,5:z,5:zOOQS-E8^-E8^OOQS1G0U1G0UO:[QtO,5:wOOQS-E8Z-E8ZOOQO<<Ho<<HoOOQPAN>OAN>OO;]QdO,5:uOOQO-E8X-E8XOOQO<<Hw<<HwOOQO,5:{,5:{OOQO-E8_-E8_OOQS1G0f1G0f",
			stateData:
				';o~O#ZOS#[QQ~OUYOXYO]VO^VOqXOxWO![aO!]ZO!i[O!k]O!m^O!p_O!v`O#XRO#bTO~OQfOUYOXYO]VO^VOqXOxWO![aO!]ZO!i[O!k]O!m^O!p_O!v`O#XeO#bTO~O#U#gP~P!ZO#[jO~O#XlO~O]qO^qOqsOtoOxrO!OtO!RvO#VuO#bnO~O!TwO~P#pO`}O#WzO#XyO~O#X!OO~O#X!QO~OQ![Ob!TOf![Oh![On!YOq!ZO#W!WO#X!SO#e!UO~Ob!^O!d!`O!g!aO#X!]O!T#hP~Oh!fOn!YO#X!eO~Oh!hO#X!hO~Ob!^O!d!`O!g!aO#X!]O~O!Y#hP~P%jO]WX]!WX^WXqWXtWXxWX!OWX!RWX!TWX#VWX#bWX~O]!mO~O!Y!nO#U#gX!S#gX~O#U#gX!S#gX~P!ZO#]!qO#^!qO#_!sO~OUYOXYO]VO^VOqXOxWO#XRO#bTO~OtoO!TwO~O`!zO#WzO#XyO~O!S#gP~P!ZOb#RO~Ob#SO~Op#TO|#UO~OP#WObgXjgX!YgX!dgX!ggX#XgXagXQgXfgXhgXngXqgXtgX!XgX#UgX#WgX#egXpgX!SgX~Ob!^Oj#XO!d!`O!g!aO#X!]O!Y#hP~Ob#[O~Op#`O#X#]O~Ob!^O!d!`O!g!aO#X#aO~Ot#eO!b#dO!T#hX!Y#hX~Ob#hO~Oj#XO!Y#jO~O!Y#kO~Oh#lOn!YO~O!T#mO~O!TwO!b#dO~O!TwO!Y#pO~O!X#rO!Y!Va#U!Va!S!Va~P${O!Y#QX#U#QX!S#QX~P!ZO!Y!nO#U#ga!S#ga~O#]!qO#^!qO#_#xO~O]qO^qOqsOxrO!OtO!RvO#VuO#bnO~Ot#Oa!T#Oaa#Oa~P.pOp#zO|#{O~O]qO^qOqsOxrO#bnO~Ot}i!O}i!R}i!T}i#V}ia}i~P/qOt!Pi!O!Pi!R!Pi!T!Pi#V!Pia!Pi~P/qOt!Qi!O!Qi!R!Qi!T!Qi#V!Qia!Qi~P/qO!S#|O~Oa#fP~P(aOa#cP~P${Oa$TOj#XO~O!Y$VO~Oa$WOh$XOo$XO~Op$ZO#X#]O~O]!`Xa!^X!b!^X~O]$[O~Oa$]O!b#dO~Ot#eO!T#ha!Y#ha~O!b#dOt!ca!T!ca!Y!caa!ca~O!Y$bO~O!S$iO#X$dO#e$cO~Oj#XOt$kO!X$mO!Y!Vi#U!Vi!S!Vi~P${O!Y#Qa#U#Qa!S#Qa~P!ZO!Y!nO#U#gi!S#gi~Oa#fX~P#pOa$qO~Oj#XOQ!{Xa!{Xb!{Xf!{Xh!{Xn!{Xq!{Xt!{X#W!{X#X!{X#e!{X~Ot$sOa#cX~P${Oa$uO~Oj#XOp$vO~Oa$wO~O!b#dOt#Ra!T#Ra!Y#Ra~Oa$yO~P.pOP#WOtgX!TgX~O#e$cOt!sX!T!sX~Ot${O!TwO~O!S%PO#X$dO#e$cO~Oj#XOQ#PXb#PXf#PXh#PXn#PXq#PXt#PX!X#PX!Y#PX#U#PX#W#PX#X#PX#e#PX!S#PX~Ot$kO!X%SO!Y!Vq#U!Vq!S!Vq~P${Oj#XOp%TO~OtoOa#fa~Ot$sOa#ca~Oa%WO~P${Oj#XOQ#Pab#Paf#Pah#Pan#Paq#Pat#Pa!X#Pa!Y#Pa#U#Pa#W#Pa#X#Pa#e#Pa!S#Pa~Oa!}at!}a~P${O#Zo#[#ej!R#e~',
			goto: "-g#jPPP#kP#nP#w$WP#w$g#wPP$mPPP$s$|$|P%`P$|P$|%z&^PPPP$|&vP&z'Q#wP'W#w'^P#wP#w#wPPP'd'y(WPP#nPP(_(_(i(_P(_P(_(_P#nP#nP#nP(l#nP(o(r(u(|#nP#nP)R)X)h)v)|*S*^*d*n*t*zPPPPPPPPPP+Q+ZP+v+yP,o,r,x-RRkQ_bOPdhw!n#tkYOPdhotuvw!n#R#h#tkSOPdhotuvw!n#R#h#tQmTR!tnQ{VR!xqQ!x}Q#Z!XR#y!zq![Z]!T!m#S#U#X#q#{$Q$[$k$l$s$x%Up![Z]!T!m#S#U#X#q#{$Q$[$k$l$s$x%UU$f#m$h${R$z$eq!XZ]!T!m#S#U#X#q#{$Q$[$k$l$s$x%Up![Z]!T!m#S#U#X#q#{$Q$[$k$l$s$x%UQ!f^R#l!gT#^!Z#_Q|VR!yqQ!x|R#y!yQ!PWR!{rQ!RXR!|sQxUQ!wpQ#i!cQ#o!jQ#p!kQ$}$gR%Z$|SgPwQ!phQ#s!nR$n#tZfPhw!n#ta!b[`a!V!^!`#d#eR#b!^R!g^R!i_R#n!iS$g#m$hR%X${V$e#m$h${Q!rjR#w!rQdOShPwU!ldh#tR#t!nQ$Q#SU$r$Q$x%UQ$x$[R%U$sQ#_!ZR$Y#_Q$t$QR%V$tQpUS!vp$pR$p#}Q$l#qR%R$lQ!ogS#u!o#vR#v!pQ#f!_R$`#fQ$h#mR%O$hQ$|$gR%Y$|_cOPdhw!n#t^UOPdhw!n#tQ!uoQ!}tQ#OuQ#PvQ#}#RR$a#hR$R#SQ!VZQ!d]Q#V!TQ#q!m[$P#S$Q$[$s$x%UQ$S#UQ$U#XS$j#q$lQ$o#{R%Q$kR$O#RQiPR#QwQ!c[Q!kaR#Y!VU!_[a!VQ!j`Q#c!^Q#g!`Q$^#dR$_#e",
			nodeNames:
				'⚠ Unit VariableName Comment StyleSheet RuleSet UniversalSelector TagSelector TagName NestingSelector ClassSelector ClassName PseudoClassSelector : :: PseudoClassName PseudoClassName ) ( ArgList ValueName ParenthesizedValue ColorLiteral NumberLiteral StringLiteral BinaryExpression BinOp CallExpression Callee CallLiteral CallTag ParenthesizedContent ] [ LineNames LineName , PseudoClassName ArgList IdSelector # IdName AttributeSelector AttributeName MatchOp ChildSelector ChildOp DescendantSelector SiblingSelector SiblingOp } { Block Declaration PropertyName Important ; ImportStatement AtKeyword import KeywordQuery FeatureQuery FeatureName BinaryQuery LogicOp UnaryQuery UnaryQueryOp ParenthesizedQuery SelectorQuery selector MediaStatement media CharsetStatement charset NamespaceStatement namespace NamespaceName KeyframesStatement keyframes KeyframeName KeyframeList KeyframeSelector KeyframeRangeName SupportsStatement supports AtRule Styles',
			maxTerm: 117,
			nodeProps: [
				['isolate', -2, 3, 24, ''],
				['openedBy', 17, '(', 32, '[', 50, '{'],
				['closedBy', 18, ')', 33, ']', 51, '}'],
			],
			propSources: [ln],
			skippedNodes: [0, 3, 87],
			repeatNodeCount: 11,
			tokenData:
				"J^~R!^OX$}X^%u^p$}pq%uqr)Xrs.Rst/utu6duv$}vw7^wx7oxy9^yz9oz{9t{|:_|}?Q}!O?c!O!P@Q!P!Q@i!Q![Ab![!]B]!]!^CX!^!_$}!_!`Cj!`!aC{!a!b$}!b!cDw!c!}$}!}#OFa#O#P$}#P#QFr#Q#R6d#R#T$}#T#UGT#U#c$}#c#dHf#d#o$}#o#pH{#p#q6d#q#rI^#r#sIo#s#y$}#y#z%u#z$f$}$f$g%u$g#BY$}#BY#BZ%u#BZ$IS$}$IS$I_%u$I_$I|$}$I|$JO%u$JO$JT$}$JT$JU%u$JU$KV$}$KV$KW%u$KW&FU$}&FU&FV%u&FV;'S$};'S;=`JW<%lO$}`%QSOy%^z;'S%^;'S;=`%o<%lO%^`%cSo`Oy%^z;'S%^;'S;=`%o<%lO%^`%rP;=`<%l%^~%zh#Z~OX%^X^'f^p%^pq'fqy%^z#y%^#y#z'f#z$f%^$f$g'f$g#BY%^#BY#BZ'f#BZ$IS%^$IS$I_'f$I_$I|%^$I|$JO'f$JO$JT%^$JT$JU'f$JU$KV%^$KV$KW'f$KW&FU%^&FU&FV'f&FV;'S%^;'S;=`%o<%lO%^~'mh#Z~o`OX%^X^'f^p%^pq'fqy%^z#y%^#y#z'f#z$f%^$f$g'f$g#BY%^#BY#BZ'f#BZ$IS%^$IS$I_'f$I_$I|%^$I|$JO'f$JO$JT%^$JT$JU'f$JU$KV%^$KV$KW'f$KW&FU%^&FU&FV'f&FV;'S%^;'S;=`%o<%lO%^l)[UOy%^z#]%^#]#^)n#^;'S%^;'S;=`%o<%lO%^l)sUo`Oy%^z#a%^#a#b*V#b;'S%^;'S;=`%o<%lO%^l*[Uo`Oy%^z#d%^#d#e*n#e;'S%^;'S;=`%o<%lO%^l*sUo`Oy%^z#c%^#c#d+V#d;'S%^;'S;=`%o<%lO%^l+[Uo`Oy%^z#f%^#f#g+n#g;'S%^;'S;=`%o<%lO%^l+sUo`Oy%^z#h%^#h#i,V#i;'S%^;'S;=`%o<%lO%^l,[Uo`Oy%^z#T%^#T#U,n#U;'S%^;'S;=`%o<%lO%^l,sUo`Oy%^z#b%^#b#c-V#c;'S%^;'S;=`%o<%lO%^l-[Uo`Oy%^z#h%^#h#i-n#i;'S%^;'S;=`%o<%lO%^l-uS!X[o`Oy%^z;'S%^;'S;=`%o<%lO%^~.UWOY.RZr.Rrs.ns#O.R#O#P.s#P;'S.R;'S;=`/o<%lO.R~.sOh~~.vRO;'S.R;'S;=`/P;=`O.R~/SXOY.RZr.Rrs.ns#O.R#O#P.s#P;'S.R;'S;=`/o;=`<%l.R<%lO.R~/rP;=`<%l.Rn/zYxQOy%^z!Q%^!Q![0j![!c%^!c!i0j!i#T%^#T#Z0j#Z;'S%^;'S;=`%o<%lO%^l0oYo`Oy%^z!Q%^!Q![1_![!c%^!c!i1_!i#T%^#T#Z1_#Z;'S%^;'S;=`%o<%lO%^l1dYo`Oy%^z!Q%^!Q![2S![!c%^!c!i2S!i#T%^#T#Z2S#Z;'S%^;'S;=`%o<%lO%^l2ZYf[o`Oy%^z!Q%^!Q![2y![!c%^!c!i2y!i#T%^#T#Z2y#Z;'S%^;'S;=`%o<%lO%^l3QYf[o`Oy%^z!Q%^!Q![3p![!c%^!c!i3p!i#T%^#T#Z3p#Z;'S%^;'S;=`%o<%lO%^l3uYo`Oy%^z!Q%^!Q![4e![!c%^!c!i4e!i#T%^#T#Z4e#Z;'S%^;'S;=`%o<%lO%^l4lYf[o`Oy%^z!Q%^!Q![5[![!c%^!c!i5[!i#T%^#T#Z5[#Z;'S%^;'S;=`%o<%lO%^l5aYo`Oy%^z!Q%^!Q![6P![!c%^!c!i6P!i#T%^#T#Z6P#Z;'S%^;'S;=`%o<%lO%^l6WSf[o`Oy%^z;'S%^;'S;=`%o<%lO%^d6gUOy%^z!_%^!_!`6y!`;'S%^;'S;=`%o<%lO%^d7QS|So`Oy%^z;'S%^;'S;=`%o<%lO%^b7cSXQOy%^z;'S%^;'S;=`%o<%lO%^~7rWOY7oZw7owx.nx#O7o#O#P8[#P;'S7o;'S;=`9W<%lO7o~8_RO;'S7o;'S;=`8h;=`O7o~8kXOY7oZw7owx.nx#O7o#O#P8[#P;'S7o;'S;=`9W;=`<%l7o<%lO7o~9ZP;=`<%l7on9cSb^Oy%^z;'S%^;'S;=`%o<%lO%^~9tOa~n9{UUQjWOy%^z!_%^!_!`6y!`;'S%^;'S;=`%o<%lO%^n:fWjW!RQOy%^z!O%^!O!P;O!P!Q%^!Q![>T![;'S%^;'S;=`%o<%lO%^l;TUo`Oy%^z!Q%^!Q![;g![;'S%^;'S;=`%o<%lO%^l;nYo`#e[Oy%^z!Q%^!Q![;g![!g%^!g!h<^!h#X%^#X#Y<^#Y;'S%^;'S;=`%o<%lO%^l<cYo`Oy%^z{%^{|=R|}%^}!O=R!O!Q%^!Q![=j![;'S%^;'S;=`%o<%lO%^l=WUo`Oy%^z!Q%^!Q![=j![;'S%^;'S;=`%o<%lO%^l=qUo`#e[Oy%^z!Q%^!Q![=j![;'S%^;'S;=`%o<%lO%^l>[[o`#e[Oy%^z!O%^!O!P;g!P!Q%^!Q![>T![!g%^!g!h<^!h#X%^#X#Y<^#Y;'S%^;'S;=`%o<%lO%^n?VSt^Oy%^z;'S%^;'S;=`%o<%lO%^l?hWjWOy%^z!O%^!O!P;O!P!Q%^!Q![>T![;'S%^;'S;=`%o<%lO%^n@VU#bQOy%^z!Q%^!Q![;g![;'S%^;'S;=`%o<%lO%^~@nTjWOy%^z{@}{;'S%^;'S;=`%o<%lO%^~AUSo`#[~Oy%^z;'S%^;'S;=`%o<%lO%^lAg[#e[Oy%^z!O%^!O!P;g!P!Q%^!Q![>T![!g%^!g!h<^!h#X%^#X#Y<^#Y;'S%^;'S;=`%o<%lO%^bBbU]QOy%^z![%^![!]Bt!];'S%^;'S;=`%o<%lO%^bB{S^Qo`Oy%^z;'S%^;'S;=`%o<%lO%^nC^S!Y^Oy%^z;'S%^;'S;=`%o<%lO%^dCoS|SOy%^z;'S%^;'S;=`%o<%lO%^bDQU!OQOy%^z!`%^!`!aDd!a;'S%^;'S;=`%o<%lO%^bDkS!OQo`Oy%^z;'S%^;'S;=`%o<%lO%^bDzWOy%^z!c%^!c!}Ed!}#T%^#T#oEd#o;'S%^;'S;=`%o<%lO%^bEk[![Qo`Oy%^z}%^}!OEd!O!Q%^!Q![Ed![!c%^!c!}Ed!}#T%^#T#oEd#o;'S%^;'S;=`%o<%lO%^nFfSq^Oy%^z;'S%^;'S;=`%o<%lO%^nFwSp^Oy%^z;'S%^;'S;=`%o<%lO%^bGWUOy%^z#b%^#b#cGj#c;'S%^;'S;=`%o<%lO%^bGoUo`Oy%^z#W%^#W#XHR#X;'S%^;'S;=`%o<%lO%^bHYS!bQo`Oy%^z;'S%^;'S;=`%o<%lO%^bHiUOy%^z#f%^#f#gHR#g;'S%^;'S;=`%o<%lO%^fIQS!TUOy%^z;'S%^;'S;=`%o<%lO%^nIcS!S^Oy%^z;'S%^;'S;=`%o<%lO%^fItU!RQOy%^z!_%^!_!`6y!`;'S%^;'S;=`%o<%lO%^`JZP;=`<%l$}",
			tokenizers: [
				on,
				an,
				sn,
				1,
				2,
				3,
				4,
				new De('m~RRYZ[z{a~~g~aO#^~~dP!P!Qg~lO#_~~', 28, 105),
			],
			topRules: { StyleSheet: [0, 4], Styles: [1, 86] },
			specialized: [
				{ term: 100, get: (t) => hn[t] || -1 },
				{ term: 58, get: (t) => cn[t] || -1 },
				{ term: 101, get: (t) => un[t] || -1 },
			],
			tokenPrec: 1219,
		});
	let fn = [],
		On = [];
	function pn(t) {
		if (t < 768) return !1;
		for (let e = 0, i = fn.length; ; ) {
			let n = (e + i) >> 1;
			if (t < fn[n]) i = n;
			else {
				if (!(t >= On[n])) return !0;
				e = n + 1;
			}
			if (e == i) return !1;
		}
	}
	function mn(t) {
		return t >= 127462 && t <= 127487;
	}
	function gn(t, e, i = !0, n = !0) {
		return (i ? bn : yn)(t, e, n);
	}
	function bn(t, e, i) {
		if (e == t.length) return e;
		e && wn(t.charCodeAt(e)) && Sn(t.charCodeAt(e - 1)) && e--;
		let n = vn(t, e);
		for (e += xn(n); e < t.length; ) {
			let r = vn(t, e);
			if (8205 == n || 8205 == r || (i && pn(r))) (e += xn(r)), (n = r);
			else {
				if (!mn(r)) break;
				{
					let i = 0,
						n = e - 2;
					for (; n >= 0 && mn(vn(t, n)); ) i++, (n -= 2);
					if (i % 2 == 0) break;
					e += 2;
				}
			}
		}
		return e;
	}
	function yn(t, e, i) {
		for (; e > 0; ) {
			let n = bn(t, e - 2, i);
			if (n < e) return n;
			e--;
		}
		return 0;
	}
	function vn(t, e) {
		let i = t.charCodeAt(e);
		if (!Sn(i) || e + 1 == t.length) return i;
		let n = t.charCodeAt(e + 1);
		return wn(n) ? n - 56320 + ((i - 55296) << 10) + 65536 : i;
	}
	function wn(t) {
		return t >= 56320 && t < 57344;
	}
	function Sn(t) {
		return t >= 55296 && t < 56320;
	}
	function xn(t) {
		return t < 65536 ? 1 : 2;
	}
	(() => {
		let t =
			'lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,3b,f,,w,1j,,,,4,8,4,,3,7,a,2,t,,1m,,,,2,4,8,,9,,a,2,q,,2,2,1l,,4,2,4,2,2,3,3,,u,2,3,,b,2,1l,,4,5,,2,4,,k,2,m,6,,,1m,,,2,,4,8,,7,3,a,2,u,,1n,,,,c,,9,,14,,3,,1l,3,5,3,,4,7,2,b,2,t,,1m,,2,,2,,3,,5,2,7,2,b,2,s,2,1l,2,,,2,4,8,,9,,a,2,t,,20,,4,,2,3,,,8,,29,,2,7,c,8,2q,,2,9,b,6,22,2,r,,,,,,1j,e,,5,,2,5,b,,10,9,,2u,4,,6,,2,2,2,p,2,4,3,g,4,d,,2,2,6,,f,,jj,3,qa,3,t,3,t,2,u,2,1s,2,,7,8,,2,b,9,,19,3,3b,2,y,,3a,3,4,2,9,,6,3,63,2,2,,1m,,,7,,,,,2,8,6,a,2,,1c,h,1r,4,1c,7,,,5,,14,9,c,2,w,4,2,2,,3,1k,,,2,3,,,3,1m,8,2,2,48,3,,d,,7,4,,6,,3,2,5i,1m,,5,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,p,2,5,,47,2,q,i,d,,12,8,p,b,1a,3,1c,,2,4,2,2,13,,1v,6,2,2,2,2,c,,8,,1b,,1f,,,3,2,2,5,2,,,16,2,8,,6m,,2,,4,,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,ar,2,49,b,4w,,1i,f,1k,3,1d,4,2,2,1x,3,10,5,,8,1q,,c,2,1g,9,a,4,2,,2n,3,2,,,2,6,,4g,,3,8,l,2,1l,2,,,,,m,,e,7,3,5,5f,8,2,3,,,n,,29,,2,6,,,2,,,2,,2,6j,,2,4,6,2,,2,r,2,2d,8,2,,,2,2y,,,,2,6,,,2t,3,2,4,,5,77,9,,2,6t,,a,2,,,4,,40,4,2,2,4,,w,a,14,6,2,4,8,,9,6,2,3,1a,d,,2,ba,7,,6,,,2a,m,2,7,,2,,2,3e,6,3,,,2,,7,,,20,2,3,,,,9n,2,f0b,5,1n,7,t4,,1r,4,29,,f5k,2,43q,,,3,4,5,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,79,7,c5,4,15s,7,31,7,240,5,gx7k,2o,3k,6o'
				.split(',')
				.map((t) => (t ? parseInt(t, 36) : 1));
		for (let e = 0, i = 0; e < t.length; e++)
			(e % 2 ? On : fn).push((i += t[e]));
	})();
	class Qn {
		lineAt(t) {
			if (t < 0 || t > this.length)
				throw new RangeError(
					`Invalid position ${t} in document of length ${this.length}`
				);
			return this.lineInner(t, !1, 1, 0);
		}
		line(t) {
			if (t < 1 || t > this.lines)
				throw new RangeError(
					`Invalid line number ${t} in ${this.lines}-line document`
				);
			return this.lineInner(t, !0, 1, 0);
		}
		replace(t, e, i) {
			[t, e] = Mn(this, t, e);
			let n = [];
			return (
				this.decompose(0, t, n, 2),
				i.length && i.decompose(0, i.length, n, 3),
				this.decompose(e, this.length, n, 1),
				$n.from(n, this.length - (e - t) + i.length)
			);
		}
		append(t) {
			return this.replace(this.length, this.length, t);
		}
		slice(t, e = this.length) {
			[t, e] = Mn(this, t, e);
			let i = [];
			return this.decompose(t, e, i, 0), $n.from(i, e - t);
		}
		eq(t) {
			if (t == this) return !0;
			if (t.length != this.length || t.lines != this.lines) return !1;
			let e = this.scanIdentical(t, 1),
				i = this.length - this.scanIdentical(t, -1),
				n = new Tn(this),
				r = new Tn(t);
			for (let t = e, s = e; ; ) {
				if (
					(n.next(t),
					r.next(t),
					(t = 0),
					n.lineBreak != r.lineBreak ||
						n.done != r.done ||
						n.value != r.value)
				)
					return !1;
				if (((s += n.value.length), n.done || s >= i)) return !0;
			}
		}
		iter(t = 1) {
			return new Tn(this, t);
		}
		iterRange(t, e = this.length) {
			return new Cn(this, t, e);
		}
		iterLines(t, e) {
			let i;
			if (null == t) i = this.iter();
			else {
				null == e && (e = this.lines + 1);
				let n = this.line(t).from;
				i = this.iterRange(
					n,
					Math.max(
						n,
						e == this.lines + 1
							? this.length
							: e <= 1
								? 0
								: this.line(e - 1).to
					)
				);
			}
			return new An(i);
		}
		toString() {
			return this.sliceString(0);
		}
		toJSON() {
			let t = [];
			return this.flatten(t), t;
		}
		constructor() {}
		static of(t) {
			if (0 == t.length)
				throw new RangeError('A document must have at least one line');
			return 1 != t.length || t[0]
				? t.length <= 32
					? new kn(t)
					: $n.from(kn.split(t, []))
				: Qn.empty;
		}
	}
	class kn extends Qn {
		constructor(
			t,
			e = (function (t) {
				let e = -1;
				for (let i of t) e += i.length + 1;
				return e;
			})(t)
		) {
			super(), (this.text = t), (this.length = e);
		}
		get lines() {
			return this.text.length;
		}
		get children() {
			return null;
		}
		lineInner(t, e, i, n) {
			for (let r = 0; ; r++) {
				let s = this.text[r],
					o = n + s.length;
				if ((e ? i : o) >= t) return new Xn(n, o, i, s);
				(n = o + 1), i++;
			}
		}
		decompose(t, e, i, n) {
			let r =
				t <= 0 && e >= this.length
					? this
					: new kn(
							Zn(this.text, t, e),
							Math.min(e, this.length) - Math.max(0, t)
						);
			if (1 & n) {
				let t = i.pop(),
					e = Pn(r.text, t.text.slice(), 0, r.length);
				if (e.length <= 32) i.push(new kn(e, t.length + r.length));
				else {
					let t = e.length >> 1;
					i.push(new kn(e.slice(0, t)), new kn(e.slice(t)));
				}
			} else i.push(r);
		}
		replace(t, e, i) {
			if (!(i instanceof kn)) return super.replace(t, e, i);
			[t, e] = Mn(this, t, e);
			let n = Pn(this.text, Pn(i.text, Zn(this.text, 0, t)), e),
				r = this.length + i.length - (e - t);
			return n.length <= 32 ? new kn(n, r) : $n.from(kn.split(n, []), r);
		}
		sliceString(t, e = this.length, i = '\n') {
			[t, e] = Mn(this, t, e);
			let n = '';
			for (let r = 0, s = 0; r <= e && s < this.text.length; s++) {
				let o = this.text[s],
					a = r + o.length;
				r > t && s && (n += i),
					t < a && e > r && (n += o.slice(Math.max(0, t - r), e - r)),
					(r = a + 1);
			}
			return n;
		}
		flatten(t) {
			for (let e of this.text) t.push(e);
		}
		scanIdentical() {
			return 0;
		}
		static split(t, e) {
			let i = [],
				n = -1;
			for (let r of t)
				i.push(r),
					(n += r.length + 1),
					32 == i.length &&
						(e.push(new kn(i, n)), (i = []), (n = -1));
			return n > -1 && e.push(new kn(i, n)), e;
		}
	}
	class $n extends Qn {
		constructor(t, e) {
			super(), (this.children = t), (this.length = e), (this.lines = 0);
			for (let e of t) this.lines += e.lines;
		}
		lineInner(t, e, i, n) {
			for (let r = 0; ; r++) {
				let s = this.children[r],
					o = n + s.length,
					a = i + s.lines - 1;
				if ((e ? a : o) >= t) return s.lineInner(t, e, i, n);
				(n = o + 1), (i = a + 1);
			}
		}
		decompose(t, e, i, n) {
			for (let r = 0, s = 0; s <= e && r < this.children.length; r++) {
				let o = this.children[r],
					a = s + o.length;
				if (t <= a && e >= s) {
					let r = n & ((s <= t ? 1 : 0) | (a >= e ? 2 : 0));
					s >= t && a <= e && !r
						? i.push(o)
						: o.decompose(t - s, e - s, i, r);
				}
				s = a + 1;
			}
		}
		replace(t, e, i) {
			if ((([t, e] = Mn(this, t, e)), i.lines < this.lines))
				for (let n = 0, r = 0; n < this.children.length; n++) {
					let s = this.children[n],
						o = r + s.length;
					if (t >= r && e <= o) {
						let a = s.replace(t - r, e - r, i),
							l = this.lines - s.lines + a.lines;
						if (a.lines < l >> 4 && a.lines > l >> 6) {
							let r = this.children.slice();
							return (
								(r[n] = a),
								new $n(r, this.length - (e - t) + i.length)
							);
						}
						return super.replace(r, o, a);
					}
					r = o + 1;
				}
			return super.replace(t, e, i);
		}
		sliceString(t, e = this.length, i = '\n') {
			[t, e] = Mn(this, t, e);
			let n = '';
			for (let r = 0, s = 0; r < this.children.length && s <= e; r++) {
				let o = this.children[r],
					a = s + o.length;
				s > t && r && (n += i),
					t < a && e > s && (n += o.sliceString(t - s, e - s, i)),
					(s = a + 1);
			}
			return n;
		}
		flatten(t) {
			for (let e of this.children) e.flatten(t);
		}
		scanIdentical(t, e) {
			if (!(t instanceof $n)) return 0;
			let i = 0,
				[n, r, s, o] =
					e > 0
						? [0, 0, this.children.length, t.children.length]
						: [
								this.children.length - 1,
								t.children.length - 1,
								-1,
								-1,
							];
			for (; ; n += e, r += e) {
				if (n == s || r == o) return i;
				let a = this.children[n],
					l = t.children[r];
				if (a != l) return i + a.scanIdentical(l, e);
				i += a.length + 1;
			}
		}
		static from(t, e = t.reduce((t, e) => t + e.length + 1, -1)) {
			let i = 0;
			for (let e of t) i += e.lines;
			if (i < 32) {
				let i = [];
				for (let e of t) e.flatten(i);
				return new kn(i, e);
			}
			let n = Math.max(32, i >> 5),
				r = n << 1,
				s = n >> 1,
				o = [],
				a = 0,
				l = -1,
				h = [];
			function c(t) {
				let e;
				if (t.lines > r && t instanceof $n)
					for (let e of t.children) c(e);
				else
					t.lines > s && (a > s || !a)
						? (u(), o.push(t))
						: t instanceof kn &&
							  a &&
							  (e = h[h.length - 1]) instanceof kn &&
							  t.lines + e.lines <= 32
							? ((a += t.lines),
								(l += t.length + 1),
								(h[h.length - 1] = new kn(
									e.text.concat(t.text),
									e.length + 1 + t.length
								)))
							: (a + t.lines > n && u(),
								(a += t.lines),
								(l += t.length + 1),
								h.push(t));
			}
			function u() {
				0 != a &&
					(o.push(1 == h.length ? h[0] : $n.from(h, l)),
					(l = -1),
					(a = h.length = 0));
			}
			for (let e of t) c(e);
			return u(), 1 == o.length ? o[0] : new $n(o, e);
		}
	}
	function Pn(t, e, i = 0, n = 1e9) {
		for (let r = 0, s = 0, o = !0; s < t.length && r <= n; s++) {
			let a = t[s],
				l = r + a.length;
			l >= i &&
				(l > n && (a = a.slice(0, n - r)),
				r < i && (a = a.slice(i - r)),
				o ? ((e[e.length - 1] += a), (o = !1)) : e.push(a)),
				(r = l + 1);
		}
		return e;
	}
	function Zn(t, e, i) {
		return Pn(t, [''], e, i);
	}
	Qn.empty = new kn([''], 0);
	class Tn {
		constructor(t, e = 1) {
			(this.dir = e),
				(this.done = !1),
				(this.lineBreak = !1),
				(this.value = ''),
				(this.nodes = [t]),
				(this.offsets = [
					e > 0
						? 1
						: (t instanceof kn
								? t.text.length
								: t.children.length) << 1,
				]);
		}
		nextInner(t, e) {
			for (this.done = this.lineBreak = !1; ; ) {
				let i = this.nodes.length - 1,
					n = this.nodes[i],
					r = this.offsets[i],
					s = r >> 1,
					o = n instanceof kn ? n.text.length : n.children.length;
				if (s == (e > 0 ? o : 0)) {
					if (0 == i)
						return (this.done = !0), (this.value = ''), this;
					e > 0 && this.offsets[i - 1]++,
						this.nodes.pop(),
						this.offsets.pop();
				} else if ((1 & r) == (e > 0 ? 0 : 1)) {
					if (((this.offsets[i] += e), 0 == t))
						return (this.lineBreak = !0), (this.value = '\n'), this;
					t--;
				} else if (n instanceof kn) {
					let r = n.text[s + (e < 0 ? -1 : 0)];
					if (((this.offsets[i] += e), r.length > Math.max(0, t)))
						return (
							(this.value =
								0 == t
									? r
									: e > 0
										? r.slice(t)
										: r.slice(0, r.length - t)),
							this
						);
					t -= r.length;
				} else {
					let r = n.children[s + (e < 0 ? -1 : 0)];
					t > r.length
						? ((t -= r.length), (this.offsets[i] += e))
						: (e < 0 && this.offsets[i]--,
							this.nodes.push(r),
							this.offsets.push(
								e > 0
									? 1
									: (r instanceof kn
											? r.text.length
											: r.children.length) << 1
							));
				}
			}
		}
		next(t = 0) {
			return (
				t < 0 &&
					(this.nextInner(-t, -this.dir), (t = this.value.length)),
				this.nextInner(t, this.dir)
			);
		}
	}
	class Cn {
		constructor(t, e, i) {
			(this.value = ''),
				(this.done = !1),
				(this.cursor = new Tn(t, e > i ? -1 : 1)),
				(this.pos = e > i ? t.length : 0),
				(this.from = Math.min(e, i)),
				(this.to = Math.max(e, i));
		}
		nextInner(t, e) {
			if (e < 0 ? this.pos <= this.from : this.pos >= this.to)
				return (this.value = ''), (this.done = !0), this;
			t += Math.max(0, e < 0 ? this.pos - this.to : this.from - this.pos);
			let i = e < 0 ? this.pos - this.from : this.to - this.pos;
			t > i && (t = i), (i -= t);
			let { value: n } = this.cursor.next(t);
			return (
				(this.pos += (n.length + t) * e),
				(this.value =
					n.length <= i
						? n
						: e < 0
							? n.slice(n.length - i)
							: n.slice(0, i)),
				(this.done = !this.value),
				this
			);
		}
		next(t = 0) {
			return (
				t < 0
					? (t = Math.max(t, this.from - this.pos))
					: t > 0 && (t = Math.min(t, this.to - this.pos)),
				this.nextInner(t, this.cursor.dir)
			);
		}
		get lineBreak() {
			return this.cursor.lineBreak && '' != this.value;
		}
	}
	class An {
		constructor(t) {
			(this.inner = t),
				(this.afterBreak = !0),
				(this.value = ''),
				(this.done = !1);
		}
		next(t = 0) {
			let { done: e, lineBreak: i, value: n } = this.inner.next(t);
			return (
				e && this.afterBreak
					? ((this.value = ''), (this.afterBreak = !1))
					: e
						? ((this.done = !0), (this.value = ''))
						: i
							? this.afterBreak
								? (this.value = '')
								: ((this.afterBreak = !0), this.next())
							: ((this.value = n), (this.afterBreak = !1)),
				this
			);
		}
		get lineBreak() {
			return !1;
		}
	}
	'undefined' != typeof Symbol &&
		((Qn.prototype[Symbol.iterator] = function () {
			return this.iter();
		}),
		(Tn.prototype[Symbol.iterator] =
			Cn.prototype[Symbol.iterator] =
			An.prototype[Symbol.iterator] =
				function () {
					return this;
				}));
	class Xn {
		constructor(t, e, i, n) {
			(this.from = t), (this.to = e), (this.number = i), (this.text = n);
		}
		get length() {
			return this.to - this.from;
		}
	}
	function Mn(t, e, i) {
		return [
			(e = Math.max(0, Math.min(t.length, e))),
			Math.max(e, Math.min(t.length, i)),
		];
	}
	function Rn(t, e, i = !0, n = !0) {
		return gn(t, e, i, n);
	}
	function Vn(t, e) {
		let i = t.charCodeAt(e);
		if (!((n = i) >= 55296 && n < 56320 && e + 1 != t.length)) return i;
		var n;
		let r = t.charCodeAt(e + 1);
		return (function (t) {
			return t >= 56320 && t < 57344;
		})(r)
			? r - 56320 + ((i - 55296) << 10) + 65536
			: i;
	}
	function qn(t) {
		return t <= 65535
			? String.fromCharCode(t)
			: ((t -= 65536),
				String.fromCharCode(55296 + (t >> 10), 56320 + (1023 & t)));
	}
	function jn(t) {
		return t < 65536 ? 1 : 2;
	}
	const Dn = /\r\n?|\n/;
	var En = (function (t) {
		return (
			(t[(t.Simple = 0)] = 'Simple'),
			(t[(t.TrackDel = 1)] = 'TrackDel'),
			(t[(t.TrackBefore = 2)] = 'TrackBefore'),
			(t[(t.TrackAfter = 3)] = 'TrackAfter'),
			t
		);
	})(En || (En = {}));
	class Wn {
		constructor(t) {
			this.sections = t;
		}
		get length() {
			let t = 0;
			for (let e = 0; e < this.sections.length; e += 2)
				t += this.sections[e];
			return t;
		}
		get newLength() {
			let t = 0;
			for (let e = 0; e < this.sections.length; e += 2) {
				let i = this.sections[e + 1];
				t += i < 0 ? this.sections[e] : i;
			}
			return t;
		}
		get empty() {
			return (
				0 == this.sections.length ||
				(2 == this.sections.length && this.sections[1] < 0)
			);
		}
		iterGaps(t) {
			for (let e = 0, i = 0, n = 0; e < this.sections.length; ) {
				let r = this.sections[e++],
					s = this.sections[e++];
				s < 0 ? (t(i, n, r), (n += r)) : (n += s), (i += r);
			}
		}
		iterChangedRanges(t, e = !1) {
			Bn(this, t, e);
		}
		get invertedDesc() {
			let t = [];
			for (let e = 0; e < this.sections.length; ) {
				let i = this.sections[e++],
					n = this.sections[e++];
				n < 0 ? t.push(i, n) : t.push(n, i);
			}
			return new Wn(t);
		}
		composeDesc(t) {
			return this.empty ? t : t.empty ? this : Nn(this, t);
		}
		mapDesc(t, e = !1) {
			return t.empty ? this : Un(this, t, e);
		}
		mapPos(t, e = -1, i = En.Simple) {
			let n = 0,
				r = 0;
			for (let s = 0; s < this.sections.length; ) {
				let o = this.sections[s++],
					a = this.sections[s++],
					l = n + o;
				if (a < 0) {
					if (l > t) return r + (t - n);
					r += o;
				} else {
					if (
						i != En.Simple &&
						l >= t &&
						((i == En.TrackDel && n < t && l > t) ||
							(i == En.TrackBefore && n < t) ||
							(i == En.TrackAfter && l > t))
					)
						return null;
					if (l > t || (l == t && e < 0 && !o))
						return t == n || e < 0 ? r : r + a;
					r += a;
				}
				n = l;
			}
			if (t > n)
				throw new RangeError(
					`Position ${t} is out of range for changeset of length ${n}`
				);
			return r;
		}
		touchesRange(t, e = t) {
			for (let i = 0, n = 0; i < this.sections.length && n <= e; ) {
				let r = n + this.sections[i++];
				if (this.sections[i++] >= 0 && n <= e && r >= t)
					return !(n < t && r > e) || 'cover';
				n = r;
			}
			return !1;
		}
		toString() {
			let t = '';
			for (let e = 0; e < this.sections.length; ) {
				let i = this.sections[e++],
					n = this.sections[e++];
				t += (t ? ' ' : '') + i + (n >= 0 ? ':' + n : '');
			}
			return t;
		}
		toJSON() {
			return this.sections;
		}
		static fromJSON(t) {
			if (
				!Array.isArray(t) ||
				t.length % 2 ||
				t.some((t) => 'number' != typeof t)
			)
				throw new RangeError(
					'Invalid JSON representation of ChangeDesc'
				);
			return new Wn(t);
		}
		static create(t) {
			return new Wn(t);
		}
	}
	class Yn extends Wn {
		constructor(t, e) {
			super(t), (this.inserted = e);
		}
		apply(t) {
			if (this.length != t.length)
				throw new RangeError(
					'Applying change set to a document with the wrong length'
				);
			return (
				Bn(
					this,
					(e, i, n, r, s) => (t = t.replace(n, n + (i - e), s)),
					!1
				),
				t
			);
		}
		mapDesc(t, e = !1) {
			return Un(this, t, e, !0);
		}
		invert(t) {
			let e = this.sections.slice(),
				i = [];
			for (let n = 0, r = 0; n < e.length; n += 2) {
				let s = e[n],
					o = e[n + 1];
				if (o >= 0) {
					(e[n] = o), (e[n + 1] = s);
					let a = n >> 1;
					for (; i.length < a; ) i.push(Qn.empty);
					i.push(s ? t.slice(r, r + s) : Qn.empty);
				}
				r += s;
			}
			return new Yn(e, i);
		}
		compose(t) {
			return this.empty ? t : t.empty ? this : Nn(this, t, !0);
		}
		map(t, e = !1) {
			return t.empty ? this : Un(this, t, e, !0);
		}
		iterChanges(t, e = !1) {
			Bn(this, t, e);
		}
		get desc() {
			return Wn.create(this.sections);
		}
		filter(t) {
			let e = [],
				i = [],
				n = [],
				r = new Gn(this);
			t: for (let s = 0, o = 0; ; ) {
				let a = s == t.length ? 1e9 : t[s++];
				for (; o < a || (o == a && 0 == r.len); ) {
					if (r.done) break t;
					let t = Math.min(r.len, a - o);
					zn(n, t, -1);
					let s = -1 == r.ins ? -1 : 0 == r.off ? r.ins : 0;
					zn(e, t, s),
						s > 0 && Ln(i, e, r.text),
						r.forward(t),
						(o += t);
				}
				let l = t[s++];
				for (; o < l; ) {
					if (r.done) break t;
					let t = Math.min(r.len, l - o);
					zn(e, t, -1),
						zn(n, t, -1 == r.ins ? -1 : 0 == r.off ? r.ins : 0),
						r.forward(t),
						(o += t);
				}
			}
			return { changes: new Yn(e, i), filtered: Wn.create(n) };
		}
		toJSON() {
			let t = [];
			for (let e = 0; e < this.sections.length; e += 2) {
				let i = this.sections[e],
					n = this.sections[e + 1];
				n < 0
					? t.push(i)
					: 0 == n
						? t.push([i])
						: t.push([i].concat(this.inserted[e >> 1].toJSON()));
			}
			return t;
		}
		static of(t, e, i) {
			let n = [],
				r = [],
				s = 0,
				o = null;
			function a(t = !1) {
				if (!t && !n.length) return;
				s < e && zn(n, e - s, -1);
				let i = new Yn(n, r);
				(o = o ? o.compose(i.map(o)) : i), (n = []), (r = []), (s = 0);
			}
			return (
				(function t(l) {
					if (Array.isArray(l)) for (let e of l) t(e);
					else if (l instanceof Yn) {
						if (l.length != e)
							throw new RangeError(
								`Mismatched change set length (got ${l.length}, expected ${e})`
							);
						a(), (o = o ? o.compose(l.map(o)) : l);
					} else {
						let { from: t, to: o = t, insert: h } = l;
						if (t > o || t < 0 || o > e)
							throw new RangeError(
								`Invalid change range ${t} to ${o} (in doc of length ${e})`
							);
						let c = h
								? 'string' == typeof h
									? Qn.of(h.split(i || Dn))
									: h
								: Qn.empty,
							u = c.length;
						if (t == o && 0 == u) return;
						t < s && a(),
							t > s && zn(n, t - s, -1),
							zn(n, o - t, u),
							Ln(r, n, c),
							(s = o);
					}
				})(t),
				a(!o),
				o
			);
		}
		static empty(t) {
			return new Yn(t ? [t, -1] : [], []);
		}
		static fromJSON(t) {
			if (!Array.isArray(t))
				throw new RangeError(
					'Invalid JSON representation of ChangeSet'
				);
			let e = [],
				i = [];
			for (let n = 0; n < t.length; n++) {
				let r = t[n];
				if ('number' == typeof r) e.push(r, -1);
				else {
					if (
						!Array.isArray(r) ||
						'number' != typeof r[0] ||
						r.some((t, e) => e && 'string' != typeof t)
					)
						throw new RangeError(
							'Invalid JSON representation of ChangeSet'
						);
					if (1 == r.length) e.push(r[0], 0);
					else {
						for (; i.length < n; ) i.push(Qn.empty);
						(i[n] = Qn.of(r.slice(1))), e.push(r[0], i[n].length);
					}
				}
			}
			return new Yn(e, i);
		}
		static createSet(t, e) {
			return new Yn(t, e);
		}
	}
	function zn(t, e, i, n = !1) {
		if (0 == e && i <= 0) return;
		let r = t.length - 2;
		r >= 0 && i <= 0 && i == t[r + 1]
			? (t[r] += e)
			: r >= 0 && 0 == e && 0 == t[r]
				? (t[r + 1] += i)
				: n
					? ((t[r] += e), (t[r + 1] += i))
					: t.push(e, i);
	}
	function Ln(t, e, i) {
		if (0 == i.length) return;
		let n = (e.length - 2) >> 1;
		if (n < t.length) t[t.length - 1] = t[t.length - 1].append(i);
		else {
			for (; t.length < n; ) t.push(Qn.empty);
			t.push(i);
		}
	}
	function Bn(t, e, i) {
		let n = t.inserted;
		for (let r = 0, s = 0, o = 0; o < t.sections.length; ) {
			let a = t.sections[o++],
				l = t.sections[o++];
			if (l < 0) (r += a), (s += a);
			else {
				let h = r,
					c = s,
					u = Qn.empty;
				for (
					;
					(h += a),
						(c += l),
						l && n && (u = u.append(n[(o - 2) >> 1])),
						!(i || o == t.sections.length || t.sections[o + 1] < 0);

				)
					(a = t.sections[o++]), (l = t.sections[o++]);
				e(r, h, s, c, u), (r = h), (s = c);
			}
		}
	}
	function Un(t, e, i, n = !1) {
		let r = [],
			s = n ? [] : null,
			o = new Gn(t),
			a = new Gn(e);
		for (let t = -1; ; ) {
			if ((o.done && a.len) || (a.done && o.len))
				throw new Error('Mismatched change set lengths');
			if (-1 == o.ins && -1 == a.ins) {
				let t = Math.min(o.len, a.len);
				zn(r, t, -1), o.forward(t), a.forward(t);
			} else if (
				a.ins >= 0 &&
				(o.ins < 0 ||
					t == o.i ||
					(0 == o.off && (a.len < o.len || (a.len == o.len && !i))))
			) {
				let e = a.len;
				for (zn(r, a.ins, -1); e; ) {
					let i = Math.min(o.len, e);
					o.ins >= 0 &&
						t < o.i &&
						o.len <= i &&
						(zn(r, 0, o.ins), s && Ln(s, r, o.text), (t = o.i)),
						o.forward(i),
						(e -= i);
				}
				a.next();
			} else {
				if (!(o.ins >= 0)) {
					if (o.done && a.done)
						return s ? Yn.createSet(r, s) : Wn.create(r);
					throw new Error('Mismatched change set lengths');
				}
				{
					let e = 0,
						i = o.len;
					for (; i; )
						if (-1 == a.ins) {
							let t = Math.min(i, a.len);
							(e += t), (i -= t), a.forward(t);
						} else {
							if (!(0 == a.ins && a.len < i)) break;
							(i -= a.len), a.next();
						}
					zn(r, e, t < o.i ? o.ins : 0),
						s && t < o.i && Ln(s, r, o.text),
						(t = o.i),
						o.forward(o.len - i);
				}
			}
		}
	}
	function Nn(t, e, i = !1) {
		let n = [],
			r = i ? [] : null,
			s = new Gn(t),
			o = new Gn(e);
		for (let t = !1; ; ) {
			if (s.done && o.done) return r ? Yn.createSet(n, r) : Wn.create(n);
			if (0 == s.ins) zn(n, s.len, 0, t), s.next();
			else if (0 != o.len || o.done) {
				if (s.done || o.done)
					throw new Error('Mismatched change set lengths');
				{
					let e = Math.min(s.len2, o.len),
						i = n.length;
					if (-1 == s.ins) {
						let i = -1 == o.ins ? -1 : o.off ? 0 : o.ins;
						zn(n, e, i, t), r && i && Ln(r, n, o.text);
					} else
						-1 == o.ins
							? (zn(n, s.off ? 0 : s.len, e, t),
								r && Ln(r, n, s.textBit(e)))
							: (zn(n, s.off ? 0 : s.len, o.off ? 0 : o.ins, t),
								r && !o.off && Ln(r, n, o.text));
					(t =
						(s.ins > e || (o.ins >= 0 && o.len > e)) &&
						(t || n.length > i)),
						s.forward2(e),
						o.forward(e);
				}
			} else zn(n, 0, o.ins, t), r && Ln(r, n, o.text), o.next();
		}
	}
	class Gn {
		constructor(t) {
			(this.set = t), (this.i = 0), this.next();
		}
		next() {
			let { sections: t } = this.set;
			this.i < t.length
				? ((this.len = t[this.i++]), (this.ins = t[this.i++]))
				: ((this.len = 0), (this.ins = -2)),
				(this.off = 0);
		}
		get done() {
			return -2 == this.ins;
		}
		get len2() {
			return this.ins < 0 ? this.len : this.ins;
		}
		get text() {
			let { inserted: t } = this.set,
				e = (this.i - 2) >> 1;
			return e >= t.length ? Qn.empty : t[e];
		}
		textBit(t) {
			let { inserted: e } = this.set,
				i = (this.i - 2) >> 1;
			return i >= e.length && !t
				? Qn.empty
				: e[i].slice(this.off, null == t ? void 0 : this.off + t);
		}
		forward(t) {
			t == this.len ? this.next() : ((this.len -= t), (this.off += t));
		}
		forward2(t) {
			-1 == this.ins
				? this.forward(t)
				: t == this.ins
					? this.next()
					: ((this.ins -= t), (this.off += t));
		}
	}
	class In {
		constructor(t, e, i) {
			(this.from = t), (this.to = e), (this.flags = i);
		}
		get anchor() {
			return 32 & this.flags ? this.to : this.from;
		}
		get head() {
			return 32 & this.flags ? this.from : this.to;
		}
		get empty() {
			return this.from == this.to;
		}
		get assoc() {
			return 8 & this.flags ? -1 : 16 & this.flags ? 1 : 0;
		}
		get bidiLevel() {
			let t = 7 & this.flags;
			return 7 == t ? null : t;
		}
		get goalColumn() {
			let t = this.flags >> 6;
			return 16777215 == t ? void 0 : t;
		}
		map(t, e = -1) {
			let i, n;
			return (
				this.empty
					? (i = n = t.mapPos(this.from, e))
					: ((i = t.mapPos(this.from, 1)),
						(n = t.mapPos(this.to, -1))),
				i == this.from && n == this.to ? this : new In(i, n, this.flags)
			);
		}
		extend(t, e = t) {
			if (t <= this.anchor && e >= this.anchor) return Fn.range(t, e);
			let i =
				Math.abs(t - this.anchor) > Math.abs(e - this.anchor) ? t : e;
			return Fn.range(this.anchor, i);
		}
		eq(t, e = !1) {
			return !(
				this.anchor != t.anchor ||
				this.head != t.head ||
				(e && this.empty && this.assoc != t.assoc)
			);
		}
		toJSON() {
			return { anchor: this.anchor, head: this.head };
		}
		static fromJSON(t) {
			if (!t || 'number' != typeof t.anchor || 'number' != typeof t.head)
				throw new RangeError(
					'Invalid JSON representation for SelectionRange'
				);
			return Fn.range(t.anchor, t.head);
		}
		static create(t, e, i) {
			return new In(t, e, i);
		}
	}
	class Fn {
		constructor(t, e) {
			(this.ranges = t), (this.mainIndex = e);
		}
		map(t, e = -1) {
			return t.empty
				? this
				: Fn.create(
						this.ranges.map((i) => i.map(t, e)),
						this.mainIndex
					);
		}
		eq(t, e = !1) {
			if (
				this.ranges.length != t.ranges.length ||
				this.mainIndex != t.mainIndex
			)
				return !1;
			for (let i = 0; i < this.ranges.length; i++)
				if (!this.ranges[i].eq(t.ranges[i], e)) return !1;
			return !0;
		}
		get main() {
			return this.ranges[this.mainIndex];
		}
		asSingle() {
			return 1 == this.ranges.length ? this : new Fn([this.main], 0);
		}
		addRange(t, e = !0) {
			return Fn.create(
				[t].concat(this.ranges),
				e ? 0 : this.mainIndex + 1
			);
		}
		replaceRange(t, e = this.mainIndex) {
			let i = this.ranges.slice();
			return (i[e] = t), Fn.create(i, this.mainIndex);
		}
		toJSON() {
			return {
				ranges: this.ranges.map((t) => t.toJSON()),
				main: this.mainIndex,
			};
		}
		static fromJSON(t) {
			if (
				!t ||
				!Array.isArray(t.ranges) ||
				'number' != typeof t.main ||
				t.main >= t.ranges.length
			)
				throw new RangeError(
					'Invalid JSON representation for EditorSelection'
				);
			return new Fn(
				t.ranges.map((t) => In.fromJSON(t)),
				t.main
			);
		}
		static single(t, e = t) {
			return new Fn([Fn.range(t, e)], 0);
		}
		static create(t, e = 0) {
			if (0 == t.length)
				throw new RangeError('A selection needs at least one range');
			for (let i = 0, n = 0; n < t.length; n++) {
				let r = t[n];
				if (r.empty ? r.from <= i : r.from < i)
					return Fn.normalized(t.slice(), e);
				i = r.to;
			}
			return new Fn(t, e);
		}
		static cursor(t, e = 0, i, n) {
			return In.create(
				t,
				t,
				(0 == e ? 0 : e < 0 ? 8 : 16) |
					(null == i ? 7 : Math.min(6, i)) |
					((null != n ? n : 16777215) << 6)
			);
		}
		static range(t, e, i, n) {
			let r =
				((null != i ? i : 16777215) << 6) |
				(null == n ? 7 : Math.min(6, n));
			return e < t
				? In.create(e, t, 48 | r)
				: In.create(t, e, (e > t ? 8 : 0) | r);
		}
		static normalized(t, e = 0) {
			let i = t[e];
			t.sort((t, e) => t.from - e.from), (e = t.indexOf(i));
			for (let i = 1; i < t.length; i++) {
				let n = t[i],
					r = t[i - 1];
				if (n.empty ? n.from <= r.to : n.from < r.to) {
					let s = r.from,
						o = Math.max(n.to, r.to);
					i <= e && e--,
						t.splice(
							--i,
							2,
							n.anchor > n.head ? Fn.range(o, s) : Fn.range(s, o)
						);
				}
			}
			return new Fn(t, e);
		}
	}
	function Hn(t, e) {
		for (let i of t.ranges)
			if (i.to > e)
				throw new RangeError('Selection points outside of document');
	}
	let Kn = 0;
	class Jn {
		constructor(t, e, i, n, r) {
			(this.combine = t),
				(this.compareInput = e),
				(this.compare = i),
				(this.isStatic = n),
				(this.id = Kn++),
				(this.default = t([])),
				(this.extensions = 'function' == typeof r ? r(this) : r);
		}
		get reader() {
			return this;
		}
		static define(t = {}) {
			return new Jn(
				t.combine || ((t) => t),
				t.compareInput || ((t, e) => t === e),
				t.compare || (t.combine ? (t, e) => t === e : tr),
				!!t.static,
				t.enables
			);
		}
		of(t) {
			return new er([], this, 0, t);
		}
		compute(t, e) {
			if (this.isStatic) throw new Error("Can't compute a static facet");
			return new er(t, this, 1, e);
		}
		computeN(t, e) {
			if (this.isStatic) throw new Error("Can't compute a static facet");
			return new er(t, this, 2, e);
		}
		from(t, e) {
			return e || (e = (t) => t), this.compute([t], (i) => e(i.field(t)));
		}
	}
	function tr(t, e) {
		return (
			t == e || (t.length == e.length && t.every((t, i) => t === e[i]))
		);
	}
	class er {
		constructor(t, e, i, n) {
			(this.dependencies = t),
				(this.facet = e),
				(this.type = i),
				(this.value = n),
				(this.id = Kn++);
		}
		dynamicSlot(t) {
			var e;
			let i = this.value,
				n = this.facet.compareInput,
				r = this.id,
				s = t[r] >> 1,
				o = 2 == this.type,
				a = !1,
				l = !1,
				h = [];
			for (let i of this.dependencies)
				'doc' == i
					? (a = !0)
					: 'selection' == i
						? (l = !0)
						: 1 &
								(null !== (e = t[i.id]) && void 0 !== e
									? e
									: 1) || h.push(t[i.id]);
			return {
				create: (t) => ((t.values[s] = i(t)), 1),
				update(t, e) {
					if (
						(a && e.docChanged) ||
						(l && (e.docChanged || e.selection)) ||
						nr(t, h)
					) {
						let e = i(t);
						if (o ? !ir(e, t.values[s], n) : !n(e, t.values[s]))
							return (t.values[s] = e), 1;
					}
					return 0;
				},
				reconfigure: (t, e) => {
					let a,
						l = e.config.address[r];
					if (null != l) {
						let r = Or(e, l);
						if (
							this.dependencies.every((i) =>
								i instanceof Jn
									? e.facet(i) === t.facet(i)
									: !(i instanceof or) ||
										e.field(i, !1) == t.field(i, !1)
							) ||
							(o ? ir((a = i(t)), r, n) : n((a = i(t)), r))
						)
							return (t.values[s] = r), 0;
					} else a = i(t);
					return (t.values[s] = a), 1;
				},
			};
		}
	}
	function ir(t, e, i) {
		if (t.length != e.length) return !1;
		for (let n = 0; n < t.length; n++) if (!i(t[n], e[n])) return !1;
		return !0;
	}
	function nr(t, e) {
		let i = !1;
		for (let n of e) 1 & fr(t, n) && (i = !0);
		return i;
	}
	function rr(t, e, i) {
		let n = i.map((e) => t[e.id]),
			r = i.map((t) => t.type),
			s = n.filter((t) => !(1 & t)),
			o = t[e.id] >> 1;
		function a(t) {
			let i = [];
			for (let e = 0; e < n.length; e++) {
				let s = Or(t, n[e]);
				if (2 == r[e]) for (let t of s) i.push(t);
				else i.push(s);
			}
			return e.combine(i);
		}
		return {
			create(t) {
				for (let e of n) fr(t, e);
				return (t.values[o] = a(t)), 1;
			},
			update(t, i) {
				if (!nr(t, s)) return 0;
				let n = a(t);
				return e.compare(n, t.values[o]) ? 0 : ((t.values[o] = n), 1);
			},
			reconfigure(t, r) {
				let s = nr(t, n),
					l = r.config.facets[e.id],
					h = r.facet(e);
				if (l && !s && tr(i, l)) return (t.values[o] = h), 0;
				let c = a(t);
				return e.compare(c, h)
					? ((t.values[o] = h), 0)
					: ((t.values[o] = c), 1);
			},
		};
	}
	const sr = Jn.define({ static: !0 });
	class or {
		constructor(t, e, i, n, r) {
			(this.id = t),
				(this.createF = e),
				(this.updateF = i),
				(this.compareF = n),
				(this.spec = r),
				(this.provides = void 0);
		}
		static define(t) {
			let e = new or(
				Kn++,
				t.create,
				t.update,
				t.compare || ((t, e) => t === e),
				t
			);
			return t.provide && (e.provides = t.provide(e)), e;
		}
		create(t) {
			let e = t.facet(sr).find((t) => t.field == this);
			return ((null == e ? void 0 : e.create) || this.createF)(t);
		}
		slot(t) {
			let e = t[this.id] >> 1;
			return {
				create: (t) => ((t.values[e] = this.create(t)), 1),
				update: (t, i) => {
					let n = t.values[e],
						r = this.updateF(n, i);
					return this.compareF(n, r) ? 0 : ((t.values[e] = r), 1);
				},
				reconfigure: (t, i) =>
					null != i.config.address[this.id]
						? ((t.values[e] = i.field(this)), 0)
						: ((t.values[e] = this.create(t)), 1),
			};
		}
		init(t) {
			return [this, sr.of({ field: this, create: t })];
		}
		get extension() {
			return this;
		}
	}
	function ar(t) {
		return (e) => new hr(e, t);
	}
	const lr = {
		highest: ar(0),
		high: ar(1),
		default: ar(2),
		low: ar(3),
		lowest: ar(4),
	};
	class hr {
		constructor(t, e) {
			(this.inner = t), (this.prec = e);
		}
	}
	class cr {
		of(t) {
			return new ur(this, t);
		}
		reconfigure(t) {
			return cr.reconfigure.of({ compartment: this, extension: t });
		}
		get(t) {
			return t.config.compartments.get(this);
		}
	}
	class ur {
		constructor(t, e) {
			(this.compartment = t), (this.inner = e);
		}
	}
	class dr {
		constructor(t, e, i, n, r, s) {
			for (
				this.base = t,
					this.compartments = e,
					this.dynamicSlots = i,
					this.address = n,
					this.staticValues = r,
					this.facets = s,
					this.statusTemplate = [];
				this.statusTemplate.length < i.length;

			)
				this.statusTemplate.push(0);
		}
		staticFacet(t) {
			let e = this.address[t.id];
			return null == e ? t.default : this.staticValues[e >> 1];
		}
		static resolve(t, e, i) {
			let n = [],
				r = Object.create(null),
				s = new Map();
			for (let i of (function (t, e, i) {
				let n = [[], [], [], [], []],
					r = new Map();
				return (
					(function t(s, o) {
						let a = r.get(s);
						if (null != a) {
							if (a <= o) return;
							let t = n[a].indexOf(s);
							t > -1 && n[a].splice(t, 1),
								s instanceof ur && i.delete(s.compartment);
						}
						if ((r.set(s, o), Array.isArray(s)))
							for (let e of s) t(e, o);
						else if (s instanceof ur) {
							if (i.has(s.compartment))
								throw new RangeError(
									'Duplicate use of compartment in extensions'
								);
							let n = e.get(s.compartment) || s.inner;
							i.set(s.compartment, n), t(n, o);
						} else if (s instanceof hr) t(s.inner, s.prec);
						else if (s instanceof or)
							n[o].push(s), s.provides && t(s.provides, o);
						else if (s instanceof er)
							n[o].push(s),
								s.facet.extensions && t(s.facet.extensions, 2);
						else {
							let e = s.extension;
							if (!e)
								throw new Error(
									`Unrecognized extension value in extension set (${s}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`
								);
							t(e, o);
						}
					})(t, 2),
					n.reduce((t, e) => t.concat(e))
				);
			})(t, e, s))
				i instanceof or
					? n.push(i)
					: (r[i.facet.id] || (r[i.facet.id] = [])).push(i);
			let o = Object.create(null),
				a = [],
				l = [];
			for (let t of n)
				(o[t.id] = l.length << 1), l.push((e) => t.slot(e));
			let h = null == i ? void 0 : i.config.facets;
			for (let t in r) {
				let e = r[t],
					n = e[0].facet,
					s = (h && h[t]) || [];
				if (e.every((t) => 0 == t.type))
					if (((o[n.id] = (a.length << 1) | 1), tr(s, e)))
						a.push(i.facet(n));
					else {
						let t = n.combine(e.map((t) => t.value));
						a.push(i && n.compare(t, i.facet(n)) ? i.facet(n) : t);
					}
				else {
					for (let t of e)
						0 == t.type
							? ((o[t.id] = (a.length << 1) | 1), a.push(t.value))
							: ((o[t.id] = l.length << 1),
								l.push((e) => t.dynamicSlot(e)));
					(o[n.id] = l.length << 1), l.push((t) => rr(t, n, e));
				}
			}
			let c = l.map((t) => t(o));
			return new dr(t, s, c, o, a, r);
		}
	}
	function fr(t, e) {
		if (1 & e) return 2;
		let i = e >> 1,
			n = t.status[i];
		if (4 == n)
			throw new Error('Cyclic dependency between fields and/or facets');
		if (2 & n) return n;
		t.status[i] = 4;
		let r = t.computeSlot(t, t.config.dynamicSlots[i]);
		return (t.status[i] = 2 | r);
	}
	function Or(t, e) {
		return 1 & e ? t.config.staticValues[e >> 1] : t.values[e >> 1];
	}
	const pr = Jn.define(),
		mr = Jn.define({ combine: (t) => t.some((t) => t), static: !0 }),
		gr = Jn.define({
			combine: (t) => (t.length ? t[0] : void 0),
			static: !0,
		}),
		br = Jn.define(),
		yr = Jn.define(),
		vr = Jn.define(),
		wr = Jn.define({ combine: (t) => !!t.length && t[0] });
	class Sr {
		constructor(t, e) {
			(this.type = t), (this.value = e);
		}
		static define() {
			return new xr();
		}
	}
	class xr {
		of(t) {
			return new Sr(this, t);
		}
	}
	class Qr {
		constructor(t) {
			this.map = t;
		}
		of(t) {
			return new kr(this, t);
		}
	}
	class kr {
		constructor(t, e) {
			(this.type = t), (this.value = e);
		}
		map(t) {
			let e = this.type.map(this.value, t);
			return void 0 === e
				? void 0
				: e == this.value
					? this
					: new kr(this.type, e);
		}
		is(t) {
			return this.type == t;
		}
		static define(t = {}) {
			return new Qr(t.map || ((t) => t));
		}
		static mapEffects(t, e) {
			if (!t.length) return t;
			let i = [];
			for (let n of t) {
				let t = n.map(e);
				t && i.push(t);
			}
			return i;
		}
	}
	(kr.reconfigure = kr.define()), (kr.appendConfig = kr.define());
	class $r {
		constructor(t, e, i, n, r, s) {
			(this.startState = t),
				(this.changes = e),
				(this.selection = i),
				(this.effects = n),
				(this.annotations = r),
				(this.scrollIntoView = s),
				(this._doc = null),
				(this._state = null),
				i && Hn(i, e.newLength),
				r.some((t) => t.type == $r.time) ||
					(this.annotations = r.concat($r.time.of(Date.now())));
		}
		static create(t, e, i, n, r, s) {
			return new $r(t, e, i, n, r, s);
		}
		get newDoc() {
			return (
				this._doc ||
				(this._doc = this.changes.apply(this.startState.doc))
			);
		}
		get newSelection() {
			return (
				this.selection || this.startState.selection.map(this.changes)
			);
		}
		get state() {
			return (
				this._state || this.startState.applyTransaction(this),
				this._state
			);
		}
		annotation(t) {
			for (let e of this.annotations) if (e.type == t) return e.value;
		}
		get docChanged() {
			return !this.changes.empty;
		}
		get reconfigured() {
			return this.startState.config != this.state.config;
		}
		isUserEvent(t) {
			let e = this.annotation($r.userEvent);
			return !(
				!e ||
				!(
					e == t ||
					(e.length > t.length &&
						e.slice(0, t.length) == t &&
						'.' == e[t.length])
				)
			);
		}
	}
	function Pr(t, e) {
		let i = [];
		for (let n = 0, r = 0; ; ) {
			let s, o;
			if (n < t.length && (r == e.length || e[r] >= t[n]))
				(s = t[n++]), (o = t[n++]);
			else {
				if (!(r < e.length)) return i;
				(s = e[r++]), (o = e[r++]);
			}
			!i.length || i[i.length - 1] < s
				? i.push(s, o)
				: i[i.length - 1] < o && (i[i.length - 1] = o);
		}
	}
	function Zr(t, e, i) {
		var n;
		let r, s, o;
		return (
			i
				? ((r = e.changes),
					(s = Yn.empty(e.changes.length)),
					(o = t.changes.compose(e.changes)))
				: ((r = e.changes.map(t.changes)),
					(s = t.changes.mapDesc(e.changes, !0)),
					(o = t.changes.compose(r))),
			{
				changes: o,
				selection: e.selection
					? e.selection.map(s)
					: null === (n = t.selection) || void 0 === n
						? void 0
						: n.map(r),
				effects: kr
					.mapEffects(t.effects, r)
					.concat(kr.mapEffects(e.effects, s)),
				annotations: t.annotations.length
					? t.annotations.concat(e.annotations)
					: e.annotations,
				scrollIntoView: t.scrollIntoView || e.scrollIntoView,
			}
		);
	}
	function Tr(t, e, i) {
		let n = e.selection,
			r = Xr(e.annotations);
		return (
			e.userEvent && (r = r.concat($r.userEvent.of(e.userEvent))),
			{
				changes:
					e.changes instanceof Yn
						? e.changes
						: Yn.of(e.changes || [], i, t.facet(gr)),
				selection:
					n && (n instanceof Fn ? n : Fn.single(n.anchor, n.head)),
				effects: Xr(e.effects),
				annotations: r,
				scrollIntoView: !!e.scrollIntoView,
			}
		);
	}
	function Cr(t, e, i) {
		let n = Tr(t, e.length ? e[0] : {}, t.doc.length);
		e.length && !1 === e[0].filter && (i = !1);
		for (let r = 1; r < e.length; r++) {
			!1 === e[r].filter && (i = !1);
			let s = !!e[r].sequential;
			n = Zr(n, Tr(t, e[r], s ? n.changes.newLength : t.doc.length), s);
		}
		let r = $r.create(
			t,
			n.changes,
			n.selection,
			n.effects,
			n.annotations,
			n.scrollIntoView
		);
		return (function (t) {
			let e = t.startState,
				i = e.facet(vr),
				n = t;
			for (let r = i.length - 1; r >= 0; r--) {
				let s = i[r](t);
				s &&
					Object.keys(s).length &&
					(n = Zr(n, Tr(e, s, t.changes.newLength), !0));
			}
			return n == t
				? t
				: $r.create(
						e,
						t.changes,
						t.selection,
						n.effects,
						n.annotations,
						n.scrollIntoView
					);
		})(
			i
				? (function (t) {
						let e = t.startState,
							i = !0;
						for (let n of e.facet(br)) {
							let e = n(t);
							if (!1 === e) {
								i = !1;
								break;
							}
							Array.isArray(e) && (i = !0 === i ? e : Pr(i, e));
						}
						if (!0 !== i) {
							let n, r;
							if (!1 === i)
								(r = t.changes.invertedDesc),
									(n = Yn.empty(e.doc.length));
							else {
								let e = t.changes.filter(i);
								(n = e.changes),
									(r = e.filtered.mapDesc(
										e.changes
									).invertedDesc);
							}
							t = $r.create(
								e,
								n,
								t.selection && t.selection.map(r),
								kr.mapEffects(t.effects, r),
								t.annotations,
								t.scrollIntoView
							);
						}
						let n = e.facet(yr);
						for (let i = n.length - 1; i >= 0; i--) {
							let r = n[i](t);
							t =
								r instanceof $r
									? r
									: Array.isArray(r) &&
										  1 == r.length &&
										  r[0] instanceof $r
										? r[0]
										: Cr(e, Xr(r), !1);
						}
						return t;
					})(r)
				: r
		);
	}
	($r.time = Sr.define()),
		($r.userEvent = Sr.define()),
		($r.addToHistory = Sr.define()),
		($r.remote = Sr.define());
	const Ar = [];
	function Xr(t) {
		return null == t ? Ar : Array.isArray(t) ? t : [t];
	}
	var Mr = (function (t) {
		return (
			(t[(t.Word = 0)] = 'Word'),
			(t[(t.Space = 1)] = 'Space'),
			(t[(t.Other = 2)] = 'Other'),
			t
		);
	})(Mr || (Mr = {}));
	const Rr =
		/[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
	let _r;
	try {
		_r = new RegExp('[\\p{Alphabetic}\\p{Number}_]', 'u');
	} catch (t) {}
	class Vr {
		constructor(t, e, i, n, r, s) {
			(this.config = t),
				(this.doc = e),
				(this.selection = i),
				(this.values = n),
				(this.status = t.statusTemplate.slice()),
				(this.computeSlot = r),
				s && (s._state = this);
			for (let t = 0; t < this.config.dynamicSlots.length; t++)
				fr(this, t << 1);
			this.computeSlot = null;
		}
		field(t, e = !0) {
			let i = this.config.address[t.id];
			if (null != i) return fr(this, i), Or(this, i);
			if (e) throw new RangeError('Field is not present in this state');
		}
		update(...t) {
			return Cr(this, t, !0);
		}
		applyTransaction(t) {
			let e,
				i = this.config,
				{ base: n, compartments: r } = i;
			for (let e of t.effects)
				e.is(cr.reconfigure)
					? (i &&
							((r = new Map()),
							i.compartments.forEach((t, e) => r.set(e, t)),
							(i = null)),
						r.set(e.value.compartment, e.value.extension))
					: e.is(kr.reconfigure)
						? ((i = null), (n = e.value))
						: e.is(kr.appendConfig) &&
							((i = null), (n = Xr(n).concat(e.value)));
			i
				? (e = t.startState.values.slice())
				: ((i = dr.resolve(n, r, this)),
					(e = new Vr(
						i,
						this.doc,
						this.selection,
						i.dynamicSlots.map(() => null),
						(t, e) => e.reconfigure(t, this),
						null
					).values));
			let s = t.startState.facet(mr)
				? t.newSelection
				: t.newSelection.asSingle();
			new Vr(i, t.newDoc, s, e, (e, i) => i.update(e, t), t);
		}
		replaceSelection(t) {
			return (
				'string' == typeof t && (t = this.toText(t)),
				this.changeByRange((e) => ({
					changes: { from: e.from, to: e.to, insert: t },
					range: Fn.cursor(e.from + t.length),
				}))
			);
		}
		changeByRange(t) {
			let e = this.selection,
				i = t(e.ranges[0]),
				n = this.changes(i.changes),
				r = [i.range],
				s = Xr(i.effects);
			for (let i = 1; i < e.ranges.length; i++) {
				let o = t(e.ranges[i]),
					a = this.changes(o.changes),
					l = a.map(n);
				for (let t = 0; t < i; t++) r[t] = r[t].map(l);
				let h = n.mapDesc(a, !0);
				r.push(o.range.map(h)),
					(n = n.compose(l)),
					(s = kr
						.mapEffects(s, l)
						.concat(kr.mapEffects(Xr(o.effects), h)));
			}
			return {
				changes: n,
				selection: Fn.create(r, e.mainIndex),
				effects: s,
			};
		}
		changes(t = []) {
			return t instanceof Yn
				? t
				: Yn.of(t, this.doc.length, this.facet(Vr.lineSeparator));
		}
		toText(t) {
			return Qn.of(t.split(this.facet(Vr.lineSeparator) || Dn));
		}
		sliceDoc(t = 0, e = this.doc.length) {
			return this.doc.sliceString(t, e, this.lineBreak);
		}
		facet(t) {
			let e = this.config.address[t.id];
			return null == e ? t.default : (fr(this, e), Or(this, e));
		}
		toJSON(t) {
			let e = {
				doc: this.sliceDoc(),
				selection: this.selection.toJSON(),
			};
			if (t)
				for (let i in t) {
					let n = t[i];
					n instanceof or &&
						null != this.config.address[n.id] &&
						(e[i] = n.spec.toJSON(this.field(t[i]), this));
				}
			return e;
		}
		static fromJSON(t, e = {}, i) {
			if (!t || 'string' != typeof t.doc)
				throw new RangeError(
					'Invalid JSON representation for EditorState'
				);
			let n = [];
			if (i)
				for (let e in i)
					if (Object.prototype.hasOwnProperty.call(t, e)) {
						let r = i[e],
							s = t[e];
						n.push(r.init((t) => r.spec.fromJSON(s, t)));
					}
			return Vr.create({
				doc: t.doc,
				selection: Fn.fromJSON(t.selection),
				extensions: e.extensions ? n.concat([e.extensions]) : n,
			});
		}
		static create(t = {}) {
			let e = dr.resolve(t.extensions || [], new Map()),
				i =
					t.doc instanceof Qn
						? t.doc
						: Qn.of(
								(t.doc || '').split(
									e.staticFacet(Vr.lineSeparator) || Dn
								)
							),
				n = t.selection
					? t.selection instanceof Fn
						? t.selection
						: Fn.single(t.selection.anchor, t.selection.head)
					: Fn.single(0);
			return (
				Hn(n, i.length),
				e.staticFacet(mr) || (n = n.asSingle()),
				new Vr(
					e,
					i,
					n,
					e.dynamicSlots.map(() => null),
					(t, e) => e.create(t),
					null
				)
			);
		}
		get tabSize() {
			return this.facet(Vr.tabSize);
		}
		get lineBreak() {
			return this.facet(Vr.lineSeparator) || '\n';
		}
		get readOnly() {
			return this.facet(wr);
		}
		phrase(t, ...e) {
			for (let e of this.facet(Vr.phrases))
				if (Object.prototype.hasOwnProperty.call(e, t)) {
					t = e[t];
					break;
				}
			return (
				e.length &&
					(t = t.replace(/\$(\$|\d*)/g, (t, i) => {
						if ('$' == i) return '$';
						let n = +(i || 1);
						return !n || n > e.length ? t : e[n - 1];
					})),
				t
			);
		}
		languageDataAt(t, e, i = -1) {
			let n = [];
			for (let r of this.facet(pr))
				for (let s of r(this, e, i))
					Object.prototype.hasOwnProperty.call(s, t) && n.push(s[t]);
			return n;
		}
		charCategorizer(t) {
			return (
				(e = this.languageDataAt('wordChars', t).join('')),
				(t) => {
					if (!/\S/.test(t)) return Mr.Space;
					if (
						(function (t) {
							if (_r) return _r.test(t);
							for (let e = 0; e < t.length; e++) {
								let i = t[e];
								if (
									/\w/.test(i) ||
									(i > '' &&
										(i.toUpperCase() != i.toLowerCase() ||
											Rr.test(i)))
								)
									return !0;
							}
							return !1;
						})(t)
					)
						return Mr.Word;
					for (let i = 0; i < e.length; i++)
						if (t.indexOf(e[i]) > -1) return Mr.Word;
					return Mr.Other;
				}
			);
			var e;
		}
		wordAt(t) {
			let { text: e, from: i, length: n } = this.doc.lineAt(t),
				r = this.charCategorizer(t),
				s = t - i,
				o = t - i;
			for (; s > 0; ) {
				let t = Rn(e, s, !1);
				if (r(e.slice(t, s)) != Mr.Word) break;
				s = t;
			}
			for (; o < n; ) {
				let t = Rn(e, o);
				if (r(e.slice(o, t)) != Mr.Word) break;
				o = t;
			}
			return s == o ? null : Fn.range(s + i, o + i);
		}
	}
	function qr(t, e, i = {}) {
		let n = {};
		for (let e of t)
			for (let t of Object.keys(e)) {
				let r = e[t],
					s = n[t];
				if (void 0 === s) n[t] = r;
				else if (s === r || void 0 === r);
				else {
					if (!Object.hasOwnProperty.call(i, t))
						throw new Error('Config merge conflict for field ' + t);
					n[t] = i[t](s, r);
				}
			}
		for (let t in e) void 0 === n[t] && (n[t] = e[t]);
		return n;
	}
	(Vr.allowMultipleSelections = mr),
		(Vr.tabSize = Jn.define({ combine: (t) => (t.length ? t[0] : 4) })),
		(Vr.lineSeparator = gr),
		(Vr.readOnly = wr),
		(Vr.phrases = Jn.define({
			compare(t, e) {
				let i = Object.keys(t),
					n = Object.keys(e);
				return i.length == n.length && i.every((i) => t[i] == e[i]);
			},
		})),
		(Vr.languageData = pr),
		(Vr.changeFilter = br),
		(Vr.transactionFilter = yr),
		(Vr.transactionExtender = vr),
		(cr.reconfigure = kr.define());
	class jr {
		eq(t) {
			return this == t;
		}
		range(t, e = t) {
			return Dr.create(t, e, this);
		}
	}
	(jr.prototype.startSide = jr.prototype.endSide = 0),
		(jr.prototype.point = !1),
		(jr.prototype.mapMode = En.TrackDel);
	class Dr {
		constructor(t, e, i) {
			(this.from = t), (this.to = e), (this.value = i);
		}
		static create(t, e, i) {
			return new Dr(t, e, i);
		}
	}
	function Er(t, e) {
		return t.from - e.from || t.value.startSide - e.value.startSide;
	}
	class Wr {
		constructor(t, e, i, n) {
			(this.from = t),
				(this.to = e),
				(this.value = i),
				(this.maxPoint = n);
		}
		get length() {
			return this.to[this.to.length - 1];
		}
		findIndex(t, e, i, n = 0) {
			let r = i ? this.to : this.from;
			for (let s = n, o = r.length; ; ) {
				if (s == o) return s;
				let n = (s + o) >> 1,
					a =
						r[n] - t ||
						(i ? this.value[n].endSide : this.value[n].startSide) -
							e;
				if (n == s) return a >= 0 ? s : o;
				a >= 0 ? (o = n) : (s = n + 1);
			}
		}
		between(t, e, i, n) {
			for (
				let r = this.findIndex(e, -1e9, !0),
					s = this.findIndex(i, 1e9, !1, r);
				r < s;
				r++
			)
				if (!1 === n(this.from[r] + t, this.to[r] + t, this.value[r]))
					return !1;
		}
		map(t, e) {
			let i = [],
				n = [],
				r = [],
				s = -1,
				o = -1;
			for (let a = 0; a < this.value.length; a++) {
				let l,
					h,
					c = this.value[a],
					u = this.from[a] + t,
					d = this.to[a] + t;
				if (u == d) {
					let t = e.mapPos(u, c.startSide, c.mapMode);
					if (null == t) continue;
					if (
						((l = h = t),
						c.startSide != c.endSide &&
							((h = e.mapPos(u, c.endSide)), h < l))
					)
						continue;
				} else if (
					((l = e.mapPos(u, c.startSide)),
					(h = e.mapPos(d, c.endSide)),
					l > h || (l == h && c.startSide > 0 && c.endSide <= 0))
				)
					continue;
				(h - l || c.endSide - c.startSide) < 0 ||
					(s < 0 && (s = l),
					c.point && (o = Math.max(o, h - l)),
					i.push(c),
					n.push(l - s),
					r.push(h - s));
			}
			return { mapped: i.length ? new Wr(n, r, i, o) : null, pos: s };
		}
	}
	class Yr {
		constructor(t, e, i, n) {
			(this.chunkPos = t),
				(this.chunk = e),
				(this.nextLayer = i),
				(this.maxPoint = n);
		}
		static create(t, e, i, n) {
			return new Yr(t, e, i, n);
		}
		get length() {
			let t = this.chunk.length - 1;
			return t < 0
				? 0
				: Math.max(this.chunkEnd(t), this.nextLayer.length);
		}
		get size() {
			if (this.isEmpty) return 0;
			let t = this.nextLayer.size;
			for (let e of this.chunk) t += e.value.length;
			return t;
		}
		chunkEnd(t) {
			return this.chunkPos[t] + this.chunk[t].length;
		}
		update(t) {
			let {
					add: e = [],
					sort: i = !1,
					filterFrom: n = 0,
					filterTo: r = this.length,
				} = t,
				s = t.filter;
			if (0 == e.length && !s) return this;
			if ((i && (e = e.slice().sort(Er)), this.isEmpty))
				return e.length ? Yr.of(e) : this;
			let o = new Br(this, null, -1).goto(0),
				a = 0,
				l = [],
				h = new zr();
			for (; o.value || a < e.length; )
				if (
					a < e.length &&
					(o.from - e[a].from ||
						o.startSide - e[a].value.startSide) >= 0
				) {
					let t = e[a++];
					h.addInner(t.from, t.to, t.value) || l.push(t);
				} else
					1 == o.rangeIndex &&
					o.chunkIndex < this.chunk.length &&
					(a == e.length ||
						this.chunkEnd(o.chunkIndex) < e[a].from) &&
					(!s ||
						n > this.chunkEnd(o.chunkIndex) ||
						r < this.chunkPos[o.chunkIndex]) &&
					h.addChunk(
						this.chunkPos[o.chunkIndex],
						this.chunk[o.chunkIndex]
					)
						? o.nextChunk()
						: ((!s ||
								n > o.to ||
								r < o.from ||
								s(o.from, o.to, o.value)) &&
								(h.addInner(o.from, o.to, o.value) ||
									l.push(Dr.create(o.from, o.to, o.value))),
							o.next());
			return h.finishInner(
				this.nextLayer.isEmpty && !l.length
					? Yr.empty
					: this.nextLayer.update({
							add: l,
							filter: s,
							filterFrom: n,
							filterTo: r,
						})
			);
		}
		map(t) {
			if (t.empty || this.isEmpty) return this;
			let e = [],
				i = [],
				n = -1;
			for (let r = 0; r < this.chunk.length; r++) {
				let s = this.chunkPos[r],
					o = this.chunk[r],
					a = t.touchesRange(s, s + o.length);
				if (!1 === a)
					(n = Math.max(n, o.maxPoint)),
						e.push(o),
						i.push(t.mapPos(s));
				else if (!0 === a) {
					let { mapped: r, pos: a } = o.map(s, t);
					r && ((n = Math.max(n, r.maxPoint)), e.push(r), i.push(a));
				}
			}
			let r = this.nextLayer.map(t);
			return 0 == e.length ? r : new Yr(i, e, r || Yr.empty, n);
		}
		between(t, e, i) {
			if (!this.isEmpty) {
				for (let n = 0; n < this.chunk.length; n++) {
					let r = this.chunkPos[n],
						s = this.chunk[n];
					if (
						e >= r &&
						t <= r + s.length &&
						!1 === s.between(r, t - r, e - r, i)
					)
						return;
				}
				this.nextLayer.between(t, e, i);
			}
		}
		iter(t = 0) {
			return Ur.from([this]).goto(t);
		}
		get isEmpty() {
			return this.nextLayer == this;
		}
		static iter(t, e = 0) {
			return Ur.from(t).goto(e);
		}
		static compare(t, e, i, n, r = -1) {
			let s = t.filter(
					(t) => t.maxPoint > 0 || (!t.isEmpty && t.maxPoint >= r)
				),
				o = e.filter(
					(t) => t.maxPoint > 0 || (!t.isEmpty && t.maxPoint >= r)
				),
				a = Lr(s, o, i),
				l = new Gr(s, a, r),
				h = new Gr(o, a, r);
			i.iterGaps((t, e, i) => Ir(l, t, h, e, i, n)),
				i.empty && 0 == i.length && Ir(l, 0, h, 0, 0, n);
		}
		static eq(t, e, i = 0, n) {
			null == n && (n = 999999999);
			let r = t.filter((t) => !t.isEmpty && e.indexOf(t) < 0),
				s = e.filter((e) => !e.isEmpty && t.indexOf(e) < 0);
			if (r.length != s.length) return !1;
			if (!r.length) return !0;
			let o = Lr(r, s),
				a = new Gr(r, o, 0).goto(i),
				l = new Gr(s, o, 0).goto(i);
			for (;;) {
				if (
					a.to != l.to ||
					!Fr(a.active, l.active) ||
					(a.point && (!l.point || !a.point.eq(l.point)))
				)
					return !1;
				if (a.to > n) return !0;
				a.next(), l.next();
			}
		}
		static spans(t, e, i, n, r = -1) {
			let s = new Gr(t, null, r).goto(e),
				o = e,
				a = s.openStart;
			for (;;) {
				let t = Math.min(s.to, i);
				if (s.point) {
					let i = s.activeForPoint(s.to),
						r =
							s.pointFrom < e
								? i.length + 1
								: s.point.startSide < 0
									? i.length
									: Math.min(i.length, a);
					n.point(o, t, s.point, i, r, s.pointRank),
						(a = Math.min(s.openEnd(t), i.length));
				} else t > o && (n.span(o, t, s.active, a), (a = s.openEnd(t)));
				if (s.to > i) return a + (s.point && s.to > i ? 1 : 0);
				(o = s.to), s.next();
			}
		}
		static of(t, e = !1) {
			let i = new zr();
			for (let n of t instanceof Dr
				? [t]
				: e
					? (function (t) {
							if (t.length > 1)
								for (let e = t[0], i = 1; i < t.length; i++) {
									let n = t[i];
									if (Er(e, n) > 0) return t.slice().sort(Er);
									e = n;
								}
							return t;
						})(t)
					: t)
				i.add(n.from, n.to, n.value);
			return i.finish();
		}
		static join(t) {
			if (!t.length) return Yr.empty;
			let e = t[t.length - 1];
			for (let i = t.length - 2; i >= 0; i--)
				for (let n = t[i]; n != Yr.empty; n = n.nextLayer)
					e = new Yr(
						n.chunkPos,
						n.chunk,
						e,
						Math.max(n.maxPoint, e.maxPoint)
					);
			return e;
		}
	}
	(Yr.empty = new Yr([], [], null, -1)), (Yr.empty.nextLayer = Yr.empty);
	class zr {
		finishChunk(t) {
			this.chunks.push(
				new Wr(this.from, this.to, this.value, this.maxPoint)
			),
				this.chunkPos.push(this.chunkStart),
				(this.chunkStart = -1),
				(this.setMaxPoint = Math.max(this.setMaxPoint, this.maxPoint)),
				(this.maxPoint = -1),
				t && ((this.from = []), (this.to = []), (this.value = []));
		}
		constructor() {
			(this.chunks = []),
				(this.chunkPos = []),
				(this.chunkStart = -1),
				(this.last = null),
				(this.lastFrom = -1e9),
				(this.lastTo = -1e9),
				(this.from = []),
				(this.to = []),
				(this.value = []),
				(this.maxPoint = -1),
				(this.setMaxPoint = -1),
				(this.nextLayer = null);
		}
		add(t, e, i) {
			this.addInner(t, e, i) ||
				(this.nextLayer || (this.nextLayer = new zr())).add(t, e, i);
		}
		addInner(t, e, i) {
			let n = t - this.lastTo || i.startSide - this.last.endSide;
			if (
				n <= 0 &&
				(t - this.lastFrom || i.startSide - this.last.startSide) < 0
			)
				throw new Error(
					'Ranges must be added sorted by `from` position and `startSide`'
				);
			return !(
				n < 0 ||
				(250 == this.from.length && this.finishChunk(!0),
				this.chunkStart < 0 && (this.chunkStart = t),
				this.from.push(t - this.chunkStart),
				this.to.push(e - this.chunkStart),
				(this.last = i),
				(this.lastFrom = t),
				(this.lastTo = e),
				this.value.push(i),
				i.point && (this.maxPoint = Math.max(this.maxPoint, e - t)),
				0)
			);
		}
		addChunk(t, e) {
			if (
				(t - this.lastTo || e.value[0].startSide - this.last.endSide) <
				0
			)
				return !1;
			this.from.length && this.finishChunk(!0),
				(this.setMaxPoint = Math.max(this.setMaxPoint, e.maxPoint)),
				this.chunks.push(e),
				this.chunkPos.push(t);
			let i = e.value.length - 1;
			return (
				(this.last = e.value[i]),
				(this.lastFrom = e.from[i] + t),
				(this.lastTo = e.to[i] + t),
				!0
			);
		}
		finish() {
			return this.finishInner(Yr.empty);
		}
		finishInner(t) {
			if (
				(this.from.length && this.finishChunk(!1),
				0 == this.chunks.length)
			)
				return t;
			let e = Yr.create(
				this.chunkPos,
				this.chunks,
				this.nextLayer ? this.nextLayer.finishInner(t) : t,
				this.setMaxPoint
			);
			return (this.from = null), e;
		}
	}
	function Lr(t, e, i) {
		let n = new Map();
		for (let e of t)
			for (let t = 0; t < e.chunk.length; t++)
				e.chunk[t].maxPoint <= 0 && n.set(e.chunk[t], e.chunkPos[t]);
		let r = new Set();
		for (let t of e)
			for (let e = 0; e < t.chunk.length; e++) {
				let s = n.get(t.chunk[e]);
				null == s ||
					(i ? i.mapPos(s) : s) != t.chunkPos[e] ||
					(null == i
						? void 0
						: i.touchesRange(s, s + t.chunk[e].length)) ||
					r.add(t.chunk[e]);
			}
		return r;
	}
	class Br {
		constructor(t, e, i, n = 0) {
			(this.layer = t),
				(this.skip = e),
				(this.minPoint = i),
				(this.rank = n);
		}
		get startSide() {
			return this.value ? this.value.startSide : 0;
		}
		get endSide() {
			return this.value ? this.value.endSide : 0;
		}
		goto(t, e = -1e9) {
			return (
				(this.chunkIndex = this.rangeIndex = 0),
				this.gotoInner(t, e, !1),
				this
			);
		}
		gotoInner(t, e, i) {
			for (; this.chunkIndex < this.layer.chunk.length; ) {
				let e = this.layer.chunk[this.chunkIndex];
				if (
					!(
						(this.skip && this.skip.has(e)) ||
						this.layer.chunkEnd(this.chunkIndex) < t ||
						e.maxPoint < this.minPoint
					)
				)
					break;
				this.chunkIndex++, (i = !1);
			}
			if (this.chunkIndex < this.layer.chunk.length) {
				let n = this.layer.chunk[this.chunkIndex].findIndex(
					t - this.layer.chunkPos[this.chunkIndex],
					e,
					!0
				);
				(!i || this.rangeIndex < n) && this.setRangeIndex(n);
			}
			this.next();
		}
		forward(t, e) {
			(this.to - t || this.endSide - e) < 0 && this.gotoInner(t, e, !0);
		}
		next() {
			for (;;) {
				if (this.chunkIndex == this.layer.chunk.length) {
					(this.from = this.to = 1e9), (this.value = null);
					break;
				}
				{
					let t = this.layer.chunkPos[this.chunkIndex],
						e = this.layer.chunk[this.chunkIndex],
						i = t + e.from[this.rangeIndex];
					if (
						((this.from = i),
						(this.to = t + e.to[this.rangeIndex]),
						(this.value = e.value[this.rangeIndex]),
						this.setRangeIndex(this.rangeIndex + 1),
						this.minPoint < 0 ||
							(this.value.point &&
								this.to - this.from >= this.minPoint))
					)
						break;
				}
			}
		}
		setRangeIndex(t) {
			if (t == this.layer.chunk[this.chunkIndex].value.length) {
				if ((this.chunkIndex++, this.skip))
					for (
						;
						this.chunkIndex < this.layer.chunk.length &&
						this.skip.has(this.layer.chunk[this.chunkIndex]);

					)
						this.chunkIndex++;
				this.rangeIndex = 0;
			} else this.rangeIndex = t;
		}
		nextChunk() {
			this.chunkIndex++, (this.rangeIndex = 0), this.next();
		}
		compare(t) {
			return (
				this.from - t.from ||
				this.startSide - t.startSide ||
				this.rank - t.rank ||
				this.to - t.to ||
				this.endSide - t.endSide
			);
		}
	}
	class Ur {
		constructor(t) {
			this.heap = t;
		}
		static from(t, e = null, i = -1) {
			let n = [];
			for (let r = 0; r < t.length; r++)
				for (let s = t[r]; !s.isEmpty; s = s.nextLayer)
					s.maxPoint >= i && n.push(new Br(s, e, i, r));
			return 1 == n.length ? n[0] : new Ur(n);
		}
		get startSide() {
			return this.value ? this.value.startSide : 0;
		}
		goto(t, e = -1e9) {
			for (let i of this.heap) i.goto(t, e);
			for (let t = this.heap.length >> 1; t >= 0; t--) Nr(this.heap, t);
			return this.next(), this;
		}
		forward(t, e) {
			for (let i of this.heap) i.forward(t, e);
			for (let t = this.heap.length >> 1; t >= 0; t--) Nr(this.heap, t);
			(this.to - t || this.value.endSide - e) < 0 && this.next();
		}
		next() {
			if (0 == this.heap.length)
				(this.from = this.to = 1e9),
					(this.value = null),
					(this.rank = -1);
			else {
				let t = this.heap[0];
				(this.from = t.from),
					(this.to = t.to),
					(this.value = t.value),
					(this.rank = t.rank),
					t.value && t.next(),
					Nr(this.heap, 0);
			}
		}
	}
	function Nr(t, e) {
		for (let i = t[e]; ; ) {
			let n = 1 + (e << 1);
			if (n >= t.length) break;
			let r = t[n];
			if (
				(n + 1 < t.length &&
					r.compare(t[n + 1]) >= 0 &&
					((r = t[n + 1]), n++),
				i.compare(r) < 0)
			)
				break;
			(t[n] = i), (t[e] = r), (e = n);
		}
	}
	class Gr {
		constructor(t, e, i) {
			(this.minPoint = i),
				(this.active = []),
				(this.activeTo = []),
				(this.activeRank = []),
				(this.minActive = -1),
				(this.point = null),
				(this.pointFrom = 0),
				(this.pointRank = 0),
				(this.to = -1e9),
				(this.endSide = 0),
				(this.openStart = -1),
				(this.cursor = Ur.from(t, e, i));
		}
		goto(t, e = -1e9) {
			return (
				this.cursor.goto(t, e),
				(this.active.length =
					this.activeTo.length =
					this.activeRank.length =
						0),
				(this.minActive = -1),
				(this.to = t),
				(this.endSide = e),
				(this.openStart = -1),
				this.next(),
				this
			);
		}
		forward(t, e) {
			for (
				;
				this.minActive > -1 &&
				(this.activeTo[this.minActive] - t ||
					this.active[this.minActive].endSide - e) < 0;

			)
				this.removeActive(this.minActive);
			this.cursor.forward(t, e);
		}
		removeActive(t) {
			Hr(this.active, t),
				Hr(this.activeTo, t),
				Hr(this.activeRank, t),
				(this.minActive = Jr(this.active, this.activeTo));
		}
		addActive(t) {
			let e = 0,
				{ value: i, to: n, rank: r } = this.cursor;
			for (
				;
				e < this.activeRank.length &&
				(r - this.activeRank[e] || n - this.activeTo[e]) > 0;

			)
				e++;
			Kr(this.active, e, i),
				Kr(this.activeTo, e, n),
				Kr(this.activeRank, e, r),
				t && Kr(t, e, this.cursor.from),
				(this.minActive = Jr(this.active, this.activeTo));
		}
		next() {
			let t = this.to,
				e = this.point;
			this.point = null;
			let i = this.openStart < 0 ? [] : null;
			for (;;) {
				let n = this.minActive;
				if (
					n > -1 &&
					(this.activeTo[n] - this.cursor.from ||
						this.active[n].endSide - this.cursor.startSide) < 0
				) {
					if (this.activeTo[n] > t) {
						(this.to = this.activeTo[n]),
							(this.endSide = this.active[n].endSide);
						break;
					}
					this.removeActive(n), i && Hr(i, n);
				} else {
					if (!this.cursor.value) {
						this.to = this.endSide = 1e9;
						break;
					}
					if (this.cursor.from > t) {
						(this.to = this.cursor.from),
							(this.endSide = this.cursor.startSide);
						break;
					}
					{
						let t = this.cursor.value;
						if (t.point) {
							if (
								!(
									e &&
									this.cursor.to == this.to &&
									this.cursor.from < this.cursor.to
								)
							) {
								(this.point = t),
									(this.pointFrom = this.cursor.from),
									(this.pointRank = this.cursor.rank),
									(this.to = this.cursor.to),
									(this.endSide = t.endSide),
									this.cursor.next(),
									this.forward(this.to, this.endSide);
								break;
							}
							this.cursor.next();
						} else this.addActive(i), this.cursor.next();
					}
				}
			}
			if (i) {
				this.openStart = 0;
				for (let e = i.length - 1; e >= 0 && i[e] < t; e--)
					this.openStart++;
			}
		}
		activeForPoint(t) {
			if (!this.active.length) return this.active;
			let e = [];
			for (
				let i = this.active.length - 1;
				i >= 0 && !(this.activeRank[i] < this.pointRank);
				i--
			)
				(this.activeTo[i] > t ||
					(this.activeTo[i] == t &&
						this.active[i].endSide >= this.point.endSide)) &&
					e.push(this.active[i]);
			return e.reverse();
		}
		openEnd(t) {
			let e = 0;
			for (
				let i = this.activeTo.length - 1;
				i >= 0 && this.activeTo[i] > t;
				i--
			)
				e++;
			return e;
		}
	}
	function Ir(t, e, i, n, r, s) {
		t.goto(e), i.goto(n);
		let o = n + r,
			a = n,
			l = n - e;
		for (;;) {
			let e = t.to + l - i.to,
				n = e || t.endSide - i.endSide,
				r = n < 0 ? t.to + l : i.to,
				h = Math.min(r, o);
			if (
				(t.point || i.point
					? (t.point &&
							i.point &&
							(t.point == i.point || t.point.eq(i.point)) &&
							Fr(
								t.activeForPoint(t.to),
								i.activeForPoint(i.to)
							)) ||
						s.comparePoint(a, h, t.point, i.point)
					: h > a &&
						!Fr(t.active, i.active) &&
						s.compareRange(a, h, t.active, i.active),
				r > o)
			)
				break;
			(e || t.openEnd != i.openEnd) && s.boundChange && s.boundChange(r),
				(a = r),
				n <= 0 && t.next(),
				n >= 0 && i.next();
		}
	}
	function Fr(t, e) {
		if (t.length != e.length) return !1;
		for (let i = 0; i < t.length; i++)
			if (t[i] != e[i] && !t[i].eq(e[i])) return !1;
		return !0;
	}
	function Hr(t, e) {
		for (let i = e, n = t.length - 1; i < n; i++) t[i] = t[i + 1];
		t.pop();
	}
	function Kr(t, e, i) {
		for (let i = t.length - 1; i >= e; i--) t[i + 1] = t[i];
		t[e] = i;
	}
	function Jr(t, e) {
		let i = -1,
			n = 1e9;
		for (let r = 0; r < e.length; r++)
			(e[r] - n || t[r].endSide - t[i].endSide) < 0 &&
				((i = r), (n = e[r]));
		return i;
	}
	function ts(t, e, i = t.length) {
		let n = 0;
		for (let r = 0; r < i; )
			9 == t.charCodeAt(r)
				? ((n += e - (n % e)), r++)
				: (n++, (r = Rn(t, r)));
		return n;
	}
	function es(t, e, i, n) {
		for (let n = 0, r = 0; ; ) {
			if (r >= e) return n;
			if (n == t.length) break;
			(r += 9 == t.charCodeAt(n) ? i - (r % i) : 1), (n = Rn(t, n));
		}
		return !0 === n ? -1 : t.length;
	}
	const is = 'undefined' == typeof Symbol ? '__ͼ' : Symbol.for('ͼ'),
		ns =
			'undefined' == typeof Symbol
				? '__styleSet' + Math.floor(1e8 * Math.random())
				: Symbol('styleSet'),
		rs =
			'undefined' != typeof globalThis
				? globalThis
				: 'undefined' != typeof window
					? window
					: {};
	class ss {
		constructor(t, e) {
			this.rules = [];
			let { finish: i } = e || {};
			function n(t) {
				return /^@/.test(t) ? [t] : t.split(/,\s*/);
			}
			function r(t, e, s, o) {
				let a = [],
					l = /^@(\w+)\b/.exec(t[0]),
					h = l && 'keyframes' == l[1];
				if (l && null == e) return s.push(t[0] + ';');
				for (let i in e) {
					let o = e[i];
					if (/&/.test(i))
						r(
							i
								.split(/,\s*/)
								.map((e) => t.map((t) => e.replace(/&/, t)))
								.reduce((t, e) => t.concat(e)),
							o,
							s
						);
					else if (o && 'object' == typeof o) {
						if (!l)
							throw new RangeError(
								'The value of a property (' +
									i +
									') should be a primitive value.'
							);
						r(n(i), o, a, h);
					} else
						null != o &&
							a.push(
								i
									.replace(/_.*/, '')
									.replace(
										/[A-Z]/g,
										(t) => '-' + t.toLowerCase()
									) +
									': ' +
									o +
									';'
							);
				}
				(a.length || h) &&
					s.push(
						(!i || l || o ? t : t.map(i)).join(', ') +
							' {' +
							a.join(' ') +
							'}'
					);
			}
			for (let e in t) r(n(e), t[e], this.rules);
		}
		getRules() {
			return this.rules.join('\n');
		}
		static newName() {
			let t = rs[is] || 1;
			return (rs[is] = t + 1), 'ͼ' + t.toString(36);
		}
		static mount(t, e, i) {
			let n = t[ns],
				r = i && i.nonce;
			n ? r && n.setNonce(r) : (n = new as(t, r)),
				n.mount(Array.isArray(e) ? e : [e], t);
		}
	}
	let os = new Map();
	class as {
		constructor(t, e) {
			let i = t.ownerDocument || t,
				n = i.defaultView;
			if (!t.head && t.adoptedStyleSheets && n.CSSStyleSheet) {
				let e = os.get(i);
				if (e) return (t[ns] = e);
				(this.sheet = new n.CSSStyleSheet()), os.set(i, this);
			} else
				(this.styleTag = i.createElement('style')),
					e && this.styleTag.setAttribute('nonce', e);
			(this.modules = []), (t[ns] = this);
		}
		mount(t, e) {
			let i = this.sheet,
				n = 0,
				r = 0;
			for (let e = 0; e < t.length; e++) {
				let s = t[e],
					o = this.modules.indexOf(s);
				if (
					(o < r &&
						o > -1 &&
						(this.modules.splice(o, 1), r--, (o = -1)),
					-1 == o)
				) {
					if ((this.modules.splice(r++, 0, s), i))
						for (let t = 0; t < s.rules.length; t++)
							i.insertRule(s.rules[t], n++);
				} else {
					for (; r < o; ) n += this.modules[r++].rules.length;
					(n += s.rules.length), r++;
				}
			}
			if (i)
				e.adoptedStyleSheets.indexOf(this.sheet) < 0 &&
					(e.adoptedStyleSheets = [
						this.sheet,
						...e.adoptedStyleSheets,
					]);
			else {
				let t = '';
				for (let e = 0; e < this.modules.length; e++)
					t += this.modules[e].getRules() + '\n';
				this.styleTag.textContent = t;
				let i = e.head || e;
				this.styleTag.parentNode != i &&
					i.insertBefore(this.styleTag, i.firstChild);
			}
		}
		setNonce(t) {
			this.styleTag &&
				this.styleTag.getAttribute('nonce') != t &&
				this.styleTag.setAttribute('nonce', t);
		}
	}
	for (
		var ls = {
				8: 'Backspace',
				9: 'Tab',
				10: 'Enter',
				12: 'NumLock',
				13: 'Enter',
				16: 'Shift',
				17: 'Control',
				18: 'Alt',
				20: 'CapsLock',
				27: 'Escape',
				32: ' ',
				33: 'PageUp',
				34: 'PageDown',
				35: 'End',
				36: 'Home',
				37: 'ArrowLeft',
				38: 'ArrowUp',
				39: 'ArrowRight',
				40: 'ArrowDown',
				44: 'PrintScreen',
				45: 'Insert',
				46: 'Delete',
				59: ';',
				61: '=',
				91: 'Meta',
				92: 'Meta',
				106: '*',
				107: '+',
				108: ',',
				109: '-',
				110: '.',
				111: '/',
				144: 'NumLock',
				145: 'ScrollLock',
				160: 'Shift',
				161: 'Shift',
				162: 'Control',
				163: 'Control',
				164: 'Alt',
				165: 'Alt',
				173: '-',
				186: ';',
				187: '=',
				188: ',',
				189: '-',
				190: '.',
				191: '/',
				192: '`',
				219: '[',
				220: '\\',
				221: ']',
				222: "'",
			},
			hs = {
				48: ')',
				49: '!',
				50: '@',
				51: '#',
				52: '$',
				53: '%',
				54: '^',
				55: '&',
				56: '*',
				57: '(',
				59: ':',
				61: '+',
				173: '_',
				186: ':',
				187: '+',
				188: '<',
				189: '_',
				190: '>',
				191: '?',
				192: '~',
				219: '{',
				220: '|',
				221: '}',
				222: '"',
			},
			cs =
				'undefined' != typeof navigator &&
				/Mac/.test(navigator.platform),
			us =
				'undefined' != typeof navigator &&
				/MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(
					navigator.userAgent
				),
			ds = 0;
		ds < 10;
		ds++
	)
		ls[48 + ds] = ls[96 + ds] = String(ds);
	for (ds = 1; ds <= 24; ds++) ls[ds + 111] = 'F' + ds;
	for (ds = 65; ds <= 90; ds++)
		(ls[ds] = String.fromCharCode(ds + 32)),
			(hs[ds] = String.fromCharCode(ds));
	for (var fs in ls) hs.hasOwnProperty(fs) || (hs[fs] = ls[fs]);
	function Os(t) {
		let e;
		return (
			(e = 11 == t.nodeType ? (t.getSelection ? t : t.ownerDocument) : t),
			e.getSelection()
		);
	}
	function ps(t, e) {
		return (
			!!e && (t == e || t.contains(1 != e.nodeType ? e.parentNode : e))
		);
	}
	function ms(t, e) {
		if (!e.anchorNode) return !1;
		try {
			return ps(t, e.anchorNode);
		} catch (t) {
			return !1;
		}
	}
	function gs(t) {
		return 3 == t.nodeType
			? Cs(t, 0, t.nodeValue.length).getClientRects()
			: 1 == t.nodeType
				? t.getClientRects()
				: [];
	}
	function bs(t, e, i, n) {
		return !!i && (ws(t, e, i, n, -1) || ws(t, e, i, n, 1));
	}
	function ys(t) {
		for (var e = 0; ; e++) if (!(t = t.previousSibling)) return e;
	}
	function vs(t) {
		return (
			1 == t.nodeType &&
			/^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(
				t.nodeName
			)
		);
	}
	function ws(t, e, i, n, r) {
		for (;;) {
			if (t == i && e == n) return !0;
			if (e == (r < 0 ? 0 : Ss(t))) {
				if ('DIV' == t.nodeName) return !1;
				let i = t.parentNode;
				if (!i || 1 != i.nodeType) return !1;
				(e = ys(t) + (r < 0 ? 0 : 1)), (t = i);
			} else {
				if (1 != t.nodeType) return !1;
				if (
					1 == (t = t.childNodes[e + (r < 0 ? -1 : 0)]).nodeType &&
					'false' == t.contentEditable
				)
					return !1;
				e = r < 0 ? Ss(t) : 0;
			}
		}
	}
	function Ss(t) {
		return 3 == t.nodeType ? t.nodeValue.length : t.childNodes.length;
	}
	function xs(t, e) {
		let i = e ? t.left : t.right;
		return { left: i, right: i, top: t.top, bottom: t.bottom };
	}
	function Qs(t) {
		let e = t.visualViewport;
		return e
			? { left: 0, right: e.width, top: 0, bottom: e.height }
			: { left: 0, right: t.innerWidth, top: 0, bottom: t.innerHeight };
	}
	function ks(t, e) {
		let i = e.width / t.offsetWidth,
			n = e.height / t.offsetHeight;
		return (
			((i > 0.995 && i < 1.005) ||
				!isFinite(i) ||
				Math.abs(e.width - t.offsetWidth) < 1) &&
				(i = 1),
			((n > 0.995 && n < 1.005) ||
				!isFinite(n) ||
				Math.abs(e.height - t.offsetHeight) < 1) &&
				(n = 1),
			{ scaleX: i, scaleY: n }
		);
	}
	class $s {
		constructor() {
			(this.anchorNode = null),
				(this.anchorOffset = 0),
				(this.focusNode = null),
				(this.focusOffset = 0);
		}
		eq(t) {
			return (
				this.anchorNode == t.anchorNode &&
				this.anchorOffset == t.anchorOffset &&
				this.focusNode == t.focusNode &&
				this.focusOffset == t.focusOffset
			);
		}
		setRange(t) {
			let { anchorNode: e, focusNode: i } = t;
			this.set(
				e,
				Math.min(t.anchorOffset, e ? Ss(e) : 0),
				i,
				Math.min(t.focusOffset, i ? Ss(i) : 0)
			);
		}
		set(t, e, i, n) {
			(this.anchorNode = t),
				(this.anchorOffset = e),
				(this.focusNode = i),
				(this.focusOffset = n);
		}
	}
	let Ps,
		Zs = null;
	function Ts(t) {
		if (t.setActive) return t.setActive();
		if (Zs) return t.focus(Zs);
		let e = [];
		for (
			let i = t;
			i && (e.push(i, i.scrollTop, i.scrollLeft), i != i.ownerDocument);
			i = i.parentNode
		);
		if (
			(t.focus(
				null == Zs
					? {
							get preventScroll() {
								return (Zs = { preventScroll: !0 }), !0;
							},
						}
					: void 0
			),
			!Zs)
		) {
			Zs = !1;
			for (let t = 0; t < e.length; ) {
				let i = e[t++],
					n = e[t++],
					r = e[t++];
				i.scrollTop != n && (i.scrollTop = n),
					i.scrollLeft != r && (i.scrollLeft = r);
			}
		}
	}
	function Cs(t, e, i = e) {
		let n = Ps || (Ps = document.createRange());
		return n.setEnd(t, i), n.setStart(t, e), n;
	}
	function As(t, e, i, n) {
		let r = { key: e, code: e, keyCode: i, which: i, cancelable: !0 };
		n &&
			({
				altKey: r.altKey,
				ctrlKey: r.ctrlKey,
				shiftKey: r.shiftKey,
				metaKey: r.metaKey,
			} = n);
		let s = new KeyboardEvent('keydown', r);
		(s.synthetic = !0), t.dispatchEvent(s);
		let o = new KeyboardEvent('keyup', r);
		return (
			(o.synthetic = !0),
			t.dispatchEvent(o),
			s.defaultPrevented || o.defaultPrevented
		);
	}
	function Xs(t) {
		for (; t.attributes.length; ) t.removeAttributeNode(t.attributes[0]);
	}
	function Ms(t) {
		return t.scrollTop > Math.max(1, t.scrollHeight - t.clientHeight - 4);
	}
	function Rs(t, e) {
		for (let i = t, n = e; ; ) {
			if (3 == i.nodeType && n > 0) return { node: i, offset: n };
			if (1 == i.nodeType && n > 0) {
				if ('false' == i.contentEditable) return null;
				(i = i.childNodes[n - 1]), (n = Ss(i));
			} else {
				if (!i.parentNode || vs(i)) return null;
				(n = ys(i)), (i = i.parentNode);
			}
		}
	}
	function _s(t, e) {
		for (let i = t, n = e; ; ) {
			if (3 == i.nodeType && n < i.nodeValue.length)
				return { node: i, offset: n };
			if (1 == i.nodeType && n < i.childNodes.length) {
				if ('false' == i.contentEditable) return null;
				(i = i.childNodes[n]), (n = 0);
			} else {
				if (!i.parentNode || vs(i)) return null;
				(n = ys(i) + 1), (i = i.parentNode);
			}
		}
	}
	class Vs {
		constructor(t, e, i = !0) {
			(this.node = t), (this.offset = e), (this.precise = i);
		}
		static before(t, e) {
			return new Vs(t.parentNode, ys(t), e);
		}
		static after(t, e) {
			return new Vs(t.parentNode, ys(t) + 1, e);
		}
	}
	const qs = [];
	class js {
		constructor() {
			(this.parent = null), (this.dom = null), (this.flags = 2);
		}
		get overrideDOMText() {
			return null;
		}
		get posAtStart() {
			return this.parent ? this.parent.posBefore(this) : 0;
		}
		get posAtEnd() {
			return this.posAtStart + this.length;
		}
		posBefore(t) {
			let e = this.posAtStart;
			for (let i of this.children) {
				if (i == t) return e;
				e += i.length + i.breakAfter;
			}
			throw new RangeError('Invalid child in posBefore');
		}
		posAfter(t) {
			return this.posBefore(t) + t.length;
		}
		sync(t, e) {
			if (2 & this.flags) {
				let i,
					n = this.dom,
					r = null;
				for (let s of this.children) {
					if (7 & s.flags) {
						if (!s.dom && (i = r ? r.nextSibling : n.firstChild)) {
							let t = js.get(i);
							(!t || (!t.parent && t.canReuseDOM(s))) &&
								s.reuseDOM(i);
						}
						s.sync(t, e), (s.flags &= -8);
					}
					if (
						((i = r ? r.nextSibling : n.firstChild),
						e &&
							!e.written &&
							e.node == n &&
							i != s.dom &&
							(e.written = !0),
						s.dom.parentNode == n)
					)
						for (; i && i != s.dom; ) i = Ds(i);
					else n.insertBefore(s.dom, i);
					r = s.dom;
				}
				for (
					i = r ? r.nextSibling : n.firstChild,
						i && e && e.node == n && (e.written = !0);
					i;

				)
					i = Ds(i);
			} else if (1 & this.flags)
				for (let i of this.children)
					7 & i.flags && (i.sync(t, e), (i.flags &= -8));
		}
		reuseDOM(t) {}
		localPosFromDOM(t, e) {
			let i;
			if (t == this.dom) i = this.dom.childNodes[e];
			else {
				let n = 0 == Ss(t) ? 0 : 0 == e ? -1 : 1;
				for (;;) {
					let e = t.parentNode;
					if (e == this.dom) break;
					0 == n &&
						e.firstChild != e.lastChild &&
						(n = t == e.firstChild ? -1 : 1),
						(t = e);
				}
				i = n < 0 ? t : t.nextSibling;
			}
			if (i == this.dom.firstChild) return 0;
			for (; i && !js.get(i); ) i = i.nextSibling;
			if (!i) return this.length;
			for (let t = 0, e = 0; ; t++) {
				let n = this.children[t];
				if (n.dom == i) return e;
				e += n.length + n.breakAfter;
			}
		}
		domBoundsAround(t, e, i = 0) {
			let n = -1,
				r = -1,
				s = -1,
				o = -1;
			for (let a = 0, l = i, h = i; a < this.children.length; a++) {
				let i = this.children[a],
					c = l + i.length;
				if (l < t && c > e) return i.domBoundsAround(t, e, l);
				if (
					(c >= t && -1 == n && ((n = a), (r = l)),
					l > e && i.dom.parentNode == this.dom)
				) {
					(s = a), (o = h);
					break;
				}
				(h = c), (l = c + i.breakAfter);
			}
			return {
				from: r,
				to: o < 0 ? i + this.length : o,
				startDOM:
					(n ? this.children[n - 1].dom.nextSibling : null) ||
					this.dom.firstChild,
				endDOM:
					s < this.children.length && s >= 0
						? this.children[s].dom
						: null,
			};
		}
		markDirty(t = !1) {
			(this.flags |= 2), this.markParentsDirty(t);
		}
		markParentsDirty(t) {
			for (let e = this.parent; e; e = e.parent) {
				if ((t && (e.flags |= 2), 1 & e.flags)) return;
				(e.flags |= 1), (t = !1);
			}
		}
		setParent(t) {
			this.parent != t &&
				((this.parent = t),
				7 & this.flags && this.markParentsDirty(!0));
		}
		setDOM(t) {
			this.dom != t &&
				(this.dom && (this.dom.cmView = null),
				(this.dom = t),
				(t.cmView = this));
		}
		get rootView() {
			for (let t = this; ; ) {
				let e = t.parent;
				if (!e) return t;
				t = e;
			}
		}
		replaceChildren(t, e, i = qs) {
			this.markDirty();
			for (let n = t; n < e; n++) {
				let t = this.children[n];
				t.parent == this && i.indexOf(t) < 0 && t.destroy();
			}
			i.length < 250
				? this.children.splice(t, e - t, ...i)
				: (this.children = [].concat(
						this.children.slice(0, t),
						i,
						this.children.slice(e)
					));
			for (let t = 0; t < i.length; t++) i[t].setParent(this);
		}
		ignoreMutation(t) {
			return !1;
		}
		ignoreEvent(t) {
			return !1;
		}
		childCursor(t = this.length) {
			return new Es(this.children, t, this.children.length);
		}
		childPos(t, e = 1) {
			return this.childCursor().findPos(t, e);
		}
		toString() {
			let t = this.constructor.name.replace('View', '');
			return (
				t +
				(this.children.length
					? '(' + this.children.join() + ')'
					: this.length
						? '[' + ('Text' == t ? this.text : this.length) + ']'
						: '') +
				(this.breakAfter ? '#' : '')
			);
		}
		static get(t) {
			return t.cmView;
		}
		get isEditable() {
			return !0;
		}
		get isWidget() {
			return !1;
		}
		get isHidden() {
			return !1;
		}
		merge(t, e, i, n, r, s) {
			return !1;
		}
		become(t) {
			return !1;
		}
		canReuseDOM(t) {
			return (
				t.constructor == this.constructor &&
				!(8 & (this.flags | t.flags))
			);
		}
		getSide() {
			return 0;
		}
		destroy() {
			for (let t of this.children) t.parent == this && t.destroy();
			this.parent = null;
		}
	}
	function Ds(t) {
		let e = t.nextSibling;
		return t.parentNode.removeChild(t), e;
	}
	js.prototype.breakAfter = 0;
	class Es {
		constructor(t, e, i) {
			(this.children = t), (this.pos = e), (this.i = i), (this.off = 0);
		}
		findPos(t, e = 1) {
			for (;;) {
				if (
					t > this.pos ||
					(t == this.pos &&
						(e > 0 ||
							0 == this.i ||
							this.children[this.i - 1].breakAfter))
				)
					return (this.off = t - this.pos), this;
				let i = this.children[--this.i];
				this.pos -= i.length + i.breakAfter;
			}
		}
	}
	function Ws(t, e, i, n, r, s, o, a, l) {
		let { children: h } = t,
			c = h.length ? h[e] : null,
			u = s.length ? s[s.length - 1] : null,
			d = u ? u.breakAfter : o;
		if (
			!(
				e == n &&
				c &&
				!o &&
				!d &&
				s.length < 2 &&
				c.merge(i, r, s.length ? u : null, 0 == i, a, l)
			)
		) {
			if (n < h.length) {
				let t = h[n];
				t &&
				(r < t.length ||
					(t.breakAfter && (null == u ? void 0 : u.breakAfter)))
					? (e == n && ((t = t.split(r)), (r = 0)),
						!d && u && t.merge(0, r, u, !0, 0, l)
							? (s[s.length - 1] = t)
							: ((r ||
									(t.children.length &&
										!t.children[0].length)) &&
									t.merge(0, r, null, !1, 0, l),
								s.push(t)))
					: (null == t ? void 0 : t.breakAfter) &&
						(u ? (u.breakAfter = 1) : (o = 1)),
					n++;
			}
			for (
				c &&
				((c.breakAfter = o),
				i > 0 &&
					(!o && s.length && c.merge(i, c.length, s[0], !1, a, 0)
						? (c.breakAfter = s.shift().breakAfter)
						: (i < c.length ||
								(c.children.length &&
									0 ==
										c.children[c.children.length - 1]
											.length)) &&
							c.merge(i, c.length, null, !1, a, 0),
					e++));
				e < n && s.length;

			)
				if (h[n - 1].become(s[s.length - 1]))
					n--, s.pop(), (l = s.length ? 0 : a);
				else {
					if (!h[e].become(s[0])) break;
					e++, s.shift(), (a = s.length ? 0 : l);
				}
			!s.length &&
				e &&
				n < h.length &&
				!h[e - 1].breakAfter &&
				h[n].merge(0, 0, h[e - 1], !1, a, l) &&
				e--,
				(e < n || s.length) && t.replaceChildren(e, n, s);
		}
	}
	function Ys(t, e, i, n, r, s) {
		let o = t.childCursor(),
			{ i: a, off: l } = o.findPos(i, 1),
			{ i: h, off: c } = o.findPos(e, -1),
			u = e - i;
		for (let t of n) u += t.length;
		(t.length += u), Ws(t, h, c, a, l, n, 0, r, s);
	}
	let zs =
			'undefined' != typeof navigator
				? navigator
				: { userAgent: '', vendor: '', platform: '' },
		Ls =
			'undefined' != typeof document
				? document
				: { documentElement: { style: {} } };
	const Bs = /Edge\/(\d+)/.exec(zs.userAgent),
		Us = /MSIE \d/.test(zs.userAgent),
		Ns = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(zs.userAgent),
		Gs = !!(Us || Ns || Bs),
		Is = !Gs && /gecko\/(\d+)/i.test(zs.userAgent),
		Fs = !Gs && /Chrome\/(\d+)/.exec(zs.userAgent),
		Hs = 'webkitFontSmoothing' in Ls.documentElement.style,
		Ks = !Gs && /Apple Computer/.test(zs.vendor),
		Js = Ks && (/Mobile\/\w+/.test(zs.userAgent) || zs.maxTouchPoints > 2);
	var to = {
		mac: Js || /Mac/.test(zs.platform),
		windows: /Win/.test(zs.platform),
		linux: /Linux|X11/.test(zs.platform),
		ie: Gs,
		ie_version: Us ? Ls.documentMode || 6 : Ns ? +Ns[1] : Bs ? +Bs[1] : 0,
		gecko: Is,
		gecko_version: Is
			? +(/Firefox\/(\d+)/.exec(zs.userAgent) || [0, 0])[1]
			: 0,
		chrome: !!Fs,
		chrome_version: Fs ? +Fs[1] : 0,
		ios: Js,
		android: /Android\b/.test(zs.userAgent),
		webkit: Hs,
		safari: Ks,
		webkit_version: Hs
			? +(/\bAppleWebKit\/(\d+)/.exec(zs.userAgent) || [0, 0])[1]
			: 0,
		tabSize:
			null != Ls.documentElement.style.tabSize
				? 'tab-size'
				: '-moz-tab-size',
	};
	class eo extends js {
		constructor(t) {
			super(), (this.text = t);
		}
		get length() {
			return this.text.length;
		}
		createDOM(t) {
			this.setDOM(t || document.createTextNode(this.text));
		}
		sync(t, e) {
			this.dom || this.createDOM(),
				this.dom.nodeValue != this.text &&
					(e && e.node == this.dom && (e.written = !0),
					(this.dom.nodeValue = this.text));
		}
		reuseDOM(t) {
			3 == t.nodeType && this.createDOM(t);
		}
		merge(t, e, i) {
			return !(
				8 & this.flags ||
				(i &&
					(!(i instanceof eo) ||
						this.length - (e - t) + i.length > 256 ||
						8 & i.flags)) ||
				((this.text =
					this.text.slice(0, t) +
					(i ? i.text : '') +
					this.text.slice(e)),
				this.markDirty(),
				0)
			);
		}
		split(t) {
			let e = new eo(this.text.slice(t));
			return (
				(this.text = this.text.slice(0, t)),
				this.markDirty(),
				(e.flags |= 8 & this.flags),
				e
			);
		}
		localPosFromDOM(t, e) {
			return t == this.dom ? e : e ? this.text.length : 0;
		}
		domAtPos(t) {
			return new Vs(this.dom, t);
		}
		domBoundsAround(t, e, i) {
			return {
				from: i,
				to: i + this.length,
				startDOM: this.dom,
				endDOM: this.dom.nextSibling,
			};
		}
		coordsAt(t, e) {
			return (function (t, e, i) {
				let n = t.nodeValue.length;
				e > n && (e = n);
				let r = e,
					s = e,
					o = 0;
				(0 == e && i < 0) || (e == n && i >= 0)
					? to.chrome ||
						to.gecko ||
						(e ? (r--, (o = 1)) : s < n && (s++, (o = -1)))
					: i < 0
						? r--
						: s < n && s++;
				let a = Cs(t, r, s).getClientRects();
				if (!a.length) return null;
				let l = a[(o ? o < 0 : i >= 0) ? 0 : a.length - 1];
				return (
					to.safari &&
						!o &&
						0 == l.width &&
						(l = Array.prototype.find.call(a, (t) => t.width) || l),
					o ? xs(l, o < 0) : l || null
				);
			})(this.dom, t, e);
		}
	}
	class io extends js {
		constructor(t, e = [], i = 0) {
			super(), (this.mark = t), (this.children = e), (this.length = i);
			for (let t of e) t.setParent(this);
		}
		setAttrs(t) {
			if (
				(Xs(t),
				this.mark.class && (t.className = this.mark.class),
				this.mark.attrs)
			)
				for (let e in this.mark.attrs)
					t.setAttribute(e, this.mark.attrs[e]);
			return t;
		}
		canReuseDOM(t) {
			return super.canReuseDOM(t) && !(8 & (this.flags | t.flags));
		}
		reuseDOM(t) {
			t.nodeName == this.mark.tagName.toUpperCase() &&
				(this.setDOM(t), (this.flags |= 6));
		}
		sync(t, e) {
			this.dom
				? 4 & this.flags && this.setAttrs(this.dom)
				: this.setDOM(
						this.setAttrs(document.createElement(this.mark.tagName))
					),
				super.sync(t, e);
		}
		merge(t, e, i, n, r, s) {
			return !(
				(i &&
					(!(i instanceof io && i.mark.eq(this.mark)) ||
						(t && r <= 0) ||
						(e < this.length && s <= 0))) ||
				(Ys(this, t, e, i ? i.children.slice() : [], r - 1, s - 1),
				this.markDirty(),
				0)
			);
		}
		split(t) {
			let e = [],
				i = 0,
				n = -1,
				r = 0;
			for (let s of this.children) {
				let o = i + s.length;
				o > t && e.push(i < t ? s.split(t - i) : s),
					n < 0 && i >= t && (n = r),
					(i = o),
					r++;
			}
			let s = this.length - t;
			return (
				(this.length = t),
				n > -1 && ((this.children.length = n), this.markDirty()),
				new io(this.mark, e, s)
			);
		}
		domAtPos(t) {
			return so(this, t);
		}
		coordsAt(t, e) {
			return ao(this, t, e);
		}
	}
	class no extends js {
		static create(t, e, i) {
			return new no(t, e, i);
		}
		constructor(t, e, i) {
			super(),
				(this.widget = t),
				(this.length = e),
				(this.side = i),
				(this.prevWidget = null);
		}
		split(t) {
			let e = no.create(this.widget, this.length - t, this.side);
			return (this.length -= t), e;
		}
		sync(t) {
			(this.dom && this.widget.updateDOM(this.dom, t)) ||
				(this.dom &&
					this.prevWidget &&
					this.prevWidget.destroy(this.dom),
				(this.prevWidget = null),
				this.setDOM(this.widget.toDOM(t)),
				this.widget.editable || (this.dom.contentEditable = 'false'));
		}
		getSide() {
			return this.side;
		}
		merge(t, e, i, n, r, s) {
			return !(
				(i &&
					(!(i instanceof no && this.widget.compare(i.widget)) ||
						(t > 0 && r <= 0) ||
						(e < this.length && s <= 0))) ||
				((this.length = t + (i ? i.length : 0) + (this.length - e)), 0)
			);
		}
		become(t) {
			return (
				t instanceof no &&
				t.side == this.side &&
				this.widget.constructor == t.widget.constructor &&
				(this.widget.compare(t.widget) || this.markDirty(!0),
				this.dom && !this.prevWidget && (this.prevWidget = this.widget),
				(this.widget = t.widget),
				(this.length = t.length),
				!0)
			);
		}
		ignoreMutation() {
			return !0;
		}
		ignoreEvent(t) {
			return this.widget.ignoreEvent(t);
		}
		get overrideDOMText() {
			if (0 == this.length) return Qn.empty;
			let t = this;
			for (; t.parent; ) t = t.parent;
			let { view: e } = t,
				i = e && e.state.doc,
				n = this.posAtStart;
			return i ? i.slice(n, n + this.length) : Qn.empty;
		}
		domAtPos(t) {
			return (this.length ? 0 == t : this.side > 0)
				? Vs.before(this.dom)
				: Vs.after(this.dom, t == this.length);
		}
		domBoundsAround() {
			return null;
		}
		coordsAt(t, e) {
			let i = this.widget.coordsAt(this.dom, t, e);
			if (i) return i;
			let n = this.dom.getClientRects(),
				r = null;
			if (!n.length) return null;
			let s = this.side ? this.side < 0 : t > 0;
			for (
				let e = s ? n.length - 1 : 0;
				(r = n[e]),
					!(t > 0 ? 0 == e : e == n.length - 1 || r.top < r.bottom);
				e += s ? -1 : 1
			);
			return xs(r, !s);
		}
		get isEditable() {
			return !1;
		}
		get isWidget() {
			return !0;
		}
		get isHidden() {
			return this.widget.isHidden;
		}
		destroy() {
			super.destroy(), this.dom && this.widget.destroy(this.dom);
		}
	}
	class ro extends js {
		constructor(t) {
			super(), (this.side = t);
		}
		get length() {
			return 0;
		}
		merge() {
			return !1;
		}
		become(t) {
			return t instanceof ro && t.side == this.side;
		}
		split() {
			return new ro(this.side);
		}
		sync() {
			if (!this.dom) {
				let t = document.createElement('img');
				(t.className = 'cm-widgetBuffer'),
					t.setAttribute('aria-hidden', 'true'),
					this.setDOM(t);
			}
		}
		getSide() {
			return this.side;
		}
		domAtPos(t) {
			return this.side > 0 ? Vs.before(this.dom) : Vs.after(this.dom);
		}
		localPosFromDOM() {
			return 0;
		}
		domBoundsAround() {
			return null;
		}
		coordsAt(t) {
			return this.dom.getBoundingClientRect();
		}
		get overrideDOMText() {
			return Qn.empty;
		}
		get isHidden() {
			return !0;
		}
	}
	function so(t, e) {
		let i = t.dom,
			{ children: n } = t,
			r = 0;
		for (let t = 0; r < n.length; r++) {
			let s = n[r],
				o = t + s.length;
			if (!(o == t && s.getSide() <= 0)) {
				if (e > t && e < o && s.dom.parentNode == i)
					return s.domAtPos(e - t);
				if (e <= t) break;
				t = o;
			}
		}
		for (let t = r; t > 0; t--) {
			let e = n[t - 1];
			if (e.dom.parentNode == i) return e.domAtPos(e.length);
		}
		for (let t = r; t < n.length; t++) {
			let e = n[t];
			if (e.dom.parentNode == i) return e.domAtPos(0);
		}
		return new Vs(i, 0);
	}
	function oo(t, e, i) {
		let n,
			{ children: r } = t;
		i > 0 &&
		e instanceof io &&
		r.length &&
		(n = r[r.length - 1]) instanceof io &&
		n.mark.eq(e.mark)
			? oo(n, e.children[0], i - 1)
			: (r.push(e), e.setParent(t)),
			(t.length += e.length);
	}
	function ao(t, e, i) {
		let n = null,
			r = -1,
			s = null,
			o = -1;
		!(function t(e, a) {
			for (let l = 0, h = 0; l < e.children.length && h <= a; l++) {
				let c = e.children[l],
					u = h + c.length;
				u >= a &&
					(c.children.length
						? t(c, a - h)
						: (!s || (s.isHidden && i > 0)) &&
							  (u > a || (h == u && c.getSide() > 0))
							? ((s = c), (o = a - h))
							: (h < a ||
									(h == u &&
										c.getSide() < 0 &&
										!c.isHidden)) &&
								((n = c), (r = a - h))),
					(h = u);
			}
		})(t, e);
		let a = (i < 0 ? n : s) || n || s;
		return a
			? a.coordsAt(Math.max(0, a == n ? r : o), i)
			: (function (t) {
					let e = t.dom.lastChild;
					if (!e) return t.dom.getBoundingClientRect();
					let i = gs(e);
					return i[i.length - 1] || null;
				})(t);
	}
	function lo(t, e) {
		for (let i in t)
			'class' == i && e.class
				? (e.class += ' ' + t.class)
				: 'style' == i && e.style
					? (e.style += ';' + t.style)
					: (e[i] = t[i]);
		return e;
	}
	eo.prototype.children = no.prototype.children = ro.prototype.children = qs;
	const ho = Object.create(null);
	function co(t, e, i) {
		if (t == e) return !0;
		t || (t = ho), e || (e = ho);
		let n = Object.keys(t),
			r = Object.keys(e);
		if (
			n.length - (i && n.indexOf(i) > -1 ? 1 : 0) !=
			r.length - (i && r.indexOf(i) > -1 ? 1 : 0)
		)
			return !1;
		for (let s of n)
			if (s != i && (-1 == r.indexOf(s) || t[s] !== e[s])) return !1;
		return !0;
	}
	function uo(t, e, i) {
		let n = !1;
		if (e)
			for (let r in e)
				(i && r in i) ||
					((n = !0),
					'style' == r
						? (t.style.cssText = '')
						: t.removeAttribute(r));
		if (i)
			for (let r in i)
				(e && e[r] == i[r]) ||
					((n = !0),
					'style' == r
						? (t.style.cssText = i[r])
						: t.setAttribute(r, i[r]));
		return n;
	}
	function fo(t) {
		let e = Object.create(null);
		for (let i = 0; i < t.attributes.length; i++) {
			let n = t.attributes[i];
			e[n.name] = n.value;
		}
		return e;
	}
	class Oo {
		eq(t) {
			return !1;
		}
		updateDOM(t, e) {
			return !1;
		}
		compare(t) {
			return (
				this == t || (this.constructor == t.constructor && this.eq(t))
			);
		}
		get estimatedHeight() {
			return -1;
		}
		get lineBreaks() {
			return 0;
		}
		ignoreEvent(t) {
			return !0;
		}
		coordsAt(t, e, i) {
			return null;
		}
		get isHidden() {
			return !1;
		}
		get editable() {
			return !1;
		}
		destroy(t) {}
	}
	var po = (function (t) {
		return (
			(t[(t.Text = 0)] = 'Text'),
			(t[(t.WidgetBefore = 1)] = 'WidgetBefore'),
			(t[(t.WidgetAfter = 2)] = 'WidgetAfter'),
			(t[(t.WidgetRange = 3)] = 'WidgetRange'),
			t
		);
	})(po || (po = {}));
	class mo extends jr {
		constructor(t, e, i, n) {
			super(),
				(this.startSide = t),
				(this.endSide = e),
				(this.widget = i),
				(this.spec = n);
		}
		get heightRelevant() {
			return !1;
		}
		static mark(t) {
			return new go(t);
		}
		static widget(t) {
			let e = Math.max(-1e4, Math.min(1e4, t.side || 0)),
				i = !!t.block;
			return (
				(e +=
					i && !t.inlineOrder
						? e > 0
							? 3e8
							: -4e8
						: e > 0
							? 1e8
							: -1e8),
				new yo(t, e, e, i, t.widget || null, !1)
			);
		}
		static replace(t) {
			let e,
				i,
				n = !!t.block;
			if (t.isBlockGap) (e = -5e8), (i = 4e8);
			else {
				let { start: r, end: s } = vo(t, n);
				(e = (r ? (n ? -3e8 : -1) : 5e8) - 1),
					(i = 1 + (s ? (n ? 2e8 : 1) : -6e8));
			}
			return new yo(t, e, i, n, t.widget || null, !0);
		}
		static line(t) {
			return new bo(t);
		}
		static set(t, e = !1) {
			return Yr.of(t, e);
		}
		hasHeight() {
			return !!this.widget && this.widget.estimatedHeight > -1;
		}
	}
	mo.none = Yr.empty;
	class go extends mo {
		constructor(t) {
			let { start: e, end: i } = vo(t);
			super(e ? -1 : 5e8, i ? 1 : -6e8, null, t),
				(this.tagName = t.tagName || 'span'),
				(this.class = t.class || ''),
				(this.attrs = t.attributes || null);
		}
		eq(t) {
			var e, i;
			return (
				this == t ||
				(t instanceof go &&
					this.tagName == t.tagName &&
					(this.class ||
						(null === (e = this.attrs) || void 0 === e
							? void 0
							: e.class)) ==
						(t.class ||
							(null === (i = t.attrs) || void 0 === i
								? void 0
								: i.class)) &&
					co(this.attrs, t.attrs, 'class'))
			);
		}
		range(t, e = t) {
			if (t >= e)
				throw new RangeError('Mark decorations may not be empty');
			return super.range(t, e);
		}
	}
	go.prototype.point = !1;
	class bo extends mo {
		constructor(t) {
			super(-2e8, -2e8, null, t);
		}
		eq(t) {
			return (
				t instanceof bo &&
				this.spec.class == t.spec.class &&
				co(this.spec.attributes, t.spec.attributes)
			);
		}
		range(t, e = t) {
			if (e != t)
				throw new RangeError(
					'Line decoration ranges must be zero-length'
				);
			return super.range(t, e);
		}
	}
	(bo.prototype.mapMode = En.TrackBefore), (bo.prototype.point = !0);
	class yo extends mo {
		constructor(t, e, i, n, r, s) {
			super(e, i, r, t),
				(this.block = n),
				(this.isReplace = s),
				(this.mapMode = n
					? e <= 0
						? En.TrackBefore
						: En.TrackAfter
					: En.TrackDel);
		}
		get type() {
			return this.startSide != this.endSide
				? po.WidgetRange
				: this.startSide <= 0
					? po.WidgetBefore
					: po.WidgetAfter;
		}
		get heightRelevant() {
			return (
				this.block ||
				(!!this.widget &&
					(this.widget.estimatedHeight >= 5 ||
						this.widget.lineBreaks > 0))
			);
		}
		eq(t) {
			return (
				t instanceof yo &&
				((e = this.widget) == (i = t.widget) ||
					!!(e && i && e.compare(i))) &&
				this.block == t.block &&
				this.startSide == t.startSide &&
				this.endSide == t.endSide
			);
			var e, i;
		}
		range(t, e = t) {
			if (
				this.isReplace &&
				(t > e || (t == e && this.startSide > 0 && this.endSide <= 0))
			)
				throw new RangeError(
					'Invalid range for replacement decoration'
				);
			if (!this.isReplace && e != t)
				throw new RangeError(
					'Widget decorations can only have zero-length ranges'
				);
			return super.range(t, e);
		}
	}
	function vo(t, e = !1) {
		let { inclusiveStart: i, inclusiveEnd: n } = t;
		return (
			null == i && (i = t.inclusive),
			null == n && (n = t.inclusive),
			{ start: null != i ? i : e, end: null != n ? n : e }
		);
	}
	function wo(t, e, i, n = 0) {
		let r = i.length - 1;
		r >= 0 && i[r] + n >= t ? (i[r] = Math.max(i[r], e)) : i.push(t, e);
	}
	yo.prototype.point = !0;
	class So extends js {
		constructor() {
			super(...arguments),
				(this.children = []),
				(this.length = 0),
				(this.prevAttrs = void 0),
				(this.attrs = null),
				(this.breakAfter = 0);
		}
		merge(t, e, i, n, r, s) {
			if (i) {
				if (!(i instanceof So)) return !1;
				this.dom || i.transferDOM(this);
			}
			return (
				n && this.setDeco(i ? i.attrs : null),
				Ys(this, t, e, i ? i.children.slice() : [], r, s),
				!0
			);
		}
		split(t) {
			let e = new So();
			if (((e.breakAfter = this.breakAfter), 0 == this.length)) return e;
			let { i, off: n } = this.childPos(t);
			n &&
				(e.append(this.children[i].split(n), 0),
				this.children[i].merge(
					n,
					this.children[i].length,
					null,
					!1,
					0,
					0
				),
				i++);
			for (let t = i; t < this.children.length; t++)
				e.append(this.children[t], 0);
			for (; i > 0 && 0 == this.children[i - 1].length; )
				this.children[--i].destroy();
			return (
				(this.children.length = i),
				this.markDirty(),
				(this.length = t),
				e
			);
		}
		transferDOM(t) {
			this.dom &&
				(this.markDirty(),
				t.setDOM(this.dom),
				(t.prevAttrs =
					void 0 === this.prevAttrs ? this.attrs : this.prevAttrs),
				(this.prevAttrs = void 0),
				(this.dom = null));
		}
		setDeco(t) {
			co(this.attrs, t) ||
				(this.dom && ((this.prevAttrs = this.attrs), this.markDirty()),
				(this.attrs = t));
		}
		append(t, e) {
			oo(this, t, e);
		}
		addLineDeco(t) {
			let e = t.spec.attributes,
				i = t.spec.class;
			e && (this.attrs = lo(e, this.attrs || {})),
				i && (this.attrs = lo({ class: i }, this.attrs || {}));
		}
		domAtPos(t) {
			return so(this, t);
		}
		reuseDOM(t) {
			'DIV' == t.nodeName && (this.setDOM(t), (this.flags |= 6));
		}
		sync(t, e) {
			var i;
			this.dom
				? 4 & this.flags &&
					(Xs(this.dom),
					(this.dom.className = 'cm-line'),
					(this.prevAttrs = this.attrs ? null : void 0))
				: (this.setDOM(document.createElement('div')),
					(this.dom.className = 'cm-line'),
					(this.prevAttrs = this.attrs ? null : void 0)),
				void 0 !== this.prevAttrs &&
					(uo(this.dom, this.prevAttrs, this.attrs),
					this.dom.classList.add('cm-line'),
					(this.prevAttrs = void 0)),
				super.sync(t, e);
			let n = this.dom.lastChild;
			for (; n && js.get(n) instanceof io; ) n = n.lastChild;
			if (
				!(
					n &&
					this.length &&
					('BR' == n.nodeName ||
						0 !=
							(null === (i = js.get(n)) || void 0 === i
								? void 0
								: i.isEditable) ||
						(to.ios && this.children.some((t) => t instanceof eo)))
				)
			) {
				let t = document.createElement('BR');
				(t.cmIgnore = !0), this.dom.appendChild(t);
			}
		}
		measureTextSize() {
			if (0 == this.children.length || this.length > 20) return null;
			let t,
				e = 0;
			for (let i of this.children) {
				if (!(i instanceof eo) || /[^ -~]/.test(i.text)) return null;
				let n = gs(i.dom);
				if (1 != n.length) return null;
				(e += n[0].width), (t = n[0].height);
			}
			return e
				? {
						lineHeight: this.dom.getBoundingClientRect().height,
						charWidth: e / this.length,
						textHeight: t,
					}
				: null;
		}
		coordsAt(t, e) {
			let i = ao(this, t, e);
			if (!this.children.length && i && this.parent) {
				let { heightOracle: t } = this.parent.view.viewState,
					e = i.bottom - i.top;
				if (Math.abs(e - t.lineHeight) < 2 && t.textHeight < e) {
					let n = (e - t.textHeight) / 2;
					return {
						top: i.top + n,
						bottom: i.bottom - n,
						left: i.left,
						right: i.left,
					};
				}
			}
			return i;
		}
		become(t) {
			return (
				t instanceof So &&
				0 == this.children.length &&
				0 == t.children.length &&
				co(this.attrs, t.attrs) &&
				this.breakAfter == t.breakAfter
			);
		}
		covers() {
			return !0;
		}
		static find(t, e) {
			for (let i = 0, n = 0; i < t.children.length; i++) {
				let r = t.children[i],
					s = n + r.length;
				if (s >= e) {
					if (r instanceof So) return r;
					if (s > e) break;
				}
				n = s + r.breakAfter;
			}
			return null;
		}
	}
	class xo extends js {
		constructor(t, e, i) {
			super(),
				(this.widget = t),
				(this.length = e),
				(this.deco = i),
				(this.breakAfter = 0),
				(this.prevWidget = null);
		}
		merge(t, e, i, n, r, s) {
			return !(
				(i &&
					(!(i instanceof xo && this.widget.compare(i.widget)) ||
						(t > 0 && r <= 0) ||
						(e < this.length && s <= 0))) ||
				((this.length = t + (i ? i.length : 0) + (this.length - e)), 0)
			);
		}
		domAtPos(t) {
			return 0 == t
				? Vs.before(this.dom)
				: Vs.after(this.dom, t == this.length);
		}
		split(t) {
			let e = this.length - t;
			this.length = t;
			let i = new xo(this.widget, e, this.deco);
			return (i.breakAfter = this.breakAfter), i;
		}
		get children() {
			return qs;
		}
		sync(t) {
			(this.dom && this.widget.updateDOM(this.dom, t)) ||
				(this.dom &&
					this.prevWidget &&
					this.prevWidget.destroy(this.dom),
				(this.prevWidget = null),
				this.setDOM(this.widget.toDOM(t)),
				this.widget.editable || (this.dom.contentEditable = 'false'));
		}
		get overrideDOMText() {
			return this.parent
				? this.parent.view.state.doc.slice(
						this.posAtStart,
						this.posAtEnd
					)
				: Qn.empty;
		}
		domBoundsAround() {
			return null;
		}
		become(t) {
			return (
				t instanceof xo &&
				t.widget.constructor == this.widget.constructor &&
				(t.widget.compare(this.widget) || this.markDirty(!0),
				this.dom && !this.prevWidget && (this.prevWidget = this.widget),
				(this.widget = t.widget),
				(this.length = t.length),
				(this.deco = t.deco),
				(this.breakAfter = t.breakAfter),
				!0)
			);
		}
		ignoreMutation() {
			return !0;
		}
		ignoreEvent(t) {
			return this.widget.ignoreEvent(t);
		}
		get isEditable() {
			return !1;
		}
		get isWidget() {
			return !0;
		}
		coordsAt(t, e) {
			return (
				this.widget.coordsAt(this.dom, t, e) ||
				(this.widget instanceof Qo
					? null
					: xs(
							this.dom.getBoundingClientRect(),
							this.length ? 0 == t : e <= 0
						))
			);
		}
		destroy() {
			super.destroy(), this.dom && this.widget.destroy(this.dom);
		}
		covers(t) {
			let { startSide: e, endSide: i } = this.deco;
			return e != i && (t < 0 ? e < 0 : i > 0);
		}
	}
	class Qo extends Oo {
		constructor(t) {
			super(), (this.height = t);
		}
		toDOM() {
			let t = document.createElement('div');
			return (t.className = 'cm-gap'), this.updateDOM(t), t;
		}
		eq(t) {
			return t.height == this.height;
		}
		updateDOM(t) {
			return (t.style.height = this.height + 'px'), !0;
		}
		get editable() {
			return !0;
		}
		get estimatedHeight() {
			return this.height;
		}
		ignoreEvent() {
			return !1;
		}
	}
	class ko {
		constructor(t, e, i, n) {
			(this.doc = t),
				(this.pos = e),
				(this.end = i),
				(this.disallowBlockEffectsFor = n),
				(this.content = []),
				(this.curLine = null),
				(this.breakAtStart = 0),
				(this.pendingBuffer = 0),
				(this.bufferMarks = []),
				(this.atCursorPos = !0),
				(this.openStart = -1),
				(this.openEnd = -1),
				(this.text = ''),
				(this.textOff = 0),
				(this.cursor = t.iter()),
				(this.skip = e);
		}
		posCovered() {
			if (0 == this.content.length)
				return (
					!this.breakAtStart &&
					this.doc.lineAt(this.pos).from != this.pos
				);
			let t = this.content[this.content.length - 1];
			return !(t.breakAfter || (t instanceof xo && t.deco.endSide < 0));
		}
		getLine() {
			return (
				this.curLine ||
					(this.content.push((this.curLine = new So())),
					(this.atCursorPos = !0)),
				this.curLine
			);
		}
		flushBuffer(t = this.bufferMarks) {
			this.pendingBuffer &&
				(this.curLine.append($o(new ro(-1), t), t.length),
				(this.pendingBuffer = 0));
		}
		addBlockWidget(t) {
			this.flushBuffer(), (this.curLine = null), this.content.push(t);
		}
		finish(t) {
			this.pendingBuffer && t <= this.bufferMarks.length
				? this.flushBuffer()
				: (this.pendingBuffer = 0),
				this.posCovered() ||
					(t &&
						this.content.length &&
						this.content[this.content.length - 1] instanceof xo) ||
					this.getLine();
		}
		buildText(t, e, i) {
			for (; t > 0; ) {
				if (this.textOff == this.text.length) {
					let {
						value: e,
						lineBreak: i,
						done: n,
					} = this.cursor.next(this.skip);
					if (((this.skip = 0), n))
						throw new Error(
							'Ran out of text content when drawing inline views'
						);
					if (i) {
						this.posCovered() || this.getLine(),
							this.content.length
								? (this.content[
										this.content.length - 1
									].breakAfter = 1)
								: (this.breakAtStart = 1),
							this.flushBuffer(),
							(this.curLine = null),
							(this.atCursorPos = !0),
							t--;
						continue;
					}
					(this.text = e), (this.textOff = 0);
				}
				let n = Math.min(this.text.length - this.textOff, t, 512);
				this.flushBuffer(e.slice(e.length - i)),
					this.getLine().append(
						$o(
							new eo(
								this.text.slice(this.textOff, this.textOff + n)
							),
							e
						),
						i
					),
					(this.atCursorPos = !0),
					(this.textOff += n),
					(t -= n),
					(i = 0);
			}
		}
		span(t, e, i, n) {
			this.buildText(e - t, i, n),
				(this.pos = e),
				this.openStart < 0 && (this.openStart = n);
		}
		point(t, e, i, n, r, s) {
			if (this.disallowBlockEffectsFor[s] && i instanceof yo) {
				if (i.block)
					throw new RangeError(
						'Block decorations may not be specified via plugins'
					);
				if (e > this.doc.lineAt(this.pos).to)
					throw new RangeError(
						'Decorations that replace line breaks may not be specified via plugins'
					);
			}
			let o = e - t;
			if (i instanceof yo)
				if (i.block)
					i.startSide > 0 && !this.posCovered() && this.getLine(),
						this.addBlockWidget(new xo(i.widget || Po.block, o, i));
				else {
					let s = no.create(
							i.widget || Po.inline,
							o,
							o ? 0 : i.startSide
						),
						a =
							this.atCursorPos &&
							!s.isEditable &&
							r <= n.length &&
							(t < e || i.startSide > 0),
						l =
							!s.isEditable &&
							(t < e || r > n.length || i.startSide <= 0),
						h = this.getLine();
					2 != this.pendingBuffer ||
						a ||
						s.isEditable ||
						(this.pendingBuffer = 0),
						this.flushBuffer(n),
						a &&
							(h.append($o(new ro(1), n), r),
							(r = n.length + Math.max(0, r - n.length))),
						h.append($o(s, n), r),
						(this.atCursorPos = l),
						(this.pendingBuffer = l
							? t < e || r > n.length
								? 1
								: 2
							: 0),
						this.pendingBuffer && (this.bufferMarks = n.slice());
				}
			else
				this.doc.lineAt(this.pos).from == this.pos &&
					this.getLine().addLineDeco(i);
			o &&
				(this.textOff + o <= this.text.length
					? (this.textOff += o)
					: ((this.skip += o - (this.text.length - this.textOff)),
						(this.text = ''),
						(this.textOff = 0)),
				(this.pos = e)),
				this.openStart < 0 && (this.openStart = r);
		}
		static build(t, e, i, n, r) {
			let s = new ko(t, e, i, r);
			return (
				(s.openEnd = Yr.spans(n, e, i, s)),
				s.openStart < 0 && (s.openStart = s.openEnd),
				s.finish(s.openEnd),
				s
			);
		}
	}
	function $o(t, e) {
		for (let i of e) t = new io(i, [t], t.length);
		return t;
	}
	class Po extends Oo {
		constructor(t) {
			super(), (this.tag = t);
		}
		eq(t) {
			return t.tag == this.tag;
		}
		toDOM() {
			return document.createElement(this.tag);
		}
		updateDOM(t) {
			return t.nodeName.toLowerCase() == this.tag;
		}
		get isHidden() {
			return !0;
		}
	}
	(Po.inline = new Po('span')), (Po.block = new Po('div'));
	var Zo = (function (t) {
		return (t[(t.LTR = 0)] = 'LTR'), (t[(t.RTL = 1)] = 'RTL'), t;
	})(Zo || (Zo = {}));
	const To = Zo.LTR,
		Co = Zo.RTL;
	function Ao(t) {
		let e = [];
		for (let i = 0; i < t.length; i++) e.push(1 << +t[i]);
		return e;
	}
	const Xo = Ao(
			'88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008'
		),
		Mo = Ao(
			'4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333'
		),
		Ro = Object.create(null),
		_o = [];
	for (let t of ['()', '[]', '{}']) {
		let e = t.charCodeAt(0),
			i = t.charCodeAt(1);
		(Ro[e] = i), (Ro[i] = -e);
	}
	function Vo(t) {
		return t <= 247
			? Xo[t]
			: 1424 <= t && t <= 1524
				? 2
				: 1536 <= t && t <= 1785
					? Mo[t - 1536]
					: 1774 <= t && t <= 2220
						? 4
						: 8192 <= t && t <= 8204
							? 256
							: 64336 <= t && t <= 65023
								? 4
								: 1;
	}
	const qo = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/;
	class jo {
		get dir() {
			return this.level % 2 ? Co : To;
		}
		constructor(t, e, i) {
			(this.from = t), (this.to = e), (this.level = i);
		}
		side(t, e) {
			return (this.dir == e) == t ? this.to : this.from;
		}
		forward(t, e) {
			return t == (this.dir == e);
		}
		static find(t, e, i, n) {
			let r = -1;
			for (let s = 0; s < t.length; s++) {
				let o = t[s];
				if (o.from <= e && o.to >= e) {
					if (o.level == i) return s;
					(r < 0 ||
						(0 != n
							? n < 0
								? o.from < e
								: o.to > e
							: t[r].level > o.level)) &&
						(r = s);
				}
			}
			if (r < 0) throw new RangeError('Index out of range');
			return r;
		}
	}
	function Do(t, e) {
		if (t.length != e.length) return !1;
		for (let i = 0; i < t.length; i++) {
			let n = t[i],
				r = e[i];
			if (
				n.from != r.from ||
				n.to != r.to ||
				n.direction != r.direction ||
				!Do(n.inner, r.inner)
			)
				return !1;
		}
		return !0;
	}
	const Eo = [];
	function Wo(t, e, i, n, r, s, o) {
		let a = n % 2 ? 2 : 1;
		if (n % 2 == r % 2)
			for (let l = e, h = 0; l < i; ) {
				let e = !0,
					c = !1;
				if (h == s.length || l < s[h].from) {
					let t = Eo[l];
					t != a && ((e = !1), (c = 16 == t));
				}
				let u = e || 1 != a ? null : [],
					d = e ? n : n + 1,
					f = l;
				t: for (;;)
					if (h < s.length && f == s[h].from) {
						if (c) break t;
						let O = s[h];
						if (!e)
							for (let t = O.to, e = h + 1; ; ) {
								if (t == i) break t;
								if (!(e < s.length && s[e].from == t)) {
									if (Eo[t] == a) break t;
									break;
								}
								t = s[e++].to;
							}
						h++,
							u
								? u.push(O)
								: (O.from > l && o.push(new jo(l, O.from, d)),
									Yo(
										t,
										(O.direction == To) != !(d % 2)
											? n + 1
											: n,
										r,
										O.inner,
										O.from,
										O.to,
										o
									),
									(l = O.to)),
							(f = O.to);
					} else {
						if (f == i || (e ? Eo[f] != a : Eo[f] == a)) break;
						f++;
					}
				u
					? Wo(t, l, f, n + 1, r, u, o)
					: l < f && o.push(new jo(l, f, d)),
					(l = f);
			}
		else
			for (let l = i, h = s.length; l > e; ) {
				let i = !0,
					c = !1;
				if (!h || l > s[h - 1].to) {
					let t = Eo[l - 1];
					t != a && ((i = !1), (c = 16 == t));
				}
				let u = i || 1 != a ? null : [],
					d = i ? n : n + 1,
					f = l;
				t: for (;;)
					if (h && f == s[h - 1].to) {
						if (c) break t;
						let O = s[--h];
						if (!i)
							for (let t = O.from, i = h; ; ) {
								if (t == e) break t;
								if (!i || s[i - 1].to != t) {
									if (Eo[t - 1] == a) break t;
									break;
								}
								t = s[--i].from;
							}
						u
							? u.push(O)
							: (O.to < l && o.push(new jo(O.to, l, d)),
								Yo(
									t,
									(O.direction == To) != !(d % 2) ? n + 1 : n,
									r,
									O.inner,
									O.from,
									O.to,
									o
								),
								(l = O.from)),
							(f = O.from);
					} else {
						if (f == e || (i ? Eo[f - 1] != a : Eo[f - 1] == a))
							break;
						f--;
					}
				u
					? Wo(t, f, l, n + 1, r, u, o)
					: f < l && o.push(new jo(f, l, d)),
					(l = f);
			}
	}
	function Yo(t, e, i, n, r, s, o) {
		let a = e % 2 ? 2 : 1;
		!(function (t, e, i, n, r) {
			for (let s = 0; s <= n.length; s++) {
				let o = s ? n[s - 1].to : e,
					a = s < n.length ? n[s].from : i,
					l = s ? 256 : r;
				for (let e = o, i = l, n = l; e < a; e++) {
					let r = Vo(t.charCodeAt(e));
					512 == r ? (r = i) : 8 == r && 4 == n && (r = 16),
						(Eo[e] = 4 == r ? 2 : r),
						7 & r && (n = r),
						(i = r);
				}
				for (let t = o, e = l, n = l; t < a; t++) {
					let r = Eo[t];
					if (128 == r)
						t < a - 1 && e == Eo[t + 1] && 24 & e
							? (r = Eo[t] = e)
							: (Eo[t] = 256);
					else if (64 == r) {
						let r = t + 1;
						for (; r < a && 64 == Eo[r]; ) r++;
						let s =
							(t && 8 == e) || (r < i && 8 == Eo[r])
								? 1 == n
									? 1
									: 8
								: 256;
						for (let e = t; e < r; e++) Eo[e] = s;
						t = r - 1;
					} else 8 == r && 1 == n && (Eo[t] = 1);
					(e = r), 7 & r && (n = r);
				}
			}
		})(t, r, s, n, a),
			(function (t, e, i, n, r) {
				let s = 1 == r ? 2 : 1;
				for (let o = 0, a = 0, l = 0; o <= n.length; o++) {
					let h = o ? n[o - 1].to : e,
						c = o < n.length ? n[o].from : i;
					for (let e, i, n, o = h; o < c; o++)
						if ((i = Ro[(e = t.charCodeAt(o))]))
							if (i < 0) {
								for (let t = a - 3; t >= 0; t -= 3)
									if (_o[t + 1] == -i) {
										let e = _o[t + 2],
											i =
												2 & e
													? r
													: 4 & e
														? 1 & e
															? s
															: r
														: 0;
										i && (Eo[o] = Eo[_o[t]] = i), (a = t);
										break;
									}
							} else {
								if (189 == _o.length) break;
								(_o[a++] = o), (_o[a++] = e), (_o[a++] = l);
							}
						else if (2 == (n = Eo[o]) || 1 == n) {
							let t = n == r;
							l = t ? 0 : 1;
							for (let e = a - 3; e >= 0; e -= 3) {
								let i = _o[e + 2];
								if (2 & i) break;
								if (t) _o[e + 2] |= 2;
								else {
									if (4 & i) break;
									_o[e + 2] |= 4;
								}
							}
						}
				}
			})(t, r, s, n, a),
			(function (t, e, i, n) {
				for (let r = 0, s = n; r <= i.length; r++) {
					let o = r ? i[r - 1].to : t,
						a = r < i.length ? i[r].from : e;
					for (let l = o; l < a; ) {
						let o = Eo[l];
						if (256 == o) {
							let o = l + 1;
							for (;;)
								if (o == a) {
									if (r == i.length) break;
									(o = i[r++].to),
										(a = r < i.length ? i[r].from : e);
								} else {
									if (256 != Eo[o]) break;
									o++;
								}
							let h = 1 == s,
								c =
									h == (1 == (o < e ? Eo[o] : n))
										? h
											? 1
											: 2
										: n;
							for (
								let e = o, n = r, s = n ? i[n - 1].to : t;
								e > l;

							)
								e == s &&
									((e = i[--n].from),
									(s = n ? i[n - 1].to : t)),
									(Eo[--e] = c);
							l = o;
						} else (s = o), l++;
					}
				}
			})(r, s, n, a),
			Wo(t, r, s, e, i, n, o);
	}
	function zo(t) {
		return [new jo(0, t, 0)];
	}
	let Lo = '';
	function Bo(t, e, i, n, r) {
		var s;
		let o = n.head - t.from,
			a = jo.find(
				e,
				o,
				null !== (s = n.bidiLevel) && void 0 !== s ? s : -1,
				n.assoc
			),
			l = e[a],
			h = l.side(r, i);
		if (o == h) {
			let t = (a += r ? 1 : -1);
			if (t < 0 || t >= e.length) return null;
			(l = e[(a = t)]), (o = l.side(!r, i)), (h = l.side(r, i));
		}
		let c = Rn(t.text, o, l.forward(r, i));
		(c < l.from || c > l.to) && (c = h),
			(Lo = t.text.slice(Math.min(o, c), Math.max(o, c)));
		let u = a == (r ? e.length - 1 : 0) ? null : e[a + (r ? 1 : -1)];
		return u && c == h && u.level + (r ? 0 : 1) < l.level
			? Fn.cursor(
					u.side(!r, i) + t.from,
					u.forward(r, i) ? 1 : -1,
					u.level
				)
			: Fn.cursor(c + t.from, l.forward(r, i) ? -1 : 1, l.level);
	}
	function Uo(t, e, i) {
		for (let n = e; n < i; n++) {
			let e = Vo(t.charCodeAt(n));
			if (1 == e) return To;
			if (2 == e || 4 == e) return Co;
		}
		return To;
	}
	const No = Jn.define(),
		Go = Jn.define(),
		Io = Jn.define(),
		Fo = Jn.define(),
		Ho = Jn.define(),
		Ko = Jn.define(),
		Jo = Jn.define(),
		ta = Jn.define(),
		ea = Jn.define(),
		ia = Jn.define({ combine: (t) => t.some((t) => t) }),
		na = Jn.define({ combine: (t) => t.some((t) => t) }),
		ra = Jn.define();
	class sa {
		constructor(t, e = 'nearest', i = 'nearest', n = 5, r = 5, s = !1) {
			(this.range = t),
				(this.y = e),
				(this.x = i),
				(this.yMargin = n),
				(this.xMargin = r),
				(this.isSnapshot = s);
		}
		map(t) {
			return t.empty
				? this
				: new sa(
						this.range.map(t),
						this.y,
						this.x,
						this.yMargin,
						this.xMargin,
						this.isSnapshot
					);
		}
		clip(t) {
			return this.range.to <= t.doc.length
				? this
				: new sa(
						Fn.cursor(t.doc.length),
						this.y,
						this.x,
						this.yMargin,
						this.xMargin,
						this.isSnapshot
					);
		}
	}
	const oa = kr.define({ map: (t, e) => t.map(e) }),
		aa = kr.define();
	function la(t, e, i) {
		let n = t.facet(Fo);
		n.length
			? n[0](e)
			: window.onerror
				? window.onerror(String(e), i, void 0, void 0, e)
				: i
					? console.error(i + ':', e)
					: console.error(e);
	}
	const ha = Jn.define({ combine: (t) => !t.length || t[0] });
	let ca = 0;
	const ua = Jn.define();
	class da {
		constructor(t, e, i, n, r) {
			(this.id = t),
				(this.create = e),
				(this.domEventHandlers = i),
				(this.domEventObservers = n),
				(this.extension = r(this));
		}
		static define(t, e) {
			const {
				eventHandlers: i,
				eventObservers: n,
				provide: r,
				decorations: s,
			} = e || {};
			return new da(ca++, t, i, n, (t) => {
				let e = [ua.of(t)];
				return (
					s &&
						e.push(
							ma.of((e) => {
								let i = e.plugin(t);
								return i ? s(i) : mo.none;
							})
						),
					r && e.push(r(t)),
					e
				);
			});
		}
		static fromClass(t, e) {
			return da.define((e) => new t(e), e);
		}
	}
	class fa {
		constructor(t) {
			(this.spec = t), (this.mustUpdate = null), (this.value = null);
		}
		update(t) {
			if (this.value) {
				if (this.mustUpdate) {
					let t = this.mustUpdate;
					if (((this.mustUpdate = null), this.value.update))
						try {
							this.value.update(t);
						} catch (e) {
							if (
								(la(t.state, e, 'CodeMirror plugin crashed'),
								this.value.destroy)
							)
								try {
									this.value.destroy();
								} catch (t) {}
							this.deactivate();
						}
				}
			} else if (this.spec)
				try {
					this.value = this.spec.create(t);
				} catch (e) {
					la(t.state, e, 'CodeMirror plugin crashed'),
						this.deactivate();
				}
			return this;
		}
		destroy(t) {
			var e;
			if (null === (e = this.value) || void 0 === e ? void 0 : e.destroy)
				try {
					this.value.destroy();
				} catch (e) {
					la(t.state, e, 'CodeMirror plugin crashed');
				}
		}
		deactivate() {
			this.spec = this.value = null;
		}
	}
	const Oa = Jn.define(),
		pa = Jn.define(),
		ma = Jn.define(),
		ga = Jn.define(),
		ba = Jn.define(),
		ya = Jn.define();
	function va(t, e) {
		let i = t.state.facet(ya);
		if (!i.length) return i;
		let n = i.map((e) => (e instanceof Function ? e(t) : e)),
			r = [];
		return (
			Yr.spans(n, e.from, e.to, {
				point() {},
				span(t, i, n, s) {
					let o = t - e.from,
						a = i - e.from,
						l = r;
					for (let t = n.length - 1; t >= 0; t--, s--) {
						let i,
							r = n[t].spec.bidiIsolate;
						if (
							(null == r && (r = Uo(e.text, o, a)),
							s > 0 &&
								l.length &&
								(i = l[l.length - 1]).to == o &&
								i.direction == r)
						)
							(i.to = a), (l = i.inner);
						else {
							let t = { from: o, to: a, direction: r, inner: [] };
							l.push(t), (l = t.inner);
						}
					}
				},
			}),
			r
		);
	}
	const wa = Jn.define();
	function Sa(t) {
		let e = 0,
			i = 0,
			n = 0,
			r = 0;
		for (let s of t.state.facet(wa)) {
			let o = s(t);
			o &&
				(null != o.left && (e = Math.max(e, o.left)),
				null != o.right && (i = Math.max(i, o.right)),
				null != o.top && (n = Math.max(n, o.top)),
				null != o.bottom && (r = Math.max(r, o.bottom)));
		}
		return { left: e, right: i, top: n, bottom: r };
	}
	const xa = Jn.define();
	class Qa {
		constructor(t, e, i, n) {
			(this.fromA = t), (this.toA = e), (this.fromB = i), (this.toB = n);
		}
		join(t) {
			return new Qa(
				Math.min(this.fromA, t.fromA),
				Math.max(this.toA, t.toA),
				Math.min(this.fromB, t.fromB),
				Math.max(this.toB, t.toB)
			);
		}
		addToSet(t) {
			let e = t.length,
				i = this;
			for (; e > 0; e--) {
				let n = t[e - 1];
				if (!(n.fromA > i.toA)) {
					if (n.toA < i.fromA) break;
					(i = i.join(n)), t.splice(e - 1, 1);
				}
			}
			return t.splice(e, 0, i), t;
		}
		static extendWithRanges(t, e) {
			if (0 == e.length) return t;
			let i = [];
			for (let n = 0, r = 0, s = 0, o = 0; ; n++) {
				let a = n == t.length ? null : t[n],
					l = s - o,
					h = a ? a.fromB : 1e9;
				for (; r < e.length && e[r] < h; ) {
					let t = e[r],
						n = e[r + 1],
						s = Math.max(o, t),
						a = Math.min(h, n);
					if (
						(s <= a && new Qa(s + l, a + l, s, a).addToSet(i),
						n > h)
					)
						break;
					r += 2;
				}
				if (!a) return i;
				new Qa(a.fromA, a.toA, a.fromB, a.toB).addToSet(i),
					(s = a.toA),
					(o = a.toB);
			}
		}
	}
	class ka {
		constructor(t, e, i) {
			(this.view = t),
				(this.state = e),
				(this.transactions = i),
				(this.flags = 0),
				(this.startState = t.state),
				(this.changes = Yn.empty(this.startState.doc.length));
			for (let t of i) this.changes = this.changes.compose(t.changes);
			let n = [];
			this.changes.iterChangedRanges((t, e, i, r) =>
				n.push(new Qa(t, e, i, r))
			),
				(this.changedRanges = n);
		}
		static create(t, e, i) {
			return new ka(t, e, i);
		}
		get viewportChanged() {
			return (4 & this.flags) > 0;
		}
		get heightChanged() {
			return (2 & this.flags) > 0;
		}
		get geometryChanged() {
			return this.docChanged || (10 & this.flags) > 0;
		}
		get focusChanged() {
			return (1 & this.flags) > 0;
		}
		get docChanged() {
			return !this.changes.empty;
		}
		get selectionSet() {
			return this.transactions.some((t) => t.selection);
		}
		get empty() {
			return 0 == this.flags && 0 == this.transactions.length;
		}
	}
	class $a extends js {
		get length() {
			return this.view.state.doc.length;
		}
		constructor(t) {
			super(),
				(this.view = t),
				(this.decorations = []),
				(this.dynamicDecorationMap = [!1]),
				(this.domChanged = null),
				(this.hasComposition = null),
				(this.markedForComposition = new Set()),
				(this.editContextFormatting = mo.none),
				(this.lastCompositionAfterCursor = !1),
				(this.minWidth = 0),
				(this.minWidthFrom = 0),
				(this.minWidthTo = 0),
				(this.impreciseAnchor = null),
				(this.impreciseHead = null),
				(this.forceSelection = !1),
				(this.lastUpdate = Date.now()),
				this.setDOM(t.contentDOM),
				(this.children = [new So()]),
				this.children[0].setParent(this),
				this.updateDeco(),
				this.updateInner(
					[new Qa(0, 0, 0, t.state.doc.length)],
					0,
					null
				);
		}
		update(t) {
			var e;
			let i = t.changedRanges;
			this.minWidth > 0 &&
				i.length &&
				(i.every(
					({ fromA: t, toA: e }) =>
						e < this.minWidthFrom || t > this.minWidthTo
				)
					? ((this.minWidthFrom = t.changes.mapPos(
							this.minWidthFrom,
							1
						)),
						(this.minWidthTo = t.changes.mapPos(
							this.minWidthTo,
							1
						)))
					: (this.minWidth =
							this.minWidthFrom =
							this.minWidthTo =
								0)),
				this.updateEditContextFormatting(t);
			let n = -1;
			this.view.inputState.composing >= 0 &&
				!this.view.observer.editContext &&
				((
					null === (e = this.domChanged) || void 0 === e
						? void 0
						: e.newSel
				)
					? (n = this.domChanged.newSel.head)
					: (function (t, e) {
							let i = !1;
							return (
								e &&
									t.iterChangedRanges((t, n) => {
										t < e.to && n > e.from && (i = !0);
									}),
								i
							);
						})(t.changes, this.hasComposition) ||
						t.selectionSet ||
						(n = t.state.selection.main.head));
			let r =
				n > -1
					? (function (t, e, i) {
							let n = Pa(t, i);
							if (!n) return null;
							let { node: r, from: s, to: o } = n,
								a = r.nodeValue;
							if (/[\n\r]/.test(a)) return null;
							if (t.state.doc.sliceString(n.from, n.to) != a)
								return null;
							let l = e.invertedDesc,
								h = new Qa(l.mapPos(s), l.mapPos(o), s, o),
								c = [];
							for (let e = r.parentNode; ; e = e.parentNode) {
								let i = js.get(e);
								if (i instanceof io)
									c.push({ node: e, deco: i.mark });
								else {
									if (
										i instanceof So ||
										('DIV' == e.nodeName &&
											e.parentNode == t.contentDOM)
									)
										return {
											range: h,
											text: r,
											marks: c,
											line: e,
										};
									if (e == t.contentDOM) return null;
									c.push({
										node: e,
										deco: new go({
											inclusive: !0,
											attributes: fo(e),
											tagName: e.tagName.toLowerCase(),
										}),
									});
								}
							}
						})(this.view, t.changes, n)
					: null;
			if (((this.domChanged = null), this.hasComposition)) {
				this.markedForComposition.clear();
				let { from: e, to: n } = this.hasComposition;
				i = new Qa(
					e,
					n,
					t.changes.mapPos(e, -1),
					t.changes.mapPos(n, 1)
				).addToSet(i.slice());
			}
			(this.hasComposition = r
				? { from: r.range.fromB, to: r.range.toB }
				: null),
				(to.ie || to.chrome) &&
					!r &&
					t &&
					t.state.doc.lines != t.startState.doc.lines &&
					(this.forceSelection = !0);
			let s = (function (t, e, i) {
				let n = new Za();
				return Yr.compare(t, e, i, n), n.changes;
			})(this.decorations, this.updateDeco(), t.changes);
			return (
				(i = Qa.extendWithRanges(i, s)),
				!!(7 & this.flags || 0 != i.length) &&
					(this.updateInner(i, t.startState.doc.length, r),
					t.transactions.length && (this.lastUpdate = Date.now()),
					!0)
			);
		}
		updateInner(t, e, i) {
			(this.view.viewState.mustMeasureContent = !0),
				this.updateChildren(t, e, i);
			let { observer: n } = this.view;
			n.ignore(() => {
				(this.dom.style.height =
					this.view.viewState.contentHeight / this.view.scaleY +
					'px'),
					(this.dom.style.flexBasis = this.minWidth
						? this.minWidth + 'px'
						: '');
				let t =
					to.chrome || to.ios
						? { node: n.selectionRange.focusNode, written: !1 }
						: void 0;
				this.sync(this.view, t),
					(this.flags &= -8),
					t &&
						(t.written || n.selectionRange.focusNode != t.node) &&
						(this.forceSelection = !0),
					(this.dom.style.height = '');
			}),
				this.markedForComposition.forEach((t) => (t.flags &= -9));
			let r = [];
			if (
				this.view.viewport.from ||
				this.view.viewport.to < this.view.state.doc.length
			)
				for (let t of this.children)
					t instanceof xo && t.widget instanceof Qo && r.push(t.dom);
			n.updateGaps(r);
		}
		updateChildren(t, e, i) {
			let n = i ? i.range.addToSet(t.slice()) : t,
				r = this.childCursor(e);
			for (let t = n.length - 1; ; t--) {
				let e = t >= 0 ? n[t] : null;
				if (!e) break;
				let s,
					o,
					a,
					l,
					{ fromA: h, toA: c, fromB: u, toB: d } = e;
				if (i && i.range.fromB < d && i.range.toB > u) {
					let t = ko.build(
							this.view.state.doc,
							u,
							i.range.fromB,
							this.decorations,
							this.dynamicDecorationMap
						),
						e = ko.build(
							this.view.state.doc,
							i.range.toB,
							d,
							this.decorations,
							this.dynamicDecorationMap
						);
					(o = t.breakAtStart), (a = t.openStart), (l = e.openEnd);
					let n = this.compositionView(i);
					e.breakAtStart
						? (n.breakAfter = 1)
						: e.content.length &&
							n.merge(
								n.length,
								n.length,
								e.content[0],
								!1,
								e.openStart,
								0
							) &&
							((n.breakAfter = e.content[0].breakAfter),
							e.content.shift()),
						t.content.length &&
							n.merge(
								0,
								0,
								t.content[t.content.length - 1],
								!0,
								0,
								t.openEnd
							) &&
							t.content.pop(),
						(s = t.content.concat(n).concat(e.content));
				} else
					({
						content: s,
						breakAtStart: o,
						openStart: a,
						openEnd: l,
					} = ko.build(
						this.view.state.doc,
						u,
						d,
						this.decorations,
						this.dynamicDecorationMap
					));
				let { i: f, off: O } = r.findPos(c, 1),
					{ i: p, off: m } = r.findPos(h, -1);
				Ws(this, p, m, f, O, s, o, a, l);
			}
			i && this.fixCompositionDOM(i);
		}
		updateEditContextFormatting(t) {
			this.editContextFormatting = this.editContextFormatting.map(
				t.changes
			);
			for (let e of t.transactions)
				for (let t of e.effects)
					t.is(aa) && (this.editContextFormatting = t.value);
		}
		compositionView(t) {
			let e = new eo(t.text.nodeValue);
			e.flags |= 8;
			for (let { deco: i } of t.marks) e = new io(i, [e], e.length);
			let i = new So();
			return i.append(e, 0), i;
		}
		fixCompositionDOM(t) {
			let e = (t, e) => {
					(e.flags |=
						8 | (e.children.some((t) => 7 & t.flags) ? 1 : 0)),
						this.markedForComposition.add(e);
					let i = js.get(t);
					i && i != e && (i.dom = null), e.setDOM(t);
				},
				i = this.childPos(t.range.fromB, 1),
				n = this.children[i.i];
			e(t.line, n);
			for (let r = t.marks.length - 1; r >= -1; r--)
				(i = n.childPos(i.off, 1)),
					(n = n.children[i.i]),
					e(r >= 0 ? t.marks[r].node : t.text, n);
		}
		updateSelection(t = !1, e = !1) {
			(!t && this.view.observer.selectionRange.focusNode) ||
				this.view.observer.readSelectionRange();
			let i = this.view.root.activeElement,
				n = i == this.dom,
				r =
					!n &&
					!(this.view.state.facet(ha) || this.dom.tabIndex > -1) &&
					ms(this.dom, this.view.observer.selectionRange) &&
					!(i && this.dom.contains(i));
			if (!(n || e || r)) return;
			let s = this.forceSelection;
			this.forceSelection = !1;
			let o = this.view.state.selection.main,
				a = this.moveToLine(this.domAtPos(o.anchor)),
				l = o.empty ? a : this.moveToLine(this.domAtPos(o.head));
			if (
				to.gecko &&
				o.empty &&
				!this.hasComposition &&
				1 == (h = a).node.nodeType &&
				h.node.firstChild &&
				(0 == h.offset ||
					'false' ==
						h.node.childNodes[h.offset - 1].contentEditable) &&
				(h.offset == h.node.childNodes.length ||
					'false' == h.node.childNodes[h.offset].contentEditable)
			) {
				let t = document.createTextNode('');
				this.view.observer.ignore(() =>
					a.node.insertBefore(t, a.node.childNodes[a.offset] || null)
				),
					(a = l = new Vs(t, 0)),
					(s = !0);
			}
			var h;
			let c = this.view.observer.selectionRange;
			(!s &&
				c.focusNode &&
				((bs(a.node, a.offset, c.anchorNode, c.anchorOffset) &&
					bs(l.node, l.offset, c.focusNode, c.focusOffset)) ||
					this.suppressWidgetCursorChange(c, o))) ||
				(this.view.observer.ignore(() => {
					to.android &&
						to.chrome &&
						this.dom.contains(c.focusNode) &&
						(function (t, e) {
							for (
								let i = t;
								i && i != e;
								i = i.assignedSlot || i.parentNode
							)
								if (
									1 == i.nodeType &&
									'false' == i.contentEditable
								)
									return !0;
							return !1;
						})(c.focusNode, this.dom) &&
						(this.dom.blur(),
						this.dom.focus({ preventScroll: !0 }));
					let t = Os(this.view.root);
					if (t)
						if (o.empty) {
							if (to.gecko) {
								let t =
									((e = a.node),
									(n = a.offset),
									1 != e.nodeType
										? 0
										: (n &&
											'false' ==
												e.childNodes[n - 1]
													.contentEditable
												? 1
												: 0) |
											(n < e.childNodes.length &&
											'false' ==
												e.childNodes[n].contentEditable
												? 2
												: 0));
								if (t && 3 != t) {
									let e = (1 == t ? Rs : _s)(
										a.node,
										a.offset
									);
									e && (a = new Vs(e.node, e.offset));
								}
							}
							t.collapse(a.node, a.offset),
								null != o.bidiLevel &&
									void 0 !== t.caretBidiLevel &&
									(t.caretBidiLevel = o.bidiLevel);
						} else if (t.extend) {
							t.collapse(a.node, a.offset);
							try {
								t.extend(l.node, l.offset);
							} catch (t) {}
						} else {
							let e = document.createRange();
							o.anchor > o.head && ([a, l] = [l, a]),
								e.setEnd(l.node, l.offset),
								e.setStart(a.node, a.offset),
								t.removeAllRanges(),
								t.addRange(e);
						}
					var e, n;
					r &&
						this.view.root.activeElement == this.dom &&
						(this.dom.blur(), i && i.focus());
				}),
				this.view.observer.setSelectionRange(a, l)),
				(this.impreciseAnchor = a.precise
					? null
					: new Vs(c.anchorNode, c.anchorOffset)),
				(this.impreciseHead = l.precise
					? null
					: new Vs(c.focusNode, c.focusOffset));
		}
		suppressWidgetCursorChange(t, e) {
			return (
				this.hasComposition &&
				e.empty &&
				bs(t.focusNode, t.focusOffset, t.anchorNode, t.anchorOffset) &&
				this.posFromDOM(t.focusNode, t.focusOffset) == e.head
			);
		}
		enforceCursorAssoc() {
			if (this.hasComposition) return;
			let { view: t } = this,
				e = t.state.selection.main,
				i = Os(t.root),
				{ anchorNode: n, anchorOffset: r } = t.observer.selectionRange;
			if (!(i && e.empty && e.assoc && i.modify)) return;
			let s = So.find(this, e.head);
			if (!s) return;
			let o = s.posAtStart;
			if (e.head == o || e.head == o + s.length) return;
			let a = this.coordsAt(e.head, -1),
				l = this.coordsAt(e.head, 1);
			if (!a || !l || a.bottom > l.top) return;
			let h = this.domAtPos(e.head + e.assoc);
			i.collapse(h.node, h.offset),
				i.modify(
					'move',
					e.assoc < 0 ? 'forward' : 'backward',
					'lineboundary'
				),
				t.observer.readSelectionRange();
			let c = t.observer.selectionRange;
			t.docView.posFromDOM(c.anchorNode, c.anchorOffset) != e.from &&
				i.collapse(n, r);
		}
		moveToLine(t) {
			let e,
				i = this.dom;
			if (t.node != i) return t;
			for (let n = t.offset; !e && n < i.childNodes.length; n++) {
				let t = js.get(i.childNodes[n]);
				t instanceof So && (e = t.domAtPos(0));
			}
			for (let n = t.offset - 1; !e && n >= 0; n--) {
				let t = js.get(i.childNodes[n]);
				t instanceof So && (e = t.domAtPos(t.length));
			}
			return e ? new Vs(e.node, e.offset, !0) : t;
		}
		nearest(t) {
			for (let e = t; e; ) {
				let t = js.get(e);
				if (t && t.rootView == this) return t;
				e = e.parentNode;
			}
			return null;
		}
		posFromDOM(t, e) {
			let i = this.nearest(t);
			if (!i)
				throw new RangeError(
					'Trying to find position for a DOM position outside of the document'
				);
			return i.localPosFromDOM(t, e) + i.posAtStart;
		}
		domAtPos(t) {
			let { i: e, off: i } = this.childCursor().findPos(t, -1);
			for (; e < this.children.length - 1; ) {
				let t = this.children[e];
				if (i < t.length || t instanceof So) break;
				e++, (i = 0);
			}
			return this.children[e].domAtPos(i);
		}
		coordsAt(t, e) {
			let i = null,
				n = 0;
			for (
				let r = this.length, s = this.children.length - 1;
				s >= 0;
				s--
			) {
				let o = this.children[s],
					a = r - o.breakAfter,
					l = a - o.length;
				if (a < t) break;
				if (
					l <= t &&
					(l < t || o.covers(-1)) &&
					(a > t || o.covers(1)) &&
					(!i || (o instanceof So && !(i instanceof So && e >= 0)))
				)
					(i = o), (n = l);
				else if (
					i &&
					l == t &&
					a == t &&
					o instanceof xo &&
					Math.abs(e) < 2
				) {
					if (o.deco.startSide < 0) break;
					s && (i = null);
				}
				r = l;
			}
			return i ? i.coordsAt(t - n, e) : null;
		}
		coordsForChar(t) {
			let { i: e, off: i } = this.childPos(t, 1),
				n = this.children[e];
			if (!(n instanceof So)) return null;
			for (; n.children.length; ) {
				let { i: t, off: e } = n.childPos(i, 1);
				for (; ; t++) {
					if (t == n.children.length) return null;
					if ((n = n.children[t]).length) break;
				}
				i = e;
			}
			if (!(n instanceof eo)) return null;
			let r = Rn(n.text, i);
			if (r == i) return null;
			let s = Cs(n.dom, i, r).getClientRects();
			for (let t = 0; t < s.length; t++) {
				let e = s[t];
				if (t == s.length - 1 || (e.top < e.bottom && e.left < e.right))
					return e;
			}
			return null;
		}
		measureVisibleLineHeights(t) {
			let e = [],
				{ from: i, to: n } = t,
				r = this.view.contentDOM.clientWidth,
				s =
					r >
					Math.max(this.view.scrollDOM.clientWidth, this.minWidth) +
						1,
				o = -1,
				a = this.view.textDirection == Zo.LTR;
			for (let t = 0, l = 0; l < this.children.length; l++) {
				let h = this.children[l],
					c = t + h.length;
				if (c > n) break;
				if (t >= i) {
					let i = h.dom.getBoundingClientRect();
					if ((e.push(i.height), s)) {
						let e = h.dom.lastChild,
							n = e ? gs(e) : [];
						if (n.length) {
							let e = n[n.length - 1],
								s = a ? e.right - i.left : i.right - e.left;
							s > o &&
								((o = s),
								(this.minWidth = r),
								(this.minWidthFrom = t),
								(this.minWidthTo = c));
						}
					}
				}
				t = c + h.breakAfter;
			}
			return e;
		}
		textDirectionAt(t) {
			let { i: e } = this.childPos(t, 1);
			return 'rtl' == getComputedStyle(this.children[e].dom).direction
				? Zo.RTL
				: Zo.LTR;
		}
		measureTextSize() {
			for (let t of this.children)
				if (t instanceof So) {
					let e = t.measureTextSize();
					if (e) return e;
				}
			let t,
				e,
				i,
				n = document.createElement('div');
			return (
				(n.className = 'cm-line'),
				(n.style.width = '99999px'),
				(n.style.position = 'absolute'),
				(n.textContent = 'abc def ghi jkl mno pqr stu'),
				this.view.observer.ignore(() => {
					this.dom.appendChild(n);
					let r = gs(n.firstChild)[0];
					(t = n.getBoundingClientRect().height),
						(e = r ? r.width / 27 : 7),
						(i = r ? r.height : t),
						n.remove();
				}),
				{ lineHeight: t, charWidth: e, textHeight: i }
			);
		}
		childCursor(t = this.length) {
			let e = this.children.length;
			return (
				e && (t -= this.children[--e].length),
				new Es(this.children, t, e)
			);
		}
		computeBlockGapDeco() {
			let t = [],
				e = this.view.viewState;
			for (let i = 0, n = 0; ; n++) {
				let r = n == e.viewports.length ? null : e.viewports[n],
					s = r ? r.from - 1 : this.length;
				if (s > i) {
					let n =
						(e.lineBlockAt(s).bottom - e.lineBlockAt(i).top) /
						this.view.scaleY;
					t.push(
						mo
							.replace({
								widget: new Qo(n),
								block: !0,
								inclusive: !0,
								isBlockGap: !0,
							})
							.range(i, s)
					);
				}
				if (!r) break;
				i = r.to + 1;
			}
			return mo.set(t);
		}
		updateDeco() {
			let t = 1,
				e = this.view.state
					.facet(ma)
					.map((e) =>
						(this.dynamicDecorationMap[t++] =
							'function' == typeof e)
							? e(this.view)
							: e
					),
				i = !1,
				n = this.view.state.facet(ga).map((t, e) => {
					let n = 'function' == typeof t;
					return n && (i = !0), n ? t(this.view) : t;
				});
			for (
				n.length &&
					((this.dynamicDecorationMap[t++] = i), e.push(Yr.join(n))),
					this.decorations = [
						this.editContextFormatting,
						...e,
						this.computeBlockGapDeco(),
						this.view.viewState.lineGapDeco,
					];
				t < this.decorations.length;

			)
				this.dynamicDecorationMap[t++] = !1;
			return this.decorations;
		}
		scrollIntoView(t) {
			if (t.isSnapshot) {
				let e = this.view.viewState.lineBlockAt(t.range.head);
				return (
					(this.view.scrollDOM.scrollTop = e.top - t.yMargin),
					void (this.view.scrollDOM.scrollLeft = t.xMargin)
				);
			}
			for (let e of this.view.state.facet(ra))
				try {
					if (e(this.view, t.range, t)) return !0;
				} catch (t) {
					la(this.view.state, t, 'scroll handler');
				}
			let e,
				{ range: i } = t,
				n = this.coordsAt(
					i.head,
					i.empty ? i.assoc : i.head > i.anchor ? -1 : 1
				);
			if (!n) return;
			!i.empty &&
				(e = this.coordsAt(i.anchor, i.anchor > i.head ? -1 : 1)) &&
				(n = {
					left: Math.min(n.left, e.left),
					top: Math.min(n.top, e.top),
					right: Math.max(n.right, e.right),
					bottom: Math.max(n.bottom, e.bottom),
				});
			let r = Sa(this.view),
				s = {
					left: n.left - r.left,
					top: n.top - r.top,
					right: n.right + r.right,
					bottom: n.bottom + r.bottom,
				},
				{ offsetWidth: o, offsetHeight: a } = this.view.scrollDOM;
			!(function (t, e, i, n, r, s, o, a) {
				let l = t.ownerDocument,
					h = l.defaultView || window;
				for (let c = t, u = !1; c && !u; )
					if (1 == c.nodeType) {
						let t,
							d = c == l.body,
							f = 1,
							O = 1;
						if (d) t = Qs(h);
						else {
							if (
								(/^(fixed|sticky)$/.test(
									getComputedStyle(c).position
								) && (u = !0),
								c.scrollHeight <= c.clientHeight &&
									c.scrollWidth <= c.clientWidth)
							) {
								c = c.assignedSlot || c.parentNode;
								continue;
							}
							let e = c.getBoundingClientRect();
							({ scaleX: f, scaleY: O } = ks(c, e)),
								(t = {
									left: e.left,
									right: e.left + c.clientWidth * f,
									top: e.top,
									bottom: e.top + c.clientHeight * O,
								});
						}
						let p = 0,
							m = 0;
						if ('nearest' == r)
							e.top < t.top
								? ((m = -(t.top - e.top + o)),
									i > 0 &&
										e.bottom > t.bottom + m &&
										(m = e.bottom - t.bottom + m + o))
								: e.bottom > t.bottom &&
									((m = e.bottom - t.bottom + o),
									i < 0 &&
										e.top - m < t.top &&
										(m = -(t.top + m - e.top + o)));
						else {
							let n = e.bottom - e.top,
								s = t.bottom - t.top;
							m =
								('center' == r && n <= s
									? e.top + n / 2 - s / 2
									: 'start' == r || ('center' == r && i < 0)
										? e.top - o
										: e.bottom - s + o) - t.top;
						}
						if (
							('nearest' == n
								? e.left < t.left
									? ((p = -(t.left - e.left + s)),
										i > 0 &&
											e.right > t.right + p &&
											(p = e.right - t.right + p + s))
									: e.right > t.right &&
										((p = e.right - t.right + s),
										i < 0 &&
											e.left < t.left + p &&
											(p = -(t.left + p - e.left + s)))
								: (p =
										('center' == n
											? e.left +
												(e.right - e.left) / 2 -
												(t.right - t.left) / 2
											: ('start' == n) == a
												? e.left - s
												: e.right -
													(t.right - t.left) +
													s) - t.left),
							p || m)
						)
							if (d) h.scrollBy(p, m);
							else {
								let t = 0,
									i = 0;
								if (m) {
									let t = c.scrollTop;
									(c.scrollTop += m / O),
										(i = (c.scrollTop - t) * O);
								}
								if (p) {
									let e = c.scrollLeft;
									(c.scrollLeft += p / f),
										(t = (c.scrollLeft - e) * f);
								}
								(e = {
									left: e.left - t,
									top: e.top - i,
									right: e.right - t,
									bottom: e.bottom - i,
								}),
									t && Math.abs(t - p) < 1 && (n = 'nearest'),
									i && Math.abs(i - m) < 1 && (r = 'nearest');
							}
						if (d) break;
						c = c.assignedSlot || c.parentNode;
					} else {
						if (11 != c.nodeType) break;
						c = c.host;
					}
			})(
				this.view.scrollDOM,
				s,
				i.head < i.anchor ? -1 : 1,
				t.x,
				t.y,
				Math.max(Math.min(t.xMargin, o), -o),
				Math.max(Math.min(t.yMargin, a), -a),
				this.view.textDirection == Zo.LTR
			);
		}
	}
	function Pa(t, e) {
		let i = t.observer.selectionRange;
		if (!i.focusNode) return null;
		let n = Rs(i.focusNode, i.focusOffset),
			r = _s(i.focusNode, i.focusOffset),
			s = n || r;
		if (r && n && r.node != n.node) {
			let e = js.get(r.node);
			if (!e || (e instanceof eo && e.text != r.node.nodeValue)) s = r;
			else if (t.docView.lastCompositionAfterCursor) {
				let t = js.get(n.node);
				!t ||
					(t instanceof eo && t.text != n.node.nodeValue) ||
					(s = r);
			}
		}
		if (((t.docView.lastCompositionAfterCursor = s != n), !s)) return null;
		let o = e - s.offset;
		return { from: o, to: o + s.node.nodeValue.length, node: s.node };
	}
	let Za = class {
		constructor() {
			this.changes = [];
		}
		compareRange(t, e) {
			wo(t, e, this.changes);
		}
		comparePoint(t, e) {
			wo(t, e, this.changes);
		}
		boundChange(t) {
			wo(t, t, this.changes);
		}
	};
	function Ta(t, e) {
		return e.left > t ? e.left - t : Math.max(0, t - e.right);
	}
	function Ca(t, e) {
		return e.top > t ? e.top - t : Math.max(0, t - e.bottom);
	}
	function Aa(t, e) {
		return t.top < e.bottom - 1 && t.bottom > e.top + 1;
	}
	function Xa(t, e) {
		return e < t.top
			? { top: e, left: t.left, right: t.right, bottom: t.bottom }
			: t;
	}
	function Ma(t, e) {
		return e > t.bottom
			? { top: t.top, left: t.left, right: t.right, bottom: e }
			: t;
	}
	function Ra(t, e, i) {
		let n,
			r,
			s,
			o,
			a,
			l,
			h,
			c,
			u = !1;
		for (let d = t.firstChild; d; d = d.nextSibling) {
			let t = gs(d);
			for (let f = 0; f < t.length; f++) {
				let O = t[f];
				r && Aa(r, O) && (O = Xa(Ma(O, r.bottom), r.top));
				let p = Ta(e, O),
					m = Ca(i, O);
				if (0 == p && 0 == m)
					return 3 == d.nodeType ? _a(d, e, i) : Ra(d, e, i);
				if (!n || o > m || (o == m && s > p)) {
					(n = d), (r = O), (s = p), (o = m);
					let a = m
						? i < O.top
							? -1
							: 1
						: p
							? e < O.left
								? -1
								: 1
							: 0;
					u = !a || (a > 0 ? f < t.length - 1 : f > 0);
				}
				0 == p
					? i > O.bottom && (!h || h.bottom < O.bottom)
						? ((a = d), (h = O))
						: i < O.top &&
							(!c || c.top > O.top) &&
							((l = d), (c = O))
					: h && Aa(h, O)
						? (h = Ma(h, O.bottom))
						: c && Aa(c, O) && (c = Xa(c, O.top));
			}
		}
		if (
			(h && h.bottom >= i
				? ((n = a), (r = h))
				: c && c.top <= i && ((n = l), (r = c)),
			!n)
		)
			return { node: t, offset: 0 };
		let d = Math.max(r.left, Math.min(r.right, e));
		return 3 == n.nodeType
			? _a(n, d, i)
			: u && 'false' != n.contentEditable
				? Ra(n, d, i)
				: {
						node: t,
						offset:
							Array.prototype.indexOf.call(t.childNodes, n) +
							(e >= (r.left + r.right) / 2 ? 1 : 0),
					};
	}
	function _a(t, e, i) {
		let n = t.nodeValue.length,
			r = -1,
			s = 1e9,
			o = 0;
		for (let a = 0; a < n; a++) {
			let n = Cs(t, a, a + 1).getClientRects();
			for (let l = 0; l < n.length; l++) {
				let h = n[l];
				if (h.top == h.bottom) continue;
				o || (o = e - h.left);
				let c = (h.top > i ? h.top - i : i - h.bottom) - 1;
				if (h.left - 1 <= e && h.right + 1 >= e && c < s) {
					let i = e >= (h.left + h.right) / 2,
						n = i;
					if (
						((to.chrome || to.gecko) &&
							Cs(t, a).getBoundingClientRect().left == h.right &&
							(n = !i),
						c <= 0)
					)
						return { node: t, offset: a + (n ? 1 : 0) };
					(r = a + (n ? 1 : 0)), (s = c);
				}
			}
		}
		return { node: t, offset: r > -1 ? r : o > 0 ? t.nodeValue.length : 0 };
	}
	function Va(t, e, i, n = -1) {
		var r, s;
		let o,
			a = t.contentDOM.getBoundingClientRect(),
			l = a.top + t.viewState.paddingTop,
			{ docHeight: h } = t.viewState,
			{ x: c, y: u } = e,
			d = u - l;
		if (d < 0) return 0;
		if (d > h) return t.state.doc.length;
		for (
			let e = t.viewState.heightOracle.textHeight / 2, r = !1;
			(o = t.elementAtHeight(d)), o.type != po.Text;

		)
			for (
				;
				(d = n > 0 ? o.bottom + e : o.top - e), !(d >= 0 && d <= h);

			) {
				if (r) return i ? null : 0;
				(r = !0), (n = -n);
			}
		u = l + d;
		let f = o.from;
		if (f < t.viewport.from)
			return 0 == t.viewport.from ? 0 : i ? null : qa(t, a, o, c, u);
		if (f > t.viewport.to)
			return t.viewport.to == t.state.doc.length
				? t.state.doc.length
				: i
					? null
					: qa(t, a, o, c, u);
		let O = t.dom.ownerDocument,
			p = t.root.elementFromPoint ? t.root : O,
			m = p.elementFromPoint(c, u);
		m && !t.contentDOM.contains(m) && (m = null),
			m ||
				((c = Math.max(a.left + 1, Math.min(a.right - 1, c))),
				(m = p.elementFromPoint(c, u)),
				m && !t.contentDOM.contains(m) && (m = null));
		let g,
			b = -1;
		if (
			m &&
			0 !=
				(null === (r = t.docView.nearest(m)) || void 0 === r
					? void 0
					: r.isEditable)
		) {
			if (O.caretPositionFromPoint) {
				let t = O.caretPositionFromPoint(c, u);
				t && ({ offsetNode: g, offset: b } = t);
			} else if (O.caretRangeFromPoint) {
				let e = O.caretRangeFromPoint(c, u);
				e &&
					(({ startContainer: g, startOffset: b } = e),
					(!t.contentDOM.contains(g) ||
						(to.safari &&
							(function (t, e, i) {
								let n;
								if (
									3 != t.nodeType ||
									e != (n = t.nodeValue.length)
								)
									return !1;
								for (
									let e = t.nextSibling;
									e;
									e = e.nextSibling
								)
									if (1 != e.nodeType || 'BR' != e.nodeName)
										return !1;
								return (
									Cs(t, n - 1, n).getBoundingClientRect()
										.left > i
								);
							})(g, b, c)) ||
						(to.chrome &&
							(function (t, e, i) {
								if (0 != e) return !1;
								for (let e = t; ; ) {
									let t = e.parentNode;
									if (
										!t ||
										1 != t.nodeType ||
										t.firstChild != e
									)
										return !1;
									if (t.classList.contains('cm-line')) break;
									e = t;
								}
								return (
									i -
										(1 == t.nodeType
											? t.getBoundingClientRect()
											: Cs(
													t,
													0,
													Math.max(
														t.nodeValue.length,
														1
													)
												).getBoundingClientRect()
										).left >
									5
								);
							})(g, b, c))) &&
						(g = void 0));
			}
			g && (b = Math.min(Ss(g), b));
		}
		if (!g || !t.docView.dom.contains(g)) {
			let e = So.find(t.docView, f);
			if (!e) return d > o.top + o.height / 2 ? o.to : o.from;
			({ node: g, offset: b } = Ra(e.dom, c, u));
		}
		let y = t.docView.nearest(g);
		if (!y) return null;
		if (
			y.isWidget &&
			1 == (null === (s = y.dom) || void 0 === s ? void 0 : s.nodeType)
		) {
			let t = y.dom.getBoundingClientRect();
			return e.y < t.top ||
				(e.y <= t.bottom && e.x <= (t.left + t.right) / 2)
				? y.posAtStart
				: y.posAtEnd;
		}
		return y.localPosFromDOM(g, b) + y.posAtStart;
	}
	function qa(t, e, i, n, r) {
		let s = Math.round((n - e.left) * t.defaultCharacterWidth);
		if (t.lineWrapping && i.height > 1.5 * t.defaultLineHeight) {
			let e = t.viewState.heightOracle.textHeight;
			s +=
				Math.floor((r - i.top - 0.5 * (t.defaultLineHeight - e)) / e) *
				t.viewState.heightOracle.lineLength;
		}
		let o = t.state.sliceDoc(i.from, i.to);
		return i.from + es(o, s, t.state.tabSize);
	}
	function ja(t, e) {
		let i = t.lineBlockAt(e);
		if (Array.isArray(i.type))
			for (let t of i.type)
				if (
					t.to > e ||
					(t.to == e && (t.to == i.to || t.type == po.Text))
				)
					return t;
		return i;
	}
	function Da(t, e, i, n) {
		let r = t.state.doc.lineAt(e.head),
			s = t.bidiSpans(r),
			o = t.textDirectionAt(r.from);
		for (let a = e, l = null; ; ) {
			let e = Bo(r, s, o, a, i),
				h = Lo;
			if (!e) {
				if (r.number == (i ? t.state.doc.lines : 1)) return a;
				(h = '\n'),
					(r = t.state.doc.line(r.number + (i ? 1 : -1))),
					(s = t.bidiSpans(r)),
					(e = t.visualLineSide(r, !i));
			}
			if (l) {
				if (!l(h)) return a;
			} else {
				if (!n) return e;
				l = n(h);
			}
			a = e;
		}
	}
	function Ea(t, e, i) {
		for (;;) {
			let n = 0;
			for (let r of t)
				r.between(e - 1, e + 1, (t, r, s) => {
					if (e > t && e < r) {
						let s = n || i || (e - t < r - e ? -1 : 1);
						(e = s < 0 ? t : r), (n = s);
					}
				});
			if (!n) return e;
		}
	}
	function Wa(t, e, i) {
		let n = Ea(
			t.state.facet(ba).map((e) => e(t)),
			i.from,
			e.head > i.from ? -1 : 1
		);
		return n == i.from ? i : Fn.cursor(n, n < i.from ? 1 : -1);
	}
	const Ya = '￿';
	class za {
		constructor(t, e) {
			(this.points = t),
				(this.text = ''),
				(this.lineSeparator = e.facet(Vr.lineSeparator));
		}
		append(t) {
			this.text += t;
		}
		lineBreak() {
			this.text += Ya;
		}
		readRange(t, e) {
			if (!t) return this;
			let i = t.parentNode;
			for (let n = t; ; ) {
				this.findPointBefore(i, n);
				let t = this.text.length;
				this.readNode(n);
				let r = n.nextSibling;
				if (r == e) break;
				let s = js.get(n),
					o = js.get(r);
				(s && o
					? s.breakAfter
					: (s ? s.breakAfter : vs(n)) ||
						(vs(r) &&
							('BR' != n.nodeName || n.cmIgnore) &&
							this.text.length > t)) && this.lineBreak(),
					(n = r);
			}
			return this.findPointBefore(i, e), this;
		}
		readTextNode(t) {
			let e = t.nodeValue;
			for (let i of this.points)
				i.node == t &&
					(i.pos = this.text.length + Math.min(i.offset, e.length));
			for (let i = 0, n = this.lineSeparator ? null : /\r\n?|\n/g; ; ) {
				let r,
					s = -1,
					o = 1;
				if (
					(this.lineSeparator
						? ((s = e.indexOf(this.lineSeparator, i)),
							(o = this.lineSeparator.length))
						: (r = n.exec(e)) && ((s = r.index), (o = r[0].length)),
					this.append(e.slice(i, s < 0 ? e.length : s)),
					s < 0)
				)
					break;
				if ((this.lineBreak(), o > 1))
					for (let e of this.points)
						e.node == t &&
							e.pos > this.text.length &&
							(e.pos -= o - 1);
				i = s + o;
			}
		}
		readNode(t) {
			if (t.cmIgnore) return;
			let e = js.get(t),
				i = e && e.overrideDOMText;
			if (null != i) {
				this.findPointInside(t, i.length);
				for (let t = i.iter(); !t.next().done; )
					t.lineBreak ? this.lineBreak() : this.append(t.value);
			} else
				3 == t.nodeType
					? this.readTextNode(t)
					: 'BR' == t.nodeName
						? t.nextSibling && this.lineBreak()
						: 1 == t.nodeType && this.readRange(t.firstChild, null);
		}
		findPointBefore(t, e) {
			for (let i of this.points)
				i.node == t &&
					t.childNodes[i.offset] == e &&
					(i.pos = this.text.length);
		}
		findPointInside(t, e) {
			for (let i of this.points)
				(3 == t.nodeType ? i.node == t : t.contains(i.node)) &&
					(i.pos =
						this.text.length + (La(t, i.node, i.offset) ? e : 0));
		}
	}
	function La(t, e, i) {
		for (;;) {
			if (!e || i < Ss(e)) return !1;
			if (e == t) return !0;
			(i = ys(e) + 1), (e = e.parentNode);
		}
	}
	class Ba {
		constructor(t, e) {
			(this.node = t), (this.offset = e), (this.pos = -1);
		}
	}
	class Ua {
		constructor(t, e, i, n) {
			(this.typeOver = n),
				(this.bounds = null),
				(this.text = ''),
				(this.domChanged = e > -1);
			let { impreciseHead: r, impreciseAnchor: s } = t.docView;
			if (t.state.readOnly && e > -1) this.newSel = null;
			else if (
				e > -1 &&
				(this.bounds = t.docView.domBoundsAround(e, i, 0))
			) {
				let e =
						r || s
							? []
							: (function (t) {
									let e = [];
									if (t.root.activeElement != t.contentDOM)
										return e;
									let {
										anchorNode: i,
										anchorOffset: n,
										focusNode: r,
										focusOffset: s,
									} = t.observer.selectionRange;
									return (
										i &&
											(e.push(new Ba(i, n)),
											(r == i && s == n) ||
												e.push(new Ba(r, s))),
										e
									);
								})(t),
					i = new za(e, t.state);
				i.readRange(this.bounds.startDOM, this.bounds.endDOM),
					(this.text = i.text),
					(this.newSel = (function (t, e) {
						if (0 == t.length) return null;
						let i = t[0].pos,
							n = 2 == t.length ? t[1].pos : i;
						return i > -1 && n > -1
							? Fn.single(i + e, n + e)
							: null;
					})(e, this.bounds.from));
			} else {
				let e = t.observer.selectionRange,
					i =
						(r &&
							r.node == e.focusNode &&
							r.offset == e.focusOffset) ||
						!ps(t.contentDOM, e.focusNode)
							? t.state.selection.main.head
							: t.docView.posFromDOM(e.focusNode, e.focusOffset),
					n =
						(s &&
							s.node == e.anchorNode &&
							s.offset == e.anchorOffset) ||
						!ps(t.contentDOM, e.anchorNode)
							? t.state.selection.main.anchor
							: t.docView.posFromDOM(
									e.anchorNode,
									e.anchorOffset
								),
					o = t.viewport;
				if (
					(to.ios || to.chrome) &&
					t.state.selection.main.empty &&
					i != n &&
					(o.from > 0 || o.to < t.state.doc.length)
				) {
					let e = Math.min(i, n),
						r = Math.max(i, n),
						s = o.from - e,
						a = o.to - r;
					(0 != s && 1 != s && 0 != e) ||
						(0 != a && -1 != a && r != t.state.doc.length) ||
						((i = 0), (n = t.state.doc.length));
				}
				this.newSel = Fn.single(n, i);
			}
		}
	}
	function Na(t, e) {
		let i,
			{ newSel: n } = e,
			r = t.state.selection.main,
			s =
				t.inputState.lastKeyTime > Date.now() - 100
					? t.inputState.lastKeyCode
					: -1;
		if (e.bounds) {
			let { from: n, to: o } = e.bounds,
				a = r.from,
				l = null;
			(8 === s || (to.android && e.text.length < o - n)) &&
				((a = r.to), (l = 'end'));
			let h = (function (t, e, i, n) {
				let r = Math.min(t.length, e.length),
					s = 0;
				for (; s < r && t.charCodeAt(s) == e.charCodeAt(s); ) s++;
				if (s == r && t.length == e.length) return null;
				let o = t.length,
					a = e.length;
				for (
					;
					o > 0 &&
					a > 0 &&
					t.charCodeAt(o - 1) == e.charCodeAt(a - 1);

				)
					o--, a--;
				return (
					'end' == n &&
						(i -= o + Math.max(0, s - Math.min(o, a)) - s),
					o < s && t.length < e.length
						? ((s -= i <= s && i >= o ? s - i : 0),
							(a = s + (a - o)),
							(o = s))
						: a < s &&
							((s -= i <= s && i >= a ? s - i : 0),
							(o = s + (o - a)),
							(a = s)),
					{ from: s, toA: o, toB: a }
				);
			})(t.state.doc.sliceString(n, o, Ya), e.text, a - n, l);
			h &&
				(to.chrome &&
					13 == s &&
					h.toB == h.from + 2 &&
					e.text.slice(h.from, h.toB) == Ya + Ya &&
					h.toB--,
				(i = {
					from: n + h.from,
					to: n + h.toA,
					insert: Qn.of(e.text.slice(h.from, h.toB).split(Ya)),
				}));
		} else
			n &&
				((!t.hasFocus && t.state.facet(ha)) || n.main.eq(r)) &&
				(n = null);
		if (!i && !n) return !1;
		if (
			(!i && e.typeOver && !r.empty && n && n.main.empty
				? (i = {
						from: r.from,
						to: r.to,
						insert: t.state.doc.slice(r.from, r.to),
					})
				: i &&
					  i.from >= r.from &&
					  i.to <= r.to &&
					  (i.from != r.from || i.to != r.to) &&
					  r.to - r.from - (i.to - i.from) <= 4
					? (i = {
							from: r.from,
							to: r.to,
							insert: t.state.doc
								.slice(r.from, i.from)
								.append(i.insert)
								.append(t.state.doc.slice(i.to, r.to)),
						})
					: (to.mac || to.android) &&
						  i &&
						  i.from == i.to &&
						  i.from == r.head - 1 &&
						  /^\. ?$/.test(i.insert.toString()) &&
						  'off' == t.contentDOM.getAttribute('autocorrect')
						? (n &&
								2 == i.insert.length &&
								(n = Fn.single(
									n.main.anchor - 1,
									n.main.head - 1
								)),
							(i = {
								from: r.from,
								to: r.to,
								insert: Qn.of([' ']),
							}))
						: to.chrome &&
							i &&
							i.from == i.to &&
							i.from == r.head &&
							'\n ' == i.insert.toString() &&
							t.lineWrapping &&
							(n &&
								(n = Fn.single(
									n.main.anchor - 1,
									n.main.head - 1
								)),
							(i = {
								from: r.from,
								to: r.to,
								insert: Qn.of([' ']),
							})),
			i)
		)
			return Ga(t, i, n, s);
		if (n && !n.main.eq(r)) {
			let e = !1,
				i = 'select';
			return (
				t.inputState.lastSelectionTime > Date.now() - 50 &&
					('select' == t.inputState.lastSelectionOrigin && (e = !0),
					(i = t.inputState.lastSelectionOrigin)),
				t.dispatch({ selection: n, scrollIntoView: e, userEvent: i }),
				!0
			);
		}
		return !1;
	}
	function Ga(t, e, i, n = -1) {
		if (to.ios && t.inputState.flushIOSKey(e)) return !0;
		let r = t.state.selection.main;
		if (
			to.android &&
			((e.to == r.to &&
				(e.from == r.from ||
					(e.from == r.from - 1 &&
						' ' == t.state.sliceDoc(e.from, r.from))) &&
				1 == e.insert.length &&
				2 == e.insert.lines &&
				As(t.contentDOM, 'Enter', 13)) ||
				(((e.from == r.from - 1 &&
					e.to == r.to &&
					0 == e.insert.length) ||
					(8 == n &&
						e.insert.length < e.to - e.from &&
						e.to > r.head)) &&
					As(t.contentDOM, 'Backspace', 8)) ||
				(e.from == r.from &&
					e.to == r.to + 1 &&
					0 == e.insert.length &&
					As(t.contentDOM, 'Delete', 46)))
		)
			return !0;
		let s,
			o = e.insert.toString();
		t.inputState.composing >= 0 && t.inputState.composing++;
		let a = () =>
			s ||
			(s = (function (t, e, i) {
				let n,
					r = t.state,
					s = r.selection.main;
				if (
					e.from >= s.from &&
					e.to <= s.to &&
					e.to - e.from >= (s.to - s.from) / 3 &&
					(!i ||
						(i.main.empty &&
							i.main.from == e.from + e.insert.length)) &&
					t.inputState.composing < 0
				) {
					let i = s.from < e.from ? r.sliceDoc(s.from, e.from) : '',
						o = s.to > e.to ? r.sliceDoc(e.to, s.to) : '';
					n = r.replaceSelection(
						t.state.toText(
							i +
								e.insert.sliceString(
									0,
									void 0,
									t.state.lineBreak
								) +
								o
						)
					);
				} else {
					let o = r.changes(e),
						a = i && i.main.to <= o.newLength ? i.main : void 0;
					if (
						r.selection.ranges.length > 1 &&
						t.inputState.composing >= 0 &&
						e.to <= s.to &&
						e.to >= s.to - 10
					) {
						let l,
							h = t.state.sliceDoc(e.from, e.to),
							c = i && Pa(t, i.main.head);
						if (c) {
							let t = e.insert.length - (e.to - e.from);
							l = { from: c.from, to: c.to - t };
						} else l = t.state.doc.lineAt(s.head);
						let u = s.to - e.to,
							d = s.to - s.from;
						n = r.changeByRange((i) => {
							if (i.from == s.from && i.to == s.to)
								return { changes: o, range: a || i.map(o) };
							let n = i.to - u,
								c = n - h.length;
							if (
								i.to - i.from != d ||
								t.state.sliceDoc(c, n) != h ||
								(i.to >= l.from && i.from <= l.to)
							)
								return { range: i };
							let f = r.changes({
									from: c,
									to: n,
									insert: e.insert,
								}),
								O = i.to - s.to;
							return {
								changes: f,
								range: a
									? Fn.range(
											Math.max(0, a.anchor + O),
											Math.max(0, a.head + O)
										)
									: i.map(f),
							};
						});
					} else
						n = {
							changes: o,
							selection: a && r.selection.replaceRange(a),
						};
				}
				let o = 'input.type';
				return (
					(t.composing ||
						(t.inputState.compositionPendingChange &&
							t.inputState.compositionEndedAt >
								Date.now() - 50)) &&
						((t.inputState.compositionPendingChange = !1),
						(o += '.compose'),
						t.inputState.compositionFirstChange &&
							((o += '.start'),
							(t.inputState.compositionFirstChange = !1))),
					r.update(n, { userEvent: o, scrollIntoView: !0 })
				);
			})(t, e, i));
		return (
			t.state.facet(Ko).some((i) => i(t, e.from, e.to, o, a)) ||
				t.dispatch(a()),
			!0
		);
	}
	class Ia {
		setSelectionOrigin(t) {
			(this.lastSelectionOrigin = t),
				(this.lastSelectionTime = Date.now());
		}
		constructor(t) {
			(this.view = t),
				(this.lastKeyCode = 0),
				(this.lastKeyTime = 0),
				(this.lastTouchTime = 0),
				(this.lastFocusTime = 0),
				(this.lastScrollTop = 0),
				(this.lastScrollLeft = 0),
				(this.pendingIOSKey = void 0),
				(this.tabFocusMode = -1),
				(this.lastSelectionOrigin = null),
				(this.lastSelectionTime = 0),
				(this.lastContextMenu = 0),
				(this.scrollHandlers = []),
				(this.handlers = Object.create(null)),
				(this.composing = -1),
				(this.compositionFirstChange = null),
				(this.compositionEndedAt = 0),
				(this.compositionPendingKey = !1),
				(this.compositionPendingChange = !1),
				(this.mouseSelection = null),
				(this.draggedContent = null),
				(this.handleEvent = this.handleEvent.bind(this)),
				(this.notifiedFocused = t.hasFocus),
				to.safari && t.contentDOM.addEventListener('input', () => null),
				to.gecko &&
					(function (t) {
						Sl.has(t) ||
							(Sl.add(t),
							t.addEventListener('copy', () => {}),
							t.addEventListener('cut', () => {}));
					})(t.contentDOM.ownerDocument);
		}
		handleEvent(t) {
			(function (t, e) {
				if (!e.bubbles) return !0;
				if (e.defaultPrevented) return !1;
				for (let i, n = e.target; n != t.contentDOM; n = n.parentNode)
					if (
						!n ||
						11 == n.nodeType ||
						((i = js.get(n)) && i.ignoreEvent(e))
					)
						return !1;
				return !0;
			})(this.view, t) &&
				!this.ignoreDuringComposition(t) &&
				(('keydown' == t.type && this.keydown(t)) ||
					this.runHandlers(t.type, t));
		}
		runHandlers(t, e) {
			let i = this.handlers[t];
			if (i) {
				for (let t of i.observers) t(this.view, e);
				for (let t of i.handlers) {
					if (e.defaultPrevented) break;
					if (t(this.view, e)) {
						e.preventDefault();
						break;
					}
				}
			}
		}
		ensureHandlers(t) {
			let e = Ha(t),
				i = this.handlers,
				n = this.view.contentDOM;
			for (let t in e)
				if ('scroll' != t) {
					let r = !e[t].handlers.length,
						s = i[t];
					s &&
						r != !s.handlers.length &&
						(n.removeEventListener(t, this.handleEvent),
						(s = null)),
						s ||
							n.addEventListener(t, this.handleEvent, {
								passive: r,
							});
				}
			for (let t in i)
				'scroll' == t ||
					e[t] ||
					n.removeEventListener(t, this.handleEvent);
			this.handlers = e;
		}
		keydown(t) {
			if (
				((this.lastKeyCode = t.keyCode),
				(this.lastKeyTime = Date.now()),
				9 == t.keyCode &&
					this.tabFocusMode > -1 &&
					(!this.tabFocusMode || Date.now() <= this.tabFocusMode))
			)
				return !0;
			if (
				(this.tabFocusMode > 0 &&
					27 != t.keyCode &&
					tl.indexOf(t.keyCode) < 0 &&
					(this.tabFocusMode = -1),
				to.android &&
					to.chrome &&
					!t.synthetic &&
					(13 == t.keyCode || 8 == t.keyCode))
			)
				return this.view.observer.delayAndroidKey(t.key, t.keyCode), !0;
			let e;
			return !to.ios ||
				t.synthetic ||
				t.altKey ||
				t.metaKey ||
				!(
					((e = Ka.find((e) => e.keyCode == t.keyCode)) &&
						!t.ctrlKey) ||
					(Ja.indexOf(t.key) > -1 && t.ctrlKey && !t.shiftKey)
				)
				? (229 != t.keyCode && this.view.observer.forceFlush(), !1)
				: ((this.pendingIOSKey = e || t),
					setTimeout(() => this.flushIOSKey(), 250),
					!0);
		}
		flushIOSKey(t) {
			let e = this.pendingIOSKey;
			return (
				!!e &&
				!(
					'Enter' == e.key &&
					t &&
					t.from < t.to &&
					/^\S+$/.test(t.insert.toString())
				) &&
				((this.pendingIOSKey = void 0),
				As(
					this.view.contentDOM,
					e.key,
					e.keyCode,
					e instanceof KeyboardEvent ? e : void 0
				))
			);
		}
		ignoreDuringComposition(t) {
			return (
				!!/^key/.test(t.type) &&
				(this.composing > 0 ||
					(!!(
						to.safari &&
						!to.ios &&
						this.compositionPendingKey &&
						Date.now() - this.compositionEndedAt < 100
					) &&
						((this.compositionPendingKey = !1), !0)))
			);
		}
		startMouseSelection(t) {
			this.mouseSelection && this.mouseSelection.destroy(),
				(this.mouseSelection = t);
		}
		update(t) {
			this.view.observer.update(t),
				this.mouseSelection && this.mouseSelection.update(t),
				this.draggedContent &&
					t.docChanged &&
					(this.draggedContent = this.draggedContent.map(t.changes)),
				t.transactions.length &&
					(this.lastKeyCode = this.lastSelectionTime = 0);
		}
		destroy() {
			this.mouseSelection && this.mouseSelection.destroy();
		}
	}
	function Fa(t, e) {
		return (i, n) => {
			try {
				return e.call(t, n, i);
			} catch (t) {
				la(i.state, t);
			}
		};
	}
	function Ha(t) {
		let e = Object.create(null);
		function i(t) {
			return e[t] || (e[t] = { observers: [], handlers: [] });
		}
		for (let e of t) {
			let t = e.spec;
			if (t && t.domEventHandlers)
				for (let n in t.domEventHandlers) {
					let r = t.domEventHandlers[n];
					r && i(n).handlers.push(Fa(e.value, r));
				}
			if (t && t.domEventObservers)
				for (let n in t.domEventObservers) {
					let r = t.domEventObservers[n];
					r && i(n).observers.push(Fa(e.value, r));
				}
		}
		for (let t in nl) i(t).handlers.push(nl[t]);
		for (let t in rl) i(t).observers.push(rl[t]);
		return e;
	}
	const Ka = [
			{
				key: 'Backspace',
				keyCode: 8,
				inputType: 'deleteContentBackward',
			},
			{ key: 'Enter', keyCode: 13, inputType: 'insertParagraph' },
			{ key: 'Enter', keyCode: 13, inputType: 'insertLineBreak' },
			{ key: 'Delete', keyCode: 46, inputType: 'deleteContentForward' },
		],
		Ja = 'dthko',
		tl = [16, 17, 18, 20, 91, 92, 224, 225];
	function el(t) {
		return 0.7 * Math.max(0, t) + 8;
	}
	class il {
		constructor(t, e, i, n) {
			(this.view = t),
				(this.startEvent = e),
				(this.style = i),
				(this.mustSelect = n),
				(this.scrollSpeed = { x: 0, y: 0 }),
				(this.scrolling = -1),
				(this.lastEvent = e),
				(this.scrollParents = (function (t) {
					let e,
						i,
						n = t.ownerDocument;
					for (
						let r = t.parentNode;
						r && !(r == n.body || (e && i));

					)
						if (1 == r.nodeType)
							!i && r.scrollHeight > r.clientHeight && (i = r),
								!e && r.scrollWidth > r.clientWidth && (e = r),
								(r = r.assignedSlot || r.parentNode);
						else {
							if (11 != r.nodeType) break;
							r = r.host;
						}
					return { x: e, y: i };
				})(t.contentDOM)),
				(this.atoms = t.state.facet(ba).map((e) => e(t)));
			let r = t.contentDOM.ownerDocument;
			r.addEventListener('mousemove', (this.move = this.move.bind(this))),
				r.addEventListener('mouseup', (this.up = this.up.bind(this))),
				(this.extend = e.shiftKey),
				(this.multiple =
					t.state.facet(Vr.allowMultipleSelections) &&
					(function (t, e) {
						let i = t.state.facet(No);
						return i.length
							? i[0](e)
							: to.mac
								? e.metaKey
								: e.ctrlKey;
					})(t, e)),
				(this.dragging =
					!(
						!(function (t, e) {
							let { main: i } = t.state.selection;
							if (i.empty) return !1;
							let n = Os(t.root);
							if (!n || 0 == n.rangeCount) return !0;
							let r = n.getRangeAt(0).getClientRects();
							for (let t = 0; t < r.length; t++) {
								let i = r[t];
								if (
									i.left <= e.clientX &&
									i.right >= e.clientX &&
									i.top <= e.clientY &&
									i.bottom >= e.clientY
								)
									return !0;
							}
							return !1;
						})(t, e) || 1 != ml(e)
					) && null);
		}
		start(t) {
			!1 === this.dragging && this.select(t);
		}
		move(t) {
			if (0 == t.buttons) return this.destroy();
			if (
				this.dragging ||
				(null == this.dragging &&
					((e = this.startEvent),
					(i = t),
					Math.max(
						Math.abs(e.clientX - i.clientX),
						Math.abs(e.clientY - i.clientY)
					) < 10))
			)
				return;
			var e, i;
			this.select((this.lastEvent = t));
			let n = 0,
				r = 0,
				s = 0,
				o = 0,
				a = this.view.win.innerWidth,
				l = this.view.win.innerHeight;
			this.scrollParents.x &&
				({ left: s, right: a } =
					this.scrollParents.x.getBoundingClientRect()),
				this.scrollParents.y &&
					({ top: o, bottom: l } =
						this.scrollParents.y.getBoundingClientRect());
			let h = Sa(this.view);
			t.clientX - h.left <= s + 6
				? (n = -el(s - t.clientX))
				: t.clientX + h.right >= a - 6 && (n = el(t.clientX - a)),
				t.clientY - h.top <= o + 6
					? (r = -el(o - t.clientY))
					: t.clientY + h.bottom >= l - 6 && (r = el(t.clientY - l)),
				this.setScrollSpeed(n, r);
		}
		up(t) {
			null == this.dragging && this.select(this.lastEvent),
				this.dragging || t.preventDefault(),
				this.destroy();
		}
		destroy() {
			this.setScrollSpeed(0, 0);
			let t = this.view.contentDOM.ownerDocument;
			t.removeEventListener('mousemove', this.move),
				t.removeEventListener('mouseup', this.up),
				(this.view.inputState.mouseSelection =
					this.view.inputState.draggedContent =
						null);
		}
		setScrollSpeed(t, e) {
			(this.scrollSpeed = { x: t, y: e }),
				t || e
					? this.scrolling < 0 &&
						(this.scrolling = setInterval(() => this.scroll(), 50))
					: this.scrolling > -1 &&
						(clearInterval(this.scrolling), (this.scrolling = -1));
		}
		scroll() {
			let { x: t, y: e } = this.scrollSpeed;
			t &&
				this.scrollParents.x &&
				((this.scrollParents.x.scrollLeft += t), (t = 0)),
				e &&
					this.scrollParents.y &&
					((this.scrollParents.y.scrollTop += e), (e = 0)),
				(t || e) && this.view.win.scrollBy(t, e),
				!1 === this.dragging && this.select(this.lastEvent);
		}
		skipAtoms(t) {
			let e = null;
			for (let i = 0; i < t.ranges.length; i++) {
				let n = t.ranges[i],
					r = null;
				if (n.empty) {
					let t = Ea(this.atoms, n.from, 0);
					t != n.from && (r = Fn.cursor(t, -1));
				} else {
					let t = Ea(this.atoms, n.from, -1),
						e = Ea(this.atoms, n.to, 1);
					(t == n.from && e == n.to) ||
						(r = Fn.range(
							n.from == n.anchor ? t : e,
							n.from == n.head ? t : e
						));
				}
				r && (e || (e = t.ranges.slice()), (e[i] = r));
			}
			return e ? Fn.create(e, t.mainIndex) : t;
		}
		select(t) {
			let { view: e } = this,
				i = this.skipAtoms(
					this.style.get(t, this.extend, this.multiple)
				);
			(!this.mustSelect &&
				i.eq(e.state.selection, !1 === this.dragging)) ||
				this.view.dispatch({
					selection: i,
					userEvent: 'select.pointer',
				}),
				(this.mustSelect = !1);
		}
		update(t) {
			t.transactions.some((t) => t.isUserEvent('input.type'))
				? this.destroy()
				: this.style.update(t) &&
					setTimeout(() => this.select(this.lastEvent), 20);
		}
	}
	const nl = Object.create(null),
		rl = Object.create(null),
		sl =
			(to.ie && to.ie_version < 15) ||
			(to.ios && to.webkit_version < 604);
	function ol(t, e, i) {
		for (let n of t.facet(e)) i = n(i, t);
		return i;
	}
	function al(t, e) {
		e = ol(t.state, ta, e);
		let i,
			{ state: n } = t,
			r = 1,
			s = n.toText(e),
			o = s.lines == n.selection.ranges.length;
		if (
			null != bl &&
			n.selection.ranges.every((t) => t.empty) &&
			bl == s.toString()
		) {
			let t = -1;
			i = n.changeByRange((i) => {
				let a = n.doc.lineAt(i.from);
				if (a.from == t) return { range: i };
				t = a.from;
				let l = n.toText((o ? s.line(r++).text : e) + n.lineBreak);
				return {
					changes: { from: a.from, insert: l },
					range: Fn.cursor(i.from + l.length),
				};
			});
		} else
			i = o
				? n.changeByRange((t) => {
						let e = s.line(r++);
						return {
							changes: { from: t.from, to: t.to, insert: e.text },
							range: Fn.cursor(t.from + e.length),
						};
					})
				: n.replaceSelection(s);
		t.dispatch(i, { userEvent: 'input.paste', scrollIntoView: !0 });
	}
	function ll(t, e, i, n) {
		if (1 == n) return Fn.cursor(e, i);
		if (2 == n)
			return (function (t, e, i = 1) {
				let n = t.charCategorizer(e),
					r = t.doc.lineAt(e),
					s = e - r.from;
				if (0 == r.length) return Fn.cursor(e);
				0 == s ? (i = 1) : s == r.length && (i = -1);
				let o = s,
					a = s;
				i < 0 ? (o = Rn(r.text, s, !1)) : (a = Rn(r.text, s));
				let l = n(r.text.slice(o, a));
				for (; o > 0; ) {
					let t = Rn(r.text, o, !1);
					if (n(r.text.slice(t, o)) != l) break;
					o = t;
				}
				for (; a < r.length; ) {
					let t = Rn(r.text, a);
					if (n(r.text.slice(a, t)) != l) break;
					a = t;
				}
				return Fn.range(o + r.from, a + r.from);
			})(t.state, e, i);
		{
			let i = So.find(t.docView, e),
				n = t.state.doc.lineAt(i ? i.posAtEnd : e),
				r = i ? i.posAtStart : n.from,
				s = i ? i.posAtEnd : n.to;
			return s < t.state.doc.length && s == n.to && s++, Fn.range(r, s);
		}
	}
	(rl.scroll = (t) => {
		(t.inputState.lastScrollTop = t.scrollDOM.scrollTop),
			(t.inputState.lastScrollLeft = t.scrollDOM.scrollLeft);
	}),
		(nl.keydown = (t, e) => (
			t.inputState.setSelectionOrigin('select'),
			27 == e.keyCode &&
				0 != t.inputState.tabFocusMode &&
				(t.inputState.tabFocusMode = Date.now() + 2e3),
			!1
		)),
		(rl.touchstart = (t, e) => {
			(t.inputState.lastTouchTime = Date.now()),
				t.inputState.setSelectionOrigin('select.pointer');
		}),
		(rl.touchmove = (t) => {
			t.inputState.setSelectionOrigin('select.pointer');
		}),
		(nl.mousedown = (t, e) => {
			if (
				(t.observer.flush(),
				t.inputState.lastTouchTime > Date.now() - 2e3)
			)
				return !1;
			let i = null;
			for (let n of t.state.facet(Io)) if (((i = n(t, e)), i)) break;
			if (
				(i ||
					0 != e.button ||
					(i = (function (t, e) {
						let i = ul(t, e),
							n = ml(e),
							r = t.state.selection;
						return {
							update(t) {
								t.docChanged &&
									((i.pos = t.changes.mapPos(i.pos)),
									(r = r.map(t.changes)));
							},
							get(e, s, o) {
								let a,
									l = ul(t, e),
									h = ll(t, l.pos, l.bias, n);
								if (i.pos != l.pos && !s) {
									let e = ll(t, i.pos, i.bias, n),
										r = Math.min(e.from, h.from),
										s = Math.max(e.to, h.to);
									h =
										r < h.from
											? Fn.range(r, s)
											: Fn.range(s, r);
								}
								return s
									? r.replaceRange(
											r.main.extend(h.from, h.to)
										)
									: o &&
										  1 == n &&
										  r.ranges.length > 1 &&
										  (a = (function (t, e) {
												for (
													let i = 0;
													i < t.ranges.length;
													i++
												) {
													let { from: n, to: r } =
														t.ranges[i];
													if (n <= e && r >= e)
														return Fn.create(
															t.ranges
																.slice(0, i)
																.concat(
																	t.ranges.slice(
																		i + 1
																	)
																),
															t.mainIndex == i
																? 0
																: t.mainIndex -
																		(t.mainIndex >
																		i
																			? 1
																			: 0)
														);
												}
												return null;
										  })(r, l.pos))
										? a
										: o
											? r.addRange(h)
											: Fn.create([h]);
							},
						};
					})(t, e)),
				i)
			) {
				let n = !t.hasFocus;
				t.inputState.startMouseSelection(new il(t, e, i, n)),
					n &&
						t.observer.ignore(() => {
							Ts(t.contentDOM);
							let e = t.root.activeElement;
							e && !e.contains(t.contentDOM) && e.blur();
						});
				let r = t.inputState.mouseSelection;
				if (r) return r.start(e), !1 === r.dragging;
			}
			return !1;
		});
	let hl = (t, e, i) =>
		e >= i.top && e <= i.bottom && t >= i.left && t <= i.right;
	function cl(t, e, i, n) {
		let r = So.find(t.docView, e);
		if (!r) return 1;
		let s = e - r.posAtStart;
		if (0 == s) return 1;
		if (s == r.length) return -1;
		let o = r.coordsAt(s, -1);
		if (o && hl(i, n, o)) return -1;
		let a = r.coordsAt(s, 1);
		return a && hl(i, n, a) ? 1 : o && o.bottom >= n ? -1 : 1;
	}
	function ul(t, e) {
		let i = t.posAtCoords({ x: e.clientX, y: e.clientY }, !1);
		return { pos: i, bias: cl(t, i, e.clientX, e.clientY) };
	}
	const dl = to.ie && to.ie_version <= 11;
	let fl = null,
		Ol = 0,
		pl = 0;
	function ml(t) {
		if (!dl) return t.detail;
		let e = fl,
			i = pl;
		return (
			(fl = t),
			(pl = Date.now()),
			(Ol =
				!e ||
				(i > Date.now() - 400 &&
					Math.abs(e.clientX - t.clientX) < 2 &&
					Math.abs(e.clientY - t.clientY) < 2)
					? (Ol + 1) % 3
					: 1)
		);
	}
	function gl(t, e, i, n) {
		if (!(i = ol(t.state, ta, i))) return;
		let r = t.posAtCoords({ x: e.clientX, y: e.clientY }, !1),
			{ draggedContent: s } = t.inputState,
			o =
				n &&
				s &&
				(function (t, e) {
					let i = t.state.facet(Go);
					return i.length ? i[0](e) : to.mac ? !e.altKey : !e.ctrlKey;
				})(t, e)
					? { from: s.from, to: s.to }
					: null,
			a = { from: r, insert: i },
			l = t.state.changes(o ? [o, a] : a);
		t.focus(),
			t.dispatch({
				changes: l,
				selection: { anchor: l.mapPos(r, -1), head: l.mapPos(r, 1) },
				userEvent: o ? 'move.drop' : 'input.drop',
			}),
			(t.inputState.draggedContent = null);
	}
	(nl.dragstart = (t, e) => {
		let {
			selection: { main: i },
		} = t.state;
		if (e.target.draggable) {
			let n = t.docView.nearest(e.target);
			if (n && n.isWidget) {
				let t = n.posAtStart,
					e = t + n.length;
				(t >= i.to || e <= i.from) && (i = Fn.range(t, e));
			}
		}
		let { inputState: n } = t;
		return (
			n.mouseSelection && (n.mouseSelection.dragging = !0),
			(n.draggedContent = i),
			e.dataTransfer &&
				(e.dataTransfer.setData(
					'Text',
					ol(t.state, ea, t.state.sliceDoc(i.from, i.to))
				),
				(e.dataTransfer.effectAllowed = 'copyMove')),
			!1
		);
	}),
		(nl.dragend = (t) => ((t.inputState.draggedContent = null), !1)),
		(nl.drop = (t, e) => {
			if (!e.dataTransfer) return !1;
			if (t.state.readOnly) return !0;
			let i = e.dataTransfer.files;
			if (i && i.length) {
				let n = Array(i.length),
					r = 0,
					s = () => {
						++r == i.length &&
							gl(
								t,
								e,
								n
									.filter((t) => null != t)
									.join(t.state.lineBreak),
								!1
							);
					};
				for (let t = 0; t < i.length; t++) {
					let e = new FileReader();
					(e.onerror = s),
						(e.onload = () => {
							/[\x00-\x08\x0e-\x1f]{2}/.test(e.result) ||
								(n[t] = e.result),
								s();
						}),
						e.readAsText(i[t]);
				}
				return !0;
			}
			{
				let i = e.dataTransfer.getData('Text');
				if (i) return gl(t, e, i, !0), !0;
			}
			return !1;
		}),
		(nl.paste = (t, e) => {
			if (t.state.readOnly) return !0;
			t.observer.flush();
			let i = sl ? null : e.clipboardData;
			return i
				? (al(t, i.getData('text/plain') || i.getData('text/uri-list')),
					!0)
				: ((function (t) {
						let e = t.dom.parentNode;
						if (!e) return;
						let i = e.appendChild(
							document.createElement('textarea')
						);
						(i.style.cssText =
							'position: fixed; left: -10000px; top: 10px'),
							i.focus(),
							setTimeout(() => {
								t.focus(), i.remove(), al(t, i.value);
							}, 50);
					})(t),
					!1);
		});
	let bl = null;
	nl.copy = nl.cut = (t, e) => {
		let {
			text: i,
			ranges: n,
			linewise: r,
		} = (function (t) {
			let e = [],
				i = [],
				n = !1;
			for (let n of t.selection.ranges)
				n.empty || (e.push(t.sliceDoc(n.from, n.to)), i.push(n));
			if (!e.length) {
				let r = -1;
				for (let { from: n } of t.selection.ranges) {
					let s = t.doc.lineAt(n);
					s.number > r &&
						(e.push(s.text),
						i.push({
							from: s.from,
							to: Math.min(t.doc.length, s.to + 1),
						})),
						(r = s.number);
				}
				n = !0;
			}
			return {
				text: ol(t, ea, e.join(t.lineBreak)),
				ranges: i,
				linewise: n,
			};
		})(t.state);
		if (!i && !r) return !1;
		(bl = r ? i : null),
			'cut' != e.type ||
				t.state.readOnly ||
				t.dispatch({
					changes: n,
					scrollIntoView: !0,
					userEvent: 'delete.cut',
				});
		let s = sl ? null : e.clipboardData;
		return s
			? (s.clearData(), s.setData('text/plain', i), !0)
			: ((function (t, e) {
					let i = t.dom.parentNode;
					if (!i) return;
					let n = i.appendChild(document.createElement('textarea'));
					(n.style.cssText =
						'position: fixed; left: -10000px; top: 10px'),
						(n.value = e),
						n.focus(),
						(n.selectionEnd = e.length),
						(n.selectionStart = 0),
						setTimeout(() => {
							n.remove(), t.focus();
						}, 50);
				})(t, i),
				!1);
	};
	const yl = Sr.define();
	function vl(t, e) {
		let i = [];
		for (let n of t.facet(Jo)) {
			let r = n(t, e);
			r && i.push(r);
		}
		return i ? t.update({ effects: i, annotations: yl.of(!0) }) : null;
	}
	function wl(t) {
		setTimeout(() => {
			let e = t.hasFocus;
			if (e != t.inputState.notifiedFocused) {
				let i = vl(t.state, e);
				i ? t.dispatch(i) : t.update([]);
			}
		}, 10);
	}
	(rl.focus = (t) => {
		(t.inputState.lastFocusTime = Date.now()),
			t.scrollDOM.scrollTop ||
				(!t.inputState.lastScrollTop && !t.inputState.lastScrollLeft) ||
				((t.scrollDOM.scrollTop = t.inputState.lastScrollTop),
				(t.scrollDOM.scrollLeft = t.inputState.lastScrollLeft)),
			wl(t);
	}),
		(rl.blur = (t) => {
			t.observer.clearSelectionRange(), wl(t);
		}),
		(rl.compositionstart = rl.compositionupdate =
			(t) => {
				t.observer.editContext ||
					(null == t.inputState.compositionFirstChange &&
						(t.inputState.compositionFirstChange = !0),
					t.inputState.composing < 0 && (t.inputState.composing = 0));
			}),
		(rl.compositionend = (t) => {
			t.observer.editContext ||
				((t.inputState.composing = -1),
				(t.inputState.compositionEndedAt = Date.now()),
				(t.inputState.compositionPendingKey = !0),
				(t.inputState.compositionPendingChange =
					t.observer.pendingRecords().length > 0),
				(t.inputState.compositionFirstChange = null),
				to.chrome && to.android
					? t.observer.flushSoon()
					: t.inputState.compositionPendingChange
						? Promise.resolve().then(() => t.observer.flush())
						: setTimeout(() => {
								t.inputState.composing < 0 &&
									t.docView.hasComposition &&
									t.update([]);
							}, 50));
		}),
		(rl.contextmenu = (t) => {
			t.inputState.lastContextMenu = Date.now();
		}),
		(nl.beforeinput = (t, e) => {
			var i, n;
			if (
				'insertReplacementText' == e.inputType &&
				t.observer.editContext
			) {
				let n =
						null === (i = e.dataTransfer) || void 0 === i
							? void 0
							: i.getData('text/plain'),
					r = e.getTargetRanges();
				if (n && r.length) {
					let e = r[0],
						i = t.posAtDOM(e.startContainer, e.startOffset),
						s = t.posAtDOM(e.endContainer, e.endOffset);
					return (
						Ga(
							t,
							{ from: i, to: s, insert: t.state.toText(n) },
							null
						),
						!0
					);
				}
			}
			let r;
			if (
				to.chrome &&
				to.android &&
				(r = Ka.find((t) => t.inputType == e.inputType)) &&
				(t.observer.delayAndroidKey(r.key, r.keyCode),
				'Backspace' == r.key || 'Delete' == r.key)
			) {
				let e =
					(null === (n = window.visualViewport) || void 0 === n
						? void 0
						: n.height) || 0;
				setTimeout(() => {
					var i;
					((null === (i = window.visualViewport) || void 0 === i
						? void 0
						: i.height) || 0) >
						e + 10 &&
						t.hasFocus &&
						(t.contentDOM.blur(), t.focus());
				}, 100);
			}
			return (
				to.ios &&
					'deleteContentForward' == e.inputType &&
					t.observer.flushSoon(),
				to.safari &&
					'insertText' == e.inputType &&
					t.inputState.composing >= 0 &&
					setTimeout(() => rl.compositionend(t, e), 20),
				!1
			);
		});
	const Sl = new Set(),
		xl = ['pre-wrap', 'normal', 'pre-line', 'break-spaces'];
	let Ql = !1;
	function kl() {
		Ql = !1;
	}
	class $l {
		constructor(t) {
			(this.lineWrapping = t),
				(this.doc = Qn.empty),
				(this.heightSamples = {}),
				(this.lineHeight = 14),
				(this.charWidth = 7),
				(this.textHeight = 14),
				(this.lineLength = 30);
		}
		heightForGap(t, e) {
			let i = this.doc.lineAt(e).number - this.doc.lineAt(t).number + 1;
			return (
				this.lineWrapping &&
					(i += Math.max(
						0,
						Math.ceil(
							(e - t - i * this.lineLength * 0.5) /
								this.lineLength
						)
					)),
				this.lineHeight * i
			);
		}
		heightForLine(t) {
			return this.lineWrapping
				? (1 +
						Math.max(
							0,
							Math.ceil(
								(t - this.lineLength) / (this.lineLength - 5)
							)
						)) *
						this.lineHeight
				: this.lineHeight;
		}
		setDoc(t) {
			return (this.doc = t), this;
		}
		mustRefreshForWrapping(t) {
			return xl.indexOf(t) > -1 != this.lineWrapping;
		}
		mustRefreshForHeights(t) {
			let e = !1;
			for (let i = 0; i < t.length; i++) {
				let n = t[i];
				n < 0
					? i++
					: this.heightSamples[Math.floor(10 * n)] ||
						((e = !0),
						(this.heightSamples[Math.floor(10 * n)] = !0));
			}
			return e;
		}
		refresh(t, e, i, n, r, s) {
			let o = xl.indexOf(t) > -1,
				a =
					Math.round(e) != Math.round(this.lineHeight) ||
					this.lineWrapping != o;
			if (
				((this.lineWrapping = o),
				(this.lineHeight = e),
				(this.charWidth = i),
				(this.textHeight = n),
				(this.lineLength = r),
				a)
			) {
				this.heightSamples = {};
				for (let t = 0; t < s.length; t++) {
					let e = s[t];
					e < 0 ? t++ : (this.heightSamples[Math.floor(10 * e)] = !0);
				}
			}
			return a;
		}
	}
	class Pl {
		constructor(t, e) {
			(this.from = t), (this.heights = e), (this.index = 0);
		}
		get more() {
			return this.index < this.heights.length;
		}
	}
	class Zl {
		constructor(t, e, i, n, r) {
			(this.from = t),
				(this.length = e),
				(this.top = i),
				(this.height = n),
				(this._content = r);
		}
		get type() {
			return 'number' == typeof this._content
				? po.Text
				: Array.isArray(this._content)
					? this._content
					: this._content.type;
		}
		get to() {
			return this.from + this.length;
		}
		get bottom() {
			return this.top + this.height;
		}
		get widget() {
			return this._content instanceof yo ? this._content.widget : null;
		}
		get widgetLineBreaks() {
			return 'number' == typeof this._content ? this._content : 0;
		}
		join(t) {
			let e = (
				Array.isArray(this._content) ? this._content : [this]
			).concat(Array.isArray(t._content) ? t._content : [t]);
			return new Zl(
				this.from,
				this.length + t.length,
				this.top,
				this.height + t.height,
				e
			);
		}
	}
	var Tl = (function (t) {
		return (
			(t[(t.ByPos = 0)] = 'ByPos'),
			(t[(t.ByHeight = 1)] = 'ByHeight'),
			(t[(t.ByPosNoHeight = 2)] = 'ByPosNoHeight'),
			t
		);
	})(Tl || (Tl = {}));
	const Cl = 0.001;
	class Al {
		constructor(t, e, i = 2) {
			(this.length = t), (this.height = e), (this.flags = i);
		}
		get outdated() {
			return (2 & this.flags) > 0;
		}
		set outdated(t) {
			this.flags = (t ? 2 : 0) | (-3 & this.flags);
		}
		setHeight(t) {
			this.height != t &&
				(Math.abs(this.height - t) > Cl && (Ql = !0),
				(this.height = t));
		}
		replace(t, e, i) {
			return Al.of(i);
		}
		decomposeLeft(t, e) {
			e.push(this);
		}
		decomposeRight(t, e) {
			e.push(this);
		}
		applyChanges(t, e, i, n) {
			let r = this,
				s = i.doc;
			for (let o = n.length - 1; o >= 0; o--) {
				let { fromA: a, toA: l, fromB: h, toB: c } = n[o],
					u = r.lineAt(a, Tl.ByPosNoHeight, i.setDoc(e), 0, 0),
					d = u.to >= l ? u : r.lineAt(l, Tl.ByPosNoHeight, i, 0, 0);
				for (c += d.to - l, l = d.to; o > 0 && u.from <= n[o - 1].toA; )
					(a = n[o - 1].fromA),
						(h = n[o - 1].fromB),
						o--,
						a < u.from &&
							(u = r.lineAt(a, Tl.ByPosNoHeight, i, 0, 0));
				(h += u.from - a), (a = u.from);
				let f = jl.build(i.setDoc(s), t, h, c);
				r = Xl(r, r.replace(a, l, f));
			}
			return r.updateHeight(i, 0);
		}
		static empty() {
			return new Rl(0, 0);
		}
		static of(t) {
			if (1 == t.length) return t[0];
			let e = 0,
				i = t.length,
				n = 0,
				r = 0;
			for (;;)
				if (e == i)
					if (n > 2 * r) {
						let r = t[e - 1];
						r.break
							? t.splice(--e, 1, r.left, null, r.right)
							: t.splice(--e, 1, r.left, r.right),
							(i += 1 + r.break),
							(n -= r.size);
					} else {
						if (!(r > 2 * n)) break;
						{
							let e = t[i];
							e.break
								? t.splice(i, 1, e.left, null, e.right)
								: t.splice(i, 1, e.left, e.right),
								(i += 2 + e.break),
								(r -= e.size);
						}
					}
				else if (n < r) {
					let i = t[e++];
					i && (n += i.size);
				} else {
					let e = t[--i];
					e && (r += e.size);
				}
			let s = 0;
			return (
				null == t[e - 1]
					? ((s = 1), e--)
					: null == t[e] && ((s = 1), i++),
				new Vl(Al.of(t.slice(0, e)), s, Al.of(t.slice(i)))
			);
		}
	}
	function Xl(t, e) {
		return t == e ? t : (t.constructor != e.constructor && (Ql = !0), e);
	}
	Al.prototype.size = 1;
	class Ml extends Al {
		constructor(t, e, i) {
			super(t, e), (this.deco = i);
		}
		blockAt(t, e, i, n) {
			return new Zl(n, this.length, i, this.height, this.deco || 0);
		}
		lineAt(t, e, i, n, r) {
			return this.blockAt(0, i, n, r);
		}
		forEachLine(t, e, i, n, r, s) {
			t <= r + this.length && e >= r && s(this.blockAt(0, i, n, r));
		}
		updateHeight(t, e = 0, i = !1, n) {
			return (
				n &&
					n.from <= e &&
					n.more &&
					this.setHeight(n.heights[n.index++]),
				(this.outdated = !1),
				this
			);
		}
		toString() {
			return `block(${this.length})`;
		}
	}
	class Rl extends Ml {
		constructor(t, e) {
			super(t, e, null),
				(this.collapsed = 0),
				(this.widgetHeight = 0),
				(this.breaks = 0);
		}
		blockAt(t, e, i, n) {
			return new Zl(n, this.length, i, this.height, this.breaks);
		}
		replace(t, e, i) {
			let n = i[0];
			return 1 == i.length &&
				(n instanceof Rl || (n instanceof _l && 4 & n.flags)) &&
				Math.abs(this.length - n.length) < 10
				? (n instanceof _l
						? (n = new Rl(n.length, this.height))
						: (n.height = this.height),
					this.outdated || (n.outdated = !1),
					n)
				: Al.of(i);
		}
		updateHeight(t, e = 0, i = !1, n) {
			return (
				n && n.from <= e && n.more
					? this.setHeight(n.heights[n.index++])
					: (i || this.outdated) &&
						this.setHeight(
							Math.max(
								this.widgetHeight,
								t.heightForLine(this.length - this.collapsed)
							) +
								this.breaks * t.lineHeight
						),
				(this.outdated = !1),
				this
			);
		}
		toString() {
			return `line(${this.length}${this.collapsed ? -this.collapsed : ''}${this.widgetHeight ? ':' + this.widgetHeight : ''})`;
		}
	}
	class _l extends Al {
		constructor(t) {
			super(t, 0);
		}
		heightMetrics(t, e) {
			let i,
				n = t.doc.lineAt(e).number,
				r = t.doc.lineAt(e + this.length).number,
				s = r - n + 1,
				o = 0;
			if (t.lineWrapping) {
				let e = Math.min(this.height, t.lineHeight * s);
				(i = e / s),
					this.length > s + 1 &&
						(o = (this.height - e) / (this.length - s - 1));
			} else i = this.height / s;
			return { firstLine: n, lastLine: r, perLine: i, perChar: o };
		}
		blockAt(t, e, i, n) {
			let {
				firstLine: r,
				lastLine: s,
				perLine: o,
				perChar: a,
			} = this.heightMetrics(e, n);
			if (e.lineWrapping) {
				let r =
						n +
						(t < e.lineHeight
							? 0
							: Math.round(
									Math.max(
										0,
										Math.min(1, (t - i) / this.height)
									) * this.length
								)),
					s = e.doc.lineAt(r),
					l = o + s.length * a,
					h = Math.max(i, t - l / 2);
				return new Zl(s.from, s.length, h, l, 0);
			}
			{
				let n = Math.max(0, Math.min(s - r, Math.floor((t - i) / o))),
					{ from: a, length: l } = e.doc.line(r + n);
				return new Zl(a, l, i + o * n, o, 0);
			}
		}
		lineAt(t, e, i, n, r) {
			if (e == Tl.ByHeight) return this.blockAt(t, i, n, r);
			if (e == Tl.ByPosNoHeight) {
				let { from: e, to: n } = i.doc.lineAt(t);
				return new Zl(e, n - e, 0, 0, 0);
			}
			let {
					firstLine: s,
					perLine: o,
					perChar: a,
				} = this.heightMetrics(i, r),
				l = i.doc.lineAt(t),
				h = o + l.length * a,
				c = l.number - s,
				u = n + o * c + a * (l.from - r - c);
			return new Zl(
				l.from,
				l.length,
				Math.max(n, Math.min(u, n + this.height - h)),
				h,
				0
			);
		}
		forEachLine(t, e, i, n, r, s) {
			(t = Math.max(t, r)), (e = Math.min(e, r + this.length));
			let {
				firstLine: o,
				perLine: a,
				perChar: l,
			} = this.heightMetrics(i, r);
			for (let h = t, c = n; h <= e; ) {
				let e = i.doc.lineAt(h);
				if (h == t) {
					let i = e.number - o;
					c += a * i + l * (t - r - i);
				}
				let n = a + l * e.length;
				s(new Zl(e.from, e.length, c, n, 0)), (c += n), (h = e.to + 1);
			}
		}
		replace(t, e, i) {
			let n = this.length - e;
			if (n > 0) {
				let t = i[i.length - 1];
				t instanceof _l
					? (i[i.length - 1] = new _l(t.length + n))
					: i.push(null, new _l(n - 1));
			}
			if (t > 0) {
				let e = i[0];
				e instanceof _l
					? (i[0] = new _l(t + e.length))
					: i.unshift(new _l(t - 1), null);
			}
			return Al.of(i);
		}
		decomposeLeft(t, e) {
			e.push(new _l(t - 1), null);
		}
		decomposeRight(t, e) {
			e.push(null, new _l(this.length - t - 1));
		}
		updateHeight(t, e = 0, i = !1, n) {
			let r = e + this.length;
			if (n && n.from <= e + this.length && n.more) {
				let i = [],
					s = Math.max(e, n.from),
					o = -1;
				for (
					n.from > e &&
					i.push(new _l(n.from - e - 1).updateHeight(t, e));
					s <= r && n.more;

				) {
					let e = t.doc.lineAt(s).length;
					i.length && i.push(null);
					let r = n.heights[n.index++];
					-1 == o ? (o = r) : Math.abs(r - o) >= Cl && (o = -2);
					let a = new Rl(e, r);
					(a.outdated = !1), i.push(a), (s += e + 1);
				}
				s <= r && i.push(null, new _l(r - s).updateHeight(t, s));
				let a = Al.of(i);
				return (
					(o < 0 ||
						Math.abs(a.height - this.height) >= Cl ||
						Math.abs(o - this.heightMetrics(t, e).perLine) >= Cl) &&
						(Ql = !0),
					Xl(this, a)
				);
			}
			return (
				(i || this.outdated) &&
					(this.setHeight(t.heightForGap(e, e + this.length)),
					(this.outdated = !1)),
				this
			);
		}
		toString() {
			return `gap(${this.length})`;
		}
	}
	class Vl extends Al {
		constructor(t, e, i) {
			super(
				t.length + e + i.length,
				t.height + i.height,
				e | (t.outdated || i.outdated ? 2 : 0)
			),
				(this.left = t),
				(this.right = i),
				(this.size = t.size + i.size);
		}
		get break() {
			return 1 & this.flags;
		}
		blockAt(t, e, i, n) {
			let r = i + this.left.height;
			return t < r
				? this.left.blockAt(t, e, i, n)
				: this.right.blockAt(
						t,
						e,
						r,
						n + this.left.length + this.break
					);
		}
		lineAt(t, e, i, n, r) {
			let s = n + this.left.height,
				o = r + this.left.length + this.break,
				a = e == Tl.ByHeight ? t < s : t < o,
				l = a
					? this.left.lineAt(t, e, i, n, r)
					: this.right.lineAt(t, e, i, s, o);
			if (this.break || (a ? l.to < o : l.from > o)) return l;
			let h = e == Tl.ByPosNoHeight ? Tl.ByPosNoHeight : Tl.ByPos;
			return a
				? l.join(this.right.lineAt(o, h, i, s, o))
				: this.left.lineAt(o, h, i, n, r).join(l);
		}
		forEachLine(t, e, i, n, r, s) {
			let o = n + this.left.height,
				a = r + this.left.length + this.break;
			if (this.break)
				t < a && this.left.forEachLine(t, e, i, n, r, s),
					e >= a && this.right.forEachLine(t, e, i, o, a, s);
			else {
				let l = this.lineAt(a, Tl.ByPos, i, n, r);
				t < l.from && this.left.forEachLine(t, l.from - 1, i, n, r, s),
					l.to >= t && l.from <= e && s(l),
					e > l.to && this.right.forEachLine(l.to + 1, e, i, o, a, s);
			}
		}
		replace(t, e, i) {
			let n = this.left.length + this.break;
			if (e < n)
				return this.balanced(this.left.replace(t, e, i), this.right);
			if (t > this.left.length)
				return this.balanced(
					this.left,
					this.right.replace(t - n, e - n, i)
				);
			let r = [];
			t > 0 && this.decomposeLeft(t, r);
			let s = r.length;
			for (let t of i) r.push(t);
			if ((t > 0 && ql(r, s - 1), e < this.length)) {
				let t = r.length;
				this.decomposeRight(e, r), ql(r, t);
			}
			return Al.of(r);
		}
		decomposeLeft(t, e) {
			let i = this.left.length;
			if (t <= i) return this.left.decomposeLeft(t, e);
			e.push(this.left),
				this.break && (i++, t >= i && e.push(null)),
				t > i && this.right.decomposeLeft(t - i, e);
		}
		decomposeRight(t, e) {
			let i = this.left.length,
				n = i + this.break;
			if (t >= n) return this.right.decomposeRight(t - n, e);
			t < i && this.left.decomposeRight(t, e),
				this.break && t < n && e.push(null),
				e.push(this.right);
		}
		balanced(t, e) {
			return t.size > 2 * e.size || e.size > 2 * t.size
				? Al.of(this.break ? [t, null, e] : [t, e])
				: ((this.left = Xl(this.left, t)),
					(this.right = Xl(this.right, e)),
					this.setHeight(t.height + e.height),
					(this.outdated = t.outdated || e.outdated),
					(this.size = t.size + e.size),
					(this.length = t.length + this.break + e.length),
					this);
		}
		updateHeight(t, e = 0, i = !1, n) {
			let { left: r, right: s } = this,
				o = e + r.length + this.break,
				a = null;
			return (
				n && n.from <= e + r.length && n.more
					? (a = r = r.updateHeight(t, e, i, n))
					: r.updateHeight(t, e, i),
				n && n.from <= o + s.length && n.more
					? (a = s = s.updateHeight(t, o, i, n))
					: s.updateHeight(t, o, i),
				a
					? this.balanced(r, s)
					: ((this.height = this.left.height + this.right.height),
						(this.outdated = !1),
						this)
			);
		}
		toString() {
			return this.left + (this.break ? ' ' : '-') + this.right;
		}
	}
	function ql(t, e) {
		let i, n;
		null == t[e] &&
			(i = t[e - 1]) instanceof _l &&
			(n = t[e + 1]) instanceof _l &&
			t.splice(e - 1, 3, new _l(i.length + 1 + n.length));
	}
	class jl {
		constructor(t, e) {
			(this.pos = t),
				(this.oracle = e),
				(this.nodes = []),
				(this.lineStart = -1),
				(this.lineEnd = -1),
				(this.covering = null),
				(this.writtenTo = t);
		}
		get isCovered() {
			return (
				this.covering &&
				this.nodes[this.nodes.length - 1] == this.covering
			);
		}
		span(t, e) {
			if (this.lineStart > -1) {
				let t = Math.min(e, this.lineEnd),
					i = this.nodes[this.nodes.length - 1];
				i instanceof Rl
					? (i.length += t - this.pos)
					: (t > this.pos || !this.isCovered) &&
						this.nodes.push(new Rl(t - this.pos, -1)),
					(this.writtenTo = t),
					e > t &&
						(this.nodes.push(null),
						this.writtenTo++,
						(this.lineStart = -1));
			}
			this.pos = e;
		}
		point(t, e, i) {
			if (t < e || i.heightRelevant) {
				let n = i.widget ? i.widget.estimatedHeight : 0,
					r = i.widget ? i.widget.lineBreaks : 0;
				n < 0 && (n = this.oracle.lineHeight);
				let s = e - t;
				i.block
					? this.addBlock(new Ml(s, n, i))
					: (s || r || n >= 5) && this.addLineDeco(n, r, s);
			} else e > t && this.span(t, e);
			this.lineEnd > -1 &&
				this.lineEnd < this.pos &&
				(this.lineEnd = this.oracle.doc.lineAt(this.pos).to);
		}
		enterLine() {
			if (this.lineStart > -1) return;
			let { from: t, to: e } = this.oracle.doc.lineAt(this.pos);
			(this.lineStart = t),
				(this.lineEnd = e),
				this.writtenTo < t &&
					((this.writtenTo < t - 1 ||
						null == this.nodes[this.nodes.length - 1]) &&
						this.nodes.push(
							this.blankContent(this.writtenTo, t - 1)
						),
					this.nodes.push(null)),
				this.pos > t && this.nodes.push(new Rl(this.pos - t, -1)),
				(this.writtenTo = this.pos);
		}
		blankContent(t, e) {
			let i = new _l(e - t);
			return this.oracle.doc.lineAt(t).to == e && (i.flags |= 4), i;
		}
		ensureLine() {
			this.enterLine();
			let t = this.nodes.length
				? this.nodes[this.nodes.length - 1]
				: null;
			if (t instanceof Rl) return t;
			let e = new Rl(0, -1);
			return this.nodes.push(e), e;
		}
		addBlock(t) {
			this.enterLine();
			let e = t.deco;
			e && e.startSide > 0 && !this.isCovered && this.ensureLine(),
				this.nodes.push(t),
				(this.writtenTo = this.pos = this.pos + t.length),
				e && e.endSide > 0 && (this.covering = t);
		}
		addLineDeco(t, e, i) {
			let n = this.ensureLine();
			(n.length += i),
				(n.collapsed += i),
				(n.widgetHeight = Math.max(n.widgetHeight, t)),
				(n.breaks += e),
				(this.writtenTo = this.pos = this.pos + i);
		}
		finish(t) {
			let e =
				0 == this.nodes.length
					? null
					: this.nodes[this.nodes.length - 1];
			!(this.lineStart > -1) || e instanceof Rl || this.isCovered
				? (this.writtenTo < this.pos || null == e) &&
					this.nodes.push(this.blankContent(this.writtenTo, this.pos))
				: this.nodes.push(new Rl(0, -1));
			let i = t;
			for (let t of this.nodes)
				t instanceof Rl && t.updateHeight(this.oracle, i),
					(i += t ? t.length : 1);
			return this.nodes;
		}
		static build(t, e, i, n) {
			let r = new jl(i, t);
			return Yr.spans(e, i, n, r, 0), r.finish(i);
		}
	}
	class Dl {
		constructor() {
			this.changes = [];
		}
		compareRange() {}
		comparePoint(t, e, i, n) {
			(t < e || (i && i.heightRelevant) || (n && n.heightRelevant)) &&
				wo(t, e, this.changes, 5);
		}
	}
	function El(t, e) {
		let i = t.getBoundingClientRect(),
			n = t.ownerDocument,
			r = n.defaultView || window,
			s = Math.max(0, i.left),
			o = Math.min(r.innerWidth, i.right),
			a = Math.max(0, i.top),
			l = Math.min(r.innerHeight, i.bottom);
		for (let e = t.parentNode; e && e != n.body; )
			if (1 == e.nodeType) {
				let i = e,
					n = window.getComputedStyle(i);
				if (
					(i.scrollHeight > i.clientHeight ||
						i.scrollWidth > i.clientWidth) &&
					'visible' != n.overflow
				) {
					let n = i.getBoundingClientRect();
					(s = Math.max(s, n.left)),
						(o = Math.min(o, n.right)),
						(a = Math.max(a, n.top)),
						(l = Math.min(
							e == t.parentNode ? r.innerHeight : l,
							n.bottom
						));
				}
				e =
					'absolute' == n.position || 'fixed' == n.position
						? i.offsetParent
						: i.parentNode;
			} else {
				if (11 != e.nodeType) break;
				e = e.host;
			}
		return {
			left: s - i.left,
			right: Math.max(s, o) - i.left,
			top: a - (i.top + e),
			bottom: Math.max(a, l) - (i.top + e),
		};
	}
	function Wl(t, e) {
		let i = t.getBoundingClientRect();
		return {
			left: 0,
			right: i.right - i.left,
			top: e,
			bottom: i.bottom - (i.top + e),
		};
	}
	class Yl {
		constructor(t, e, i, n) {
			(this.from = t),
				(this.to = e),
				(this.size = i),
				(this.displaySize = n);
		}
		static same(t, e) {
			if (t.length != e.length) return !1;
			for (let i = 0; i < t.length; i++) {
				let n = t[i],
					r = e[i];
				if (n.from != r.from || n.to != r.to || n.size != r.size)
					return !1;
			}
			return !0;
		}
		draw(t, e) {
			return mo
				.replace({
					widget: new zl(
						this.displaySize * (e ? t.scaleY : t.scaleX),
						e
					),
				})
				.range(this.from, this.to);
		}
	}
	class zl extends Oo {
		constructor(t, e) {
			super(), (this.size = t), (this.vertical = e);
		}
		eq(t) {
			return t.size == this.size && t.vertical == this.vertical;
		}
		toDOM() {
			let t = document.createElement('div');
			return (
				this.vertical
					? (t.style.height = this.size + 'px')
					: ((t.style.width = this.size + 'px'),
						(t.style.height = '2px'),
						(t.style.display = 'inline-block')),
				t
			);
		}
		get estimatedHeight() {
			return this.vertical ? this.size : -1;
		}
	}
	class Ll {
		constructor(t) {
			(this.state = t),
				(this.pixelViewport = {
					left: 0,
					right: window.innerWidth,
					top: 0,
					bottom: 0,
				}),
				(this.inView = !0),
				(this.paddingTop = 0),
				(this.paddingBottom = 0),
				(this.contentDOMWidth = 0),
				(this.contentDOMHeight = 0),
				(this.editorHeight = 0),
				(this.editorWidth = 0),
				(this.scrollTop = 0),
				(this.scrolledToBottom = !1),
				(this.scaleX = 1),
				(this.scaleY = 1),
				(this.scrollAnchorPos = 0),
				(this.scrollAnchorHeight = -1),
				(this.scaler = Gl),
				(this.scrollTarget = null),
				(this.printing = !1),
				(this.mustMeasureContent = !0),
				(this.defaultTextDirection = Zo.LTR),
				(this.visibleRanges = []),
				(this.mustEnforceCursorAssoc = !1);
			let e = t
				.facet(pa)
				.some(
					(t) =>
						'function' != typeof t && 'cm-lineWrapping' == t.class
				);
			(this.heightOracle = new $l(e)),
				(this.stateDeco = t
					.facet(ma)
					.filter((t) => 'function' != typeof t)),
				(this.heightMap = Al.empty().applyChanges(
					this.stateDeco,
					Qn.empty,
					this.heightOracle.setDoc(t.doc),
					[new Qa(0, 0, 0, t.doc.length)]
				));
			for (
				let t = 0;
				t < 2 &&
				((this.viewport = this.getViewport(0, null)),
				this.updateForViewport());
				t++
			);
			this.updateViewportLines(),
				(this.lineGaps = this.ensureLineGaps([])),
				(this.lineGapDeco = mo.set(
					this.lineGaps.map((t) => t.draw(this, !1))
				)),
				this.computeVisibleRanges();
		}
		updateForViewport() {
			let t = [this.viewport],
				{ main: e } = this.state.selection;
			for (let i = 0; i <= 1; i++) {
				let n = i ? e.head : e.anchor;
				if (!t.some(({ from: t, to: e }) => n >= t && n <= e)) {
					let { from: e, to: i } = this.lineBlockAt(n);
					t.push(new Bl(e, i));
				}
			}
			return (
				(this.viewports = t.sort((t, e) => t.from - e.from)),
				this.updateScaler()
			);
		}
		updateScaler() {
			let t = this.scaler;
			return (
				(this.scaler =
					this.heightMap.height <= 7e6
						? Gl
						: new Il(
								this.heightOracle,
								this.heightMap,
								this.viewports
							)),
				t.eq(this.scaler) ? 0 : 2
			);
		}
		updateViewportLines() {
			(this.viewportLines = []),
				this.heightMap.forEachLine(
					this.viewport.from,
					this.viewport.to,
					this.heightOracle.setDoc(this.state.doc),
					0,
					0,
					(t) => {
						this.viewportLines.push(Fl(t, this.scaler));
					}
				);
		}
		update(t, e = null) {
			this.state = t.state;
			let i = this.stateDeco;
			this.stateDeco = this.state
				.facet(ma)
				.filter((t) => 'function' != typeof t);
			let n = t.changedRanges,
				r = Qa.extendWithRanges(
					n,
					(function (t, e, i) {
						let n = new Dl();
						return Yr.compare(t, e, i, n, 0), n.changes;
					})(
						i,
						this.stateDeco,
						t ? t.changes : Yn.empty(this.state.doc.length)
					)
				),
				s = this.heightMap.height,
				o = this.scrolledToBottom
					? null
					: this.scrollAnchorAt(this.scrollTop);
			kl(),
				(this.heightMap = this.heightMap.applyChanges(
					this.stateDeco,
					t.startState.doc,
					this.heightOracle.setDoc(this.state.doc),
					r
				)),
				(this.heightMap.height != s || Ql) && (t.flags |= 2),
				o
					? ((this.scrollAnchorPos = t.changes.mapPos(o.from, -1)),
						(this.scrollAnchorHeight = o.top))
					: ((this.scrollAnchorPos = -1),
						(this.scrollAnchorHeight = this.heightMap.height));
			let a = r.length
				? this.mapViewport(this.viewport, t.changes)
				: this.viewport;
			((e && (e.range.head < a.from || e.range.head > a.to)) ||
				!this.viewportIsAppropriate(a)) &&
				(a = this.getViewport(0, e));
			let l = a.from != this.viewport.from || a.to != this.viewport.to;
			(this.viewport = a),
				(t.flags |= this.updateForViewport()),
				(l || !t.changes.empty || 2 & t.flags) &&
					this.updateViewportLines(),
				(this.lineGaps.length ||
					this.viewport.to - this.viewport.from > 4e3) &&
					this.updateLineGaps(
						this.ensureLineGaps(
							this.mapLineGaps(this.lineGaps, t.changes)
						)
					),
				(t.flags |= this.computeVisibleRanges()),
				e && (this.scrollTarget = e),
				!this.mustEnforceCursorAssoc &&
					t.selectionSet &&
					t.view.lineWrapping &&
					t.state.selection.main.empty &&
					t.state.selection.main.assoc &&
					!t.state.facet(na) &&
					(this.mustEnforceCursorAssoc = !0);
		}
		measure(t) {
			let e = t.contentDOM,
				i = window.getComputedStyle(e),
				n = this.heightOracle,
				r = i.whiteSpace;
			this.defaultTextDirection = 'rtl' == i.direction ? Zo.RTL : Zo.LTR;
			let s = this.heightOracle.mustRefreshForWrapping(r),
				o = e.getBoundingClientRect(),
				a =
					s ||
					this.mustMeasureContent ||
					this.contentDOMHeight != o.height;
			(this.contentDOMHeight = o.height), (this.mustMeasureContent = !1);
			let l = 0,
				h = 0;
			if (o.width && o.height) {
				let { scaleX: t, scaleY: i } = ks(e, o);
				((t > 0.005 && Math.abs(this.scaleX - t) > 0.005) ||
					(i > 0.005 && Math.abs(this.scaleY - i) > 0.005)) &&
					((this.scaleX = t),
					(this.scaleY = i),
					(l |= 8),
					(s = a = !0));
			}
			let c = (parseInt(i.paddingTop) || 0) * this.scaleY,
				u = (parseInt(i.paddingBottom) || 0) * this.scaleY;
			(this.paddingTop == c && this.paddingBottom == u) ||
				((this.paddingTop = c), (this.paddingBottom = u), (l |= 10)),
				this.editorWidth != t.scrollDOM.clientWidth &&
					(n.lineWrapping && (a = !0),
					(this.editorWidth = t.scrollDOM.clientWidth),
					(l |= 8));
			let d = t.scrollDOM.scrollTop * this.scaleY;
			this.scrollTop != d &&
				((this.scrollAnchorHeight = -1), (this.scrollTop = d)),
				(this.scrolledToBottom = Ms(t.scrollDOM));
			let f = (this.printing ? Wl : El)(e, this.paddingTop),
				O = f.top - this.pixelViewport.top,
				p = f.bottom - this.pixelViewport.bottom;
			this.pixelViewport = f;
			let m =
				this.pixelViewport.bottom > this.pixelViewport.top &&
				this.pixelViewport.right > this.pixelViewport.left;
			if (
				(m != this.inView && ((this.inView = m), m && (a = !0)),
				!this.inView && !this.scrollTarget)
			)
				return 0;
			let g = o.width;
			if (
				((this.contentDOMWidth == g &&
					this.editorHeight == t.scrollDOM.clientHeight) ||
					((this.contentDOMWidth = o.width),
					(this.editorHeight = t.scrollDOM.clientHeight),
					(l |= 8)),
				a)
			) {
				let e = t.docView.measureVisibleLineHeights(this.viewport);
				if (
					(n.mustRefreshForHeights(e) && (s = !0),
					s ||
						(n.lineWrapping &&
							Math.abs(g - this.contentDOMWidth) > n.charWidth))
				) {
					let {
						lineHeight: i,
						charWidth: o,
						textHeight: a,
					} = t.docView.measureTextSize();
					(s = i > 0 && n.refresh(r, i, o, a, g / o, e)),
						s && ((t.docView.minWidth = 0), (l |= 8));
				}
				O > 0 && p > 0
					? (h = Math.max(O, p))
					: O < 0 && p < 0 && (h = Math.min(O, p)),
					kl();
				for (let i of this.viewports) {
					let r =
						i.from == this.viewport.from
							? e
							: t.docView.measureVisibleLineHeights(i);
					this.heightMap = (
						s
							? Al.empty().applyChanges(
									this.stateDeco,
									Qn.empty,
									this.heightOracle,
									[new Qa(0, 0, 0, t.state.doc.length)]
								)
							: this.heightMap
					).updateHeight(n, 0, s, new Pl(i.from, r));
				}
				Ql && (l |= 2);
			}
			let b =
				!this.viewportIsAppropriate(this.viewport, h) ||
				(this.scrollTarget &&
					(this.scrollTarget.range.head < this.viewport.from ||
						this.scrollTarget.range.head > this.viewport.to));
			return (
				b &&
					(2 & l && (l |= this.updateScaler()),
					(this.viewport = this.getViewport(h, this.scrollTarget)),
					(l |= this.updateForViewport())),
				(2 & l || b) && this.updateViewportLines(),
				(this.lineGaps.length ||
					this.viewport.to - this.viewport.from > 4e3) &&
					this.updateLineGaps(
						this.ensureLineGaps(s ? [] : this.lineGaps, t)
					),
				(l |= this.computeVisibleRanges()),
				this.mustEnforceCursorAssoc &&
					((this.mustEnforceCursorAssoc = !1),
					t.docView.enforceCursorAssoc()),
				l
			);
		}
		get visibleTop() {
			return this.scaler.fromDOM(this.pixelViewport.top);
		}
		get visibleBottom() {
			return this.scaler.fromDOM(this.pixelViewport.bottom);
		}
		getViewport(t, e) {
			let i = 0.5 - Math.max(-0.5, Math.min(0.5, t / 1e3 / 2)),
				n = this.heightMap,
				r = this.heightOracle,
				{ visibleTop: s, visibleBottom: o } = this,
				a = new Bl(
					n.lineAt(s - 1e3 * i, Tl.ByHeight, r, 0, 0).from,
					n.lineAt(o + 1e3 * (1 - i), Tl.ByHeight, r, 0, 0).to
				);
			if (e) {
				let { head: t } = e.range;
				if (t < a.from || t > a.to) {
					let i,
						s = Math.min(
							this.editorHeight,
							this.pixelViewport.bottom - this.pixelViewport.top
						),
						o = n.lineAt(t, Tl.ByPos, r, 0, 0);
					(i =
						'center' == e.y
							? (o.top + o.bottom) / 2 - s / 2
							: 'start' == e.y || ('nearest' == e.y && t < a.from)
								? o.top
								: o.bottom - s),
						(a = new Bl(
							n.lineAt(i - 500, Tl.ByHeight, r, 0, 0).from,
							n.lineAt(i + s + 500, Tl.ByHeight, r, 0, 0).to
						));
				}
			}
			return a;
		}
		mapViewport(t, e) {
			let i = e.mapPos(t.from, -1),
				n = e.mapPos(t.to, 1);
			return new Bl(
				this.heightMap.lineAt(
					i,
					Tl.ByPos,
					this.heightOracle,
					0,
					0
				).from,
				this.heightMap.lineAt(n, Tl.ByPos, this.heightOracle, 0, 0).to
			);
		}
		viewportIsAppropriate({ from: t, to: e }, i = 0) {
			if (!this.inView) return !0;
			let { top: n } = this.heightMap.lineAt(
					t,
					Tl.ByPos,
					this.heightOracle,
					0,
					0
				),
				{ bottom: r } = this.heightMap.lineAt(
					e,
					Tl.ByPos,
					this.heightOracle,
					0,
					0
				),
				{ visibleTop: s, visibleBottom: o } = this;
			return (
				(0 == t || n <= s - Math.max(10, Math.min(-i, 250))) &&
				(e == this.state.doc.length ||
					r >= o + Math.max(10, Math.min(i, 250))) &&
				n > s - 2e3 &&
				r < o + 2e3
			);
		}
		mapLineGaps(t, e) {
			if (!t.length || e.empty) return t;
			let i = [];
			for (let n of t)
				e.touchesRange(n.from, n.to) ||
					i.push(
						new Yl(
							e.mapPos(n.from),
							e.mapPos(n.to),
							n.size,
							n.displaySize
						)
					);
			return i;
		}
		ensureLineGaps(t, e) {
			let i = this.heightOracle.lineWrapping,
				n = i ? 1e4 : 2e3,
				r = n >> 1,
				s = n << 1;
			if (this.defaultTextDirection != Zo.LTR && !i) return [];
			let o = [],
				a = (n, s, l, h) => {
					if (s - n < r) return;
					let c = this.state.selection.main,
						u = [c.from];
					c.empty || u.push(c.to);
					for (let t of u)
						if (t > n && t < s)
							return a(n, t - 10, l, h), void a(t + 10, s, l, h);
					let d = (function (t, e) {
						for (let i of t) if (e(i)) return i;
					})(
						t,
						(t) =>
							t.from >= l.from &&
							t.to <= l.to &&
							Math.abs(t.from - n) < r &&
							Math.abs(t.to - s) < r &&
							!u.some((e) => t.from < e && t.to > e)
					);
					if (!d) {
						if (
							s < l.to &&
							e &&
							i &&
							e.visibleRanges.some(
								(t) => t.from <= s && t.to >= s
							)
						) {
							let t = e.moveToLineBoundary(
								Fn.cursor(s),
								!1,
								!0
							).head;
							t > n && (s = t);
						}
						let t = this.gapSize(l, n, s, h);
						d = new Yl(n, s, t, i || t < 2e6 ? t : 2e6);
					}
					o.push(d);
				},
				l = (e) => {
					if (e.length < s || e.type != po.Text) return;
					let r = (function (t, e, i) {
						let n = [],
							r = t,
							s = 0;
						return (
							Yr.spans(
								i,
								t,
								e,
								{
									span() {},
									point(t, e) {
										t > r &&
											(n.push({ from: r, to: t }),
											(s += t - r)),
											(r = e);
									},
								},
								20
							),
							r < e && (n.push({ from: r, to: e }), (s += e - r)),
							{ total: s, ranges: n }
						);
					})(e.from, e.to, this.stateDeco);
					if (r.total < s) return;
					let o,
						l,
						h = this.scrollTarget
							? this.scrollTarget.range.head
							: null;
					if (i) {
						let t,
							i,
							s =
								(n / this.heightOracle.lineLength) *
								this.heightOracle.lineHeight;
						if (null != h) {
							let n = Nl(r, h),
								o =
									((this.visibleBottom - this.visibleTop) /
										2 +
										s) /
									e.height;
							(t = n - o), (i = n + o);
						} else
							(t = (this.visibleTop - e.top - s) / e.height),
								(i =
									(this.visibleBottom - e.top + s) /
									e.height);
						(o = Ul(r, t)), (l = Ul(r, i));
					} else {
						let i = r.total * this.heightOracle.charWidth,
							s = n * this.heightOracle.charWidth,
							a = 0;
						if (i > 2e6)
							for (let i of t)
								i.from >= e.from &&
									i.from < e.to &&
									i.size != i.displaySize &&
									i.from * this.heightOracle.charWidth + a <
										this.pixelViewport.left &&
									(a = i.size - i.displaySize);
						let c,
							u,
							d = this.pixelViewport.left + a,
							f = this.pixelViewport.right + a;
						if (null != h) {
							let t = Nl(r, h),
								e = ((f - d) / 2 + s) / i;
							(c = t - e), (u = t + e);
						} else (c = (d - s) / i), (u = (f + s) / i);
						(o = Ul(r, c)), (l = Ul(r, u));
					}
					o > e.from && a(e.from, o, e, r),
						l < e.to && a(l, e.to, e, r);
				};
			for (let t of this.viewportLines)
				Array.isArray(t.type) ? t.type.forEach(l) : l(t);
			return o;
		}
		gapSize(t, e, i, n) {
			let r = Nl(n, i) - Nl(n, e);
			return this.heightOracle.lineWrapping
				? t.height * r
				: n.total * this.heightOracle.charWidth * r;
		}
		updateLineGaps(t) {
			Yl.same(t, this.lineGaps) ||
				((this.lineGaps = t),
				(this.lineGapDeco = mo.set(
					t.map((t) => t.draw(this, this.heightOracle.lineWrapping))
				)));
		}
		computeVisibleRanges() {
			let t = this.stateDeco;
			this.lineGaps.length && (t = t.concat(this.lineGapDeco));
			let e = [];
			Yr.spans(
				t,
				this.viewport.from,
				this.viewport.to,
				{
					span(t, i) {
						e.push({ from: t, to: i });
					},
					point() {},
				},
				20
			);
			let i =
				e.length != this.visibleRanges.length ||
				this.visibleRanges.some(
					(t, i) => t.from != e[i].from || t.to != e[i].to
				);
			return (this.visibleRanges = e), i ? 4 : 0;
		}
		lineBlockAt(t) {
			return (
				(t >= this.viewport.from &&
					t <= this.viewport.to &&
					this.viewportLines.find((e) => e.from <= t && e.to >= t)) ||
				Fl(
					this.heightMap.lineAt(t, Tl.ByPos, this.heightOracle, 0, 0),
					this.scaler
				)
			);
		}
		lineBlockAtHeight(t) {
			return (
				(t >= this.viewportLines[0].top &&
					t <=
						this.viewportLines[this.viewportLines.length - 1]
							.bottom &&
					this.viewportLines.find(
						(e) => e.top <= t && e.bottom >= t
					)) ||
				Fl(
					this.heightMap.lineAt(
						this.scaler.fromDOM(t),
						Tl.ByHeight,
						this.heightOracle,
						0,
						0
					),
					this.scaler
				)
			);
		}
		scrollAnchorAt(t) {
			let e = this.lineBlockAtHeight(t + 8);
			return e.from >= this.viewport.from ||
				this.viewportLines[0].top - t > 200
				? e
				: this.viewportLines[0];
		}
		elementAtHeight(t) {
			return Fl(
				this.heightMap.blockAt(
					this.scaler.fromDOM(t),
					this.heightOracle,
					0,
					0
				),
				this.scaler
			);
		}
		get docHeight() {
			return this.scaler.toDOM(this.heightMap.height);
		}
		get contentHeight() {
			return this.docHeight + this.paddingTop + this.paddingBottom;
		}
	}
	class Bl {
		constructor(t, e) {
			(this.from = t), (this.to = e);
		}
	}
	function Ul({ total: t, ranges: e }, i) {
		if (i <= 0) return e[0].from;
		if (i >= 1) return e[e.length - 1].to;
		let n = Math.floor(t * i);
		for (let t = 0; ; t++) {
			let { from: i, to: r } = e[t],
				s = r - i;
			if (n <= s) return i + n;
			n -= s;
		}
	}
	function Nl(t, e) {
		let i = 0;
		for (let { from: n, to: r } of t.ranges) {
			if (e <= r) {
				i += e - n;
				break;
			}
			i += r - n;
		}
		return i / t.total;
	}
	const Gl = {
		toDOM: (t) => t,
		fromDOM: (t) => t,
		scale: 1,
		eq(t) {
			return t == this;
		},
	};
	class Il {
		constructor(t, e, i) {
			let n = 0,
				r = 0,
				s = 0;
			(this.viewports = i.map(({ from: i, to: r }) => {
				let s = e.lineAt(i, Tl.ByPos, t, 0, 0).top,
					o = e.lineAt(r, Tl.ByPos, t, 0, 0).bottom;
				return (
					(n += o - s),
					{
						from: i,
						to: r,
						top: s,
						bottom: o,
						domTop: 0,
						domBottom: 0,
					}
				);
			})),
				(this.scale = (7e6 - n) / (e.height - n));
			for (let t of this.viewports)
				(t.domTop = s + (t.top - r) * this.scale),
					(s = t.domBottom = t.domTop + (t.bottom - t.top)),
					(r = t.bottom);
		}
		toDOM(t) {
			for (let e = 0, i = 0, n = 0; ; e++) {
				let r = e < this.viewports.length ? this.viewports[e] : null;
				if (!r || t < r.top) return n + (t - i) * this.scale;
				if (t <= r.bottom) return r.domTop + (t - r.top);
				(i = r.bottom), (n = r.domBottom);
			}
		}
		fromDOM(t) {
			for (let e = 0, i = 0, n = 0; ; e++) {
				let r = e < this.viewports.length ? this.viewports[e] : null;
				if (!r || t < r.domTop) return i + (t - n) / this.scale;
				if (t <= r.domBottom) return r.top + (t - r.domTop);
				(i = r.bottom), (n = r.domBottom);
			}
		}
		eq(t) {
			return (
				t instanceof Il &&
				this.scale == t.scale &&
				this.viewports.length == t.viewports.length &&
				this.viewports.every(
					(e, i) =>
						e.from == t.viewports[i].from &&
						e.to == t.viewports[i].to
				)
			);
		}
	}
	function Fl(t, e) {
		if (1 == e.scale) return t;
		let i = e.toDOM(t.top),
			n = e.toDOM(t.bottom);
		return new Zl(
			t.from,
			t.length,
			i,
			n - i,
			Array.isArray(t._content)
				? t._content.map((t) => Fl(t, e))
				: t._content
		);
	}
	const Hl = Jn.define({ combine: (t) => t.join(' ') }),
		Kl = Jn.define({ combine: (t) => t.indexOf(!0) > -1 }),
		Jl = ss.newName(),
		th = ss.newName(),
		eh = ss.newName(),
		ih = { '&light': '.' + th, '&dark': '.' + eh };
	function nh(t, e, i) {
		return new ss(e, {
			finish: (e) =>
				/&/.test(e)
					? e.replace(/&\w*/, (e) => {
							if ('&' == e) return t;
							if (!i || !i[e])
								throw new RangeError(
									`Unsupported selector: ${e}`
								);
							return i[e];
						})
					: t + ' ' + e,
		});
	}
	const rh = nh(
			'.' + Jl,
			{
				'&': {
					position: 'relative !important',
					boxSizing: 'border-box',
					'&.cm-focused': { outline: '1px dotted #212121' },
					display: 'flex !important',
					flexDirection: 'column',
				},
				'.cm-scroller': {
					display: 'flex !important',
					alignItems: 'flex-start !important',
					fontFamily: 'monospace',
					lineHeight: 1.4,
					height: '100%',
					overflowX: 'auto',
					position: 'relative',
					zIndex: 0,
					overflowAnchor: 'none',
				},
				'.cm-content': {
					margin: 0,
					flexGrow: 2,
					flexShrink: 0,
					display: 'block',
					whiteSpace: 'pre',
					wordWrap: 'normal',
					boxSizing: 'border-box',
					minHeight: '100%',
					padding: '4px 0',
					outline: 'none',
					'&[contenteditable=true]': {
						WebkitUserModify: 'read-write-plaintext-only',
					},
				},
				'.cm-lineWrapping': {
					whiteSpace_fallback: 'pre-wrap',
					whiteSpace: 'break-spaces',
					wordBreak: 'break-word',
					overflowWrap: 'anywhere',
					flexShrink: 1,
				},
				'&light .cm-content': { caretColor: 'black' },
				'&dark .cm-content': { caretColor: 'white' },
				'.cm-line': { display: 'block', padding: '0 2px 0 6px' },
				'.cm-layer': {
					position: 'absolute',
					left: 0,
					top: 0,
					contain: 'size style',
					'& > *': { position: 'absolute' },
				},
				'&light .cm-selectionBackground': { background: '#d9d9d9' },
				'&dark .cm-selectionBackground': { background: '#222' },
				'&light.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground':
					{ background: '#d7d4f0' },
				'&dark.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground':
					{ background: '#233' },
				'.cm-cursorLayer': { pointerEvents: 'none' },
				'&.cm-focused > .cm-scroller > .cm-cursorLayer': {
					animation: 'steps(1) cm-blink 1.2s infinite',
				},
				'@keyframes cm-blink': {
					'0%': {},
					'50%': { opacity: 0 },
					'100%': {},
				},
				'@keyframes cm-blink2': {
					'0%': {},
					'50%': { opacity: 0 },
					'100%': {},
				},
				'.cm-cursor, .cm-dropCursor': {
					borderLeft: '1.2px solid black',
					marginLeft: '-0.6px',
					pointerEvents: 'none',
				},
				'.cm-cursor': { display: 'none' },
				'&dark .cm-cursor': { borderLeftColor: '#ddd' },
				'.cm-dropCursor': { position: 'absolute' },
				'&.cm-focused > .cm-scroller > .cm-cursorLayer .cm-cursor': {
					display: 'block',
				},
				'.cm-iso': { unicodeBidi: 'isolate' },
				'.cm-announced': { position: 'fixed', top: '-10000px' },
				'@media print': { '.cm-announced': { display: 'none' } },
				'&light .cm-activeLine': { backgroundColor: '#cceeff44' },
				'&dark .cm-activeLine': { backgroundColor: '#99eeff33' },
				'&light .cm-specialChar': { color: 'red' },
				'&dark .cm-specialChar': { color: '#f78' },
				'.cm-gutters': {
					flexShrink: 0,
					display: 'flex',
					height: '100%',
					boxSizing: 'border-box',
					insetInlineStart: 0,
					zIndex: 200,
				},
				'&light .cm-gutters': {
					backgroundColor: '#f5f5f5',
					color: '#6c6c6c',
					borderRight: '1px solid #ddd',
				},
				'&dark .cm-gutters': {
					backgroundColor: '#333338',
					color: '#ccc',
				},
				'.cm-gutter': {
					display: 'flex !important',
					flexDirection: 'column',
					flexShrink: 0,
					boxSizing: 'border-box',
					minHeight: '100%',
					overflow: 'hidden',
				},
				'.cm-gutterElement': { boxSizing: 'border-box' },
				'.cm-lineNumbers .cm-gutterElement': {
					padding: '0 3px 0 5px',
					minWidth: '20px',
					textAlign: 'right',
					whiteSpace: 'nowrap',
				},
				'&light .cm-activeLineGutter': { backgroundColor: '#e2f2ff' },
				'&dark .cm-activeLineGutter': { backgroundColor: '#222227' },
				'.cm-panels': {
					boxSizing: 'border-box',
					position: 'sticky',
					left: 0,
					right: 0,
					zIndex: 300,
				},
				'&light .cm-panels': {
					backgroundColor: '#f5f5f5',
					color: 'black',
				},
				'&light .cm-panels-top': { borderBottom: '1px solid #ddd' },
				'&light .cm-panels-bottom': { borderTop: '1px solid #ddd' },
				'&dark .cm-panels': {
					backgroundColor: '#333338',
					color: 'white',
				},
				'.cm-tab': {
					display: 'inline-block',
					overflow: 'hidden',
					verticalAlign: 'bottom',
				},
				'.cm-widgetBuffer': {
					verticalAlign: 'text-top',
					height: '1em',
					width: 0,
					display: 'inline',
				},
				'.cm-placeholder': {
					color: '#888',
					display: 'inline-block',
					verticalAlign: 'top',
				},
				'.cm-highlightSpace': {
					backgroundImage:
						'radial-gradient(circle at 50% 55%, #aaa 20%, transparent 5%)',
					backgroundPosition: 'center',
				},
				'.cm-highlightTab': {
					backgroundImage:
						'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20"><path stroke="%23888" stroke-width="1" fill="none" d="M1 10H196L190 5M190 15L196 10M197 4L197 16"/></svg>\')',
					backgroundSize: 'auto 100%',
					backgroundPosition: 'right 90%',
					backgroundRepeat: 'no-repeat',
				},
				'.cm-trailingSpace': { backgroundColor: '#ff332255' },
				'.cm-button': {
					verticalAlign: 'middle',
					color: 'inherit',
					fontSize: '70%',
					padding: '.2em 1em',
					borderRadius: '1px',
				},
				'&light .cm-button': {
					backgroundImage: 'linear-gradient(#eff1f5, #d9d9df)',
					border: '1px solid #888',
					'&:active': {
						backgroundImage: 'linear-gradient(#b4b4b4, #d0d3d6)',
					},
				},
				'&dark .cm-button': {
					backgroundImage: 'linear-gradient(#393939, #111)',
					border: '1px solid #888',
					'&:active': {
						backgroundImage: 'linear-gradient(#111, #333)',
					},
				},
				'.cm-textfield': {
					verticalAlign: 'middle',
					color: 'inherit',
					fontSize: '70%',
					border: '1px solid silver',
					padding: '.2em .5em',
				},
				'&light .cm-textfield': { backgroundColor: 'white' },
				'&dark .cm-textfield': {
					border: '1px solid #555',
					backgroundColor: 'inherit',
				},
			},
			ih
		),
		sh = {
			childList: !0,
			characterData: !0,
			subtree: !0,
			attributes: !0,
			characterDataOldValue: !0,
		},
		oh = to.ie && to.ie_version <= 11;
	class ah {
		constructor(t) {
			(this.view = t),
				(this.active = !1),
				(this.editContext = null),
				(this.selectionRange = new $s()),
				(this.selectionChanged = !1),
				(this.delayedFlush = -1),
				(this.resizeTimeout = -1),
				(this.queue = []),
				(this.delayedAndroidKey = null),
				(this.flushingAndroidKey = -1),
				(this.lastChange = 0),
				(this.scrollTargets = []),
				(this.intersection = null),
				(this.resizeScroll = null),
				(this.intersecting = !1),
				(this.gapIntersection = null),
				(this.gaps = []),
				(this.printQuery = null),
				(this.parentCheck = -1),
				(this.dom = t.contentDOM),
				(this.observer = new MutationObserver((e) => {
					for (let t of e) this.queue.push(t);
					((to.ie && to.ie_version <= 11) ||
						(to.ios && t.composing)) &&
					e.some(
						(t) =>
							('childList' == t.type && t.removedNodes.length) ||
							('characterData' == t.type &&
								t.oldValue.length > t.target.nodeValue.length)
					)
						? this.flushSoon()
						: this.flush();
				})),
				!window.EditContext ||
					!1 === t.constructor.EDIT_CONTEXT ||
					(to.chrome && to.chrome_version < 126) ||
					((this.editContext = new ch(t)),
					t.state.facet(ha) &&
						(t.contentDOM.editContext =
							this.editContext.editContext)),
				oh &&
					(this.onCharData = (t) => {
						this.queue.push({
							target: t.target,
							type: 'characterData',
							oldValue: t.prevValue,
						}),
							this.flushSoon();
					}),
				(this.onSelectionChange = this.onSelectionChange.bind(this)),
				(this.onResize = this.onResize.bind(this)),
				(this.onPrint = this.onPrint.bind(this)),
				(this.onScroll = this.onScroll.bind(this)),
				window.matchMedia &&
					(this.printQuery = window.matchMedia('print')),
				'function' == typeof ResizeObserver &&
					((this.resizeScroll = new ResizeObserver(() => {
						var t;
						(null === (t = this.view.docView) || void 0 === t
							? void 0
							: t.lastUpdate) <
							Date.now() - 75 && this.onResize();
					})),
					this.resizeScroll.observe(t.scrollDOM)),
				this.addWindowListeners((this.win = t.win)),
				this.start(),
				'function' == typeof IntersectionObserver &&
					((this.intersection = new IntersectionObserver(
						(t) => {
							this.parentCheck < 0 &&
								(this.parentCheck = setTimeout(
									this.listenForScroll.bind(this),
									1e3
								)),
								t.length > 0 &&
									t[t.length - 1].intersectionRatio > 0 !=
										this.intersecting &&
									((this.intersecting = !this.intersecting),
									this.intersecting != this.view.inView &&
										this.onScrollChanged(
											document.createEvent('Event')
										));
						},
						{ threshold: [0, 0.001] }
					)),
					this.intersection.observe(this.dom),
					(this.gapIntersection = new IntersectionObserver((t) => {
						t.length > 0 &&
							t[t.length - 1].intersectionRatio > 0 &&
							this.onScrollChanged(document.createEvent('Event'));
					}, {}))),
				this.listenForScroll(),
				this.readSelectionRange();
		}
		onScrollChanged(t) {
			this.view.inputState.runHandlers('scroll', t),
				this.intersecting && this.view.measure();
		}
		onScroll(t) {
			this.intersecting && this.flush(!1),
				this.editContext &&
					this.view.requestMeasure(this.editContext.measureReq),
				this.onScrollChanged(t);
		}
		onResize() {
			this.resizeTimeout < 0 &&
				(this.resizeTimeout = setTimeout(() => {
					(this.resizeTimeout = -1), this.view.requestMeasure();
				}, 50));
		}
		onPrint(t) {
			(('change' != t.type && t.type) || t.matches) &&
				((this.view.viewState.printing = !0),
				this.view.measure(),
				setTimeout(() => {
					(this.view.viewState.printing = !1),
						this.view.requestMeasure();
				}, 500));
		}
		updateGaps(t) {
			if (
				this.gapIntersection &&
				(t.length != this.gaps.length ||
					this.gaps.some((e, i) => e != t[i]))
			) {
				this.gapIntersection.disconnect();
				for (let e of t) this.gapIntersection.observe(e);
				this.gaps = t;
			}
		}
		onSelectionChange(t) {
			let e = this.selectionChanged;
			if (!this.readSelectionRange() || this.delayedAndroidKey) return;
			let { view: i } = this,
				n = this.selectionRange;
			if (
				i.state.facet(ha)
					? i.root.activeElement != this.dom
					: !ms(this.dom, n)
			)
				return;
			let r = n.anchorNode && i.docView.nearest(n.anchorNode);
			r && r.ignoreEvent(t)
				? e || (this.selectionChanged = !1)
				: ((to.ie && to.ie_version <= 11) ||
							(to.android && to.chrome)) &&
					  !i.state.selection.main.empty &&
					  n.focusNode &&
					  bs(
							n.focusNode,
							n.focusOffset,
							n.anchorNode,
							n.anchorOffset
					  )
					? this.flushSoon()
					: this.flush(!1);
		}
		readSelectionRange() {
			let { view: t } = this,
				e = Os(t.root);
			if (!e) return !1;
			let i =
				(to.safari &&
					11 == t.root.nodeType &&
					t.root.activeElement == this.dom &&
					(function (t, e) {
						if (e.getComposedRanges) {
							let i = e.getComposedRanges(t.root)[0];
							if (i) return hh(t, i);
						}
						let i = null;
						function n(t) {
							t.preventDefault(),
								t.stopImmediatePropagation(),
								(i = t.getTargetRanges()[0]);
						}
						return (
							t.contentDOM.addEventListener('beforeinput', n, !0),
							t.dom.ownerDocument.execCommand('indent'),
							t.contentDOM.removeEventListener(
								'beforeinput',
								n,
								!0
							),
							i ? hh(t, i) : null
						);
					})(this.view, e)) ||
				e;
			if (!i || this.selectionRange.eq(i)) return !1;
			let n = ms(this.dom, i);
			return n &&
				!this.selectionChanged &&
				t.inputState.lastFocusTime > Date.now() - 200 &&
				t.inputState.lastTouchTime < Date.now() - 300 &&
				(function (t, e) {
					let i = e.focusNode,
						n = e.focusOffset;
					if (!i || e.anchorNode != i || e.anchorOffset != n)
						return !1;
					for (n = Math.min(n, Ss(i)); ; )
						if (n) {
							if (1 != i.nodeType) return !1;
							let t = i.childNodes[n - 1];
							'false' == t.contentEditable
								? n--
								: ((i = t), (n = Ss(i)));
						} else {
							if (i == t) return !0;
							(n = ys(i)), (i = i.parentNode);
						}
				})(this.dom, i)
				? ((this.view.inputState.lastFocusTime = 0),
					t.docView.updateSelection(),
					!1)
				: (this.selectionRange.setRange(i),
					n && (this.selectionChanged = !0),
					!0);
		}
		setSelectionRange(t, e) {
			this.selectionRange.set(t.node, t.offset, e.node, e.offset),
				(this.selectionChanged = !1);
		}
		clearSelectionRange() {
			this.selectionRange.set(null, 0, null, 0);
		}
		listenForScroll() {
			this.parentCheck = -1;
			let t = 0,
				e = null;
			for (let i = this.dom; i; )
				if (1 == i.nodeType)
					!e &&
					t < this.scrollTargets.length &&
					this.scrollTargets[t] == i
						? t++
						: e || (e = this.scrollTargets.slice(0, t)),
						e && e.push(i),
						(i = i.assignedSlot || i.parentNode);
				else {
					if (11 != i.nodeType) break;
					i = i.host;
				}
			if (
				(t < this.scrollTargets.length &&
					!e &&
					(e = this.scrollTargets.slice(0, t)),
				e)
			) {
				for (let t of this.scrollTargets)
					t.removeEventListener('scroll', this.onScroll);
				for (let t of (this.scrollTargets = e))
					t.addEventListener('scroll', this.onScroll);
			}
		}
		ignore(t) {
			if (!this.active) return t();
			try {
				return this.stop(), t();
			} finally {
				this.start(), this.clear();
			}
		}
		start() {
			this.active ||
				(this.observer.observe(this.dom, sh),
				oh &&
					this.dom.addEventListener(
						'DOMCharacterDataModified',
						this.onCharData
					),
				(this.active = !0));
		}
		stop() {
			this.active &&
				((this.active = !1),
				this.observer.disconnect(),
				oh &&
					this.dom.removeEventListener(
						'DOMCharacterDataModified',
						this.onCharData
					));
		}
		clear() {
			this.processRecords(),
				(this.queue.length = 0),
				(this.selectionChanged = !1);
		}
		delayAndroidKey(t, e) {
			var i;
			if (!this.delayedAndroidKey) {
				let t = () => {
					let t = this.delayedAndroidKey;
					t &&
						(this.clearDelayedAndroidKey(),
						(this.view.inputState.lastKeyCode = t.keyCode),
						(this.view.inputState.lastKeyTime = Date.now()),
						!this.flush() &&
							t.force &&
							As(this.dom, t.key, t.keyCode));
				};
				this.flushingAndroidKey =
					this.view.win.requestAnimationFrame(t);
			}
			(this.delayedAndroidKey && 'Enter' != t) ||
				(this.delayedAndroidKey = {
					key: t,
					keyCode: e,
					force:
						this.lastChange < Date.now() - 50 ||
						!!(null === (i = this.delayedAndroidKey) || void 0 === i
							? void 0
							: i.force),
				});
		}
		clearDelayedAndroidKey() {
			this.win.cancelAnimationFrame(this.flushingAndroidKey),
				(this.delayedAndroidKey = null),
				(this.flushingAndroidKey = -1);
		}
		flushSoon() {
			this.delayedFlush < 0 &&
				(this.delayedFlush = this.view.win.requestAnimationFrame(() => {
					(this.delayedFlush = -1), this.flush();
				}));
		}
		forceFlush() {
			this.delayedFlush >= 0 &&
				(this.view.win.cancelAnimationFrame(this.delayedFlush),
				(this.delayedFlush = -1)),
				this.flush();
		}
		pendingRecords() {
			for (let t of this.observer.takeRecords()) this.queue.push(t);
			return this.queue;
		}
		processRecords() {
			let t = this.pendingRecords();
			t.length && (this.queue = []);
			let e = -1,
				i = -1,
				n = !1;
			for (let r of t) {
				let t = this.readMutation(r);
				t &&
					(t.typeOver && (n = !0),
					-1 == e
						? ({ from: e, to: i } = t)
						: ((e = Math.min(t.from, e)), (i = Math.max(t.to, i))));
			}
			return { from: e, to: i, typeOver: n };
		}
		readChange() {
			let { from: t, to: e, typeOver: i } = this.processRecords(),
				n = this.selectionChanged && ms(this.dom, this.selectionRange);
			if (t < 0 && !n) return null;
			t > -1 && (this.lastChange = Date.now()),
				(this.view.inputState.lastFocusTime = 0),
				(this.selectionChanged = !1);
			let r = new Ua(this.view, t, e, i);
			return (
				(this.view.docView.domChanged = {
					newSel: r.newSel ? r.newSel.main : null,
				}),
				r
			);
		}
		flush(t = !0) {
			if (this.delayedFlush >= 0 || this.delayedAndroidKey) return !1;
			t && this.readSelectionRange();
			let e = this.readChange();
			if (!e) return this.view.requestMeasure(), !1;
			let i = this.view.state,
				n = Na(this.view, e);
			return (
				this.view.state == i &&
					(e.domChanged ||
						(e.newSel &&
							!e.newSel.main.eq(
								this.view.state.selection.main
							))) &&
					this.view.update([]),
				n
			);
		}
		readMutation(t) {
			let e = this.view.docView.nearest(t.target);
			if (!e || e.ignoreMutation(t)) return null;
			if (
				(e.markDirty('attributes' == t.type),
				'attributes' == t.type && (e.flags |= 4),
				'childList' == t.type)
			) {
				let i = lh(
						e,
						t.previousSibling || t.target.previousSibling,
						-1
					),
					n = lh(e, t.nextSibling || t.target.nextSibling, 1);
				return {
					from: i ? e.posAfter(i) : e.posAtStart,
					to: n ? e.posBefore(n) : e.posAtEnd,
					typeOver: !1,
				};
			}
			return 'characterData' == t.type
				? {
						from: e.posAtStart,
						to: e.posAtEnd,
						typeOver: t.target.nodeValue == t.oldValue,
					}
				: null;
		}
		setWindow(t) {
			t != this.win &&
				(this.removeWindowListeners(this.win),
				(this.win = t),
				this.addWindowListeners(this.win));
		}
		addWindowListeners(t) {
			t.addEventListener('resize', this.onResize),
				this.printQuery
					? this.printQuery.addEventListener
						? this.printQuery.addEventListener(
								'change',
								this.onPrint
							)
						: this.printQuery.addListener(this.onPrint)
					: t.addEventListener('beforeprint', this.onPrint),
				t.addEventListener('scroll', this.onScroll),
				t.document.addEventListener(
					'selectionchange',
					this.onSelectionChange
				);
		}
		removeWindowListeners(t) {
			t.removeEventListener('scroll', this.onScroll),
				t.removeEventListener('resize', this.onResize),
				this.printQuery
					? this.printQuery.removeEventListener
						? this.printQuery.removeEventListener(
								'change',
								this.onPrint
							)
						: this.printQuery.removeListener(this.onPrint)
					: t.removeEventListener('beforeprint', this.onPrint),
				t.document.removeEventListener(
					'selectionchange',
					this.onSelectionChange
				);
		}
		update(t) {
			this.editContext &&
				(this.editContext.update(t),
				t.startState.facet(ha) != t.state.facet(ha) &&
					(t.view.contentDOM.editContext = t.state.facet(ha)
						? this.editContext.editContext
						: null));
		}
		destroy() {
			var t, e, i;
			this.stop(),
				null === (t = this.intersection) ||
					void 0 === t ||
					t.disconnect(),
				null === (e = this.gapIntersection) ||
					void 0 === e ||
					e.disconnect(),
				null === (i = this.resizeScroll) ||
					void 0 === i ||
					i.disconnect();
			for (let t of this.scrollTargets)
				t.removeEventListener('scroll', this.onScroll);
			this.removeWindowListeners(this.win),
				clearTimeout(this.parentCheck),
				clearTimeout(this.resizeTimeout),
				this.win.cancelAnimationFrame(this.delayedFlush),
				this.win.cancelAnimationFrame(this.flushingAndroidKey),
				this.editContext &&
					((this.view.contentDOM.editContext = null),
					this.editContext.destroy());
		}
	}
	function lh(t, e, i) {
		for (; e; ) {
			let n = js.get(e);
			if (n && n.parent == t) return n;
			let r = e.parentNode;
			e = r != t.dom ? r : i > 0 ? e.nextSibling : e.previousSibling;
		}
		return null;
	}
	function hh(t, e) {
		let i = e.startContainer,
			n = e.startOffset,
			r = e.endContainer,
			s = e.endOffset,
			o = t.docView.domAtPos(t.state.selection.main.anchor);
		return (
			bs(o.node, o.offset, r, s) && ([i, n, r, s] = [r, s, i, n]),
			{ anchorNode: i, anchorOffset: n, focusNode: r, focusOffset: s }
		);
	}
	class ch {
		constructor(t) {
			(this.from = 0),
				(this.to = 0),
				(this.pendingContextChange = null),
				(this.handlers = Object.create(null)),
				(this.composing = null),
				this.resetRange(t.state);
			let e = (this.editContext = new window.EditContext({
				text: t.state.doc.sliceString(this.from, this.to),
				selectionStart: this.toContextPos(
					Math.max(
						this.from,
						Math.min(this.to, t.state.selection.main.anchor)
					)
				),
				selectionEnd: this.toContextPos(t.state.selection.main.head),
			}));
			(this.handlers.textupdate = (e) => {
				let { anchor: i } = t.state.selection.main,
					n = this.toEditorPos(e.updateRangeStart),
					r = this.toEditorPos(e.updateRangeEnd);
				t.inputState.composing >= 0 &&
					!this.composing &&
					(this.composing = {
						contextBase: e.updateRangeStart,
						editorBase: n,
						drifted: !1,
					});
				let s = { from: n, to: r, insert: Qn.of(e.text.split('\n')) };
				if (
					(s.from == this.from && i < this.from
						? (s.from = i)
						: s.to == this.to && i > this.to && (s.to = i),
					s.from != s.to || s.insert.length)
				) {
					if (((this.pendingContextChange = s), !t.state.readOnly)) {
						let i =
							this.to -
							this.from +
							(s.to - s.from + s.insert.length);
						Ga(
							t,
							s,
							Fn.single(
								this.toEditorPos(e.selectionStart, i),
								this.toEditorPos(e.selectionEnd, i)
							)
						);
					}
					this.pendingContextChange &&
						(this.revertPending(t.state),
						this.setSelection(t.state));
				}
			}),
				(this.handlers.characterboundsupdate = (i) => {
					let n = [],
						r = null;
					for (
						let e = this.toEditorPos(i.rangeStart),
							s = this.toEditorPos(i.rangeEnd);
						e < s;
						e++
					) {
						let i = t.coordsForChar(e);
						(r =
							(i &&
								new DOMRect(
									i.left,
									i.top,
									i.right - i.left,
									i.bottom - i.top
								)) ||
							r ||
							new DOMRect()),
							n.push(r);
					}
					e.updateCharacterBounds(i.rangeStart, n);
				}),
				(this.handlers.textformatupdate = (e) => {
					let i = [];
					for (let t of e.getTextFormats()) {
						let e = t.underlineStyle,
							n = t.underlineThickness;
						if ('None' != e && 'None' != n) {
							let r = this.toEditorPos(t.rangeStart),
								s = this.toEditorPos(t.rangeEnd);
							if (r < s) {
								let t = `text-decoration: underline ${'Dashed' == e ? 'dashed ' : 'Squiggle' == e ? 'wavy ' : ''}${'Thin' == n ? 1 : 2}px`;
								i.push(
									mo
										.mark({ attributes: { style: t } })
										.range(r, s)
								);
							}
						}
					}
					t.dispatch({ effects: aa.of(mo.set(i)) });
				}),
				(this.handlers.compositionstart = () => {
					t.inputState.composing < 0 &&
						((t.inputState.composing = 0),
						(t.inputState.compositionFirstChange = !0));
				}),
				(this.handlers.compositionend = () => {
					if (
						((t.inputState.composing = -1),
						(t.inputState.compositionFirstChange = null),
						this.composing)
					) {
						let { drifted: e } = this.composing;
						(this.composing = null), e && this.reset(t.state);
					}
				});
			for (let t in this.handlers)
				e.addEventListener(t, this.handlers[t]);
			this.measureReq = {
				read: (t) => {
					this.editContext.updateControlBounds(
						t.contentDOM.getBoundingClientRect()
					);
					let e = Os(t.root);
					e &&
						e.rangeCount &&
						this.editContext.updateSelectionBounds(
							e.getRangeAt(0).getBoundingClientRect()
						);
				},
			};
		}
		applyEdits(t) {
			let e = 0,
				i = !1,
				n = this.pendingContextChange;
			return (
				t.changes.iterChanges((r, s, o, a, l) => {
					if (i) return;
					let h = l.length - (s - r);
					if (n && s >= n.to) {
						if (n.from == r && n.to == s && n.insert.eq(l))
							return (
								(n = this.pendingContextChange = null),
								(e += h),
								void (this.to += h)
							);
						(n = null), this.revertPending(t.state);
					}
					if (((r += e), (s += e) <= this.from))
						(this.from += h), (this.to += h);
					else if (r < this.to) {
						if (
							r < this.from ||
							s > this.to ||
							this.to - this.from + l.length > 3e4
						)
							return void (i = !0);
						this.editContext.updateText(
							this.toContextPos(r),
							this.toContextPos(s),
							l.toString()
						),
							(this.to += h);
					}
					e += h;
				}),
				n && !i && this.revertPending(t.state),
				!i
			);
		}
		update(t) {
			let e = this.pendingContextChange;
			this.composing &&
			(this.composing.drifted ||
				t.transactions.some(
					(t) =>
						!t.isUserEvent('input.type') &&
						t.changes.touchesRange(this.from, this.to)
				))
				? ((this.composing.drifted = !0),
					(this.composing.editorBase = t.changes.mapPos(
						this.composing.editorBase
					)))
				: this.applyEdits(t) && this.rangeIsValid(t.state)
					? (t.docChanged || t.selectionSet || e) &&
						this.setSelection(t.state)
					: ((this.pendingContextChange = null), this.reset(t.state)),
				(t.geometryChanged || t.docChanged || t.selectionSet) &&
					t.view.requestMeasure(this.measureReq);
		}
		resetRange(t) {
			let { head: e } = t.selection.main;
			(this.from = Math.max(0, e - 1e4)),
				(this.to = Math.min(t.doc.length, e + 1e4));
		}
		reset(t) {
			this.resetRange(t),
				this.editContext.updateText(
					0,
					this.editContext.text.length,
					t.doc.sliceString(this.from, this.to)
				),
				this.setSelection(t);
		}
		revertPending(t) {
			let e = this.pendingContextChange;
			(this.pendingContextChange = null),
				this.editContext.updateText(
					this.toContextPos(e.from),
					this.toContextPos(e.from + e.insert.length),
					t.doc.sliceString(e.from, e.to)
				);
		}
		setSelection(t) {
			let { main: e } = t.selection,
				i = this.toContextPos(
					Math.max(this.from, Math.min(this.to, e.anchor))
				),
				n = this.toContextPos(e.head);
			(this.editContext.selectionStart == i &&
				this.editContext.selectionEnd == n) ||
				this.editContext.updateSelection(i, n);
		}
		rangeIsValid(t) {
			let { head: e } = t.selection.main;
			return !(
				(this.from > 0 && e - this.from < 500) ||
				(this.to < t.doc.length && this.to - e < 500) ||
				this.to - this.from > 3e4
			);
		}
		toEditorPos(t, e = this.to - this.from) {
			t = Math.min(t, e);
			let i = this.composing;
			return i && i.drifted
				? i.editorBase + (t - i.contextBase)
				: t + this.from;
		}
		toContextPos(t) {
			let e = this.composing;
			return e && e.drifted
				? e.contextBase + (t - e.editorBase)
				: t - this.from;
		}
		destroy() {
			for (let t in this.handlers)
				this.editContext.removeEventListener(t, this.handlers[t]);
		}
	}
	class uh {
		get state() {
			return this.viewState.state;
		}
		get viewport() {
			return this.viewState.viewport;
		}
		get visibleRanges() {
			return this.viewState.visibleRanges;
		}
		get inView() {
			return this.viewState.inView;
		}
		get composing() {
			return this.inputState.composing > 0;
		}
		get compositionStarted() {
			return this.inputState.composing >= 0;
		}
		get root() {
			return this._root;
		}
		get win() {
			return this.dom.ownerDocument.defaultView || window;
		}
		constructor(t = {}) {
			var e;
			(this.plugins = []),
				(this.pluginMap = new Map()),
				(this.editorAttrs = {}),
				(this.contentAttrs = {}),
				(this.bidiCache = []),
				(this.destroyed = !1),
				(this.updateState = 2),
				(this.measureScheduled = -1),
				(this.measureRequests = []),
				(this.contentDOM = document.createElement('div')),
				(this.scrollDOM = document.createElement('div')),
				(this.scrollDOM.tabIndex = -1),
				(this.scrollDOM.className = 'cm-scroller'),
				this.scrollDOM.appendChild(this.contentDOM),
				(this.announceDOM = document.createElement('div')),
				(this.announceDOM.className = 'cm-announced'),
				this.announceDOM.setAttribute('aria-live', 'polite'),
				(this.dom = document.createElement('div')),
				this.dom.appendChild(this.announceDOM),
				this.dom.appendChild(this.scrollDOM),
				t.parent && t.parent.appendChild(this.dom);
			let { dispatch: i } = t;
			(this.dispatchTransactions =
				t.dispatchTransactions ||
				(i && ((t) => t.forEach((t) => i(t, this)))) ||
				((t) => this.update(t))),
				(this.dispatch = this.dispatch.bind(this)),
				(this._root =
					t.root ||
					(function (t) {
						for (; t; ) {
							if (
								t &&
								(9 == t.nodeType ||
									(11 == t.nodeType && t.host))
							)
								return t;
							t = t.assignedSlot || t.parentNode;
						}
						return null;
					})(t.parent) ||
					document),
				(this.viewState = new Ll(t.state || Vr.create(t))),
				t.scrollTo &&
					t.scrollTo.is(oa) &&
					(this.viewState.scrollTarget = t.scrollTo.value.clip(
						this.viewState.state
					)),
				(this.plugins = this.state.facet(ua).map((t) => new fa(t)));
			for (let t of this.plugins) t.update(this);
			(this.observer = new ah(this)),
				(this.inputState = new Ia(this)),
				this.inputState.ensureHandlers(this.plugins),
				(this.docView = new $a(this)),
				this.mountStyles(),
				this.updateAttrs(),
				(this.updateState = 0),
				this.requestMeasure(),
				(null === (e = document.fonts) || void 0 === e
					? void 0
					: e.ready) &&
					document.fonts.ready.then(() => this.requestMeasure());
		}
		dispatch(...t) {
			let e =
				1 == t.length && t[0] instanceof $r
					? t
					: 1 == t.length && Array.isArray(t[0])
						? t[0]
						: [this.state.update(...t)];
			this.dispatchTransactions(e, this);
		}
		update(t) {
			if (0 != this.updateState)
				throw new Error(
					'Calls to EditorView.update are not allowed while an update is in progress'
				);
			let e,
				i = !1,
				n = !1,
				r = this.state;
			for (let e of t) {
				if (e.startState != r)
					throw new RangeError(
						"Trying to update state with a transaction that doesn't start from the previous state."
					);
				r = e.state;
			}
			if (this.destroyed) return void (this.viewState.state = r);
			let s = this.hasFocus,
				o = 0,
				a = null;
			t.some((t) => t.annotation(yl))
				? ((this.inputState.notifiedFocused = s), (o = 1))
				: s != this.inputState.notifiedFocused &&
					((this.inputState.notifiedFocused = s),
					(a = vl(r, s)),
					a || (o = 1));
			let l = this.observer.delayedAndroidKey,
				h = null;
			if (
				(l
					? (this.observer.clearDelayedAndroidKey(),
						(h = this.observer.readChange()),
						((h && !this.state.doc.eq(r.doc)) ||
							!this.state.selection.eq(r.selection)) &&
							(h = null))
					: this.observer.clear(),
				r.facet(Vr.phrases) != this.state.facet(Vr.phrases))
			)
				return this.setState(r);
			(e = ka.create(this, r, t)), (e.flags |= o);
			let c = this.viewState.scrollTarget;
			try {
				this.updateState = 2;
				for (let e of t) {
					if ((c && (c = c.map(e.changes)), e.scrollIntoView)) {
						let { main: t } = e.state.selection;
						c = new sa(
							t.empty
								? t
								: Fn.cursor(t.head, t.head > t.anchor ? -1 : 1)
						);
					}
					for (let t of e.effects)
						t.is(oa) && (c = t.value.clip(this.state));
				}
				this.viewState.update(e, c),
					(this.bidiCache = Oh.update(this.bidiCache, e.changes)),
					e.empty ||
						(this.updatePlugins(e), this.inputState.update(e)),
					(i = this.docView.update(e)),
					this.state.facet(xa) != this.styleModules &&
						this.mountStyles(),
					(n = this.updateAttrs()),
					this.showAnnouncements(t),
					this.docView.updateSelection(
						i,
						t.some((t) => t.isUserEvent('select.pointer'))
					);
			} finally {
				this.updateState = 0;
			}
			if (
				(e.startState.facet(Hl) != e.state.facet(Hl) &&
					(this.viewState.mustMeasureContent = !0),
				(i ||
					n ||
					c ||
					this.viewState.mustEnforceCursorAssoc ||
					this.viewState.mustMeasureContent) &&
					this.requestMeasure(),
				i && this.docViewUpdate(),
				!e.empty)
			)
				for (let t of this.state.facet(Ho))
					try {
						t(e);
					} catch (t) {
						la(this.state, t, 'update listener');
					}
			(a || h) &&
				Promise.resolve().then(() => {
					a && this.state == a.startState && this.dispatch(a),
						h &&
							!Na(this, h) &&
							l.force &&
							As(this.contentDOM, l.key, l.keyCode);
				});
		}
		setState(t) {
			if (0 != this.updateState)
				throw new Error(
					'Calls to EditorView.setState are not allowed while an update is in progress'
				);
			if (this.destroyed) return void (this.viewState.state = t);
			this.updateState = 2;
			let e = this.hasFocus;
			try {
				for (let t of this.plugins) t.destroy(this);
				(this.viewState = new Ll(t)),
					(this.plugins = t.facet(ua).map((t) => new fa(t))),
					this.pluginMap.clear();
				for (let t of this.plugins) t.update(this);
				this.docView.destroy(),
					(this.docView = new $a(this)),
					this.inputState.ensureHandlers(this.plugins),
					this.mountStyles(),
					this.updateAttrs(),
					(this.bidiCache = []);
			} finally {
				this.updateState = 0;
			}
			e && this.focus(), this.requestMeasure();
		}
		updatePlugins(t) {
			let e = t.startState.facet(ua),
				i = t.state.facet(ua);
			if (e != i) {
				let n = [];
				for (let r of i) {
					let i = e.indexOf(r);
					if (i < 0) n.push(new fa(r));
					else {
						let e = this.plugins[i];
						(e.mustUpdate = t), n.push(e);
					}
				}
				for (let e of this.plugins)
					e.mustUpdate != t && e.destroy(this);
				(this.plugins = n), this.pluginMap.clear();
			} else for (let e of this.plugins) e.mustUpdate = t;
			for (let t = 0; t < this.plugins.length; t++)
				this.plugins[t].update(this);
			e != i && this.inputState.ensureHandlers(this.plugins);
		}
		docViewUpdate() {
			for (let t of this.plugins) {
				let e = t.value;
				if (e && e.docViewUpdate)
					try {
						e.docViewUpdate(this);
					} catch (t) {
						la(this.state, t, 'doc view update listener');
					}
			}
		}
		measure(t = !0) {
			if (this.destroyed) return;
			if (
				(this.measureScheduled > -1 &&
					this.win.cancelAnimationFrame(this.measureScheduled),
				this.observer.delayedAndroidKey)
			)
				return (this.measureScheduled = -1), void this.requestMeasure();
			(this.measureScheduled = 0), t && this.observer.forceFlush();
			let e = null,
				i = this.scrollDOM,
				n = i.scrollTop * this.scaleY,
				{ scrollAnchorPos: r, scrollAnchorHeight: s } = this.viewState;
			Math.abs(n - this.viewState.scrollTop) > 1 && (s = -1),
				(this.viewState.scrollAnchorHeight = -1);
			try {
				for (let t = 0; ; t++) {
					if (s < 0)
						if (Ms(i))
							(r = -1), (s = this.viewState.heightMap.height);
						else {
							let t = this.viewState.scrollAnchorAt(n);
							(r = t.from), (s = t.top);
						}
					this.updateState = 1;
					let o = this.viewState.measure(this);
					if (
						!o &&
						!this.measureRequests.length &&
						null == this.viewState.scrollTarget
					)
						break;
					if (t > 5) {
						console.warn(
							this.measureRequests.length
								? 'Measure loop restarted more than 5 times'
								: 'Viewport failed to stabilize'
						);
						break;
					}
					let a = [];
					4 & o ||
						([this.measureRequests, a] = [a, this.measureRequests]);
					let l = a.map((t) => {
							try {
								return t.read(this);
							} catch (t) {
								return la(this.state, t), fh;
							}
						}),
						h = ka.create(this, this.state, []),
						c = !1;
					(h.flags |= o),
						e ? (e.flags |= o) : (e = h),
						(this.updateState = 2),
						h.empty ||
							(this.updatePlugins(h),
							this.inputState.update(h),
							this.updateAttrs(),
							(c = this.docView.update(h)),
							c && this.docViewUpdate());
					for (let t = 0; t < a.length; t++)
						if (l[t] != fh)
							try {
								let e = a[t];
								e.write && e.write(l[t], this);
							} catch (t) {
								la(this.state, t);
							}
					if (
						(c && this.docView.updateSelection(!0),
						!h.viewportChanged && 0 == this.measureRequests.length)
					) {
						if (this.viewState.editorHeight) {
							if (this.viewState.scrollTarget) {
								this.docView.scrollIntoView(
									this.viewState.scrollTarget
								),
									(this.viewState.scrollTarget = null),
									(s = -1);
								continue;
							}
							{
								let t =
									(r < 0
										? this.viewState.heightMap.height
										: this.viewState.lineBlockAt(r).top) -
									s;
								if (t > 1 || t < -1) {
									(n += t),
										(i.scrollTop = n / this.scaleY),
										(s = -1);
									continue;
								}
							}
						}
						break;
					}
				}
			} finally {
				(this.updateState = 0), (this.measureScheduled = -1);
			}
			if (e && !e.empty) for (let t of this.state.facet(Ho)) t(e);
		}
		get themeClasses() {
			return (
				Jl +
				' ' +
				(this.state.facet(Kl) ? eh : th) +
				' ' +
				this.state.facet(Hl)
			);
		}
		updateAttrs() {
			let t = ph(this, Oa, {
					class:
						'cm-editor' +
						(this.hasFocus ? ' cm-focused ' : ' ') +
						this.themeClasses,
				}),
				e = {
					spellcheck: 'false',
					autocorrect: 'off',
					autocapitalize: 'off',
					writingsuggestions: 'false',
					translate: 'no',
					contenteditable: this.state.facet(ha) ? 'true' : 'false',
					class: 'cm-content',
					style: `${to.tabSize}: ${this.state.tabSize}`,
					role: 'textbox',
					'aria-multiline': 'true',
				};
			this.state.readOnly && (e['aria-readonly'] = 'true'),
				ph(this, pa, e);
			let i = this.observer.ignore(() => {
				let i = uo(this.contentDOM, this.contentAttrs, e),
					n = uo(this.dom, this.editorAttrs, t);
				return i || n;
			});
			return (this.editorAttrs = t), (this.contentAttrs = e), i;
		}
		showAnnouncements(t) {
			let e = !0;
			for (let i of t)
				for (let t of i.effects)
					t.is(uh.announce) &&
						(e && (this.announceDOM.textContent = ''),
						(e = !1),
						(this.announceDOM.appendChild(
							document.createElement('div')
						).textContent = t.value));
		}
		mountStyles() {
			this.styleModules = this.state.facet(xa);
			let t = this.state.facet(uh.cspNonce);
			ss.mount(
				this.root,
				this.styleModules.concat(rh).reverse(),
				t ? { nonce: t } : void 0
			);
		}
		readMeasured() {
			if (2 == this.updateState)
				throw new Error(
					"Reading the editor layout isn't allowed during an update"
				);
			0 == this.updateState &&
				this.measureScheduled > -1 &&
				this.measure(!1);
		}
		requestMeasure(t) {
			if (
				(this.measureScheduled < 0 &&
					(this.measureScheduled = this.win.requestAnimationFrame(
						() => this.measure()
					)),
				t)
			) {
				if (this.measureRequests.indexOf(t) > -1) return;
				if (null != t.key)
					for (let e = 0; e < this.measureRequests.length; e++)
						if (this.measureRequests[e].key === t.key)
							return void (this.measureRequests[e] = t);
				this.measureRequests.push(t);
			}
		}
		plugin(t) {
			let e = this.pluginMap.get(t);
			return (
				(void 0 === e || (e && e.spec != t)) &&
					this.pluginMap.set(
						t,
						(e = this.plugins.find((e) => e.spec == t) || null)
					),
				e && e.update(this).value
			);
		}
		get documentTop() {
			return (
				this.contentDOM.getBoundingClientRect().top +
				this.viewState.paddingTop
			);
		}
		get documentPadding() {
			return {
				top: this.viewState.paddingTop,
				bottom: this.viewState.paddingBottom,
			};
		}
		get scaleX() {
			return this.viewState.scaleX;
		}
		get scaleY() {
			return this.viewState.scaleY;
		}
		elementAtHeight(t) {
			return this.readMeasured(), this.viewState.elementAtHeight(t);
		}
		lineBlockAtHeight(t) {
			return this.readMeasured(), this.viewState.lineBlockAtHeight(t);
		}
		get viewportLineBlocks() {
			return this.viewState.viewportLines;
		}
		lineBlockAt(t) {
			return this.viewState.lineBlockAt(t);
		}
		get contentHeight() {
			return this.viewState.contentHeight;
		}
		moveByChar(t, e, i) {
			return Wa(this, t, Da(this, t, e, i));
		}
		moveByGroup(t, e) {
			return Wa(
				this,
				t,
				Da(this, t, e, (e) =>
					(function (t, e, i) {
						let n = t.state.charCategorizer(e),
							r = n(i);
						return (t) => {
							let e = n(t);
							return r == Mr.Space && (r = e), r == e;
						};
					})(this, t.head, e)
				)
			);
		}
		visualLineSide(t, e) {
			let i = this.bidiSpans(t),
				n = this.textDirectionAt(t.from),
				r = i[e ? i.length - 1 : 0];
			return Fn.cursor(r.side(e, n) + t.from, r.forward(!e, n) ? 1 : -1);
		}
		moveToLineBoundary(t, e, i = !0) {
			return (function (t, e, i, n) {
				let r = ja(t, e.head),
					s =
						n &&
						r.type == po.Text &&
						(t.lineWrapping || r.widgetLineBreaks)
							? t.coordsAtPos(
									e.assoc < 0 && e.head > r.from
										? e.head - 1
										: e.head
								)
							: null;
				if (s) {
					let e = t.dom.getBoundingClientRect(),
						n = t.textDirectionAt(r.from),
						o = t.posAtCoords({
							x: i == (n == Zo.LTR) ? e.right - 1 : e.left + 1,
							y: (s.top + s.bottom) / 2,
						});
					if (null != o) return Fn.cursor(o, i ? -1 : 1);
				}
				return Fn.cursor(i ? r.to : r.from, i ? -1 : 1);
			})(this, t, e, i);
		}
		moveVertically(t, e, i) {
			return Wa(
				this,
				t,
				(function (t, e, i, n) {
					let r = e.head,
						s = i ? 1 : -1;
					if (r == (i ? t.state.doc.length : 0))
						return Fn.cursor(r, e.assoc);
					let o,
						a = e.goalColumn,
						l = t.contentDOM.getBoundingClientRect(),
						h = t.coordsAtPos(r, e.assoc || -1),
						c = t.documentTop;
					if (h)
						null == a && (a = h.left - l.left),
							(o = s < 0 ? h.top : h.bottom);
					else {
						let e = t.viewState.lineBlockAt(r);
						null == a &&
							(a = Math.min(
								l.right - l.left,
								t.defaultCharacterWidth * (r - e.from)
							)),
							(o = (s < 0 ? e.top : e.bottom) + c);
					}
					let u = l.left + a,
						d =
							null != n
								? n
								: t.viewState.heightOracle.textHeight >> 1;
					for (let e = 0; ; e += 10) {
						let i = o + (d + e) * s,
							n = Va(t, { x: u, y: i }, !1, s);
						if (
							i < l.top ||
							i > l.bottom ||
							(s < 0 ? n < r : n > r)
						) {
							let e = t.docView.coordsForChar(n),
								r = !e || i < e.top ? -1 : 1;
							return Fn.cursor(n, r, void 0, a);
						}
					}
				})(this, t, e, i)
			);
		}
		domAtPos(t) {
			return this.docView.domAtPos(t);
		}
		posAtDOM(t, e = 0) {
			return this.docView.posFromDOM(t, e);
		}
		posAtCoords(t, e = !0) {
			return this.readMeasured(), Va(this, t, e);
		}
		coordsAtPos(t, e = 1) {
			this.readMeasured();
			let i = this.docView.coordsAt(t, e);
			if (!i || i.left == i.right) return i;
			let n = this.state.doc.lineAt(t),
				r = this.bidiSpans(n);
			return xs(
				i,
				(r[jo.find(r, t - n.from, -1, e)].dir == Zo.LTR) == e > 0
			);
		}
		coordsForChar(t) {
			return this.readMeasured(), this.docView.coordsForChar(t);
		}
		get defaultCharacterWidth() {
			return this.viewState.heightOracle.charWidth;
		}
		get defaultLineHeight() {
			return this.viewState.heightOracle.lineHeight;
		}
		get textDirection() {
			return this.viewState.defaultTextDirection;
		}
		textDirectionAt(t) {
			return !this.state.facet(ia) ||
				t < this.viewport.from ||
				t > this.viewport.to
				? this.textDirection
				: (this.readMeasured(), this.docView.textDirectionAt(t));
		}
		get lineWrapping() {
			return this.viewState.heightOracle.lineWrapping;
		}
		bidiSpans(t) {
			if (t.length > dh) return zo(t.length);
			let e,
				i = this.textDirectionAt(t.from);
			for (let n of this.bidiCache)
				if (
					n.from == t.from &&
					n.dir == i &&
					(n.fresh || Do(n.isolates, (e = va(this, t))))
				)
					return n.order;
			e || (e = va(this, t));
			let n = (function (t, e, i) {
				if (!t) return [new jo(0, 0, e == Co ? 1 : 0)];
				if (e == To && !i.length && !qo.test(t)) return zo(t.length);
				if (i.length)
					for (; t.length > Eo.length; ) Eo[Eo.length] = 256;
				let n = [],
					r = e == To ? 0 : 1;
				return Yo(t, r, r, i, 0, t.length, n), n;
			})(t.text, i, e);
			return this.bidiCache.push(new Oh(t.from, t.to, i, e, !0, n)), n;
		}
		get hasFocus() {
			var t;
			return (
				(this.dom.ownerDocument.hasFocus() ||
					(to.safari &&
						(null === (t = this.inputState) || void 0 === t
							? void 0
							: t.lastContextMenu) >
							Date.now() - 3e4)) &&
				this.root.activeElement == this.contentDOM
			);
		}
		focus() {
			this.observer.ignore(() => {
				Ts(this.contentDOM), this.docView.updateSelection();
			});
		}
		setRoot(t) {
			this._root != t &&
				((this._root = t),
				this.observer.setWindow(
					(9 == t.nodeType ? t : t.ownerDocument).defaultView ||
						window
				),
				this.mountStyles());
		}
		destroy() {
			this.root.activeElement == this.contentDOM &&
				this.contentDOM.blur();
			for (let t of this.plugins) t.destroy(this);
			(this.plugins = []),
				this.inputState.destroy(),
				this.docView.destroy(),
				this.dom.remove(),
				this.observer.destroy(),
				this.measureScheduled > -1 &&
					this.win.cancelAnimationFrame(this.measureScheduled),
				(this.destroyed = !0);
		}
		static scrollIntoView(t, e = {}) {
			return oa.of(
				new sa(
					'number' == typeof t ? Fn.cursor(t) : t,
					e.y,
					e.x,
					e.yMargin,
					e.xMargin
				)
			);
		}
		scrollSnapshot() {
			let { scrollTop: t, scrollLeft: e } = this.scrollDOM,
				i = this.viewState.scrollAnchorAt(t);
			return oa.of(
				new sa(Fn.cursor(i.from), 'start', 'start', i.top - t, e, !0)
			);
		}
		setTabFocusMode(t) {
			null == t
				? (this.inputState.tabFocusMode =
						this.inputState.tabFocusMode < 0 ? 0 : -1)
				: 'boolean' == typeof t
					? (this.inputState.tabFocusMode = t ? 0 : -1)
					: 0 != this.inputState.tabFocusMode &&
						(this.inputState.tabFocusMode = Date.now() + t);
		}
		static domEventHandlers(t) {
			return da.define(() => ({}), { eventHandlers: t });
		}
		static domEventObservers(t) {
			return da.define(() => ({}), { eventObservers: t });
		}
		static theme(t, e) {
			let i = ss.newName(),
				n = [Hl.of(i), xa.of(nh(`.${i}`, t))];
			return e && e.dark && n.push(Kl.of(!0)), n;
		}
		static baseTheme(t) {
			return lr.lowest(xa.of(nh('.' + Jl, t, ih)));
		}
		static findFromDOM(t) {
			var e;
			let i = t.querySelector('.cm-content'),
				n = (i && js.get(i)) || js.get(t);
			return (
				(null === (e = null == n ? void 0 : n.rootView) || void 0 === e
					? void 0
					: e.view) || null
			);
		}
	}
	(uh.styleModule = xa),
		(uh.inputHandler = Ko),
		(uh.clipboardInputFilter = ta),
		(uh.clipboardOutputFilter = ea),
		(uh.scrollHandler = ra),
		(uh.focusChangeEffect = Jo),
		(uh.perLineTextDirection = ia),
		(uh.exceptionSink = Fo),
		(uh.updateListener = Ho),
		(uh.editable = ha),
		(uh.mouseSelectionStyle = Io),
		(uh.dragMovesSelection = Go),
		(uh.clickAddsSelectionRange = No),
		(uh.decorations = ma),
		(uh.outerDecorations = ga),
		(uh.atomicRanges = ba),
		(uh.bidiIsolatedRanges = ya),
		(uh.scrollMargins = wa),
		(uh.darkTheme = Kl),
		(uh.cspNonce = Jn.define({ combine: (t) => (t.length ? t[0] : '') })),
		(uh.contentAttributes = pa),
		(uh.editorAttributes = Oa),
		(uh.lineWrapping = uh.contentAttributes.of({
			class: 'cm-lineWrapping',
		})),
		(uh.announce = kr.define());
	const dh = 4096,
		fh = {};
	class Oh {
		constructor(t, e, i, n, r, s) {
			(this.from = t),
				(this.to = e),
				(this.dir = i),
				(this.isolates = n),
				(this.fresh = r),
				(this.order = s);
		}
		static update(t, e) {
			if (e.empty && !t.some((t) => t.fresh)) return t;
			let i = [],
				n = t.length ? t[t.length - 1].dir : Zo.LTR;
			for (let r = Math.max(0, t.length - 10); r < t.length; r++) {
				let s = t[r];
				s.dir != n ||
					e.touchesRange(s.from, s.to) ||
					i.push(
						new Oh(
							e.mapPos(s.from, 1),
							e.mapPos(s.to, -1),
							s.dir,
							s.isolates,
							!1,
							s.order
						)
					);
			}
			return i;
		}
	}
	function ph(t, e, i) {
		for (let n = t.state.facet(e), r = n.length - 1; r >= 0; r--) {
			let e = n[r],
				s = 'function' == typeof e ? e(t) : e;
			s && lo(s, i);
		}
		return i;
	}
	const mh = to.mac ? 'mac' : to.windows ? 'win' : to.linux ? 'linux' : 'key';
	function gh(t, e, i) {
		return (
			e.altKey && (t = 'Alt-' + t),
			e.ctrlKey && (t = 'Ctrl-' + t),
			e.metaKey && (t = 'Meta-' + t),
			!1 !== i && e.shiftKey && (t = 'Shift-' + t),
			t
		);
	}
	const bh = lr.default(
			uh.domEventHandlers({
				keydown: (t, e) => kh(wh(e.state), t, e, 'editor'),
			})
		),
		yh = Jn.define({ enables: bh }),
		vh = new WeakMap();
	function wh(t) {
		let e = t.facet(yh),
			i = vh.get(e);
		return (
			i ||
				vh.set(
					e,
					(i = (function (t, e = mh) {
						let i = Object.create(null),
							n = Object.create(null),
							r = (t, e) => {
								let i = n[t];
								if (null == i) n[t] = e;
								else if (i != e)
									throw new Error(
										'Key binding ' +
											t +
											' is used both as a regular binding and as a multi-stroke prefix'
									);
							},
							s = (t, n, s, o, a) => {
								var l, h;
								let c = i[t] || (i[t] = Object.create(null)),
									u = n.split(/ (?!$)/).map((t) =>
										(function (t, e) {
											const i = t.split(/-(?!$)/);
											let n,
												r,
												s,
												o,
												a = i[i.length - 1];
											'Space' == a && (a = ' ');
											for (
												let t = 0;
												t < i.length - 1;
												++t
											) {
												const a = i[t];
												if (/^(cmd|meta|m)$/i.test(a))
													o = !0;
												else if (/^a(lt)?$/i.test(a))
													n = !0;
												else if (
													/^(c|ctrl|control)$/i.test(
														a
													)
												)
													r = !0;
												else if (/^s(hift)?$/i.test(a))
													s = !0;
												else {
													if (!/^mod$/i.test(a))
														throw new Error(
															'Unrecognized modifier name: ' +
																a
														);
													'mac' == e
														? (o = !0)
														: (r = !0);
												}
											}
											return (
												n && (a = 'Alt-' + a),
												r && (a = 'Ctrl-' + a),
												o && (a = 'Meta-' + a),
												s && (a = 'Shift-' + a),
												a
											);
										})(t, e)
									);
								for (let e = 1; e < u.length; e++) {
									let i = u.slice(0, e).join(' ');
									r(i, !0),
										c[i] ||
											(c[i] = {
												preventDefault: !0,
												stopPropagation: !1,
												run: [
													(e) => {
														let n = (Sh = {
															view: e,
															prefix: i,
															scope: t,
														});
														return (
															setTimeout(() => {
																Sh == n &&
																	(Sh = null);
															}, xh),
															!0
														);
													},
												],
											});
								}
								let d = u.join(' ');
								r(d, !1);
								let f =
									c[d] ||
									(c[d] = {
										preventDefault: !1,
										stopPropagation: !1,
										run:
											(null ===
												(h =
													null === (l = c._any) ||
													void 0 === l
														? void 0
														: l.run) || void 0 === h
												? void 0
												: h.slice()) || [],
									});
								s && f.run.push(s),
									o && (f.preventDefault = !0),
									a && (f.stopPropagation = !0);
							};
						for (let n of t) {
							let t = n.scope ? n.scope.split(' ') : ['editor'];
							if (n.any)
								for (let e of t) {
									let t =
										i[e] || (i[e] = Object.create(null));
									t._any ||
										(t._any = {
											preventDefault: !1,
											stopPropagation: !1,
											run: [],
										});
									let { any: r } = n;
									for (let e in t)
										t[e].run.push((t) => r(t, Qh));
								}
							let r = n[e] || n.key;
							if (r)
								for (let e of t)
									s(
										e,
										r,
										n.run,
										n.preventDefault,
										n.stopPropagation
									),
										n.shift &&
											s(
												e,
												'Shift-' + r,
												n.shift,
												n.preventDefault,
												n.stopPropagation
											);
						}
						return i;
					})(e.reduce((t, e) => t.concat(e), [])))
				),
			i
		);
	}
	let Sh = null;
	const xh = 4e3;
	let Qh = null;
	function kh(t, e, i, n) {
		Qh = e;
		let r = (function (t) {
				var e =
					(!(
						(cs &&
							t.metaKey &&
							t.shiftKey &&
							!t.ctrlKey &&
							!t.altKey) ||
						(us && t.shiftKey && t.key && 1 == t.key.length) ||
						'Unidentified' == t.key
					) &&
						t.key) ||
					(t.shiftKey ? hs : ls)[t.keyCode] ||
					t.key ||
					'Unidentified';
				return (
					'Esc' == e && (e = 'Escape'),
					'Del' == e && (e = 'Delete'),
					'Left' == e && (e = 'ArrowLeft'),
					'Up' == e && (e = 'ArrowUp'),
					'Right' == e && (e = 'ArrowRight'),
					'Down' == e && (e = 'ArrowDown'),
					e
				);
			})(e),
			s = jn(Vn(r, 0)) == r.length && ' ' != r,
			o = '',
			a = !1,
			l = !1,
			h = !1;
		Sh &&
			Sh.view == i &&
			Sh.scope == n &&
			((o = Sh.prefix + ' '),
			tl.indexOf(e.keyCode) < 0 && ((l = !0), (Sh = null)));
		let c,
			u,
			d = new Set(),
			f = (t) => {
				if (t) {
					for (let e of t.run)
						if (!d.has(e) && (d.add(e), e(i)))
							return t.stopPropagation && (h = !0), !0;
					t.preventDefault &&
						(t.stopPropagation && (h = !0), (l = !0));
				}
				return !1;
			},
			O = t[n];
		return (
			O &&
				(f(O[o + gh(r, e, !s)])
					? (a = !0)
					: s &&
						  (e.altKey || e.metaKey || e.ctrlKey) &&
						  !(to.windows && e.ctrlKey && e.altKey) &&
						  (c = ls[e.keyCode]) &&
						  c != r
						? (f(O[o + gh(c, e, !0)]) ||
								(e.shiftKey &&
									(u = hs[e.keyCode]) != r &&
									u != c &&
									f(O[o + gh(u, e, !1)]))) &&
							(a = !0)
						: s && e.shiftKey && f(O[o + gh(r, e, !0)]) && (a = !0),
				!a && f(O._any) && (a = !0)),
			l && (a = !0),
			a && h && e.stopPropagation(),
			(Qh = null),
			a
		);
	}
	class $h {
		constructor(t, e, i, n, r) {
			(this.className = t),
				(this.left = e),
				(this.top = i),
				(this.width = n),
				(this.height = r);
		}
		draw() {
			let t = document.createElement('div');
			return (t.className = this.className), this.adjust(t), t;
		}
		update(t, e) {
			return e.className == this.className && (this.adjust(t), !0);
		}
		adjust(t) {
			(t.style.left = this.left + 'px'),
				(t.style.top = this.top + 'px'),
				null != this.width && (t.style.width = this.width + 'px'),
				(t.style.height = this.height + 'px');
		}
		eq(t) {
			return (
				this.left == t.left &&
				this.top == t.top &&
				this.width == t.width &&
				this.height == t.height &&
				this.className == t.className
			);
		}
		static forRange(t, e, i) {
			if (i.empty) {
				let n = t.coordsAtPos(i.head, i.assoc || 1);
				if (!n) return [];
				let r = Ph(t);
				return [
					new $h(
						e,
						n.left - r.left,
						n.top - r.top,
						null,
						n.bottom - n.top
					),
				];
			}
			return (function (t, e, i) {
				if (i.to <= t.viewport.from || i.from >= t.viewport.to)
					return [];
				let n = Math.max(i.from, t.viewport.from),
					r = Math.min(i.to, t.viewport.to),
					s = t.textDirection == Zo.LTR,
					o = t.contentDOM,
					a = o.getBoundingClientRect(),
					l = Ph(t),
					h = o.querySelector('.cm-line'),
					c = h && window.getComputedStyle(h),
					u =
						a.left +
						(c
							? parseInt(c.paddingLeft) +
								Math.min(0, parseInt(c.textIndent))
							: 0),
					d = a.right - (c ? parseInt(c.paddingRight) : 0),
					f = ja(t, n),
					O = ja(t, r),
					p = f.type == po.Text ? f : null,
					m = O.type == po.Text ? O : null;
				if (
					(p &&
						(t.lineWrapping || f.widgetLineBreaks) &&
						(p = Zh(t, n, 1, p)),
					m &&
						(t.lineWrapping || O.widgetLineBreaks) &&
						(m = Zh(t, r, -1, m)),
					p && m && p.from == m.from && p.to == m.to)
				)
					return b(y(i.from, i.to, p));
				{
					let e = p ? y(i.from, null, p) : v(f, !1),
						n = m ? y(null, i.to, m) : v(O, !0),
						r = [];
					return (
						(p || f).to < (m || O).from - (p && m ? 1 : 0) ||
						(f.widgetLineBreaks > 1 &&
							e.bottom + t.defaultLineHeight / 2 < n.top)
							? r.push(g(u, e.bottom, d, n.top))
							: e.bottom < n.top &&
								t.elementAtHeight((e.bottom + n.top) / 2)
									.type == po.Text &&
								(e.bottom = n.top = (e.bottom + n.top) / 2),
						b(e).concat(r).concat(b(n))
					);
				}
				function g(t, i, n, r) {
					return new $h(
						e,
						t - l.left,
						i - l.top - 0.01,
						n - t,
						r - i + 0.01
					);
				}
				function b({ top: t, bottom: e, horizontal: i }) {
					let n = [];
					for (let r = 0; r < i.length; r += 2)
						n.push(g(i[r], t, i[r + 1], e));
					return n;
				}
				function y(e, i, n) {
					let r = 1e9,
						o = -1e9,
						a = [];
					function l(e, i, l, h, c) {
						let f = t.coordsAtPos(e, e == n.to ? -2 : 2),
							O = t.coordsAtPos(l, l == n.from ? 2 : -2);
						f &&
							O &&
							((r = Math.min(f.top, O.top, r)),
							(o = Math.max(f.bottom, O.bottom, o)),
							c == Zo.LTR
								? a.push(
										s && i ? u : f.left,
										s && h ? d : O.right
									)
								: a.push(
										!s && h ? u : O.left,
										!s && i ? d : f.right
									));
					}
					let h = null != e ? e : n.from,
						c = null != i ? i : n.to;
					for (let n of t.visibleRanges)
						if (n.to > h && n.from < c)
							for (
								let r = Math.max(n.from, h),
									s = Math.min(n.to, c);
								;

							) {
								let n = t.state.doc.lineAt(r);
								for (let o of t.bidiSpans(n)) {
									let t = o.from + n.from,
										a = o.to + n.from;
									if (t >= s) break;
									a > r &&
										l(
											Math.max(t, r),
											null == e && t <= h,
											Math.min(a, s),
											null == i && a >= c,
											o.dir
										);
								}
								if (((r = n.to + 1), r >= s)) break;
							}
					return (
						0 == a.length &&
							l(h, null == e, c, null == i, t.textDirection),
						{ top: r, bottom: o, horizontal: a }
					);
				}
				function v(t, e) {
					let i = a.top + (e ? t.top : t.bottom);
					return { top: i, bottom: i, horizontal: [] };
				}
			})(t, e, i);
		}
	}
	function Ph(t) {
		let e = t.scrollDOM.getBoundingClientRect();
		return {
			left:
				(t.textDirection == Zo.LTR
					? e.left
					: e.right - t.scrollDOM.clientWidth * t.scaleX) -
				t.scrollDOM.scrollLeft * t.scaleX,
			top: e.top - t.scrollDOM.scrollTop * t.scaleY,
		};
	}
	function Zh(t, e, i, n) {
		let r = t.coordsAtPos(e, 2 * i);
		if (!r) return n;
		let s = t.dom.getBoundingClientRect(),
			o = (r.top + r.bottom) / 2,
			a = t.posAtCoords({ x: s.left + 1, y: o }),
			l = t.posAtCoords({ x: s.right - 1, y: o });
		return null == a || null == l
			? n
			: {
					from: Math.max(n.from, Math.min(a, l)),
					to: Math.min(n.to, Math.max(a, l)),
				};
	}
	class Th {
		constructor(t, e) {
			(this.view = t),
				(this.layer = e),
				(this.drawn = []),
				(this.scaleX = 1),
				(this.scaleY = 1),
				(this.measureReq = {
					read: this.measure.bind(this),
					write: this.draw.bind(this),
				}),
				(this.dom = t.scrollDOM.appendChild(
					document.createElement('div')
				)),
				this.dom.classList.add('cm-layer'),
				e.above && this.dom.classList.add('cm-layer-above'),
				e.class && this.dom.classList.add(e.class),
				this.scale(),
				this.dom.setAttribute('aria-hidden', 'true'),
				this.setOrder(t.state),
				t.requestMeasure(this.measureReq),
				e.mount && e.mount(this.dom, t);
		}
		update(t) {
			t.startState.facet(Ch) != t.state.facet(Ch) &&
				this.setOrder(t.state),
				(this.layer.update(t, this.dom) || t.geometryChanged) &&
					(this.scale(), t.view.requestMeasure(this.measureReq));
		}
		docViewUpdate(t) {
			!1 !== this.layer.updateOnDocViewUpdate &&
				t.requestMeasure(this.measureReq);
		}
		setOrder(t) {
			let e = 0,
				i = t.facet(Ch);
			for (; e < i.length && i[e] != this.layer; ) e++;
			this.dom.style.zIndex = String((this.layer.above ? 150 : -1) - e);
		}
		measure() {
			return this.layer.markers(this.view);
		}
		scale() {
			let { scaleX: t, scaleY: e } = this.view;
			(t == this.scaleX && e == this.scaleY) ||
				((this.scaleX = t),
				(this.scaleY = e),
				(this.dom.style.transform = `scale(${1 / t}, ${1 / e})`));
		}
		draw(t) {
			if (
				t.length != this.drawn.length ||
				t.some((t, e) => {
					return (
						(i = t),
						(n = this.drawn[e]),
						!(i.constructor == n.constructor && i.eq(n))
					);
					var i, n;
				})
			) {
				let e = this.dom.firstChild,
					i = 0;
				for (let n of t)
					n.update &&
					e &&
					n.constructor &&
					this.drawn[i].constructor &&
					n.update(e, this.drawn[i])
						? ((e = e.nextSibling), i++)
						: this.dom.insertBefore(n.draw(), e);
				for (; e; ) {
					let t = e.nextSibling;
					e.remove(), (e = t);
				}
				this.drawn = t;
			}
		}
		destroy() {
			this.layer.destroy && this.layer.destroy(this.dom, this.view),
				this.dom.remove();
		}
	}
	const Ch = Jn.define();
	function Ah(t) {
		return [da.define((e) => new Th(e, t)), Ch.of(t)];
	}
	const Xh = !(to.ios && to.webkit && to.webkit_version < 534),
		Mh = Jn.define({
			combine: (t) =>
				qr(
					t,
					{ cursorBlinkRate: 1200, drawRangeCursor: !0 },
					{
						cursorBlinkRate: (t, e) => Math.min(t, e),
						drawRangeCursor: (t, e) => t || e,
					}
				),
		});
	function Rh(t) {
		return t.startState.facet(Mh) != t.state.facet(Mh);
	}
	const _h = Ah({
		above: !0,
		markers(t) {
			let { state: e } = t,
				i = e.facet(Mh),
				n = [];
			for (let r of e.selection.ranges) {
				let s = r == e.selection.main;
				if (r.empty ? !s || Xh : i.drawRangeCursor) {
					let e = s
							? 'cm-cursor cm-cursor-primary'
							: 'cm-cursor cm-cursor-secondary',
						i = r.empty
							? r
							: Fn.cursor(r.head, r.head > r.anchor ? -1 : 1);
					for (let r of $h.forRange(t, e, i)) n.push(r);
				}
			}
			return n;
		},
		update(t, e) {
			t.transactions.some((t) => t.selection) &&
				(e.style.animationName =
					'cm-blink' == e.style.animationName
						? 'cm-blink2'
						: 'cm-blink');
			let i = Rh(t);
			return i && Vh(t.state, e), t.docChanged || t.selectionSet || i;
		},
		mount(t, e) {
			Vh(e.state, t);
		},
		class: 'cm-cursorLayer',
	});
	function Vh(t, e) {
		e.style.animationDuration = t.facet(Mh).cursorBlinkRate + 'ms';
	}
	const qh = Ah({
			above: !1,
			markers: (t) =>
				t.state.selection.ranges
					.map((e) =>
						e.empty
							? []
							: $h.forRange(t, 'cm-selectionBackground', e)
					)
					.reduce((t, e) => t.concat(e)),
			update: (t, e) =>
				t.docChanged || t.selectionSet || t.viewportChanged || Rh(t),
			class: 'cm-selectionLayer',
		}),
		jh = {
			'.cm-line': {
				'& ::selection, &::selection': {
					backgroundColor: 'transparent !important',
				},
			},
			'.cm-content': {
				'& :focus': {
					caretColor: 'initial !important',
					'&::selection, & ::selection': {
						backgroundColor: 'Highlight !important',
					},
				},
			},
		};
	Xh &&
		(jh['.cm-line'].caretColor = jh['.cm-content'].caretColor =
			'transparent !important');
	const Dh = lr.highest(uh.theme(jh)),
		Eh = kr.define({ map: (t, e) => (null == t ? null : e.mapPos(t)) }),
		Wh = or.define({
			create: () => null,
			update: (t, e) => (
				null != t && (t = e.changes.mapPos(t)),
				e.effects.reduce((t, e) => (e.is(Eh) ? e.value : t), t)
			),
		}),
		Yh = da.fromClass(
			class {
				constructor(t) {
					(this.view = t),
						(this.cursor = null),
						(this.measureReq = {
							read: this.readPos.bind(this),
							write: this.drawCursor.bind(this),
						});
				}
				update(t) {
					var e;
					let i = t.state.field(Wh);
					null == i
						? null != this.cursor &&
							(null === (e = this.cursor) ||
								void 0 === e ||
								e.remove(),
							(this.cursor = null))
						: (this.cursor ||
								((this.cursor = this.view.scrollDOM.appendChild(
									document.createElement('div')
								)),
								(this.cursor.className = 'cm-dropCursor')),
							(t.startState.field(Wh) != i ||
								t.docChanged ||
								t.geometryChanged) &&
								this.view.requestMeasure(this.measureReq));
				}
				readPos() {
					let { view: t } = this,
						e = t.state.field(Wh),
						i = null != e && t.coordsAtPos(e);
					if (!i) return null;
					let n = t.scrollDOM.getBoundingClientRect();
					return {
						left:
							i.left - n.left + t.scrollDOM.scrollLeft * t.scaleX,
						top: i.top - n.top + t.scrollDOM.scrollTop * t.scaleY,
						height: i.bottom - i.top,
					};
				}
				drawCursor(t) {
					if (this.cursor) {
						let { scaleX: e, scaleY: i } = this.view;
						t
							? ((this.cursor.style.left = t.left / e + 'px'),
								(this.cursor.style.top = t.top / i + 'px'),
								(this.cursor.style.height =
									t.height / i + 'px'))
							: (this.cursor.style.left = '-100000px');
					}
				}
				destroy() {
					this.cursor && this.cursor.remove();
				}
				setDropPos(t) {
					this.view.state.field(Wh) != t &&
						this.view.dispatch({ effects: Eh.of(t) });
				}
			},
			{
				eventObservers: {
					dragover(t) {
						this.setDropPos(
							this.view.posAtCoords({
								x: t.clientX,
								y: t.clientY,
							})
						);
					},
					dragleave(t) {
						(t.target != this.view.contentDOM &&
							this.view.contentDOM.contains(t.relatedTarget)) ||
							this.setDropPos(null);
					},
					dragend() {
						this.setDropPos(null);
					},
					drop() {
						this.setDropPos(null);
					},
				},
			}
		);
	function zh(t, e, i, n, r) {
		e.lastIndex = 0;
		for (
			let s, o = t.iterRange(i, n), a = i;
			!o.next().done;
			a += o.value.length
		)
			if (!o.lineBreak) for (; (s = e.exec(o.value)); ) r(a + s.index, s);
	}
	class Lh {
		constructor(t) {
			const {
				regexp: e,
				decoration: i,
				decorate: n,
				boundary: r,
				maxLength: s = 1e3,
			} = t;
			if (!e.global)
				throw new RangeError(
					"The regular expression given to MatchDecorator should have its 'g' flag set"
				);
			if (((this.regexp = e), n))
				this.addMatch = (t, e, i, r) => n(r, i, i + t[0].length, t, e);
			else if ('function' == typeof i)
				this.addMatch = (t, e, n, r) => {
					let s = i(t, e, n);
					s && r(n, n + t[0].length, s);
				};
			else {
				if (!i)
					throw new RangeError(
						"Either 'decorate' or 'decoration' should be provided to MatchDecorator"
					);
				this.addMatch = (t, e, n, r) => r(n, n + t[0].length, i);
			}
			(this.boundary = r), (this.maxLength = s);
		}
		createDeco(t) {
			let e = new zr(),
				i = e.add.bind(e);
			for (let { from: e, to: n } of (function (t, e) {
				let i = t.visibleRanges;
				if (
					1 == i.length &&
					i[0].from == t.viewport.from &&
					i[0].to == t.viewport.to
				)
					return i;
				let n = [];
				for (let { from: r, to: s } of i)
					(r = Math.max(t.state.doc.lineAt(r).from, r - e)),
						(s = Math.min(t.state.doc.lineAt(s).to, s + e)),
						n.length && n[n.length - 1].to >= r
							? (n[n.length - 1].to = s)
							: n.push({ from: r, to: s });
				return n;
			})(t, this.maxLength))
				zh(t.state.doc, this.regexp, e, n, (e, n) =>
					this.addMatch(n, t, e, i)
				);
			return e.finish();
		}
		updateDeco(t, e) {
			let i = 1e9,
				n = -1;
			return (
				t.docChanged &&
					t.changes.iterChanges((e, r, s, o) => {
						o > t.view.viewport.from &&
							s < t.view.viewport.to &&
							((i = Math.min(s, i)), (n = Math.max(o, n)));
					}),
				t.viewportChanged || n - i > 1e3
					? this.createDeco(t.view)
					: n > -1
						? this.updateRange(t.view, e.map(t.changes), i, n)
						: e
			);
		}
		updateRange(t, e, i, n) {
			for (let r of t.visibleRanges) {
				let s = Math.max(r.from, i),
					o = Math.min(r.to, n);
				if (o > s) {
					let i = t.state.doc.lineAt(s),
						n = i.to < o ? t.state.doc.lineAt(o) : i,
						a = Math.max(r.from, i.from),
						l = Math.min(r.to, n.to);
					if (this.boundary) {
						for (; s > i.from; s--)
							if (this.boundary.test(i.text[s - 1 - i.from])) {
								a = s;
								break;
							}
						for (; o < n.to; o++)
							if (this.boundary.test(n.text[o - n.from])) {
								l = o;
								break;
							}
					}
					let h,
						c = [],
						u = (t, e, i) => c.push(i.range(t, e));
					if (i == n)
						for (
							this.regexp.lastIndex = a - i.from;
							(h = this.regexp.exec(i.text)) &&
							h.index < l - i.from;

						)
							this.addMatch(h, t, h.index + i.from, u);
					else
						zh(t.state.doc, this.regexp, a, l, (e, i) =>
							this.addMatch(i, t, e, u)
						);
					e = e.update({
						filterFrom: a,
						filterTo: l,
						filter: (t, e) => t < a || e > l,
						add: c,
					});
				}
			}
			return e;
		}
	}
	const Bh = null != /x/.unicode ? 'gu' : 'g',
		Uh = new RegExp('[\0-\b\n--­؜​‎‏\u2028\u2029‭‮⁦⁧⁩\ufeff￹-￼]', Bh),
		Nh = {
			0: 'null',
			7: 'bell',
			8: 'backspace',
			10: 'newline',
			11: 'vertical tab',
			13: 'carriage return',
			27: 'escape',
			8203: 'zero width space',
			8204: 'zero width non-joiner',
			8205: 'zero width joiner',
			8206: 'left-to-right mark',
			8207: 'right-to-left mark',
			8232: 'line separator',
			8237: 'left-to-right override',
			8238: 'right-to-left override',
			8294: 'left-to-right isolate',
			8295: 'right-to-left isolate',
			8297: 'pop directional isolate',
			8233: 'paragraph separator',
			65279: 'zero width no-break space',
			65532: 'object replacement',
		};
	let Gh = null;
	const Ih = Jn.define({
		combine(t) {
			let e = qr(t, {
				render: null,
				specialChars: Uh,
				addSpecialChars: null,
			});
			return (
				(e.replaceTabs = !(function () {
					var t;
					if (
						null == Gh &&
						'undefined' != typeof document &&
						document.body
					) {
						let e = document.body.style;
						Gh =
							null !=
							(null !== (t = e.tabSize) && void 0 !== t
								? t
								: e.MozTabSize);
					}
					return Gh || !1;
				})()) &&
					(e.specialChars = new RegExp(
						'\t|' + e.specialChars.source,
						Bh
					)),
				e.addSpecialChars &&
					(e.specialChars = new RegExp(
						e.specialChars.source + '|' + e.addSpecialChars.source,
						Bh
					)),
				e
			);
		},
	});
	let Fh = null;
	class Hh extends Oo {
		constructor(t, e) {
			super(), (this.options = t), (this.code = e);
		}
		eq(t) {
			return t.code == this.code;
		}
		toDOM(t) {
			let e = (function (t) {
					return t >= 32
						? '•'
						: 10 == t
							? '␤'
							: String.fromCharCode(9216 + t);
				})(this.code),
				i =
					t.state.phrase('Control character') +
					' ' +
					(Nh[this.code] || '0x' + this.code.toString(16)),
				n = this.options.render && this.options.render(this.code, i, e);
			if (n) return n;
			let r = document.createElement('span');
			return (
				(r.textContent = e),
				(r.title = i),
				r.setAttribute('aria-label', i),
				(r.className = 'cm-specialChar'),
				r
			);
		}
		ignoreEvent() {
			return !1;
		}
	}
	class Kh extends Oo {
		constructor(t) {
			super(), (this.width = t);
		}
		eq(t) {
			return t.width == this.width;
		}
		toDOM() {
			let t = document.createElement('span');
			return (
				(t.textContent = '\t'),
				(t.className = 'cm-tab'),
				(t.style.width = this.width + 'px'),
				t
			);
		}
		ignoreEvent() {
			return !1;
		}
	}
	const Jh = mo.line({ class: 'cm-activeLine' }),
		tc = da.fromClass(
			class {
				constructor(t) {
					this.decorations = this.getDeco(t);
				}
				update(t) {
					(t.docChanged || t.selectionSet) &&
						(this.decorations = this.getDeco(t.view));
				}
				getDeco(t) {
					let e = -1,
						i = [];
					for (let n of t.state.selection.ranges) {
						let r = t.lineBlockAt(n.head);
						r.from > e && (i.push(Jh.range(r.from)), (e = r.from));
					}
					return mo.set(i);
				}
			},
			{ decorations: (t) => t.decorations }
		);
	class ec extends Oo {
		constructor(t) {
			super(), (this.content = t);
		}
		toDOM(t) {
			let e = document.createElement('span');
			return (
				(e.className = 'cm-placeholder'),
				(e.style.pointerEvents = 'none'),
				e.appendChild(
					'string' == typeof this.content
						? document.createTextNode(this.content)
						: 'function' == typeof this.content
							? this.content(t)
							: this.content.cloneNode(!0)
				),
				'string' == typeof this.content
					? e.setAttribute(
							'aria-label',
							'placeholder ' + this.content
						)
					: e.setAttribute('aria-hidden', 'true'),
				e
			);
		}
		coordsAt(t) {
			let e = t.firstChild ? gs(t.firstChild) : [];
			if (!e.length) return null;
			let i = window.getComputedStyle(t.parentNode),
				n = xs(e[0], 'rtl' != i.direction),
				r = parseInt(i.lineHeight);
			return n.bottom - n.top > 1.5 * r
				? {
						left: n.left,
						right: n.right,
						top: n.top,
						bottom: n.top + r,
					}
				: n;
		}
		ignoreEvent() {
			return !1;
		}
	}
	const ic = 2e3;
	function nc(t, e) {
		let i = t.posAtCoords({ x: e.clientX, y: e.clientY }, !1),
			n = t.state.doc.lineAt(i),
			r = i - n.from,
			s =
				r > ic
					? -1
					: r == n.length
						? (function (t, e) {
								let i = t.coordsAtPos(t.viewport.from);
								return i
									? Math.round(
											Math.abs(
												(i.left - e) /
													t.defaultCharacterWidth
											)
										)
									: -1;
							})(t, e.clientX)
						: ts(n.text, t.state.tabSize, i - n.from);
		return { line: n.number, col: s, off: r };
	}
	const rc = {
			Alt: [18, (t) => !!t.altKey],
			Control: [17, (t) => !!t.ctrlKey],
			Shift: [16, (t) => !!t.shiftKey],
			Meta: [91, (t) => !!t.metaKey],
		},
		sc = { style: 'cursor: crosshair' },
		oc = '-10000px';
	class ac {
		constructor(t, e, i, n) {
			(this.facet = e),
				(this.createTooltipView = i),
				(this.removeTooltipView = n),
				(this.input = t.state.facet(e)),
				(this.tooltips = this.input.filter((t) => t));
			let r = null;
			this.tooltipViews = this.tooltips.map((t) => (r = i(t, r)));
		}
		update(t, e) {
			var i;
			let n = t.state.facet(this.facet),
				r = n.filter((t) => t);
			if (n === this.input) {
				for (let e of this.tooltipViews) e.update && e.update(t);
				return !1;
			}
			let s = [],
				o = e ? [] : null;
			for (let i = 0; i < r.length; i++) {
				let n = r[i],
					a = -1;
				if (n) {
					for (let t = 0; t < this.tooltips.length; t++) {
						let e = this.tooltips[t];
						e && e.create == n.create && (a = t);
					}
					if (a < 0)
						(s[i] = this.createTooltipView(n, i ? s[i - 1] : null)),
							o && (o[i] = !!n.above);
					else {
						let n = (s[i] = this.tooltipViews[a]);
						o && (o[i] = e[a]), n.update && n.update(t);
					}
				}
			}
			for (let t of this.tooltipViews)
				s.indexOf(t) < 0 &&
					(this.removeTooltipView(t),
					null === (i = t.destroy) || void 0 === i || i.call(t));
			return (
				e && (o.forEach((t, i) => (e[i] = t)), (e.length = o.length)),
				(this.input = n),
				(this.tooltips = r),
				(this.tooltipViews = s),
				!0
			);
		}
	}
	function lc(t) {
		let { win: e } = t;
		return { top: 0, left: 0, bottom: e.innerHeight, right: e.innerWidth };
	}
	const hc = Jn.define({
			combine: (t) => {
				var e, i, n;
				return {
					position: to.ios
						? 'absolute'
						: (null === (e = t.find((t) => t.position)) ||
							void 0 === e
								? void 0
								: e.position) || 'fixed',
					parent:
						(null === (i = t.find((t) => t.parent)) || void 0 === i
							? void 0
							: i.parent) || null,
					tooltipSpace:
						(null === (n = t.find((t) => t.tooltipSpace)) ||
						void 0 === n
							? void 0
							: n.tooltipSpace) || lc,
				};
			},
		}),
		cc = new WeakMap(),
		uc = da.fromClass(
			class {
				constructor(t) {
					(this.view = t),
						(this.above = []),
						(this.inView = !0),
						(this.madeAbsolute = !1),
						(this.lastTransaction = 0),
						(this.measureTimeout = -1);
					let e = t.state.facet(hc);
					(this.position = e.position),
						(this.parent = e.parent),
						(this.classes = t.themeClasses),
						this.createContainer(),
						(this.measureReq = {
							read: this.readMeasure.bind(this),
							write: this.writeMeasure.bind(this),
							key: this,
						}),
						(this.resizeObserver =
							'function' == typeof ResizeObserver
								? new ResizeObserver(() => this.measureSoon())
								: null),
						(this.manager = new ac(
							t,
							pc,
							(t, e) => this.createTooltip(t, e),
							(t) => {
								this.resizeObserver &&
									this.resizeObserver.unobserve(t.dom),
									t.dom.remove();
							}
						)),
						(this.above = this.manager.tooltips.map(
							(t) => !!t.above
						)),
						(this.intersectionObserver =
							'function' == typeof IntersectionObserver
								? new IntersectionObserver(
										(t) => {
											Date.now() >
												this.lastTransaction - 50 &&
												t.length > 0 &&
												t[t.length - 1]
													.intersectionRatio < 1 &&
												this.measureSoon();
										},
										{ threshold: [1] }
									)
								: null),
						this.observeIntersection(),
						t.win.addEventListener(
							'resize',
							(this.measureSoon = this.measureSoon.bind(this))
						),
						this.maybeMeasure();
				}
				createContainer() {
					this.parent
						? ((this.container = document.createElement('div')),
							(this.container.style.position = 'relative'),
							(this.container.className = this.view.themeClasses),
							this.parent.appendChild(this.container))
						: (this.container = this.view.dom);
				}
				observeIntersection() {
					if (this.intersectionObserver) {
						this.intersectionObserver.disconnect();
						for (let t of this.manager.tooltipViews)
							this.intersectionObserver.observe(t.dom);
					}
				}
				measureSoon() {
					this.measureTimeout < 0 &&
						(this.measureTimeout = setTimeout(() => {
							(this.measureTimeout = -1), this.maybeMeasure();
						}, 50));
				}
				update(t) {
					t.transactions.length &&
						(this.lastTransaction = Date.now());
					let e = this.manager.update(t, this.above);
					e && this.observeIntersection();
					let i = e || t.geometryChanged,
						n = t.state.facet(hc);
					if (n.position != this.position && !this.madeAbsolute) {
						this.position = n.position;
						for (let t of this.manager.tooltipViews)
							t.dom.style.position = this.position;
						i = !0;
					}
					if (n.parent != this.parent) {
						this.parent && this.container.remove(),
							(this.parent = n.parent),
							this.createContainer();
						for (let t of this.manager.tooltipViews)
							this.container.appendChild(t.dom);
						i = !0;
					} else
						this.parent &&
							this.view.themeClasses != this.classes &&
							(this.classes = this.container.className =
								this.view.themeClasses);
					i && this.maybeMeasure();
				}
				createTooltip(t, e) {
					let i = t.create(this.view),
						n = e ? e.dom : null;
					if (
						(i.dom.classList.add('cm-tooltip'),
						t.arrow &&
							!i.dom.querySelector(
								'.cm-tooltip > .cm-tooltip-arrow'
							))
					) {
						let t = document.createElement('div');
						(t.className = 'cm-tooltip-arrow'),
							i.dom.appendChild(t);
					}
					return (
						(i.dom.style.position = this.position),
						(i.dom.style.top = oc),
						(i.dom.style.left = '0px'),
						this.container.insertBefore(i.dom, n),
						i.mount && i.mount(this.view),
						this.resizeObserver &&
							this.resizeObserver.observe(i.dom),
						i
					);
				}
				destroy() {
					var t, e, i;
					this.view.win.removeEventListener(
						'resize',
						this.measureSoon
					);
					for (let e of this.manager.tooltipViews)
						e.dom.remove(),
							null === (t = e.destroy) ||
								void 0 === t ||
								t.call(e);
					this.parent && this.container.remove(),
						null === (e = this.resizeObserver) ||
							void 0 === e ||
							e.disconnect(),
						null === (i = this.intersectionObserver) ||
							void 0 === i ||
							i.disconnect(),
						clearTimeout(this.measureTimeout);
				}
				readMeasure() {
					let t = 1,
						e = 1,
						i = !1;
					if (
						'fixed' == this.position &&
						this.manager.tooltipViews.length
					) {
						let { dom: t } = this.manager.tooltipViews[0];
						if (to.gecko)
							i =
								t.offsetParent !=
								this.container.ownerDocument.body;
						else if (t.style.top == oc && '0px' == t.style.left) {
							let e = t.getBoundingClientRect();
							i =
								Math.abs(e.top + 1e4) > 1 ||
								Math.abs(e.left) > 1;
						}
					}
					if (i || 'absolute' == this.position)
						if (this.parent) {
							let i = this.parent.getBoundingClientRect();
							i.width &&
								i.height &&
								((t = i.width / this.parent.offsetWidth),
								(e = i.height / this.parent.offsetHeight));
						} else ({ scaleX: t, scaleY: e } = this.view.viewState);
					let n = this.view.scrollDOM.getBoundingClientRect(),
						r = Sa(this.view);
					return {
						visible: {
							left: n.left + r.left,
							top: n.top + r.top,
							right: n.right - r.right,
							bottom: n.bottom - r.bottom,
						},
						parent: this.parent
							? this.container.getBoundingClientRect()
							: this.view.dom.getBoundingClientRect(),
						pos: this.manager.tooltips.map((t, e) => {
							let i = this.manager.tooltipViews[e];
							return i.getCoords
								? i.getCoords(t.pos)
								: this.view.coordsAtPos(t.pos);
						}),
						size: this.manager.tooltipViews.map(({ dom: t }) =>
							t.getBoundingClientRect()
						),
						space: this.view.state
							.facet(hc)
							.tooltipSpace(this.view),
						scaleX: t,
						scaleY: e,
						makeAbsolute: i,
					};
				}
				writeMeasure(t) {
					var e;
					if (t.makeAbsolute) {
						(this.madeAbsolute = !0), (this.position = 'absolute');
						for (let t of this.manager.tooltipViews)
							t.dom.style.position = 'absolute';
					}
					let { visible: i, space: n, scaleX: r, scaleY: s } = t,
						o = [];
					for (let a = 0; a < this.manager.tooltips.length; a++) {
						let l = this.manager.tooltips[a],
							h = this.manager.tooltipViews[a],
							{ dom: c } = h,
							u = t.pos[a],
							d = t.size[a];
						if (
							!u ||
							(!1 !== l.clip &&
								(u.bottom <= Math.max(i.top, n.top) ||
									u.top >= Math.min(i.bottom, n.bottom) ||
									u.right < Math.max(i.left, n.left) - 0.1 ||
									u.left > Math.min(i.right, n.right) + 0.1))
						) {
							c.style.top = oc;
							continue;
						}
						let f = l.arrow
								? h.dom.querySelector('.cm-tooltip-arrow')
								: null,
							O = f ? 7 : 0,
							p = d.right - d.left,
							m =
								null !== (e = cc.get(h)) && void 0 !== e
									? e
									: d.bottom - d.top,
							g = h.offset || Oc,
							b = this.view.textDirection == Zo.LTR,
							y =
								d.width > n.right - n.left
									? b
										? n.left
										: n.right - d.width
									: b
										? Math.max(
												n.left,
												Math.min(
													u.left - (f ? 14 : 0) + g.x,
													n.right - p
												)
											)
										: Math.min(
												Math.max(
													n.left,
													u.left -
														p +
														(f ? 14 : 0) -
														g.x
												),
												n.right - p
											),
							v = this.above[a];
						!l.strictSide &&
							(v
								? u.top - m - O - g.y < n.top
								: u.bottom + m + O + g.y > n.bottom) &&
							v == n.bottom - u.bottom > u.top - n.top &&
							(v = this.above[a] = !v);
						let w = (v ? u.top - n.top : n.bottom - u.bottom) - O;
						if (w < m && !1 !== h.resize) {
							if (w < this.view.defaultLineHeight) {
								c.style.top = oc;
								continue;
							}
							cc.set(h, m), (c.style.height = (m = w) / s + 'px');
						} else c.style.height && (c.style.height = '');
						let S = v ? u.top - m - O - g.y : u.bottom + O + g.y,
							x = y + p;
						if (!0 !== h.overlap)
							for (let t of o)
								t.left < x &&
									t.right > y &&
									t.top < S + m &&
									t.bottom > S &&
									(S = v
										? t.top - m - 2 - O
										: t.bottom + O + 2);
						if (
							('absolute' == this.position
								? ((c.style.top =
										(S - t.parent.top) / s + 'px'),
									dc(c, (y - t.parent.left) / r))
								: ((c.style.top = S / s + 'px'), dc(c, y / r)),
							f)
						) {
							let t = u.left + (b ? g.x : -g.x) - (y + 14 - 7);
							f.style.left = t / r + 'px';
						}
						!0 !== h.overlap &&
							o.push({
								left: y,
								top: S,
								right: x,
								bottom: S + m,
							}),
							c.classList.toggle('cm-tooltip-above', v),
							c.classList.toggle('cm-tooltip-below', !v),
							h.positioned && h.positioned(t.space);
					}
				}
				maybeMeasure() {
					if (
						this.manager.tooltips.length &&
						(this.view.inView &&
							this.view.requestMeasure(this.measureReq),
						this.inView != this.view.inView &&
							((this.inView = this.view.inView), !this.inView))
					)
						for (let t of this.manager.tooltipViews)
							t.dom.style.top = oc;
				}
			},
			{
				eventObservers: {
					scroll() {
						this.maybeMeasure();
					},
				},
			}
		);
	function dc(t, e) {
		let i = parseInt(t.style.left, 10);
		(isNaN(i) || Math.abs(e - i) > 1) && (t.style.left = e + 'px');
	}
	const fc = uh.baseTheme({
			'.cm-tooltip': { zIndex: 500, boxSizing: 'border-box' },
			'&light .cm-tooltip': {
				border: '1px solid #bbb',
				backgroundColor: '#f5f5f5',
			},
			'&light .cm-tooltip-section:not(:first-child)': {
				borderTop: '1px solid #bbb',
			},
			'&dark .cm-tooltip': { backgroundColor: '#333338', color: 'white' },
			'.cm-tooltip-arrow': {
				height: '7px',
				width: '14px',
				position: 'absolute',
				zIndex: -1,
				overflow: 'hidden',
				'&:before, &:after': {
					content: "''",
					position: 'absolute',
					width: 0,
					height: 0,
					borderLeft: '7px solid transparent',
					borderRight: '7px solid transparent',
				},
				'.cm-tooltip-above &': {
					bottom: '-7px',
					'&:before': { borderTop: '7px solid #bbb' },
					'&:after': {
						borderTop: '7px solid #f5f5f5',
						bottom: '1px',
					},
				},
				'.cm-tooltip-below &': {
					top: '-7px',
					'&:before': { borderBottom: '7px solid #bbb' },
					'&:after': {
						borderBottom: '7px solid #f5f5f5',
						top: '1px',
					},
				},
			},
			'&dark .cm-tooltip .cm-tooltip-arrow': {
				'&:before': {
					borderTopColor: '#333338',
					borderBottomColor: '#333338',
				},
				'&:after': {
					borderTopColor: 'transparent',
					borderBottomColor: 'transparent',
				},
			},
		}),
		Oc = { x: 0, y: 0 },
		pc = Jn.define({ enables: [uc, fc] }),
		mc = Jn.define({ combine: (t) => t.reduce((t, e) => t.concat(e), []) });
	class gc {
		static create(t) {
			return new gc(t);
		}
		constructor(t) {
			(this.view = t),
				(this.mounted = !1),
				(this.dom = document.createElement('div')),
				this.dom.classList.add('cm-tooltip-hover'),
				(this.manager = new ac(
					t,
					mc,
					(t, e) => this.createHostedView(t, e),
					(t) => t.dom.remove()
				));
		}
		createHostedView(t, e) {
			let i = t.create(this.view);
			return (
				i.dom.classList.add('cm-tooltip-section'),
				this.dom.insertBefore(
					i.dom,
					e ? e.dom.nextSibling : this.dom.firstChild
				),
				this.mounted && i.mount && i.mount(this.view),
				i
			);
		}
		mount(t) {
			for (let e of this.manager.tooltipViews) e.mount && e.mount(t);
			this.mounted = !0;
		}
		positioned(t) {
			for (let e of this.manager.tooltipViews)
				e.positioned && e.positioned(t);
		}
		update(t) {
			this.manager.update(t);
		}
		destroy() {
			var t;
			for (let e of this.manager.tooltipViews)
				null === (t = e.destroy) || void 0 === t || t.call(e);
		}
		passProp(t) {
			let e;
			for (let i of this.manager.tooltipViews) {
				let n = i[t];
				if (void 0 !== n)
					if (void 0 === e) e = n;
					else if (e !== n) return;
			}
			return e;
		}
		get offset() {
			return this.passProp('offset');
		}
		get getCoords() {
			return this.passProp('getCoords');
		}
		get overlap() {
			return this.passProp('overlap');
		}
		get resize() {
			return this.passProp('resize');
		}
	}
	const bc = pc.compute([mc], (t) => {
		let e = t.facet(mc);
		return 0 === e.length
			? null
			: {
					pos: Math.min(...e.map((t) => t.pos)),
					end: Math.max(
						...e.map((t) => {
							var e;
							return null !== (e = t.end) && void 0 !== e
								? e
								: t.pos;
						})
					),
					create: gc.create,
					above: e[0].above,
					arrow: e.some((t) => t.arrow),
				};
	});
	class yc {
		constructor(t, e, i, n, r) {
			(this.view = t),
				(this.source = e),
				(this.field = i),
				(this.setHover = n),
				(this.hoverTime = r),
				(this.hoverTimeout = -1),
				(this.restartTimeout = -1),
				(this.pending = null),
				(this.lastMove = { x: 0, y: 0, target: t.dom, time: 0 }),
				(this.checkHover = this.checkHover.bind(this)),
				t.dom.addEventListener(
					'mouseleave',
					(this.mouseleave = this.mouseleave.bind(this))
				),
				t.dom.addEventListener(
					'mousemove',
					(this.mousemove = this.mousemove.bind(this))
				);
		}
		update() {
			this.pending &&
				((this.pending = null),
				clearTimeout(this.restartTimeout),
				(this.restartTimeout = setTimeout(
					() => this.startHover(),
					20
				)));
		}
		get active() {
			return this.view.state.field(this.field);
		}
		checkHover() {
			if (((this.hoverTimeout = -1), this.active.length)) return;
			let t = Date.now() - this.lastMove.time;
			t < this.hoverTime
				? (this.hoverTimeout = setTimeout(
						this.checkHover,
						this.hoverTime - t
					))
				: this.startHover();
		}
		startHover() {
			clearTimeout(this.restartTimeout);
			let { view: t, lastMove: e } = this,
				i = t.docView.nearest(e.target);
			if (!i) return;
			let n,
				r = 1;
			if (i instanceof no) n = i.posAtStart;
			else {
				if (((n = t.posAtCoords(e)), null == n)) return;
				let i = t.coordsAtPos(n);
				if (
					!i ||
					e.y < i.top ||
					e.y > i.bottom ||
					e.x < i.left - t.defaultCharacterWidth ||
					e.x > i.right + t.defaultCharacterWidth
				)
					return;
				let s = t
						.bidiSpans(t.state.doc.lineAt(n))
						.find((t) => t.from <= n && t.to >= n),
					o = s && s.dir == Zo.RTL ? -1 : 1;
				r = e.x < i.left ? -o : o;
			}
			let s = this.source(t, n, r);
			if (null == s ? void 0 : s.then) {
				let e = (this.pending = { pos: n });
				s.then(
					(i) => {
						this.pending == e &&
							((this.pending = null),
							!i ||
								(Array.isArray(i) && !i.length) ||
								t.dispatch({
									effects: this.setHover.of(
										Array.isArray(i) ? i : [i]
									),
								}));
					},
					(e) => la(t.state, e, 'hover tooltip')
				);
			} else
				!s ||
					(Array.isArray(s) && !s.length) ||
					t.dispatch({
						effects: this.setHover.of(Array.isArray(s) ? s : [s]),
					});
		}
		get tooltip() {
			let t = this.view.plugin(uc),
				e = t
					? t.manager.tooltips.findIndex((t) => t.create == gc.create)
					: -1;
			return e > -1 ? t.manager.tooltipViews[e] : null;
		}
		mousemove(t) {
			var e, i;
			(this.lastMove = {
				x: t.clientX,
				y: t.clientY,
				target: t.target,
				time: Date.now(),
			}),
				this.hoverTimeout < 0 &&
					(this.hoverTimeout = setTimeout(
						this.checkHover,
						this.hoverTime
					));
			let { active: n, tooltip: r } = this;
			if (
				(n.length &&
					r &&
					!(function (t, e) {
						let i,
							{
								left: n,
								right: r,
								top: s,
								bottom: o,
							} = t.getBoundingClientRect();
						if ((i = t.querySelector('.cm-tooltip-arrow'))) {
							let t = i.getBoundingClientRect();
							(s = Math.min(t.top, s)),
								(o = Math.max(t.bottom, o));
						}
						return (
							e.clientX >= n - vc &&
							e.clientX <= r + vc &&
							e.clientY >= s - vc &&
							e.clientY <= o + vc
						);
					})(r.dom, t)) ||
				this.pending
			) {
				let { pos: r } = n[0] || this.pending,
					s =
						null !==
							(i =
								null === (e = n[0]) || void 0 === e
									? void 0
									: e.end) && void 0 !== i
							? i
							: r;
				(r == s
					? this.view.posAtCoords(this.lastMove) == r
					: (function (t, e, i, n, r) {
							let s = t.scrollDOM.getBoundingClientRect(),
								o =
									t.documentTop +
									t.documentPadding.top +
									t.contentHeight;
							if (
								s.left > n ||
								s.right < n ||
								s.top > r ||
								Math.min(s.bottom, o) < r
							)
								return !1;
							let a = t.posAtCoords({ x: n, y: r }, !1);
							return a >= e && a <= i;
						})(this.view, r, s, t.clientX, t.clientY)) ||
					(this.view.dispatch({ effects: this.setHover.of([]) }),
					(this.pending = null));
			}
		}
		mouseleave(t) {
			clearTimeout(this.hoverTimeout), (this.hoverTimeout = -1);
			let { active: e } = this;
			if (e.length) {
				let { tooltip: e } = this;
				e && e.dom.contains(t.relatedTarget)
					? this.watchTooltipLeave(e.dom)
					: this.view.dispatch({ effects: this.setHover.of([]) });
			}
		}
		watchTooltipLeave(t) {
			let e = (i) => {
				t.removeEventListener('mouseleave', e),
					this.active.length &&
						!this.view.dom.contains(i.relatedTarget) &&
						this.view.dispatch({ effects: this.setHover.of([]) });
			};
			t.addEventListener('mouseleave', e);
		}
		destroy() {
			clearTimeout(this.hoverTimeout),
				this.view.dom.removeEventListener(
					'mouseleave',
					this.mouseleave
				),
				this.view.dom.removeEventListener('mousemove', this.mousemove);
		}
	}
	const vc = 4;
	function wc(t, e = {}) {
		let i = kr.define(),
			n = or.define({
				create: () => [],
				update(t, n) {
					if (
						t.length &&
						(e.hideOnChange && (n.docChanged || n.selection)
							? (t = [])
							: e.hideOn &&
								(t = t.filter((t) => !e.hideOn(n, t))),
						n.docChanged)
					) {
						let e = [];
						for (let i of t) {
							let t = n.changes.mapPos(i.pos, -1, En.TrackDel);
							if (null != t) {
								let r = Object.assign(Object.create(null), i);
								(r.pos = t),
									null != r.end &&
										(r.end = n.changes.mapPos(r.end)),
									e.push(r);
							}
						}
						t = e;
					}
					for (let e of n.effects)
						e.is(i) && (t = e.value), e.is(xc) && (t = []);
					return t;
				},
				provide: (t) => mc.from(t),
			});
		return {
			active: n,
			extension: [
				n,
				da.define((r) => new yc(r, t, n, i, e.hoverTime || 300)),
				bc,
			],
		};
	}
	function Sc(t, e) {
		let i = t.plugin(uc);
		if (!i) return null;
		let n = i.manager.tooltips.indexOf(e);
		return n < 0 ? null : i.manager.tooltipViews[n];
	}
	const xc = kr.define(),
		Qc = Jn.define({
			combine(t) {
				let e, i;
				for (let n of t)
					(e = e || n.topContainer), (i = i || n.bottomContainer);
				return { topContainer: e, bottomContainer: i };
			},
		});
	function kc(t, e) {
		let i = t.plugin($c),
			n = i ? i.specs.indexOf(e) : -1;
		return n > -1 ? i.panels[n] : null;
	}
	const $c = da.fromClass(
		class {
			constructor(t) {
				(this.input = t.state.facet(Tc)),
					(this.specs = this.input.filter((t) => t)),
					(this.panels = this.specs.map((e) => e(t)));
				let e = t.state.facet(Qc);
				(this.top = new Pc(t, !0, e.topContainer)),
					(this.bottom = new Pc(t, !1, e.bottomContainer)),
					this.top.sync(this.panels.filter((t) => t.top)),
					this.bottom.sync(this.panels.filter((t) => !t.top));
				for (let t of this.panels)
					t.dom.classList.add('cm-panel'), t.mount && t.mount();
			}
			update(t) {
				let e = t.state.facet(Qc);
				this.top.container != e.topContainer &&
					(this.top.sync([]),
					(this.top = new Pc(t.view, !0, e.topContainer))),
					this.bottom.container != e.bottomContainer &&
						(this.bottom.sync([]),
						(this.bottom = new Pc(t.view, !1, e.bottomContainer))),
					this.top.syncClasses(),
					this.bottom.syncClasses();
				let i = t.state.facet(Tc);
				if (i != this.input) {
					let e = i.filter((t) => t),
						n = [],
						r = [],
						s = [],
						o = [];
					for (let i of e) {
						let e,
							a = this.specs.indexOf(i);
						a < 0
							? ((e = i(t.view)), o.push(e))
							: ((e = this.panels[a]), e.update && e.update(t)),
							n.push(e),
							(e.top ? r : s).push(e);
					}
					(this.specs = e),
						(this.panels = n),
						this.top.sync(r),
						this.bottom.sync(s);
					for (let t of o)
						t.dom.classList.add('cm-panel'), t.mount && t.mount();
				} else for (let e of this.panels) e.update && e.update(t);
			}
			destroy() {
				this.top.sync([]), this.bottom.sync([]);
			}
		},
		{
			provide: (t) =>
				uh.scrollMargins.of((e) => {
					let i = e.plugin(t);
					return (
						i && {
							top: i.top.scrollMargin(),
							bottom: i.bottom.scrollMargin(),
						}
					);
				}),
		}
	);
	class Pc {
		constructor(t, e, i) {
			(this.view = t),
				(this.top = e),
				(this.container = i),
				(this.dom = void 0),
				(this.classes = ''),
				(this.panels = []),
				this.syncClasses();
		}
		sync(t) {
			for (let e of this.panels)
				e.destroy && t.indexOf(e) < 0 && e.destroy();
			(this.panels = t), this.syncDOM();
		}
		syncDOM() {
			if (0 == this.panels.length)
				return void (
					this.dom && (this.dom.remove(), (this.dom = void 0))
				);
			if (!this.dom) {
				(this.dom = document.createElement('div')),
					(this.dom.className = this.top
						? 'cm-panels cm-panels-top'
						: 'cm-panels cm-panels-bottom'),
					(this.dom.style[this.top ? 'top' : 'bottom'] = '0');
				let t = this.container || this.view.dom;
				t.insertBefore(this.dom, this.top ? t.firstChild : null);
			}
			let t = this.dom.firstChild;
			for (let e of this.panels)
				if (e.dom.parentNode == this.dom) {
					for (; t != e.dom; ) t = Zc(t);
					t = t.nextSibling;
				} else this.dom.insertBefore(e.dom, t);
			for (; t; ) t = Zc(t);
		}
		scrollMargin() {
			return !this.dom || this.container
				? 0
				: Math.max(
						0,
						this.top
							? this.dom.getBoundingClientRect().bottom -
									Math.max(
										0,
										this.view.scrollDOM.getBoundingClientRect()
											.top
									)
							: Math.min(
									innerHeight,
									this.view.scrollDOM.getBoundingClientRect()
										.bottom
								) - this.dom.getBoundingClientRect().top
					);
		}
		syncClasses() {
			if (this.container && this.classes != this.view.themeClasses) {
				for (let t of this.classes.split(' '))
					t && this.container.classList.remove(t);
				for (let t of (this.classes = this.view.themeClasses).split(
					' '
				))
					t && this.container.classList.add(t);
			}
		}
	}
	function Zc(t) {
		let e = t.nextSibling;
		return t.remove(), e;
	}
	const Tc = Jn.define({ enables: $c });
	class Cc extends jr {
		compare(t) {
			return (
				this == t || (this.constructor == t.constructor && this.eq(t))
			);
		}
		eq(t) {
			return !1;
		}
		destroy(t) {}
	}
	(Cc.prototype.elementClass = ''),
		(Cc.prototype.toDOM = void 0),
		(Cc.prototype.mapMode = En.TrackBefore),
		(Cc.prototype.startSide = Cc.prototype.endSide = -1),
		(Cc.prototype.point = !0);
	const Ac = Jn.define(),
		Xc = Jn.define(),
		Mc = {
			class: '',
			renderEmptyElements: !1,
			elementStyle: '',
			markers: () => Yr.empty,
			lineMarker: () => null,
			widgetMarker: () => null,
			lineMarkerChange: null,
			initialSpacer: null,
			updateSpacer: null,
			domEventHandlers: {},
		},
		Rc = Jn.define();
	function _c(t) {
		return [qc(), Rc.of(Object.assign(Object.assign({}, Mc), t))];
	}
	const Vc = Jn.define({ combine: (t) => t.some((t) => t) });
	function qc(t) {
		let e = [jc];
		return t && !1 === t.fixed && e.push(Vc.of(!0)), e;
	}
	const jc = da.fromClass(
		class {
			constructor(t) {
				(this.view = t),
					(this.prevViewport = t.viewport),
					(this.dom = document.createElement('div')),
					(this.dom.className = 'cm-gutters'),
					this.dom.setAttribute('aria-hidden', 'true'),
					(this.dom.style.minHeight =
						this.view.contentHeight / this.view.scaleY + 'px'),
					(this.gutters = t.state.facet(Rc).map((e) => new Yc(t, e)));
				for (let t of this.gutters) this.dom.appendChild(t.dom);
				(this.fixed = !t.state.facet(Vc)),
					this.fixed && (this.dom.style.position = 'sticky'),
					this.syncGutters(!1),
					t.scrollDOM.insertBefore(this.dom, t.contentDOM);
			}
			update(t) {
				if (this.updateGutters(t)) {
					let e = this.prevViewport,
						i = t.view.viewport,
						n = Math.min(e.to, i.to) - Math.max(e.from, i.from);
					this.syncGutters(n < 0.8 * (i.to - i.from));
				}
				t.geometryChanged &&
					(this.dom.style.minHeight =
						this.view.contentHeight / this.view.scaleY + 'px'),
					this.view.state.facet(Vc) != !this.fixed &&
						((this.fixed = !this.fixed),
						(this.dom.style.position = this.fixed ? 'sticky' : '')),
					(this.prevViewport = t.view.viewport);
			}
			syncGutters(t) {
				let e = this.dom.nextSibling;
				t && this.dom.remove();
				let i = Yr.iter(
						this.view.state.facet(Ac),
						this.view.viewport.from
					),
					n = [],
					r = this.gutters.map(
						(t) =>
							new Wc(
								t,
								this.view.viewport,
								-this.view.documentPadding.top
							)
					);
				for (let t of this.view.viewportLineBlocks)
					if ((n.length && (n = []), Array.isArray(t.type))) {
						let e = !0;
						for (let s of t.type)
							if (s.type == po.Text && e) {
								Ec(i, n, s.from);
								for (let t of r) t.line(this.view, s, n);
								e = !1;
							} else if (s.widget)
								for (let t of r) t.widget(this.view, s);
					} else if (t.type == po.Text) {
						Ec(i, n, t.from);
						for (let e of r) e.line(this.view, t, n);
					} else if (t.widget)
						for (let e of r) e.widget(this.view, t);
				for (let t of r) t.finish();
				t && this.view.scrollDOM.insertBefore(this.dom, e);
			}
			updateGutters(t) {
				let e = t.startState.facet(Rc),
					i = t.state.facet(Rc),
					n =
						t.docChanged ||
						t.heightChanged ||
						t.viewportChanged ||
						!Yr.eq(
							t.startState.facet(Ac),
							t.state.facet(Ac),
							t.view.viewport.from,
							t.view.viewport.to
						);
				if (e == i) for (let e of this.gutters) e.update(t) && (n = !0);
				else {
					n = !0;
					let r = [];
					for (let n of i) {
						let i = e.indexOf(n);
						i < 0
							? r.push(new Yc(this.view, n))
							: (this.gutters[i].update(t),
								r.push(this.gutters[i]));
					}
					for (let t of this.gutters)
						t.dom.remove(), r.indexOf(t) < 0 && t.destroy();
					for (let t of r) this.dom.appendChild(t.dom);
					this.gutters = r;
				}
				return n;
			}
			destroy() {
				for (let t of this.gutters) t.destroy();
				this.dom.remove();
			}
		},
		{
			provide: (t) =>
				uh.scrollMargins.of((e) => {
					let i = e.plugin(t);
					return i && 0 != i.gutters.length && i.fixed
						? e.textDirection == Zo.LTR
							? { left: i.dom.offsetWidth * e.scaleX }
							: { right: i.dom.offsetWidth * e.scaleX }
						: null;
				}),
		}
	);
	function Dc(t) {
		return Array.isArray(t) ? t : [t];
	}
	function Ec(t, e, i) {
		for (; t.value && t.from <= i; )
			t.from == i && e.push(t.value), t.next();
	}
	class Wc {
		constructor(t, e, i) {
			(this.gutter = t),
				(this.height = i),
				(this.i = 0),
				(this.cursor = Yr.iter(t.markers, e.from));
		}
		addElement(t, e, i) {
			let { gutter: n } = this,
				r = (e.top - this.height) / t.scaleY,
				s = e.height / t.scaleY;
			if (this.i == n.elements.length) {
				let e = new zc(t, s, r, i);
				n.elements.push(e), n.dom.appendChild(e.dom);
			} else n.elements[this.i].update(t, s, r, i);
			(this.height = e.bottom), this.i++;
		}
		line(t, e, i) {
			let n = [];
			Ec(this.cursor, n, e.from), i.length && (n = n.concat(i));
			let r = this.gutter.config.lineMarker(t, e, n);
			r && n.unshift(r);
			let s = this.gutter;
			(0 != n.length || s.config.renderEmptyElements) &&
				this.addElement(t, e, n);
		}
		widget(t, e) {
			let i = this.gutter.config.widgetMarker(t, e.widget, e),
				n = i ? [i] : null;
			for (let i of t.state.facet(Xc)) {
				let r = i(t, e.widget, e);
				r && (n || (n = [])).push(r);
			}
			n && this.addElement(t, e, n);
		}
		finish() {
			let t = this.gutter;
			for (; t.elements.length > this.i; ) {
				let e = t.elements.pop();
				t.dom.removeChild(e.dom), e.destroy();
			}
		}
	}
	class Yc {
		constructor(t, e) {
			(this.view = t),
				(this.config = e),
				(this.elements = []),
				(this.spacer = null),
				(this.dom = document.createElement('div')),
				(this.dom.className =
					'cm-gutter' +
					(this.config.class ? ' ' + this.config.class : ''));
			for (let i in e.domEventHandlers)
				this.dom.addEventListener(i, (n) => {
					let r,
						s = n.target;
					if (s != this.dom && this.dom.contains(s)) {
						for (; s.parentNode != this.dom; ) s = s.parentNode;
						let t = s.getBoundingClientRect();
						r = (t.top + t.bottom) / 2;
					} else r = n.clientY;
					let o = t.lineBlockAtHeight(r - t.documentTop);
					e.domEventHandlers[i](t, o, n) && n.preventDefault();
				});
			(this.markers = Dc(e.markers(t))),
				e.initialSpacer &&
					((this.spacer = new zc(t, 0, 0, [e.initialSpacer(t)])),
					this.dom.appendChild(this.spacer.dom),
					(this.spacer.dom.style.cssText +=
						'visibility: hidden; pointer-events: none'));
		}
		update(t) {
			let e = this.markers;
			if (
				((this.markers = Dc(this.config.markers(t.view))),
				this.spacer && this.config.updateSpacer)
			) {
				let e = this.config.updateSpacer(this.spacer.markers[0], t);
				e != this.spacer.markers[0] &&
					this.spacer.update(t.view, 0, 0, [e]);
			}
			let i = t.view.viewport;
			return (
				!Yr.eq(this.markers, e, i.from, i.to) ||
				(!!this.config.lineMarkerChange &&
					this.config.lineMarkerChange(t))
			);
		}
		destroy() {
			for (let t of this.elements) t.destroy();
		}
	}
	class zc {
		constructor(t, e, i, n) {
			(this.height = -1),
				(this.above = 0),
				(this.markers = []),
				(this.dom = document.createElement('div')),
				(this.dom.className = 'cm-gutterElement'),
				this.update(t, e, i, n);
		}
		update(t, e, i, n) {
			this.height != e &&
				((this.height = e), (this.dom.style.height = e + 'px')),
				this.above != i &&
					(this.dom.style.marginTop = (this.above = i)
						? i + 'px'
						: ''),
				(function (t, e) {
					if (t.length != e.length) return !1;
					for (let i = 0; i < t.length; i++)
						if (!t[i].compare(e[i])) return !1;
					return !0;
				})(this.markers, n) || this.setMarkers(t, n);
		}
		setMarkers(t, e) {
			let i = 'cm-gutterElement',
				n = this.dom.firstChild;
			for (let r = 0, s = 0; ; ) {
				let o = s,
					a = r < e.length ? e[r++] : null,
					l = !1;
				if (a) {
					let t = a.elementClass;
					t && (i += ' ' + t);
					for (let t = s; t < this.markers.length; t++)
						if (this.markers[t].compare(a)) {
							(o = t), (l = !0);
							break;
						}
				} else o = this.markers.length;
				for (; s < o; ) {
					let t = this.markers[s++];
					if (t.toDOM) {
						t.destroy(n);
						let e = n.nextSibling;
						n.remove(), (n = e);
					}
				}
				if (!a) break;
				a.toDOM &&
					(l
						? (n = n.nextSibling)
						: this.dom.insertBefore(a.toDOM(t), n)),
					l && s++;
			}
			(this.dom.className = i), (this.markers = e);
		}
		destroy() {
			this.setMarkers(null, []);
		}
	}
	const Lc = Jn.define(),
		Bc = Jn.define(),
		Uc = Jn.define({
			combine: (t) =>
				qr(
					t,
					{ formatNumber: String, domEventHandlers: {} },
					{
						domEventHandlers(t, e) {
							let i = Object.assign({}, t);
							for (let t in e) {
								let n = i[t],
									r = e[t];
								i[t] = n
									? (t, e, i) => n(t, e, i) || r(t, e, i)
									: r;
							}
							return i;
						},
					}
				),
		});
	class Nc extends Cc {
		constructor(t) {
			super(), (this.number = t);
		}
		eq(t) {
			return this.number == t.number;
		}
		toDOM() {
			return document.createTextNode(this.number);
		}
	}
	function Gc(t, e) {
		return t.state.facet(Uc).formatNumber(e, t.state);
	}
	const Ic = Rc.compute([Uc], (t) => ({
		class: 'cm-lineNumbers',
		renderEmptyElements: !1,
		markers: (t) => t.state.facet(Lc),
		lineMarker: (t, e, i) =>
			i.some((t) => t.toDOM)
				? null
				: new Nc(Gc(t, t.state.doc.lineAt(e.from).number)),
		widgetMarker: (t, e, i) => {
			for (let n of t.state.facet(Bc)) {
				let r = n(t, e, i);
				if (r) return r;
			}
			return null;
		},
		lineMarkerChange: (t) => t.startState.facet(Uc) != t.state.facet(Uc),
		initialSpacer: (t) => new Nc(Gc(t, Fc(t.state.doc.lines))),
		updateSpacer(t, e) {
			let i = Gc(e.view, Fc(e.view.state.doc.lines));
			return i == t.number ? t : new Nc(i);
		},
		domEventHandlers: t.facet(Uc).domEventHandlers,
	}));
	function Fc(t) {
		let e = 9;
		for (; e < t; ) e = 10 * e + 9;
		return e;
	}
	const Hc = new (class extends Cc {
			constructor() {
				super(...arguments),
					(this.elementClass = 'cm-activeLineGutter');
			}
		})(),
		Kc = Ac.compute(['selection'], (t) => {
			let e = [],
				i = -1;
			for (let n of t.selection.ranges) {
				let r = t.doc.lineAt(n.head).from;
				r > i && ((i = r), e.push(Hc.range(r)));
			}
			return Yr.of(e);
		});
	var Jc;
	const tu = new Wt();
	function eu(t) {
		return Jn.define({ combine: t ? (e) => e.concat(t) : void 0 });
	}
	const iu = new Wt();
	class nu {
		constructor(t, e, i = [], n = '') {
			(this.data = t),
				(this.name = n),
				Vr.prototype.hasOwnProperty('tree') ||
					Object.defineProperty(Vr.prototype, 'tree', {
						get() {
							return ou(this);
						},
					}),
				(this.parser = e),
				(this.extension = [
					pu.of(this),
					Vr.languageData.of((t, e, i) => {
						let n = ru(t, e, i),
							r = n.type.prop(tu);
						if (!r) return [];
						let s = t.facet(r),
							o = n.type.prop(iu);
						if (o) {
							let r = n.resolve(e - n.from, i);
							for (let e of o)
								if (e.test(r, t)) {
									let i = t.facet(e.facet);
									return 'replace' == e.type
										? i
										: i.concat(s);
								}
						}
						return s;
					}),
				].concat(i));
		}
		isActiveAt(t, e, i = -1) {
			return ru(t, e, i).type.prop(tu) == this.data;
		}
		findRegions(t) {
			let e = t.facet(pu);
			if ((null == e ? void 0 : e.data) == this.data)
				return [{ from: 0, to: t.doc.length }];
			if (!e || !e.allowsNesting) return [];
			let i = [],
				n = (t, e) => {
					if (t.prop(tu) == this.data)
						return void i.push({ from: e, to: e + t.length });
					let r = t.prop(Wt.mounted);
					if (r) {
						if (r.tree.prop(tu) == this.data) {
							if (r.overlay)
								for (let t of r.overlay)
									i.push({ from: t.from + e, to: t.to + e });
							else i.push({ from: e, to: e + t.length });
							return;
						}
						if (r.overlay) {
							let t = i.length;
							if (
								(n(r.tree, r.overlay[0].from + e), i.length > t)
							)
								return;
						}
					}
					for (let i = 0; i < t.children.length; i++) {
						let r = t.children[i];
						r instanceof It && n(r, t.positions[i] + e);
					}
				};
			return n(ou(t), 0), i;
		}
		get allowsNesting() {
			return !0;
		}
	}
	function ru(t, e, i) {
		let n = t.facet(pu),
			r = ou(t).topNode;
		if (!n || n.allowsNesting)
			for (let t = r; t; t = t.enter(e, i, Gt.ExcludeBuffers))
				t.type.isTop && (r = t);
		return r;
	}
	nu.setState = kr.define();
	class su extends nu {
		constructor(t, e, i) {
			super(t, e, [], i), (this.parser = e);
		}
		static define(t) {
			let e = eu(t.languageData);
			return new su(
				e,
				t.parser.configure({
					props: [tu.add((t) => (t.isTop ? e : void 0))],
				}),
				t.name
			);
		}
		configure(t, e) {
			return new su(this.data, this.parser.configure(t), e || this.name);
		}
		get allowsNesting() {
			return this.parser.hasWrappers();
		}
	}
	function ou(t) {
		let e = t.field(nu.state, !1);
		return e ? e.tree : It.empty;
	}
	class au {
		constructor(t) {
			(this.doc = t),
				(this.cursorPos = 0),
				(this.string = ''),
				(this.cursor = t.iter());
		}
		get length() {
			return this.doc.length;
		}
		syncTo(t) {
			return (
				(this.string = this.cursor.next(t - this.cursorPos).value),
				(this.cursorPos = t + this.string.length),
				this.cursorPos - this.string.length
			);
		}
		chunk(t) {
			return this.syncTo(t), this.string;
		}
		get lineChunks() {
			return !0;
		}
		read(t, e) {
			let i = this.cursorPos - this.string.length;
			return t < i || e >= this.cursorPos
				? this.doc.sliceString(t, e)
				: this.string.slice(t - i, e - i);
		}
	}
	let lu = null;
	class hu {
		constructor(t, e, i = [], n, r, s, o, a) {
			(this.parser = t),
				(this.state = e),
				(this.fragments = i),
				(this.tree = n),
				(this.treeLen = r),
				(this.viewport = s),
				(this.skipped = o),
				(this.scheduleOn = a),
				(this.parse = null),
				(this.tempSkipped = []);
		}
		static create(t, e, i) {
			return new hu(t, e, [], It.empty, 0, i, [], null);
		}
		startParse() {
			return this.parser.startParse(
				new au(this.state.doc),
				this.fragments
			);
		}
		work(t, e) {
			return (
				null != e && e >= this.state.doc.length && (e = void 0),
				this.tree != It.empty &&
				this.isDone(null != e ? e : this.state.doc.length)
					? (this.takeTree(), !0)
					: this.withContext(() => {
							var i;
							if ('number' == typeof t) {
								let e = Date.now() + t;
								t = () => Date.now() > e;
							}
							for (
								this.parse || (this.parse = this.startParse()),
									null != e &&
										(null == this.parse.stoppedAt ||
											this.parse.stoppedAt > e) &&
										e < this.state.doc.length &&
										this.parse.stopAt(e);
								;

							) {
								let n = this.parse.advance();
								if (n) {
									if (
										((this.fragments =
											this.withoutTempSkipped(
												Oe.addTree(
													n,
													this.fragments,
													null != this.parse.stoppedAt
												)
											)),
										(this.treeLen =
											null !==
												(i = this.parse.stoppedAt) &&
											void 0 !== i
												? i
												: this.state.doc.length),
										(this.tree = n),
										(this.parse = null),
										!(
											this.treeLen <
											(null != e
												? e
												: this.state.doc.length)
										))
									)
										return !0;
									this.parse = this.startParse();
								}
								if (t()) return !1;
							}
						})
			);
		}
		takeTree() {
			let t, e;
			this.parse &&
				(t = this.parse.parsedPos) >= this.treeLen &&
				((null == this.parse.stoppedAt || this.parse.stoppedAt > t) &&
					this.parse.stopAt(t),
				this.withContext(() => {
					for (; !(e = this.parse.advance()); );
				}),
				(this.treeLen = t),
				(this.tree = e),
				(this.fragments = this.withoutTempSkipped(
					Oe.addTree(this.tree, this.fragments, !0)
				)),
				(this.parse = null));
		}
		withContext(t) {
			let e = lu;
			lu = this;
			try {
				return t();
			} finally {
				lu = e;
			}
		}
		withoutTempSkipped(t) {
			for (let e; (e = this.tempSkipped.pop()); ) t = cu(t, e.from, e.to);
			return t;
		}
		changes(t, e) {
			let {
				fragments: i,
				tree: n,
				treeLen: r,
				viewport: s,
				skipped: o,
			} = this;
			if ((this.takeTree(), !t.empty)) {
				let e = [];
				if (
					(t.iterChangedRanges((t, i, n, r) =>
						e.push({ fromA: t, toA: i, fromB: n, toB: r })
					),
					(i = Oe.applyChanges(i, e)),
					(n = It.empty),
					(r = 0),
					(s = { from: t.mapPos(s.from, -1), to: t.mapPos(s.to, 1) }),
					this.skipped.length)
				) {
					o = [];
					for (let e of this.skipped) {
						let i = t.mapPos(e.from, 1),
							n = t.mapPos(e.to, -1);
						i < n && o.push({ from: i, to: n });
					}
				}
			}
			return new hu(this.parser, e, i, n, r, s, o, this.scheduleOn);
		}
		updateViewport(t) {
			if (this.viewport.from == t.from && this.viewport.to == t.to)
				return !1;
			this.viewport = t;
			let e = this.skipped.length;
			for (let e = 0; e < this.skipped.length; e++) {
				let { from: i, to: n } = this.skipped[e];
				i < t.to &&
					n > t.from &&
					((this.fragments = cu(this.fragments, i, n)),
					this.skipped.splice(e--, 1));
			}
			return !(this.skipped.length >= e || (this.reset(), 0));
		}
		reset() {
			this.parse && (this.takeTree(), (this.parse = null));
		}
		skipUntilInView(t, e) {
			this.skipped.push({ from: t, to: e });
		}
		static getSkippingParser(t) {
			return new (class extends pe {
				createParse(e, i, n) {
					let r = n[0].from,
						s = n[n.length - 1].to;
					return {
						parsedPos: r,
						advance() {
							let e = lu;
							if (e) {
								for (let t of n) e.tempSkipped.push(t);
								t &&
									(e.scheduleOn = e.scheduleOn
										? Promise.all([e.scheduleOn, t])
										: t);
							}
							return (
								(this.parsedPos = s),
								new It(Lt.none, [], [], s - r)
							);
						},
						stoppedAt: null,
						stopAt() {},
					};
				}
			})();
		}
		isDone(t) {
			t = Math.min(t, this.state.doc.length);
			let e = this.fragments;
			return (
				this.treeLen >= t && e.length && 0 == e[0].from && e[0].to >= t
			);
		}
		static get() {
			return lu;
		}
	}
	function cu(t, e, i) {
		return Oe.applyChanges(t, [{ fromA: e, toA: i, fromB: e, toB: i }]);
	}
	class uu {
		constructor(t) {
			(this.context = t), (this.tree = t.tree);
		}
		apply(t) {
			if (!t.docChanged && this.tree == this.context.tree) return this;
			let e = this.context.changes(t.changes, t.state),
				i =
					this.context.treeLen == t.startState.doc.length
						? void 0
						: Math.max(
								t.changes.mapPos(this.context.treeLen),
								e.viewport.to
							);
			return e.work(20, i) || e.takeTree(), new uu(e);
		}
		static init(t) {
			let e = Math.min(3e3, t.doc.length),
				i = hu.create(t.facet(pu).parser, t, { from: 0, to: e });
			return i.work(20, e) || i.takeTree(), new uu(i);
		}
	}
	nu.state = or.define({
		create: uu.init,
		update(t, e) {
			for (let t of e.effects) if (t.is(nu.setState)) return t.value;
			return e.startState.facet(pu) != e.state.facet(pu)
				? uu.init(e.state)
				: t.apply(e);
		},
	});
	let du = (t) => {
		let e = setTimeout(() => t(), 500);
		return () => clearTimeout(e);
	};
	'undefined' != typeof requestIdleCallback &&
		(du = (t) => {
			let e = -1,
				i = setTimeout(() => {
					e = requestIdleCallback(t, { timeout: 400 });
				}, 100);
			return () => (e < 0 ? clearTimeout(i) : cancelIdleCallback(e));
		});
	const fu =
			'undefined' != typeof navigator &&
			(null === (Jc = navigator.scheduling) || void 0 === Jc
				? void 0
				: Jc.isInputPending)
				? () => navigator.scheduling.isInputPending()
				: null,
		Ou = da.fromClass(
			class {
				constructor(t) {
					(this.view = t),
						(this.working = null),
						(this.workScheduled = 0),
						(this.chunkEnd = -1),
						(this.chunkBudget = -1),
						(this.work = this.work.bind(this)),
						this.scheduleWork();
				}
				update(t) {
					let e = this.view.state.field(nu.state).context;
					(e.updateViewport(t.view.viewport) ||
						this.view.viewport.to > e.treeLen) &&
						this.scheduleWork(),
						(t.docChanged || t.selectionSet) &&
							(this.view.hasFocus && (this.chunkBudget += 50),
							this.scheduleWork()),
						this.checkAsyncSchedule(e);
				}
				scheduleWork() {
					if (this.working) return;
					let { state: t } = this.view,
						e = t.field(nu.state);
					(e.tree == e.context.tree &&
						e.context.isDone(t.doc.length)) ||
						(this.working = du(this.work));
				}
				work(t) {
					this.working = null;
					let e = Date.now();
					if (
						(this.chunkEnd < e &&
							(this.chunkEnd < 0 || this.view.hasFocus) &&
							((this.chunkEnd = e + 3e4),
							(this.chunkBudget = 3e3)),
						this.chunkBudget <= 0)
					)
						return;
					let {
							state: i,
							viewport: { to: n },
						} = this.view,
						r = i.field(nu.state);
					if (r.tree == r.context.tree && r.context.isDone(n + 1e5))
						return;
					let s =
							Date.now() +
							Math.min(
								this.chunkBudget,
								100,
								t && !fu
									? Math.max(25, t.timeRemaining() - 5)
									: 1e9
							),
						o = r.context.treeLen < n && i.doc.length > n + 1e3,
						a = r.context.work(
							() => (fu && fu()) || Date.now() > s,
							n + (o ? 0 : 1e5)
						);
					(this.chunkBudget -= Date.now() - e),
						(a || this.chunkBudget <= 0) &&
							(r.context.takeTree(),
							this.view.dispatch({
								effects: nu.setState.of(new uu(r.context)),
							})),
						this.chunkBudget > 0 &&
							(!a || o) &&
							this.scheduleWork(),
						this.checkAsyncSchedule(r.context);
				}
				checkAsyncSchedule(t) {
					t.scheduleOn &&
						(this.workScheduled++,
						t.scheduleOn
							.then(() => this.scheduleWork())
							.catch((t) => la(this.view.state, t))
							.then(() => this.workScheduled--),
						(t.scheduleOn = null));
				}
				destroy() {
					this.working && this.working();
				}
				isWorking() {
					return !!(this.working || this.workScheduled > 0);
				}
			},
			{
				eventHandlers: {
					focus() {
						this.scheduleWork();
					},
				},
			}
		),
		pu = Jn.define({
			combine: (t) => (t.length ? t[0] : null),
			enables: (t) => [
				nu.state,
				Ou,
				uh.contentAttributes.compute([t], (e) => {
					let i = e.facet(t);
					return i && i.name ? { 'data-language': i.name } : {};
				}),
			],
		});
	class mu {
		constructor(t, e = []) {
			(this.language = t), (this.support = e), (this.extension = [t, e]);
		}
	}
	const gu = Jn.define(),
		bu = Jn.define({
			combine: (t) => {
				if (!t.length) return '  ';
				let e = t[0];
				if (!e || /\S/.test(e) || Array.from(e).some((t) => t != e[0]))
					throw new Error(
						'Invalid indent unit: ' + JSON.stringify(t[0])
					);
				return e;
			},
		});
	function yu(t) {
		let e = t.facet(bu);
		return 9 == e.charCodeAt(0) ? t.tabSize * e.length : e.length;
	}
	function vu(t, e) {
		let i = '',
			n = t.tabSize,
			r = t.facet(bu)[0];
		if ('\t' == r) {
			for (; e >= n; ) (i += '\t'), (e -= n);
			r = ' ';
		}
		for (let t = 0; t < e; t++) i += r;
		return i;
	}
	function wu(t, e) {
		t instanceof Vr && (t = new Su(t));
		for (let i of t.state.facet(gu)) {
			let n = i(t, e);
			if (void 0 !== n) return n;
		}
		let i = ou(t.state);
		return i.length >= e
			? (function (t, e, i) {
					let n = e.resolveStack(i),
						r = n.node.enterUnfinishedNodesBefore(i);
					if (r != n.node) {
						let t = [];
						for (let e = r; e != n.node; e = e.parent) t.push(e);
						for (let e = t.length - 1; e >= 0; e--)
							n = { node: t[e], next: n };
					}
					return Qu(n, t, i);
				})(t, i, e)
			: null;
	}
	class Su {
		constructor(t, e = {}) {
			(this.state = t), (this.options = e), (this.unit = yu(t));
		}
		lineAt(t, e = 1) {
			let i = this.state.doc.lineAt(t),
				{ simulateBreak: n, simulateDoubleBreak: r } = this.options;
			return null != n && n >= i.from && n <= i.to
				? r && n == t
					? { text: '', from: t }
					: (e < 0 ? n < t : n <= t)
						? { text: i.text.slice(n - i.from), from: n }
						: { text: i.text.slice(0, n - i.from), from: i.from }
				: i;
		}
		textAfterPos(t, e = 1) {
			if (
				this.options.simulateDoubleBreak &&
				t == this.options.simulateBreak
			)
				return '';
			let { text: i, from: n } = this.lineAt(t, e);
			return i.slice(t - n, Math.min(i.length, t + 100 - n));
		}
		column(t, e = 1) {
			let { text: i, from: n } = this.lineAt(t, e),
				r = this.countColumn(i, t - n),
				s = this.options.overrideIndentation
					? this.options.overrideIndentation(n)
					: -1;
			return (
				s > -1 && (r += s - this.countColumn(i, i.search(/\S|$/))), r
			);
		}
		countColumn(t, e = t.length) {
			return ts(t, this.state.tabSize, e);
		}
		lineIndent(t, e = 1) {
			let { text: i, from: n } = this.lineAt(t, e),
				r = this.options.overrideIndentation;
			if (r) {
				let t = r(n);
				if (t > -1) return t;
			}
			return this.countColumn(i, i.search(/\S|$/));
		}
		get simulatedBreak() {
			return this.options.simulateBreak || null;
		}
	}
	const xu = new Wt();
	function Qu(t, e, i) {
		for (let n = t; n; n = n.next) {
			let t = ku(n.node);
			if (t) return t(Pu.create(e, i, n));
		}
		return 0;
	}
	function ku(t) {
		let e = t.type.prop(xu);
		if (e) return e;
		let i,
			n = t.firstChild;
		if (n && (i = n.type.prop(Wt.closedBy))) {
			let e = t.lastChild,
				n = e && i.indexOf(e.name) > -1;
			return (t) =>
				Cu(
					t,
					!0,
					1,
					void 0,
					n &&
						!(function (t) {
							return (
								t.pos == t.options.simulateBreak &&
								t.options.simulateDoubleBreak
							);
						})(t)
						? e.from
						: void 0
				);
		}
		return null == t.parent ? $u : null;
	}
	function $u() {
		return 0;
	}
	class Pu extends Su {
		constructor(t, e, i) {
			super(t.state, t.options),
				(this.base = t),
				(this.pos = e),
				(this.context = i);
		}
		get node() {
			return this.context.node;
		}
		static create(t, e, i) {
			return new Pu(t, e, i);
		}
		get textAfter() {
			return this.textAfterPos(this.pos);
		}
		get baseIndent() {
			return this.baseIndentFor(this.node);
		}
		baseIndentFor(t) {
			let e = this.state.doc.lineAt(t.from);
			for (;;) {
				let i = t.resolve(e.from);
				for (; i.parent && i.parent.from == i.from; ) i = i.parent;
				if (Zu(i, t)) break;
				e = this.state.doc.lineAt(i.from);
			}
			return this.lineIndent(e.from);
		}
		continue() {
			return Qu(this.context.next, this.base, this.pos);
		}
	}
	function Zu(t, e) {
		for (let i = e; i; i = i.parent) if (t == i) return !0;
		return !1;
	}
	function Tu({ closing: t, align: e = !0, units: i = 1 }) {
		return (n) => Cu(n, e, i, t);
	}
	function Cu(t, e, i, n, r) {
		let s = t.textAfter,
			o = s.match(/^\s*/)[0].length,
			a = (n && s.slice(o, o + n.length) == n) || r == t.pos + o,
			l = e
				? (function (t) {
						let e = t.node,
							i = e.childAfter(e.from),
							n = e.lastChild;
						if (!i) return null;
						let r = t.options.simulateBreak,
							s = t.state.doc.lineAt(i.from),
							o =
								null == r || r <= s.from
									? s.to
									: Math.min(s.to, r);
						for (let t = i.to; ; ) {
							let r = e.childAfter(t);
							if (!r || r == n) return null;
							if (!r.type.isSkipped) {
								if (r.from >= o) return null;
								let t = /^ */.exec(
									s.text.slice(i.to - s.from)
								)[0].length;
								return { from: i.from, to: i.to + t };
							}
							t = r.to;
						}
					})(t)
				: null;
		return l
			? a
				? t.column(l.from)
				: t.column(l.to)
			: t.baseIndent + (a ? 0 : t.unit * i);
	}
	function Au({ except: t, units: e = 1 } = {}) {
		return (i) => {
			let n = t && t.test(i.textAfter);
			return i.baseIndent + (n ? 0 : e * i.unit);
		};
	}
	const Xu = Jn.define(),
		Mu = new Wt();
	function Ru(t) {
		let e = t.firstChild,
			i = t.lastChild;
		return e && e.to < i.from
			? { from: e.to, to: i.type.isError ? t.to : i.from }
			: null;
	}
	function _u(t) {
		let e = t.lastChild;
		return e && e.to == t.to && e.type.isError;
	}
	function Vu(t, e, i) {
		for (let n of t.facet(Xu)) {
			let r = n(t, e, i);
			if (r) return r;
		}
		return (function (t, e, i) {
			let n = ou(t);
			if (n.length < i) return null;
			let r = null;
			for (let s = n.resolveStack(i, 1); s; s = s.next) {
				let o = s.node;
				if (o.to <= i || o.from > i) continue;
				if (r && o.from < e) break;
				let a = o.type.prop(Mu);
				if (
					a &&
					(o.to < n.length - 50 || n.length == t.doc.length || !_u(o))
				) {
					let n = a(o, t);
					n && n.from <= i && n.from >= e && n.to > i && (r = n);
				}
			}
			return r;
		})(t, e, i);
	}
	function qu(t, e) {
		let i = e.mapPos(t.from, 1),
			n = e.mapPos(t.to, -1);
		return i >= n ? void 0 : { from: i, to: n };
	}
	const ju = kr.define({ map: qu }),
		Du = kr.define({ map: qu });
	function Eu(t) {
		let e = [];
		for (let { head: i } of t.state.selection.ranges)
			e.some((t) => t.from <= i && t.to >= i) || e.push(t.lineBlockAt(i));
		return e;
	}
	const Wu = or.define({
		create: () => mo.none,
		update(t, e) {
			t = t.map(e.changes);
			for (let i of e.effects)
				if (i.is(ju) && !zu(t, i.value.from, i.value.to)) {
					let { preparePlaceholder: n } = e.state.facet(Gu),
						r = n
							? mo.replace({
									widget: new Ku(n(e.state, i.value)),
								})
							: Hu;
					t = t.update({ add: [r.range(i.value.from, i.value.to)] });
				} else
					i.is(Du) &&
						(t = t.update({
							filter: (t, e) =>
								i.value.from != t || i.value.to != e,
							filterFrom: i.value.from,
							filterTo: i.value.to,
						}));
			if (e.selection) {
				let i = !1,
					{ head: n } = e.selection.main;
				t.between(n, n, (t, e) => {
					t < n && e > n && (i = !0);
				}),
					i &&
						(t = t.update({
							filterFrom: n,
							filterTo: n,
							filter: (t, e) => e <= n || t >= n,
						}));
			}
			return t;
		},
		provide: (t) => uh.decorations.from(t),
		toJSON(t, e) {
			let i = [];
			return (
				t.between(0, e.doc.length, (t, e) => {
					i.push(t, e);
				}),
				i
			);
		},
		fromJSON(t) {
			if (!Array.isArray(t) || t.length % 2)
				throw new RangeError('Invalid JSON for fold state');
			let e = [];
			for (let i = 0; i < t.length; ) {
				let n = t[i++],
					r = t[i++];
				if ('number' != typeof n || 'number' != typeof r)
					throw new RangeError('Invalid JSON for fold state');
				e.push(Hu.range(n, r));
			}
			return mo.set(e, !0);
		},
	});
	function Yu(t, e, i) {
		var n;
		let r = null;
		return (
			null === (n = t.field(Wu, !1)) ||
				void 0 === n ||
				n.between(e, i, (t, e) => {
					(!r || r.from > t) && (r = { from: t, to: e });
				}),
			r
		);
	}
	function zu(t, e, i) {
		let n = !1;
		return (
			t.between(e, e, (t, r) => {
				t == e && r == i && (n = !0);
			}),
			n
		);
	}
	function Lu(t, e) {
		return t.field(Wu, !1) ? e : e.concat(kr.appendConfig.of(Iu()));
	}
	function Bu(t, e, i = !0) {
		let n = t.state.doc.lineAt(e.from).number,
			r = t.state.doc.lineAt(e.to).number;
		return uh.announce.of(
			`${t.state.phrase(i ? 'Folded lines' : 'Unfolded lines')} ${n} ${t.state.phrase('to')} ${r}.`
		);
	}
	const Uu = [
			{
				key: 'Ctrl-Shift-[',
				mac: 'Cmd-Alt-[',
				run: (t) => {
					for (let e of Eu(t)) {
						let i = Vu(t.state, e.from, e.to);
						if (i)
							return (
								t.dispatch({
									effects: Lu(t.state, [ju.of(i), Bu(t, i)]),
								}),
								!0
							);
					}
					return !1;
				},
			},
			{
				key: 'Ctrl-Shift-]',
				mac: 'Cmd-Alt-]',
				run: (t) => {
					if (!t.state.field(Wu, !1)) return !1;
					let e = [];
					for (let i of Eu(t)) {
						let n = Yu(t.state, i.from, i.to);
						n && e.push(Du.of(n), Bu(t, n, !1));
					}
					return e.length && t.dispatch({ effects: e }), e.length > 0;
				},
			},
			{
				key: 'Ctrl-Alt-[',
				run: (t) => {
					let { state: e } = t,
						i = [];
					for (let n = 0; n < e.doc.length; ) {
						let r = t.lineBlockAt(n),
							s = Vu(e, r.from, r.to);
						s && i.push(ju.of(s)),
							(n = (s ? t.lineBlockAt(s.to) : r).to + 1);
					}
					return (
						i.length && t.dispatch({ effects: Lu(t.state, i) }),
						!!i.length
					);
				},
			},
			{
				key: 'Ctrl-Alt-]',
				run: (t) => {
					let e = t.state.field(Wu, !1);
					if (!e || !e.size) return !1;
					let i = [];
					return (
						e.between(0, t.state.doc.length, (t, e) => {
							i.push(Du.of({ from: t, to: e }));
						}),
						t.dispatch({ effects: i }),
						!0
					);
				},
			},
		],
		Nu = {
			placeholderDOM: null,
			preparePlaceholder: null,
			placeholderText: '…',
		},
		Gu = Jn.define({ combine: (t) => qr(t, Nu) });
	function Iu(t) {
		let e = [Wu, ed];
		return t && e.push(Gu.of(t)), e;
	}
	function Fu(t, e) {
		let { state: i } = t,
			n = i.facet(Gu),
			r = (e) => {
				let i = t.lineBlockAt(t.posAtDOM(e.target)),
					n = Yu(t.state, i.from, i.to);
				n && t.dispatch({ effects: Du.of(n) }), e.preventDefault();
			};
		if (n.placeholderDOM) return n.placeholderDOM(t, r, e);
		let s = document.createElement('span');
		return (
			(s.textContent = n.placeholderText),
			s.setAttribute('aria-label', i.phrase('folded code')),
			(s.title = i.phrase('unfold')),
			(s.className = 'cm-foldPlaceholder'),
			(s.onclick = r),
			s
		);
	}
	const Hu = mo.replace({
		widget: new (class extends Oo {
			toDOM(t) {
				return Fu(t, null);
			}
		})(),
	});
	class Ku extends Oo {
		constructor(t) {
			super(), (this.value = t);
		}
		eq(t) {
			return this.value == t.value;
		}
		toDOM(t) {
			return Fu(t, this.value);
		}
	}
	const Ju = {
		openText: '⌄',
		closedText: '›',
		markerDOM: null,
		domEventHandlers: {},
		foldingChanged: () => !1,
	};
	class td extends Cc {
		constructor(t, e) {
			super(), (this.config = t), (this.open = e);
		}
		eq(t) {
			return this.config == t.config && this.open == t.open;
		}
		toDOM(t) {
			if (this.config.markerDOM) return this.config.markerDOM(this.open);
			let e = document.createElement('span');
			return (
				(e.textContent = this.open
					? this.config.openText
					: this.config.closedText),
				(e.title = t.state.phrase(
					this.open ? 'Fold line' : 'Unfold line'
				)),
				e
			);
		}
	}
	const ed = uh.baseTheme({
		'.cm-foldPlaceholder': {
			backgroundColor: '#eee',
			border: '1px solid #ddd',
			color: '#888',
			borderRadius: '.2em',
			margin: '0 1px',
			padding: '0 1px',
			cursor: 'pointer',
		},
		'.cm-foldGutter span': { padding: '0 1px', cursor: 'pointer' },
	});
	class id {
		constructor(t, e) {
			let i;
			function n(t) {
				let e = ss.newName();
				return ((i || (i = Object.create(null)))['.' + e] = t), e;
			}
			this.specs = t;
			const r =
					'string' == typeof e.all
						? e.all
						: e.all
							? n(e.all)
							: void 0,
				s = e.scope;
			(this.scope =
				s instanceof nu
					? (t) => t.prop(tu) == s.data
					: s
						? (t) => t == s
						: void 0),
				(this.style = ci(
					t.map((t) => ({
						tag: t.tag,
						class:
							t.class || n(Object.assign({}, t, { tag: null })),
					})),
					{ all: r }
				).style),
				(this.module = i ? new ss(i) : null),
				(this.themeType = e.themeType);
		}
		static define(t, e) {
			return new id(t, e || {});
		}
	}
	const nd = Jn.define(),
		rd = Jn.define({ combine: (t) => (t.length ? [t[0]] : null) });
	function sd(t) {
		let e = t.facet(nd);
		return e.length ? e : t.facet(rd);
	}
	function od(t, e) {
		let i,
			n = [ld];
		return (
			t instanceof id &&
				(t.module && n.push(uh.styleModule.of(t.module)),
				(i = t.themeType)),
			(null == e ? void 0 : e.fallback)
				? n.push(rd.of(t))
				: i
					? n.push(
							nd.computeN([uh.darkTheme], (e) =>
								e.facet(uh.darkTheme) == ('dark' == i)
									? [t]
									: []
							)
						)
					: n.push(nd.of(t)),
			n
		);
	}
	class ad {
		constructor(t) {
			(this.markCache = Object.create(null)),
				(this.tree = ou(t.state)),
				(this.decorations = this.buildDeco(t, sd(t.state))),
				(this.decoratedTo = t.viewport.to);
		}
		update(t) {
			let e = ou(t.state),
				i = sd(t.state),
				n = i != sd(t.startState),
				{ viewport: r } = t.view,
				s = t.changes.mapPos(this.decoratedTo, 1);
			e.length < r.to && !n && e.type == this.tree.type && s >= r.to
				? ((this.decorations = this.decorations.map(t.changes)),
					(this.decoratedTo = s))
				: (e != this.tree || t.viewportChanged || n) &&
					((this.tree = e),
					(this.decorations = this.buildDeco(t.view, i)),
					(this.decoratedTo = r.to));
		}
		buildDeco(t, e) {
			if (!e || !this.tree.length) return mo.none;
			let i = new zr();
			for (let { from: n, to: r } of t.visibleRanges)
				ui(
					this.tree,
					e,
					(t, e, n) => {
						i.add(
							t,
							e,
							this.markCache[n] ||
								(this.markCache[n] = mo.mark({ class: n }))
						);
					},
					n,
					r
				);
			return i.finish();
		}
	}
	const ld = lr.high(da.fromClass(ad, { decorations: (t) => t.decorations })),
		hd = id.define([
			{ tag: Zi.meta, color: '#404740' },
			{ tag: Zi.link, textDecoration: 'underline' },
			{
				tag: Zi.heading,
				textDecoration: 'underline',
				fontWeight: 'bold',
			},
			{ tag: Zi.emphasis, fontStyle: 'italic' },
			{ tag: Zi.strong, fontWeight: 'bold' },
			{ tag: Zi.strikethrough, textDecoration: 'line-through' },
			{ tag: Zi.keyword, color: '#708' },
			{
				tag: [
					Zi.atom,
					Zi.bool,
					Zi.url,
					Zi.contentSeparator,
					Zi.labelName,
				],
				color: '#219',
			},
			{ tag: [Zi.literal, Zi.inserted], color: '#164' },
			{ tag: [Zi.string, Zi.deleted], color: '#a11' },
			{
				tag: [Zi.regexp, Zi.escape, Zi.special(Zi.string)],
				color: '#e40',
			},
			{ tag: Zi.definition(Zi.variableName), color: '#00f' },
			{ tag: Zi.local(Zi.variableName), color: '#30a' },
			{ tag: [Zi.typeName, Zi.namespace], color: '#085' },
			{ tag: Zi.className, color: '#167' },
			{ tag: [Zi.special(Zi.variableName), Zi.macroName], color: '#256' },
			{ tag: Zi.definition(Zi.propertyName), color: '#00c' },
			{ tag: Zi.comment, color: '#940' },
			{ tag: Zi.invalid, color: '#f00' },
		]),
		cd = uh.baseTheme({
			'&.cm-focused .cm-matchingBracket': {
				backgroundColor: '#328c8252',
			},
			'&.cm-focused .cm-nonmatchingBracket': {
				backgroundColor: '#bb555544',
			},
		}),
		ud = '()[]{}',
		dd = Jn.define({
			combine: (t) =>
				qr(t, {
					afterCursor: !0,
					brackets: ud,
					maxScanDistance: 1e4,
					renderMatch: pd,
				}),
		}),
		fd = mo.mark({ class: 'cm-matchingBracket' }),
		Od = mo.mark({ class: 'cm-nonmatchingBracket' });
	function pd(t) {
		let e = [],
			i = t.matched ? fd : Od;
		return (
			e.push(i.range(t.start.from, t.start.to)),
			t.end && e.push(i.range(t.end.from, t.end.to)),
			e
		);
	}
	const md = or.define({
			create: () => mo.none,
			update(t, e) {
				if (!e.docChanged && !e.selection) return t;
				let i = [],
					n = e.state.facet(dd);
				for (let t of e.state.selection.ranges) {
					if (!t.empty) continue;
					let r =
						wd(e.state, t.head, -1, n) ||
						(t.head > 0 && wd(e.state, t.head - 1, 1, n)) ||
						(n.afterCursor &&
							(wd(e.state, t.head, 1, n) ||
								(t.head < e.state.doc.length &&
									wd(e.state, t.head + 1, -1, n))));
					r && (i = i.concat(n.renderMatch(r, e.state)));
				}
				return mo.set(i, !0);
			},
			provide: (t) => uh.decorations.from(t),
		}),
		gd = [md, cd],
		bd = new Wt();
	function yd(t, e, i) {
		let n = t.prop(e < 0 ? Wt.openedBy : Wt.closedBy);
		if (n) return n;
		if (1 == t.name.length) {
			let n = i.indexOf(t.name);
			if (n > -1 && n % 2 == (e < 0 ? 1 : 0)) return [i[n + e]];
		}
		return null;
	}
	function vd(t) {
		let e = t.type.prop(bd);
		return e ? e(t.node) : t;
	}
	function wd(t, e, i, n = {}) {
		let r = n.maxScanDistance || 1e4,
			s = n.brackets || ud,
			o = ou(t),
			a = o.resolveInner(e, i);
		for (let t = a; t; t = t.parent) {
			let n = yd(t.type, i, s);
			if (n && t.from < t.to) {
				let r = vd(t);
				if (
					r &&
					(i > 0 ? e >= r.from && e < r.to : e > r.from && e <= r.to)
				)
					return Sd(0, 0, i, t, r, n, s);
			}
		}
		return (function (t, e, i, n, r, s, o) {
			let a = i < 0 ? t.sliceDoc(e - 1, e) : t.sliceDoc(e, e + 1),
				l = o.indexOf(a);
			if (l < 0 || (l % 2 == 0) != i > 0) return null;
			let h = { from: i < 0 ? e - 1 : e, to: i > 0 ? e + 1 : e },
				c = t.doc.iterRange(e, i > 0 ? t.doc.length : 0),
				u = 0;
			for (let t = 0; !c.next().done && t <= s; ) {
				let s = c.value;
				i < 0 && (t += s.length);
				let a = e + t * i;
				for (
					let t = i > 0 ? 0 : s.length - 1, e = i > 0 ? s.length : -1;
					t != e;
					t += i
				) {
					let e = o.indexOf(s[t]);
					if (!(e < 0 || n.resolveInner(a + t, 1).type != r))
						if ((e % 2 == 0) == i > 0) u++;
						else {
							if (1 == u)
								return {
									start: h,
									end: { from: a + t, to: a + t + 1 },
									matched: e >> 1 == l >> 1,
								};
							u--;
						}
				}
				i > 0 && (t += s.length);
			}
			return c.done ? { start: h, matched: !1 } : null;
		})(t, e, i, o, a.type, r, s);
	}
	function Sd(t, e, i, n, r, s, o) {
		let a = n.parent,
			l = { from: r.from, to: r.to },
			h = 0,
			c = null == a ? void 0 : a.cursor();
		if (c && (i < 0 ? c.childBefore(n.from) : c.childAfter(n.to)))
			do {
				if (i < 0 ? c.to <= n.from : c.from >= n.to) {
					if (
						0 == h &&
						s.indexOf(c.type.name) > -1 &&
						c.from < c.to
					) {
						let t = vd(c);
						return {
							start: l,
							end: t ? { from: t.from, to: t.to } : void 0,
							matched: !0,
						};
					}
					if (yd(c.type, i, o)) h++;
					else if (yd(c.type, -i, o)) {
						if (0 == h) {
							let t = vd(c);
							return {
								start: l,
								end:
									t && t.from < t.to
										? { from: t.from, to: t.to }
										: void 0,
								matched: !1,
							};
						}
						h--;
					}
				}
			} while (i < 0 ? c.prevSibling() : c.nextSibling());
		return { start: l, matched: !1 };
	}
	const xd = Object.create(null),
		Qd = [Lt.none],
		kd = [],
		$d = Object.create(null),
		Pd = Object.create(null);
	for (let [t, e] of [
		['variable', 'variableName'],
		['variable-2', 'variableName.special'],
		['string-2', 'string.special'],
		['def', 'variableName.definition'],
		['tag', 'tagName'],
		['attribute', 'attributeName'],
		['type', 'typeName'],
		['builtin', 'variableName.standard'],
		['qualifier', 'modifier'],
		['error', 'invalid'],
		['header', 'heading'],
		['property', 'propertyName'],
	])
		Pd[t] = Td(xd, e);
	function Zd(t, e) {
		kd.indexOf(t) > -1 || (kd.push(t), console.warn(e));
	}
	function Td(t, e) {
		let i = [];
		for (let n of e.split(' ')) {
			let e = [];
			for (let i of n.split('.')) {
				let n = t[i] || Zi[i];
				n
					? 'function' == typeof n
						? e.length
							? (e = e.map(n))
							: Zd(i, `Modifier ${i} used at start of tag`)
						: e.length
							? Zd(i, `Tag ${i} used as modifier`)
							: (e = Array.isArray(n) ? n : [n])
					: Zd(i, `Unknown highlighting tag ${i}`);
			}
			for (let t of e) i.push(t);
		}
		if (!i.length) return 0;
		let n = e.replace(/ /g, '_'),
			r = n + ' ' + i.map((t) => t.id),
			s = $d[r];
		if (s) return s.id;
		let o = ($d[r] = Lt.define({
			id: Qd.length,
			name: n,
			props: [ai({ [n]: i })],
		}));
		return Qd.push(o), o.id;
	}
	Zo.RTL, Zo.LTR;
	let Cd = null;
	function Ad() {
		if (!Cd && 'object' == typeof document && document.body) {
			let { style: t } = document.body,
				e = [],
				i = new Set();
			for (let n in t)
				'cssText' != n &&
					'cssFloat' != n &&
					'string' == typeof t[n] &&
					(/[A-Z]/.test(n) &&
						(n = n.replace(/[A-Z]/g, (t) => '-' + t.toLowerCase())),
					i.has(n) || (e.push(n), i.add(n)));
			Cd = e
				.sort()
				.map((t) => ({ type: 'property', label: t, apply: t + ': ' }));
		}
		return Cd || [];
	}
	const Xd = [
			'active',
			'after',
			'any-link',
			'autofill',
			'backdrop',
			'before',
			'checked',
			'cue',
			'default',
			'defined',
			'disabled',
			'empty',
			'enabled',
			'file-selector-button',
			'first',
			'first-child',
			'first-letter',
			'first-line',
			'first-of-type',
			'focus',
			'focus-visible',
			'focus-within',
			'fullscreen',
			'has',
			'host',
			'host-context',
			'hover',
			'in-range',
			'indeterminate',
			'invalid',
			'is',
			'lang',
			'last-child',
			'last-of-type',
			'left',
			'link',
			'marker',
			'modal',
			'not',
			'nth-child',
			'nth-last-child',
			'nth-last-of-type',
			'nth-of-type',
			'only-child',
			'only-of-type',
			'optional',
			'out-of-range',
			'part',
			'placeholder',
			'placeholder-shown',
			'read-only',
			'read-write',
			'required',
			'right',
			'root',
			'scope',
			'selection',
			'slotted',
			'target',
			'target-text',
			'valid',
			'visited',
			'where',
		].map((t) => ({ type: 'class', label: t })),
		Md = [
			'above',
			'absolute',
			'activeborder',
			'additive',
			'activecaption',
			'after-white-space',
			'ahead',
			'alias',
			'all',
			'all-scroll',
			'alphabetic',
			'alternate',
			'always',
			'antialiased',
			'appworkspace',
			'asterisks',
			'attr',
			'auto',
			'auto-flow',
			'avoid',
			'avoid-column',
			'avoid-page',
			'avoid-region',
			'axis-pan',
			'background',
			'backwards',
			'baseline',
			'below',
			'bidi-override',
			'blink',
			'block',
			'block-axis',
			'bold',
			'bolder',
			'border',
			'border-box',
			'both',
			'bottom',
			'break',
			'break-all',
			'break-word',
			'bullets',
			'button',
			'button-bevel',
			'buttonface',
			'buttonhighlight',
			'buttonshadow',
			'buttontext',
			'calc',
			'capitalize',
			'caps-lock-indicator',
			'caption',
			'captiontext',
			'caret',
			'cell',
			'center',
			'checkbox',
			'circle',
			'cjk-decimal',
			'clear',
			'clip',
			'close-quote',
			'col-resize',
			'collapse',
			'color',
			'color-burn',
			'color-dodge',
			'column',
			'column-reverse',
			'compact',
			'condensed',
			'contain',
			'content',
			'contents',
			'content-box',
			'context-menu',
			'continuous',
			'copy',
			'counter',
			'counters',
			'cover',
			'crop',
			'cross',
			'crosshair',
			'currentcolor',
			'cursive',
			'cyclic',
			'darken',
			'dashed',
			'decimal',
			'decimal-leading-zero',
			'default',
			'default-button',
			'dense',
			'destination-atop',
			'destination-in',
			'destination-out',
			'destination-over',
			'difference',
			'disc',
			'discard',
			'disclosure-closed',
			'disclosure-open',
			'document',
			'dot-dash',
			'dot-dot-dash',
			'dotted',
			'double',
			'down',
			'e-resize',
			'ease',
			'ease-in',
			'ease-in-out',
			'ease-out',
			'element',
			'ellipse',
			'ellipsis',
			'embed',
			'end',
			'ethiopic-abegede-gez',
			'ethiopic-halehame-aa-er',
			'ethiopic-halehame-gez',
			'ew-resize',
			'exclusion',
			'expanded',
			'extends',
			'extra-condensed',
			'extra-expanded',
			'fantasy',
			'fast',
			'fill',
			'fill-box',
			'fixed',
			'flat',
			'flex',
			'flex-end',
			'flex-start',
			'footnotes',
			'forwards',
			'from',
			'geometricPrecision',
			'graytext',
			'grid',
			'groove',
			'hand',
			'hard-light',
			'help',
			'hidden',
			'hide',
			'higher',
			'highlight',
			'highlighttext',
			'horizontal',
			'hsl',
			'hsla',
			'hue',
			'icon',
			'ignore',
			'inactiveborder',
			'inactivecaption',
			'inactivecaptiontext',
			'infinite',
			'infobackground',
			'infotext',
			'inherit',
			'initial',
			'inline',
			'inline-axis',
			'inline-block',
			'inline-flex',
			'inline-grid',
			'inline-table',
			'inset',
			'inside',
			'intrinsic',
			'invert',
			'italic',
			'justify',
			'keep-all',
			'landscape',
			'large',
			'larger',
			'left',
			'level',
			'lighter',
			'lighten',
			'line-through',
			'linear',
			'linear-gradient',
			'lines',
			'list-item',
			'listbox',
			'listitem',
			'local',
			'logical',
			'loud',
			'lower',
			'lower-hexadecimal',
			'lower-latin',
			'lower-norwegian',
			'lowercase',
			'ltr',
			'luminosity',
			'manipulation',
			'match',
			'matrix',
			'matrix3d',
			'medium',
			'menu',
			'menutext',
			'message-box',
			'middle',
			'min-intrinsic',
			'mix',
			'monospace',
			'move',
			'multiple',
			'multiple_mask_images',
			'multiply',
			'n-resize',
			'narrower',
			'ne-resize',
			'nesw-resize',
			'no-close-quote',
			'no-drop',
			'no-open-quote',
			'no-repeat',
			'none',
			'normal',
			'not-allowed',
			'nowrap',
			'ns-resize',
			'numbers',
			'numeric',
			'nw-resize',
			'nwse-resize',
			'oblique',
			'opacity',
			'open-quote',
			'optimizeLegibility',
			'optimizeSpeed',
			'outset',
			'outside',
			'outside-shape',
			'overlay',
			'overline',
			'padding',
			'padding-box',
			'painted',
			'page',
			'paused',
			'perspective',
			'pinch-zoom',
			'plus-darker',
			'plus-lighter',
			'pointer',
			'polygon',
			'portrait',
			'pre',
			'pre-line',
			'pre-wrap',
			'preserve-3d',
			'progress',
			'push-button',
			'radial-gradient',
			'radio',
			'read-only',
			'read-write',
			'read-write-plaintext-only',
			'rectangle',
			'region',
			'relative',
			'repeat',
			'repeating-linear-gradient',
			'repeating-radial-gradient',
			'repeat-x',
			'repeat-y',
			'reset',
			'reverse',
			'rgb',
			'rgba',
			'ridge',
			'right',
			'rotate',
			'rotate3d',
			'rotateX',
			'rotateY',
			'rotateZ',
			'round',
			'row',
			'row-resize',
			'row-reverse',
			'rtl',
			'run-in',
			'running',
			's-resize',
			'sans-serif',
			'saturation',
			'scale',
			'scale3d',
			'scaleX',
			'scaleY',
			'scaleZ',
			'screen',
			'scroll',
			'scrollbar',
			'scroll-position',
			'se-resize',
			'self-start',
			'self-end',
			'semi-condensed',
			'semi-expanded',
			'separate',
			'serif',
			'show',
			'single',
			'skew',
			'skewX',
			'skewY',
			'skip-white-space',
			'slide',
			'slider-horizontal',
			'slider-vertical',
			'sliderthumb-horizontal',
			'sliderthumb-vertical',
			'slow',
			'small',
			'small-caps',
			'small-caption',
			'smaller',
			'soft-light',
			'solid',
			'source-atop',
			'source-in',
			'source-out',
			'source-over',
			'space',
			'space-around',
			'space-between',
			'space-evenly',
			'spell-out',
			'square',
			'start',
			'static',
			'status-bar',
			'stretch',
			'stroke',
			'stroke-box',
			'sub',
			'subpixel-antialiased',
			'svg_masks',
			'super',
			'sw-resize',
			'symbolic',
			'symbols',
			'system-ui',
			'table',
			'table-caption',
			'table-cell',
			'table-column',
			'table-column-group',
			'table-footer-group',
			'table-header-group',
			'table-row',
			'table-row-group',
			'text',
			'text-bottom',
			'text-top',
			'textarea',
			'textfield',
			'thick',
			'thin',
			'threeddarkshadow',
			'threedface',
			'threedhighlight',
			'threedlightshadow',
			'threedshadow',
			'to',
			'top',
			'transform',
			'translate',
			'translate3d',
			'translateX',
			'translateY',
			'translateZ',
			'transparent',
			'ultra-condensed',
			'ultra-expanded',
			'underline',
			'unidirectional-pan',
			'unset',
			'up',
			'upper-latin',
			'uppercase',
			'url',
			'var',
			'vertical',
			'vertical-text',
			'view-box',
			'visible',
			'visibleFill',
			'visiblePainted',
			'visibleStroke',
			'visual',
			'w-resize',
			'wait',
			'wave',
			'wider',
			'window',
			'windowframe',
			'windowtext',
			'words',
			'wrap',
			'wrap-reverse',
			'x-large',
			'x-small',
			'xor',
			'xx-large',
			'xx-small',
		]
			.map((t) => ({ type: 'keyword', label: t }))
			.concat(
				[
					'aliceblue',
					'antiquewhite',
					'aqua',
					'aquamarine',
					'azure',
					'beige',
					'bisque',
					'black',
					'blanchedalmond',
					'blue',
					'blueviolet',
					'brown',
					'burlywood',
					'cadetblue',
					'chartreuse',
					'chocolate',
					'coral',
					'cornflowerblue',
					'cornsilk',
					'crimson',
					'cyan',
					'darkblue',
					'darkcyan',
					'darkgoldenrod',
					'darkgray',
					'darkgreen',
					'darkkhaki',
					'darkmagenta',
					'darkolivegreen',
					'darkorange',
					'darkorchid',
					'darkred',
					'darksalmon',
					'darkseagreen',
					'darkslateblue',
					'darkslategray',
					'darkturquoise',
					'darkviolet',
					'deeppink',
					'deepskyblue',
					'dimgray',
					'dodgerblue',
					'firebrick',
					'floralwhite',
					'forestgreen',
					'fuchsia',
					'gainsboro',
					'ghostwhite',
					'gold',
					'goldenrod',
					'gray',
					'grey',
					'green',
					'greenyellow',
					'honeydew',
					'hotpink',
					'indianred',
					'indigo',
					'ivory',
					'khaki',
					'lavender',
					'lavenderblush',
					'lawngreen',
					'lemonchiffon',
					'lightblue',
					'lightcoral',
					'lightcyan',
					'lightgoldenrodyellow',
					'lightgray',
					'lightgreen',
					'lightpink',
					'lightsalmon',
					'lightseagreen',
					'lightskyblue',
					'lightslategray',
					'lightsteelblue',
					'lightyellow',
					'lime',
					'limegreen',
					'linen',
					'magenta',
					'maroon',
					'mediumaquamarine',
					'mediumblue',
					'mediumorchid',
					'mediumpurple',
					'mediumseagreen',
					'mediumslateblue',
					'mediumspringgreen',
					'mediumturquoise',
					'mediumvioletred',
					'midnightblue',
					'mintcream',
					'mistyrose',
					'moccasin',
					'navajowhite',
					'navy',
					'oldlace',
					'olive',
					'olivedrab',
					'orange',
					'orangered',
					'orchid',
					'palegoldenrod',
					'palegreen',
					'paleturquoise',
					'palevioletred',
					'papayawhip',
					'peachpuff',
					'peru',
					'pink',
					'plum',
					'powderblue',
					'purple',
					'rebeccapurple',
					'red',
					'rosybrown',
					'royalblue',
					'saddlebrown',
					'salmon',
					'sandybrown',
					'seagreen',
					'seashell',
					'sienna',
					'silver',
					'skyblue',
					'slateblue',
					'slategray',
					'snow',
					'springgreen',
					'steelblue',
					'tan',
					'teal',
					'thistle',
					'tomato',
					'turquoise',
					'violet',
					'wheat',
					'white',
					'whitesmoke',
					'yellow',
					'yellowgreen',
				].map((t) => ({ type: 'constant', label: t }))
			),
		Rd = [
			'a',
			'abbr',
			'address',
			'article',
			'aside',
			'b',
			'bdi',
			'bdo',
			'blockquote',
			'body',
			'br',
			'button',
			'canvas',
			'caption',
			'cite',
			'code',
			'col',
			'colgroup',
			'dd',
			'del',
			'details',
			'dfn',
			'dialog',
			'div',
			'dl',
			'dt',
			'em',
			'figcaption',
			'figure',
			'footer',
			'form',
			'header',
			'hgroup',
			'h1',
			'h2',
			'h3',
			'h4',
			'h5',
			'h6',
			'hr',
			'html',
			'i',
			'iframe',
			'img',
			'input',
			'ins',
			'kbd',
			'label',
			'legend',
			'li',
			'main',
			'meter',
			'nav',
			'ol',
			'output',
			'p',
			'pre',
			'ruby',
			'section',
			'select',
			'small',
			'source',
			'span',
			'strong',
			'sub',
			'summary',
			'sup',
			'table',
			'tbody',
			'td',
			'template',
			'textarea',
			'tfoot',
			'th',
			'thead',
			'tr',
			'u',
			'ul',
		].map((t) => ({ type: 'type', label: t })),
		_d = [
			'@charset',
			'@color-profile',
			'@container',
			'@counter-style',
			'@font-face',
			'@font-feature-values',
			'@font-palette-values',
			'@import',
			'@keyframes',
			'@layer',
			'@media',
			'@namespace',
			'@page',
			'@position-try',
			'@property',
			'@scope',
			'@starting-style',
			'@supports',
			'@view-transition',
		].map((t) => ({ type: 'keyword', label: t })),
		Vd = /^(\w[\w-]*|-\w[\w-]*|)$/,
		qd = /^-(-[\w-]*)?$/,
		jd = new fe(),
		Dd = ['Declaration'];
	function Ed(t) {
		for (let e = t; ; ) {
			if (e.type.isTop) return e;
			if (!(e = e.parent)) return t;
		}
	}
	function Wd(t, e, i) {
		if (e.to - e.from > 4096) {
			let n = jd.get(e);
			if (n) return n;
			let r = [],
				s = new Set(),
				o = e.cursor(Gt.IncludeAnonymous);
			if (o.firstChild())
				do {
					for (let e of Wd(t, o.node, i))
						s.has(e.label) || (s.add(e.label), r.push(e));
				} while (o.nextSibling());
			return jd.set(e, r), r;
		}
		{
			let n = [],
				r = new Set();
			return (
				e.cursor().iterate((e) => {
					var s;
					if (
						i(e) &&
						e.matchContext(Dd) &&
						':' ==
							(null === (s = e.node.nextSibling) || void 0 === s
								? void 0
								: s.name)
					) {
						let i = t.sliceString(e.from, e.to);
						r.has(i) ||
							(r.add(i), n.push({ label: i, type: 'variable' }));
					}
				}),
				n
			);
		}
	}
	const Yd = (t) => (e) => {
			let { state: i, pos: n } = e,
				r = ou(i).resolveInner(n, -1),
				s =
					r.type.isError &&
					r.from == r.to - 1 &&
					'-' == i.doc.sliceString(r.from, r.to);
			if (
				'PropertyName' == r.name ||
				((s || 'TagName' == r.name) &&
					/^(Block|Styles)$/.test(r.resolve(r.to).name))
			)
				return { from: r.from, options: Ad(), validFor: Vd };
			if ('ValueName' == r.name)
				return { from: r.from, options: Md, validFor: Vd };
			if ('PseudoClassName' == r.name)
				return { from: r.from, options: Xd, validFor: Vd };
			if (
				t(r) ||
				((e.explicit || s) &&
					(function (t, e) {
						var i;
						if (
							(('(' == t.name || t.type.isError) &&
								(t = t.parent || t),
							'ArgList' != t.name)
						)
							return !1;
						let n =
							null === (i = t.parent) || void 0 === i
								? void 0
								: i.firstChild;
						return (
							'Callee' == (null == n ? void 0 : n.name) &&
							'var' == e.sliceString(n.from, n.to)
						);
					})(r, i.doc))
			)
				return {
					from: t(r) || s ? r.from : n,
					options: Wd(i.doc, Ed(r), t),
					validFor: qd,
				};
			if ('TagName' == r.name) {
				for (let { parent: t } = r; t; t = t.parent)
					if ('Block' == t.name)
						return { from: r.from, options: Ad(), validFor: Vd };
				return { from: r.from, options: Rd, validFor: Vd };
			}
			if ('AtKeyword' == r.name)
				return { from: r.from, options: _d, validFor: Vd };
			if (!e.explicit) return null;
			let o = r.resolve(n),
				a = o.childBefore(n);
			return a && ':' == a.name && 'PseudoClassSelector' == o.name
				? { from: n, options: Xd, validFor: Vd }
				: (a && ':' == a.name && 'Declaration' == o.name) ||
					  'ArgList' == o.name
					? { from: n, options: Md, validFor: Vd }
					: 'Block' == o.name || 'Styles' == o.name
						? { from: n, options: Ad(), validFor: Vd }
						: null;
		},
		zd = Yd((t) => 'VariableName' == t.name),
		Ld = su.define({
			name: 'css',
			parser: dn.configure({
				props: [
					xu.add({ Declaration: Au() }),
					Mu.add({ 'Block KeyframeList': Ru }),
				],
			}),
			languageData: {
				commentTokens: { block: { open: '/*', close: '*/' } },
				indentOnInput: /^\s*\}$/,
				wordChars: '-',
			},
		}),
		Bd = [
			9, 10, 11, 12, 13, 32, 133, 160, 5760, 8192, 8193, 8194, 8195, 8196,
			8197, 8198, 8199, 8200, 8201, 8202, 8232, 8233, 8239, 8287, 12288,
		],
		Ud = new Je({
			start: !1,
			shift: (t, e) => (5 == e || 6 == e || 318 == e ? t : 319 == e),
			strict: !1,
		}),
		Nd = new Ee(
			(t, e) => {
				let { next: i } = t;
				(125 == i || -1 == i || e.context) && t.acceptToken(316);
			},
			{ contextual: !0, fallback: !0 }
		),
		Gd = new Ee(
			(t, e) => {
				let i,
					{ next: n } = t;
				Bd.indexOf(n) > -1 ||
					((47 != n || (47 != (i = t.peek(1)) && 42 != i)) &&
						(125 == n ||
							59 == n ||
							-1 == n ||
							e.context ||
							t.acceptToken(314)));
			},
			{ contextual: !0 }
		),
		Id = new Ee(
			(t, e) => {
				91 != t.next || e.context || t.acceptToken(315);
			},
			{ contextual: !0 }
		),
		Fd = new Ee(
			(t, e) => {
				let { next: i } = t;
				if (43 == i || 45 == i) {
					if ((t.advance(), i == t.next)) {
						t.advance();
						let i = !e.context && e.canShift(1);
						t.acceptToken(i ? 1 : 2);
					}
				} else
					63 == i &&
						46 == t.peek(1) &&
						(t.advance(),
						t.advance(),
						(t.next < 48 || t.next > 57) && t.acceptToken(3));
			},
			{ contextual: !0 }
		);
	function Hd(t, e) {
		return (
			(t >= 65 && t <= 90) ||
			(t >= 97 && t <= 122) ||
			95 == t ||
			t >= 192 ||
			(!e && t >= 48 && t <= 57)
		);
	}
	const Kd = new Ee((t, e) => {
			if (60 != t.next || !e.dialectEnabled(0)) return;
			if ((t.advance(), 47 == t.next)) return;
			let i = 0;
			for (; Bd.indexOf(t.next) > -1; ) t.advance(), i++;
			if (Hd(t.next, !0)) {
				for (t.advance(), i++; Hd(t.next, !1); ) t.advance(), i++;
				for (; Bd.indexOf(t.next) > -1; ) t.advance(), i++;
				if (44 == t.next) return;
				for (let e = 0; ; e++) {
					if (7 == e) {
						if (!Hd(t.next, !0)) return;
						break;
					}
					if (t.next != 'extends'.charCodeAt(e)) break;
					t.advance(), i++;
				}
			}
			t.acceptToken(4, -i);
		}),
		Jd = ai({
			'get set async static': Zi.modifier,
			'for while do if else switch try catch finally return throw break continue default case':
				Zi.controlKeyword,
			'in of await yield void typeof delete instanceof':
				Zi.operatorKeyword,
			'let var const using function class extends': Zi.definitionKeyword,
			'import export from': Zi.moduleKeyword,
			'with debugger as new': Zi.keyword,
			TemplateString: Zi.special(Zi.string),
			super: Zi.atom,
			BooleanLiteral: Zi.bool,
			this: Zi.self,
			null: Zi.null,
			Star: Zi.modifier,
			VariableName: Zi.variableName,
			'CallExpression/VariableName TaggedTemplateExpression/VariableName':
				Zi.function(Zi.variableName),
			VariableDefinition: Zi.definition(Zi.variableName),
			Label: Zi.labelName,
			PropertyName: Zi.propertyName,
			PrivatePropertyName: Zi.special(Zi.propertyName),
			'CallExpression/MemberExpression/PropertyName': Zi.function(
				Zi.propertyName
			),
			'FunctionDeclaration/VariableDefinition': Zi.function(
				Zi.definition(Zi.variableName)
			),
			'ClassDeclaration/VariableDefinition': Zi.definition(Zi.className),
			'NewExpression/VariableName': Zi.className,
			PropertyDefinition: Zi.definition(Zi.propertyName),
			PrivatePropertyDefinition: Zi.definition(
				Zi.special(Zi.propertyName)
			),
			UpdateOp: Zi.updateOperator,
			'LineComment Hashbang': Zi.lineComment,
			BlockComment: Zi.blockComment,
			Number: Zi.number,
			String: Zi.string,
			Escape: Zi.escape,
			ArithOp: Zi.arithmeticOperator,
			LogicOp: Zi.logicOperator,
			BitOp: Zi.bitwiseOperator,
			CompareOp: Zi.compareOperator,
			RegExp: Zi.regexp,
			Equals: Zi.definitionOperator,
			Arrow: Zi.function(Zi.punctuation),
			': Spread': Zi.punctuation,
			'( )': Zi.paren,
			'[ ]': Zi.squareBracket,
			'{ }': Zi.brace,
			'InterpolationStart InterpolationEnd': Zi.special(Zi.brace),
			'.': Zi.derefOperator,
			', ;': Zi.separator,
			'@': Zi.meta,
			TypeName: Zi.typeName,
			TypeDefinition: Zi.definition(Zi.typeName),
			'type enum interface implements namespace module declare':
				Zi.definitionKeyword,
			'abstract global Privacy readonly override': Zi.modifier,
			'is keyof unique infer asserts': Zi.operatorKeyword,
			JSXAttributeValue: Zi.attributeValue,
			JSXText: Zi.content,
			'JSXStartTag JSXStartCloseTag JSXSelfCloseEndTag JSXEndTag':
				Zi.angleBracket,
			'JSXIdentifier JSXNameSpacedName': Zi.tagName,
			'JSXAttribute/JSXIdentifier JSXAttribute/JSXNameSpacedName':
				Zi.attributeName,
			'JSXBuiltin/JSXIdentifier': Zi.standard(Zi.tagName),
		}),
		tf = {
			__proto__: null,
			export: 20,
			as: 25,
			from: 33,
			default: 36,
			async: 41,
			function: 42,
			const: 52,
			extends: 56,
			this: 60,
			true: 68,
			false: 68,
			null: 80,
			void: 84,
			typeof: 88,
			super: 104,
			new: 138,
			delete: 150,
			yield: 159,
			await: 163,
			class: 168,
			public: 231,
			private: 231,
			protected: 231,
			readonly: 233,
			instanceof: 252,
			satisfies: 255,
			in: 256,
			import: 290,
			keyof: 347,
			unique: 351,
			infer: 357,
			asserts: 393,
			is: 395,
			abstract: 415,
			implements: 417,
			type: 419,
			let: 422,
			var: 424,
			using: 427,
			interface: 433,
			enum: 437,
			namespace: 443,
			module: 445,
			declare: 449,
			global: 453,
			for: 472,
			of: 481,
			while: 484,
			with: 488,
			do: 492,
			if: 496,
			else: 498,
			switch: 502,
			case: 508,
			try: 514,
			catch: 518,
			finally: 522,
			return: 526,
			throw: 530,
			break: 534,
			continue: 538,
			debugger: 542,
		},
		ef = {
			__proto__: null,
			async: 125,
			get: 127,
			set: 129,
			declare: 191,
			public: 193,
			private: 193,
			protected: 193,
			static: 195,
			abstract: 197,
			override: 199,
			readonly: 205,
			accessor: 207,
			new: 399,
		},
		nf = { __proto__: null, '<': 189 },
		rf = ti.deserialize({
			version: 14,
			states: "$EOQ%TQlOOO%[QlOOO'_QpOOP(lO`OOO*zQ!0MxO'#CiO+RO#tO'#CjO+aO&jO'#CjO+oO#@ItO'#D_O.QQlO'#DeO.bQlO'#DpO%[QlO'#DxO0fQlO'#EQOOQ!0Lf'#EY'#EYO1PQ`O'#EVOOQO'#En'#EnOOQO'#Ij'#IjO1XQ`O'#GrO1dQ`O'#EmO1iQ`O'#EmO3hQ!0MxO'#JpO6[Q!0MxO'#JqO6uQ`O'#F[O6zQ,UO'#FsOOQ!0Lf'#Fe'#FeO7VO7dO'#FeO7eQMhO'#F{O9UQ`O'#FzOOQ!0Lf'#Jq'#JqOOQ!0Lb'#Jp'#JpO9ZQ`O'#GvOOQ['#K]'#K]O9fQ`O'#IWO9kQ!0LrO'#IXOOQ['#J^'#J^OOQ['#I]'#I]Q`QlOOQ`QlOOO9sQ!L^O'#DtO9zQlO'#D|O:RQlO'#EOO9aQ`O'#GrO:YQMhO'#CoO:hQ`O'#ElO:sQ`O'#EwO:xQMhO'#FdO;gQ`O'#GrOOQO'#K^'#K^O;lQ`O'#K^O;zQ`O'#GzO;zQ`O'#G{O;zQ`O'#G}O9aQ`O'#HQO<qQ`O'#HTO>YQ`O'#CeO>jQ`O'#HaO>rQ`O'#HgO>rQ`O'#HiO`QlO'#HkO>rQ`O'#HmO>rQ`O'#HpO>wQ`O'#HvO>|Q!0LsO'#H|O%[QlO'#IOO?XQ!0LsO'#IQO?dQ!0LsO'#ISO9kQ!0LrO'#IUO?oQ!0MxO'#CiO@qQpO'#DjQOQ`OOO%[QlO'#EOOAXQ`O'#ERO:YQMhO'#ElOAdQ`O'#ElOAoQ!bO'#FdOOQ['#Cg'#CgOOQ!0Lb'#Do'#DoOOQ!0Lb'#Jt'#JtO%[QlO'#JtOOQO'#Jw'#JwOOQO'#If'#IfOBoQpO'#EeOOQ!0Lb'#Ed'#EdOOQ!0Lb'#J{'#J{OCkQ!0MSO'#EeOCuQpO'#EUOOQO'#Jv'#JvODZQpO'#JwOEhQpO'#EUOCuQpO'#EePEuO&2DjO'#CbPOOO)CD{)CD{OOOO'#I^'#I^OFQO#tO,59UOOQ!0Lh,59U,59UOOOO'#I_'#I_OF`O&jO,59UOFnQ!L^O'#DaOOOO'#Ia'#IaOFuO#@ItO,59yOOQ!0Lf,59y,59yOGTQlO'#IbOGhQ`O'#JrOIgQ!fO'#JrO+}QlO'#JrOInQ`O,5:POJUQ`O'#EnOJcQ`O'#KROJnQ`O'#KQOJnQ`O'#KQOJvQ`O,5;[OJ{Q`O'#KPOOQ!0Ln,5:[,5:[OKSQlO,5:[OMQQ!0MxO,5:dOMqQ`O,5:lON[Q!0LrO'#KOONcQ`O'#J}O9ZQ`O'#J}ONwQ`O'#J}O! PQ`O,5;ZO! UQ`O'#J}O!#ZQ!fO'#JqOOQ!0Lh'#Ci'#CiO%[QlO'#EQO!#yQ!fO,5:qOOQS'#Jx'#JxOOQO-E<h-E<hO9aQ`O,5=^O!$aQ`O,5=^O!$fQlO,5;XO!&iQMhO'#EiO!(SQ`O,5;XO!(XQlO'#DwO!(cQpO,5;bO!(kQpO,5;bO%[QlO,5;bOOQ['#FS'#FSOOQ['#FU'#FUO%[QlO,5;cO%[QlO,5;cO%[QlO,5;cO%[QlO,5;cO%[QlO,5;cO%[QlO,5;cO%[QlO,5;cO%[QlO,5;cO%[QlO,5;cO%[QlO,5;cOOQ['#FY'#FYO!(yQlO,5;sOOQ!0Lf,5;x,5;xOOQ!0Lf,5;y,5;yOOQ!0Lf,5;{,5;{O%[QlO'#InO!*|Q!0LrO,5<hO%[QlO,5;cO!&iQMhO,5;cO!+kQMhO,5;cO!-]QMhO'#E[O%[QlO,5;vOOQ!0Lf,5;z,5;zO!-dQ,UO'#FiO!.aQ,UO'#KVO!-{Q,UO'#KVO!.hQ,UO'#KVOOQO'#KV'#KVO!.|Q,UO,5<ROOOW,5<_,5<_O!/_QlO'#FuOOOW'#Im'#ImO7VO7dO,5<PO!/fQ,UO'#FwOOQ!0Lf,5<P,5<PO!0VQ$IUO'#CwOOQ!0Lh'#C{'#C{O!0jO#@ItO'#DPO!1WQMjO,5<dO!1_Q`O,5<gO!2zQ(CWO'#GWO!3XQ`O'#GXO!3^Q`O'#GXO!4|Q(CWO'#G]O!6RQpO'#GaOOQO'#Gm'#GmO!+rQMhO'#GlOOQO'#Go'#GoO!+rQMhO'#GnO!6tQ$IUO'#JjOOQ!0Lh'#Jj'#JjO!7OQ`O'#JiO!7^Q`O'#JhO!7fQ`O'#CuOOQ!0Lh'#Cy'#CyO!7qQ`O'#C{OOQ!0Lh'#DT'#DTOOQ!0Lh'#DV'#DVO1SQ`O'#DXO!+rQMhO'#GOO!+rQMhO'#GQO!7vQ`O'#GSO!7{Q`O'#GTO!3^Q`O'#GZO!+rQMhO'#G`O;zQ`O'#JiO!8QQ`O'#EoO!8oQ`O,5<fOOQ!0Lb'#Cr'#CrO!8wQ`O'#EpO!9qQpO'#EqOOQ!0Lb'#KP'#KPO!9xQ!0LrO'#K_O9kQ!0LrO,5=bO`QlO,5>rOOQ['#Jf'#JfOOQ[,5>s,5>sOOQ[-E<Z-E<ZO!;wQ!0MxO,5:`O!9lQpO,5:^O!>bQ!0MxO,5:hO%[QlO,5:hO!@xQ!0MxO,5:jOOQO,5@x,5@xO!AiQMhO,5=^O!AwQ!0LrO'#JgO9UQ`O'#JgO!BYQ!0LrO,59ZO!BeQpO,59ZO!BmQMhO,59ZO:YQMhO,59ZO!BxQ`O,5;XO!CQQ`O'#H`O!CfQ`O'#KbO%[QlO,5;|O!9lQpO,5<OO!CnQ`O,5=yO!CsQ`O,5=yO!CxQ`O,5=yO9kQ!0LrO,5=yO;zQ`O,5=iOOQO'#Cw'#CwO!DWQpO,5=fO!D`QMhO,5=gO!DkQ`O,5=iO!DpQ!bO,5=lO!DxQ`O'#K^O>wQ`O'#HVO9aQ`O'#HXO!D}Q`O'#HXO:YQMhO'#HZO!ESQ`O'#HZOOQ[,5=o,5=oO!EXQ`O'#H[O!EjQ`O'#CoO!EoQ`O,59PO!EyQ`O,59PO!HOQlO,59POOQ[,59P,59PO!H`Q!0LrO,59PO%[QlO,59PO!JkQlO'#HcOOQ['#Hd'#HdOOQ['#He'#HeO`QlO,5={O!KRQ`O,5={O`QlO,5>RO`QlO,5>TO!KWQ`O,5>VO`QlO,5>XO!K]Q`O,5>[O!KbQlO,5>bOOQ[,5>h,5>hO%[QlO,5>hO9kQ!0LrO,5>jOOQ[,5>l,5>lO# lQ`O,5>lOOQ[,5>n,5>nO# lQ`O,5>nOOQ[,5>p,5>pO#!YQpO'#D]O%[QlO'#JtO#!{QpO'#JtO##VQpO'#DkO##hQpO'#DkO#%yQlO'#DkO#&QQ`O'#JsO#&YQ`O,5:UO#&_Q`O'#ErO#&mQ`O'#KSO#&uQ`O,5;]O#&zQpO'#DkO#'XQpO'#ETOOQ!0Lf,5:m,5:mO%[QlO,5:mO#'`Q`O,5:mO>wQ`O,5;WO!BeQpO,5;WO!BmQMhO,5;WO:YQMhO,5;WO#'hQ`O,5@`O#'mQ07dO,5:qOOQO-E<d-E<dO#(sQ!0MSO,5;POCuQpO,5:pO#(}QpO,5:pOCuQpO,5;PO!BYQ!0LrO,5:pOOQ!0Lb'#Eh'#EhOOQO,5;P,5;PO%[QlO,5;PO#)[Q!0LrO,5;PO#)gQ!0LrO,5;PO!BeQpO,5:pOOQO,5;V,5;VO#)uQ!0LrO,5;PPOOO'#I['#I[P#*ZO&2DjO,58|POOO,58|,58|OOOO-E<[-E<[OOQ!0Lh1G.p1G.pOOOO-E<]-E<]OOOO,59{,59{O#*fQ!bO,59{OOOO-E<_-E<_OOQ!0Lf1G/e1G/eO#*kQ!fO,5>|O+}QlO,5>|OOQO,5?S,5?SO#*uQlO'#IbOOQO-E<`-E<`O#+SQ`O,5@^O#+[Q!fO,5@^O#+cQ`O,5@lOOQ!0Lf1G/k1G/kO%[QlO,5@mO#+kQ`O'#IhOOQO-E<f-E<fO#+cQ`O,5@lOOQ!0Lb1G0v1G0vOOQ!0Ln1G/v1G/vOOQ!0Ln1G0W1G0WO%[QlO,5@jO#,PQ!0LrO,5@jO#,bQ!0LrO,5@jO#,iQ`O,5@iO9ZQ`O,5@iO#,qQ`O,5@iO#-PQ`O'#IkO#,iQ`O,5@iOOQ!0Lb1G0u1G0uO!(cQpO,5:sO!(nQpO,5:sOOQS,5:u,5:uO#-qQdO,5:uO#-yQMhO1G2xO9aQ`O1G2xOOQ!0Lf1G0s1G0sO#.XQ!0MxO1G0sO#/^Q!0MvO,5;TOOQ!0Lh'#GV'#GVO#/zQ!0MzO'#JjO!$fQlO1G0sO#2VQ!fO'#JuO%[QlO'#JuO#2aQ`O,5:cOOQ!0Lh'#D]'#D]OOQ!0Lf1G0|1G0|O%[QlO1G0|OOQ!0Lf1G1e1G1eO#2fQ`O1G0|O#4zQ!0MxO1G0}O#5RQ!0MxO1G0}O#7iQ!0MxO1G0}O#7pQ!0MxO1G0}O#:WQ!0MxO1G0}O#<nQ!0MxO1G0}O#<uQ!0MxO1G0}O#<|Q!0MxO1G0}O#?dQ!0MxO1G0}O#?kQ!0MxO1G0}O#AxQ?MtO'#CiO#CsQ?MtO1G1_O#CzQ?MtO'#JqO#D_Q!0MxO,5?YOOQ!0Lb-E<l-E<lO#FlQ!0MxO1G0}O#GiQ!0MzO1G0}OOQ!0Lf1G0}1G0}O#HlQMjO'#JzO#HvQ`O,5:vO#H{Q!0MxO1G1bO#IoQ,UO,5<VO#IwQ,UO,5<WO#JPQ,UO'#FnO#JhQ`O'#FmOOQO'#KW'#KWOOQO'#Il'#IlO#JmQ,UO1G1mOOQ!0Lf1G1m1G1mOOOW1G1x1G1xO#KOQ?MtO'#JpO#KYQ`O,5<aO!(yQlO,5<aOOOW-E<k-E<kOOQ!0Lf1G1k1G1kO#K_QpO'#KVOOQ!0Lf,5<c,5<cO#KgQpO,5<cO#KlQMhO'#DROOOO'#I`'#I`O#KsO#@ItO,59kOOQ!0Lh,59k,59kO%[QlO1G2OO!7{Q`O'#IpO#LOQ`O,5<yOOQ!0Lh,5<v,5<vO!+rQMhO'#IsO#LlQMjO,5=WO!+rQMhO'#IuO#M_QMjO,5=YO!&iQMhO,5=[OOQO1G2R1G2RO#MiQ!dO'#CrO#M|Q(CWO'#EpO$ RQpO'#GaO$ iQ!dO,5<rO$ pQ`O'#KYO9ZQ`O'#KYO$!OQ`O,5<tO!+rQMhO,5<sO$!TQ`O'#GYO$!fQ`O,5<sO$!kQ!dO'#GVO$!xQ!dO'#KZO$#SQ`O'#KZO!&iQMhO'#KZO$#XQ`O,5<wO$#^QlO'#JtO$#hQpO'#GbO##hQpO'#GbO$#yQ`O'#GfO!3^Q`O'#GjO$$OQ!0LrO'#IrO$$ZQpO,5<{OOQ!0Lp,5<{,5<{O$$bQpO'#GbO$$oQpO'#GcO$%QQpO'#GcO$%VQMjO,5=WO$%gQMjO,5=YOOQ!0Lh,5=],5=]O!+rQMhO,5@TO!+rQMhO,5@TO$%wQ`O'#IwO$&VQ`O,5@SO$&_Q`O,59aOOQ!0Lh,59g,59gO$'UQ$IYO,59sOOQ!0Lh'#Jn'#JnO$'wQMjO,5<jO$(jQMjO,5<lO@iQ`O,5<nOOQ!0Lh,5<o,5<oO$(tQ`O,5<uO$(yQMjO,5<zO$)ZQ`O,5@TO$)iQ`O'#J}O!$fQlO1G2QO$)nQ`O1G2QO9ZQ`O'#KQO9ZQ`O'#ErO%[QlO'#ErO9ZQ`O'#IyO$)sQ!0LrO,5@yOOQ[1G2|1G2|OOQ[1G4^1G4^OOQ!0Lf1G/z1G/zOOQ!0Lf1G/x1G/xO$+uQ!0MxO1G0SOOQ[1G2x1G2xO!&iQMhO1G2xO%[QlO1G2xO#-|Q`O1G2xO$-yQMhO'#EiOOQ!0Lb,5@R,5@RO$.WQ!0LrO,5@ROOQ[1G.u1G.uO!BYQ!0LrO1G.uO!BeQpO1G.uO!BmQMhO1G.uO$.iQ`O1G0sO$.nQ`O'#CiO$.yQ`O'#KcO$/RQ`O,5=zO$/WQ`O'#KcO$/]Q`O'#KcO$/kQ`O'#JPO$/yQ`O,5@|O$0RQ!fO1G1hOOQ!0Lf1G1j1G1jO9aQ`O1G3eO@iQ`O1G3eO$0YQ`O1G3eO$0_Q`O1G3eOOQ[1G3e1G3eO!DkQ`O1G3TO!&iQMhO1G3QO$0dQ`O1G3QOOQ[1G3R1G3RO!&iQMhO1G3RO$0iQ`O1G3RO$0qQpO'#HPOOQ[1G3T1G3TO!5|QpO'#I{O!DpQ!bO1G3WOOQ[1G3W1G3WOOQ[,5=q,5=qO$0yQMhO,5=sO9aQ`O,5=sO$#yQ`O,5=uO9UQ`O,5=uO!BeQpO,5=uO!BmQMhO,5=uO:YQMhO,5=uO$1XQ`O'#KaO$1dQ`O,5=vOOQ[1G.k1G.kO$1iQ!0LrO1G.kO@iQ`O1G.kO$1tQ`O1G.kO9kQ!0LrO1G.kO$3|Q!fO,5AOO$4ZQ`O,5AOO9ZQ`O,5AOO$4fQlO,5=}O$4mQ`O,5=}OOQ[1G3g1G3gO`QlO1G3gOOQ[1G3m1G3mOOQ[1G3o1G3oO>rQ`O1G3qO$4rQlO1G3sO$8vQlO'#HrOOQ[1G3v1G3vO$9TQ`O'#HxO>wQ`O'#HzOOQ[1G3|1G3|O$9]QlO1G3|O9kQ!0LrO1G4SOOQ[1G4U1G4UOOQ!0Lb'#G^'#G^O9kQ!0LrO1G4WO9kQ!0LrO1G4YO$=dQ`O,5@`O!(yQlO,5;^O9ZQ`O,5;^O>wQ`O,5:VO!(yQlO,5:VO!BeQpO,5:VO$=iQ?MtO,5:VOOQO,5;^,5;^O$=sQpO'#IcO$>ZQ`O,5@_OOQ!0Lf1G/p1G/pO$>cQpO'#IiO$>mQ`O,5@nOOQ!0Lb1G0w1G0wO##hQpO,5:VOOQO'#Ie'#IeO$>uQpO,5:oOOQ!0Ln,5:o,5:oO#'cQ`O1G0XOOQ!0Lf1G0X1G0XO%[QlO1G0XOOQ!0Lf1G0r1G0rO>wQ`O1G0rO!BeQpO1G0rO!BmQMhO1G0rOOQ!0Lb1G5z1G5zO!BYQ!0LrO1G0[OOQO1G0k1G0kO%[QlO1G0kO$>|Q!0LrO1G0kO$?XQ!0LrO1G0kO!BeQpO1G0[OCuQpO1G0[O$?gQ!0LrO1G0kOOQO1G0[1G0[O$?{Q!0MxO1G0kPOOO-E<Y-E<YPOOO1G.h1G.hOOOO1G/g1G/gO$@VQ!bO,5<hO$@_Q!fO1G4hOOQO1G4n1G4nO%[QlO,5>|O$@iQ`O1G5xO$@qQ`O1G6WO$@yQ!fO1G6XO9ZQ`O,5?SO$ATQ!0MxO1G6UO%[QlO1G6UO$AeQ!0LrO1G6UO$AvQ`O1G6TO$AvQ`O1G6TO9ZQ`O1G6TO$BOQ`O,5?VO9ZQ`O,5?VOOQO,5?V,5?VO$BdQ`O,5?VO$)iQ`O,5?VOOQO-E<i-E<iOOQS1G0_1G0_OOQS1G0a1G0aO#-tQ`O1G0aOOQ[7+(d7+(dO!&iQMhO7+(dO%[QlO7+(dO$BrQ`O7+(dO$B}QMhO7+(dO$C]Q!0MzO,5=WO$EhQ!0MzO,5=YO$GsQ!0MzO,5=WO$JUQ!0MzO,5=YO$LgQ!0MzO,59sO$NlQ!0MzO,5<jO%!wQ!0MzO,5<lO%%SQ!0MzO,5<zOOQ!0Lf7+&_7+&_O%'eQ!0MxO7+&_O%(XQlO'#IdO%(fQ`O,5@aO%(nQ!fO,5@aOOQ!0Lf1G/}1G/}O%(xQ`O7+&hOOQ!0Lf7+&h7+&hO%(}Q?MtO,5:dO%[QlO7+&yO%)XQ?MtO,5:`O%)fQ?MtO,5:hO%)pQ?MtO,5:jO%)zQMhO'#IgO%*UQ`O,5@fOOQ!0Lh1G0b1G0bOOQO1G1q1G1qOOQO1G1r1G1rO%*^Q!jO,5<YO!(yQlO,5<XOOQO-E<j-E<jOOQ!0Lf7+'X7+'XOOOW7+'d7+'dOOOW1G1{1G1{O%*iQ`O1G1{OOQ!0Lf1G1}1G1}OOOO,59m,59mO%*nQ!dO,59mOOOO-E<^-E<^OOQ!0Lh1G/V1G/VO%*uQ!0MxO7+'jOOQ!0Lh,5?[,5?[O%+iQMhO1G2eP%+pQ`O'#IpPOQ!0Lh-E<n-E<nO%,^QMjO,5?_OOQ!0Lh-E<q-E<qO%-PQMjO,5?aOOQ!0Lh-E<s-E<sO%-ZQ!dO1G2vO%-bQ!dO'#CrO%-xQMhO'#KQO$#^QlO'#JtOOQ!0Lh1G2^1G2^O%.PQ`O'#IoO%.eQ`O,5@tO%.eQ`O,5@tO%.mQ`O,5@tO%.xQ`O,5@tOOQO1G2`1G2`O%/WQMjO1G2_O!+rQMhO1G2_O%/hQ(CWO'#IqO%/uQ`O,5@uO!&iQMhO,5@uO%/}Q!dO,5@uOOQ!0Lh1G2c1G2cO%2_Q!fO'#CiO%2iQ`O,5=OOOQ!0Lb,5<|,5<|O%2qQpO,5<|OOQ!0Lb,5<},5<}OCfQ`O,5<|O%2|QpO,5<|OOQ!0Lb,5=Q,5=QO$)iQ`O,5=UOOQO,5?^,5?^OOQO-E<p-E<pOOQ!0Lp1G2g1G2gO##hQpO,5<|O$#^QlO,5=OO%3[Q`O,5<}O%3gQpO,5<}O!+rQMhO'#IsO%4aQMjO1G2rO!+rQMhO'#IuO%5SQMjO1G2tO%5^QMjO1G5oO%5hQMjO1G5oOOQO,5?c,5?cOOQO-E<u-E<uOOQO1G.{1G.{O!9lQpO,59uO%[QlO,59uOOQ!0Lh,5<i,5<iO%5uQ`O1G2YO!+rQMhO1G2aO!+rQMhO1G5oO!+rQMhO1G5oO%5zQ!0MxO7+'lOOQ!0Lf7+'l7+'lO!$fQlO7+'lO%6nQ`O,5;^OOQ!0Lb,5?e,5?eOOQ!0Lb-E<w-E<wO%6sQ!dO'#K[O#'cQ`O7+(dO4UQ!fO7+(dO$BuQ`O7+(dO%6}Q!0MvO'#CiO%7nQ!0LrO,5=RO%8PQ!0MvO,5=RO%8dQ`O,5=ROOQ!0Lb1G5m1G5mOOQ[7+$a7+$aO!BYQ!0LrO7+$aO!BeQpO7+$aO!$fQlO7+&_O%8lQ`O'#JOO%9TQ`O,5@}OOQO1G3f1G3fO9aQ`O,5@}O%9TQ`O,5@}O%9]Q`O,5@}OOQO,5?k,5?kOOQO-E<}-E<}OOQ!0Lf7+'S7+'SO%9bQ`O7+)PO9kQ!0LrO7+)PO9aQ`O7+)PO@iQ`O7+)POOQ[7+(o7+(oO%9gQ!0MvO7+(lO!&iQMhO7+(lO!DfQ`O7+(mOOQ[7+(m7+(mO!&iQMhO7+(mO%9qQ`O'#K`O%9|Q`O,5=kOOQO,5?g,5?gOOQO-E<y-E<yOOQ[7+(r7+(rO%;`QpO'#HYOOQ[1G3_1G3_O!&iQMhO1G3_O%[QlO1G3_O%;gQ`O1G3_O%;rQMhO1G3_O9kQ!0LrO1G3aO$#yQ`O1G3aO9UQ`O1G3aO!BeQpO1G3aO!BmQMhO1G3aO%<QQ`O'#I}O%<fQ`O,5@{O%<nQpO,5@{OOQ!0Lb1G3b1G3bOOQ[7+$V7+$VO@iQ`O7+$VO9kQ!0LrO7+$VO%<yQ`O7+$VO%[QlO1G6jO%[QlO1G6kO%=OQ!0LrO1G6jO%=YQlO1G3iO%=aQ`O1G3iO%=fQlO1G3iOOQ[7+)R7+)RO9kQ!0LrO7+)]O`QlO7+)_OOQ['#Kf'#KfOOQ['#JQ'#JQO%=mQlO,5>^OOQ[,5>^,5>^O%[QlO'#HsO%=zQ`O'#HuOOQ[,5>d,5>dO9ZQ`O,5>dOOQ[,5>f,5>fOOQ[7+)h7+)hOOQ[7+)n7+)nOOQ[7+)r7+)rOOQ[7+)t7+)tO%>PQpO1G5zO%>kQ?MtO1G0xO%>uQ`O1G0xOOQO1G/q1G/qO%?QQ?MtO1G/qO>wQ`O1G/qO!(yQlO'#DkOOQO,5>},5>}OOQO-E<a-E<aOOQO,5?T,5?TOOQO-E<g-E<gO!BeQpO1G/qOOQO-E<c-E<cOOQ!0Ln1G0Z1G0ZOOQ!0Lf7+%s7+%sO#'cQ`O7+%sOOQ!0Lf7+&^7+&^O>wQ`O7+&^O!BeQpO7+&^OOQO7+%v7+%vO$?{Q!0MxO7+&VOOQO7+&V7+&VO%[QlO7+&VO%?[Q!0LrO7+&VO!BYQ!0LrO7+%vO!BeQpO7+%vO%?gQ!0LrO7+&VO%?uQ!0MxO7++pO%[QlO7++pO%@VQ`O7++oO%@VQ`O7++oOOQO1G4q1G4qO9ZQ`O1G4qO%@_Q`O1G4qOOQS7+%{7+%{O#'cQ`O<<LOO4UQ!fO<<LOO%@mQ`O<<LOOOQ[<<LO<<LOO!&iQMhO<<LOO%[QlO<<LOO%@uQ`O<<LOO%AQQ!0MzO,5?_O%C]Q!0MzO,5?aO%EhQ!0MzO1G2_O%GyQ!0MzO1G2rO%JUQ!0MzO1G2tO%LaQ!fO,5?OO%[QlO,5?OOOQO-E<b-E<bO%LkQ`O1G5{OOQ!0Lf<<JS<<JSO%LsQ?MtO1G0sO%NzQ?MtO1G0}O& RQ?MtO1G0}O&#SQ?MtO1G0}O&#ZQ?MtO1G0}O&%[Q?MtO1G0}O&']Q?MtO1G0}O&'dQ?MtO1G0}O&'kQ?MtO1G0}O&)lQ?MtO1G0}O&)sQ?MtO1G0}O&)zQ!0MxO<<JeO&+rQ?MtO1G0}O&,oQ?MvO1G0}O&-rQ?MvO'#JjO&/xQ?MtO1G1bO&0VQ?MtO1G0SO&0aQMjO,5?ROOQO-E<e-E<eO!(yQlO'#FpOOQO'#KX'#KXOOQO1G1t1G1tO&0kQ`O1G1sO&0pQ?MtO,5?YOOOW7+'g7+'gOOOO1G/X1G/XO&0zQ!dO1G4vOOQ!0Lh7+(P7+(PP!&iQMhO,5?[O!+rQMhO7+(bO&1RQ`O,5?ZO9ZQ`O,5?ZOOQO-E<m-E<mO&1aQ`O1G6`O&1aQ`O1G6`O&1iQ`O1G6`O&1tQMjO7+'yO&2UQ!dO,5?]O&2`Q`O,5?]O!&iQMhO,5?]OOQO-E<o-E<oO&2eQ!dO1G6aO&2oQ`O1G6aO&2wQ`O1G2jO!&iQMhO1G2jOOQ!0Lb1G2h1G2hOOQ!0Lb1G2i1G2iO%2qQpO1G2hO!BeQpO1G2hOCfQ`O1G2hOOQ!0Lb1G2p1G2pO&2|QpO1G2hO&3[Q`O1G2jO$)iQ`O1G2iOCfQ`O1G2iO$#^QlO1G2jO&3dQ`O1G2iO&4WQMjO,5?_OOQ!0Lh-E<r-E<rO&4yQMjO,5?aOOQ!0Lh-E<t-E<tO!+rQMhO7++ZOOQ!0Lh1G/a1G/aO&5TQ`O1G/aOOQ!0Lh7+'t7+'tO&5YQMjO7+'{O&5jQMjO7++ZO&5tQMjO7++ZO&6RQ!0MxO<<KWOOQ!0Lf<<KW<<KWO&6uQ`O1G0xO!&iQMhO'#IxO&6zQ`O,5@vO&8|Q!fO<<LOO!&iQMhO1G2mO&9TQ!0LrO1G2mOOQ[<<G{<<G{O!BYQ!0LrO<<G{O&9fQ!0MxO<<IyOOQ!0Lf<<Iy<<IyOOQO,5?j,5?jO&:YQ`O,5?jO&:_Q`O,5?jOOQO-E<|-E<|O&:mQ`O1G6iO&:mQ`O1G6iO9aQ`O1G6iO@iQ`O<<LkOOQ[<<Lk<<LkO&:uQ`O<<LkO9kQ!0LrO<<LkOOQ[<<LW<<LWO%9gQ!0MvO<<LWOOQ[<<LX<<LXO!DfQ`O<<LXO&:zQpO'#IzO&;VQ`O,5@zO!(yQlO,5@zOOQ[1G3V1G3VOOQO'#I|'#I|O9kQ!0LrO'#I|O&;_QpO,5=tOOQ[,5=t,5=tO&;fQpO'#EeO&;mQpO'#GdO&;rQ`O7+(yO&;wQ`O7+(yOOQ[7+(y7+(yO!&iQMhO7+(yO%[QlO7+(yO&<PQ`O7+(yOOQ[7+({7+({O9kQ!0LrO7+({O$#yQ`O7+({O9UQ`O7+({O!BeQpO7+({O&<[Q`O,5?iOOQO-E<{-E<{OOQO'#H]'#H]O&<gQ`O1G6gO9kQ!0LrO<<GqOOQ[<<Gq<<GqO@iQ`O<<GqO&<oQ`O7+,UO&<tQ`O7+,VO%[QlO7+,UO%[QlO7+,VOOQ[7+)T7+)TO&<yQ`O7+)TO&=OQlO7+)TO&=VQ`O7+)TOOQ[<<Lw<<LwOOQ[<<Ly<<LyOOQ[-E=O-E=OOOQ[1G3x1G3xO&=[Q`O,5>_OOQ[,5>a,5>aO&=aQ`O1G4OO9ZQ`O7+&dO!(yQlO7+&dOOQO7+%]7+%]O&=fQ?MtO1G6XO>wQ`O7+%]OOQ!0Lf<<I_<<I_OOQ!0Lf<<Ix<<IxO>wQ`O<<IxOOQO<<Iq<<IqO$?{Q!0MxO<<IqO%[QlO<<IqOOQO<<Ib<<IbO!BYQ!0LrO<<IbO&=pQ!0LrO<<IqO&={Q!0MxO<= [O&>]Q`O<= ZOOQO7+*]7+*]O9ZQ`O7+*]OOQ[ANAjANAjO&>eQ!fOANAjO!&iQMhOANAjO#'cQ`OANAjO4UQ!fOANAjO&>lQ`OANAjO%[QlOANAjO&>tQ!0MzO7+'yO&AVQ!0MzO,5?_O&CbQ!0MzO,5?aO&EmQ!0MzO7+'{O&HOQ!fO1G4jO&HYQ?MtO7+&_O&J^Q?MvO,5=WO&LeQ?MvO,5=YO&LuQ?MvO,5=WO&MVQ?MvO,5=YO&MgQ?MvO,59sO' mQ?MvO,5<jO'#pQ?MvO,5<lO'&UQ?MvO,5<zO''zQ?MtO7+'jO'(XQ?MtO7+'lO'(fQ`O,5<[OOQO7+'_7+'_OOQ!0Lh7+*b7+*bO'(kQMjO<<K|OOQO1G4u1G4uO'(rQ`O1G4uO'(}Q`O1G4uO')]Q`O7++zO')]Q`O7++zO!&iQMhO1G4wO')eQ!dO1G4wO')oQ`O7++{O')wQ`O7+(UO'*SQ!dO7+(UOOQ!0Lb7+(S7+(SOOQ!0Lb7+(T7+(TO!BeQpO7+(SOCfQ`O7+(SO'*^Q`O7+(UO!&iQMhO7+(UO$)iQ`O7+(TO'*cQ`O7+(UOCfQ`O7+(TO'*kQMjO<<NuOOQ!0Lh7+${7+${O!+rQMhO<<NuO'*uQ!dO,5?dOOQO-E<v-E<vO'+PQ!0MvO7+(XO!&iQMhO7+(XOOQ[AN=gAN=gO9aQ`O1G5UOOQO1G5U1G5UO'+aQ`O1G5UO'+fQ`O7+,TO'+fQ`O7+,TO9kQ!0LrOANBVO@iQ`OANBVOOQ[ANBVANBVOOQ[ANArANArOOQ[ANAsANAsO'+nQ`O,5?fOOQO-E<x-E<xO'+yQ?MtO1G6fOOQO,5?h,5?hOOQO-E<z-E<zOOQ[1G3`1G3`O',TQ`O,5=OOOQ[<<Le<<LeO!&iQMhO<<LeO&;rQ`O<<LeO',YQ`O<<LeO%[QlO<<LeOOQ[<<Lg<<LgO9kQ!0LrO<<LgO$#yQ`O<<LgO9UQ`O<<LgO',bQpO1G5TO',mQ`O7+,ROOQ[AN=]AN=]O9kQ!0LrOAN=]OOQ[<= p<= pOOQ[<= q<= qO',uQ`O<= pO',zQ`O<= qOOQ[<<Lo<<LoO'-PQ`O<<LoO'-UQlO<<LoOOQ[1G3y1G3yO>wQ`O7+)jO'-]Q`O<<JOO'-hQ?MtO<<JOOOQO<<Hw<<HwOOQ!0LfAN?dAN?dOOQOAN?]AN?]O$?{Q!0MxOAN?]OOQOAN>|AN>|O%[QlOAN?]OOQO<<Mw<<MwOOQ[G27UG27UO!&iQMhOG27UO#'cQ`OG27UO'-rQ!fOG27UO4UQ!fOG27UO'-yQ`OG27UO'.RQ?MtO<<JeO'.`Q?MvO1G2_O'0UQ?MvO,5?_O'2XQ?MvO,5?aO'4[Q?MvO1G2rO'6_Q?MvO1G2tO'8bQ?MtO<<KWO'8oQ?MtO<<IyOOQO1G1v1G1vO!+rQMhOANAhOOQO7+*a7+*aO'8|Q`O7+*aO'9XQ`O<= fO'9aQ!dO7+*cOOQ!0Lb<<Kp<<KpO$)iQ`O<<KpOCfQ`O<<KpO'9kQ`O<<KpO!&iQMhO<<KpOOQ!0Lb<<Kn<<KnO!BeQpO<<KnO'9vQ!dO<<KpOOQ!0Lb<<Ko<<KoO':QQ`O<<KpO!&iQMhO<<KpO$)iQ`O<<KoO':VQMjOANDaO':aQ!0MvO<<KsOOQO7+*p7+*pO9aQ`O7+*pO':qQ`O<= oOOQ[G27qG27qO9kQ!0LrOG27qO!(yQlO1G5QO':yQ`O7+,QO';RQ`O1G2jO&;rQ`OANBPOOQ[ANBPANBPO!&iQMhOANBPO';WQ`OANBPOOQ[ANBRANBRO9kQ!0LrOANBRO$#yQ`OANBROOQO'#H^'#H^OOQO7+*o7+*oOOQ[G22wG22wOOQ[ANE[ANE[OOQ[ANE]ANE]OOQ[ANBZANBZO';`Q`OANBZOOQ[<<MU<<MUO!(yQlOAN?jOOQOG24wG24wO$?{Q!0MxOG24wO#'cQ`OLD,pOOQ[LD,pLD,pO!&iQMhOLD,pO';eQ!fOLD,pO';lQ?MvO7+'yO'=bQ?MvO,5?_O'?eQ?MvO,5?aO'AhQ?MvO7+'{O'C^QMjOG27SOOQO<<M{<<M{OOQ!0LbANA[ANA[O$)iQ`OANA[OCfQ`OANA[O'CnQ!dOANA[OOQ!0LbANAYANAYO'CuQ`OANA[O!&iQMhOANA[O'DQQ!dOANA[OOQ!0LbANAZANAZOOQO<<N[<<N[OOQ[LD-]LD-]O'D[Q?MtO7+*lOOQO'#Ge'#GeOOQ[G27kG27kO&;rQ`OG27kO!&iQMhOG27kOOQ[G27mG27mO9kQ!0LrOG27mOOQ[G27uG27uO'DfQ?MtOG25UOOQOLD*cLD*cOOQ[!$(![!$(![O#'cQ`O!$(![O!&iQMhO!$(![O'DpQ!0MzOG27SOOQ!0LbG26vG26vO$)iQ`OG26vO'GRQ`OG26vOCfQ`OG26vO'G^Q!dOG26vO!&iQMhOG26vOOQ[LD-VLD-VO&;rQ`OLD-VOOQ[LD-XLD-XOOQ[!)9Ev!)9EvO#'cQ`O!)9EvOOQ!0LbLD,bLD,bO$)iQ`OLD,bOCfQ`OLD,bO'GeQ`OLD,bO'GpQ!dOLD,bOOQ[!$(!q!$(!qOOQ[!.K;b!.K;bO'GwQ?MvOG27SOOQ!0Lb!$( |!$( |O$)iQ`O!$( |OCfQ`O!$( |O'ImQ`O!$( |OOQ!0Lb!)9Eh!)9EhO$)iQ`O!)9EhOCfQ`O!)9EhOOQ!0Lb!.K;S!.K;SO$)iQ`O!.K;SOOQ!0Lb!4/0n!4/0nO!(yQlO'#DxO1PQ`O'#EVO'IxQ!fO'#JpO'JPQ!L^O'#DtO'JWQlO'#D|O'J_Q!fO'#CiO'LuQ!fO'#CiO!(yQlO'#EOO'MVQlO,5;XO!(yQlO,5;cO!(yQlO,5;cO!(yQlO,5;cO!(yQlO,5;cO!(yQlO,5;cO!(yQlO,5;cO!(yQlO,5;cO!(yQlO,5;cO!(yQlO,5;cO!(yQlO,5;cO!(yQlO'#InO( YQ`O,5<hO!(yQlO,5;cO( bQMhO,5;cO(!{QMhO,5;cO!(yQlO,5;vO!&iQMhO'#GlO( bQMhO'#GlO!&iQMhO'#GnO( bQMhO'#GnO1SQ`O'#DXO1SQ`O'#DXO!&iQMhO'#GOO( bQMhO'#GOO!&iQMhO'#GQO( bQMhO'#GQO!&iQMhO'#G`O( bQMhO'#G`O!(yQlO,5:hO(#SQpO'#D]O(#^QpO'#JtO!(yQlO,5@mO'MVQlO1G0sO(#hQ?MtO'#CiO!(yQlO1G2OO!&iQMhO'#IsO( bQMhO'#IsO!&iQMhO'#IuO( bQMhO'#IuO(#rQ!dO'#CrO!&iQMhO,5<sO( bQMhO,5<sO'MVQlO1G2QO!(yQlO7+&yO!&iQMhO1G2_O( bQMhO1G2_O!&iQMhO'#IsO( bQMhO'#IsO!&iQMhO'#IuO( bQMhO'#IuO!&iQMhO1G2aO( bQMhO1G2aO'MVQlO7+'lO'MVQlO7+&_O!&iQMhOANAhO( bQMhOANAhO($VQ`O'#EmO($[Q`O'#EmO($dQ`O'#F[O($iQ`O'#EwO($nQ`O'#KRO($yQ`O'#KPO(%UQ`O,5;XO(%ZQMjO,5<dO(%bQ`O'#GXO(%gQ`O'#GXO(%lQ`O,5<fO(%tQ`O,5;XO(%|Q?MtO1G1_O(&TQ`O,5<sO(&YQ`O,5<sO(&_Q`O,5<uO(&dQ`O,5<uO(&iQ`O1G2QO(&nQ`O1G0sO(&sQMjO<<K|O(&zQMjO<<K|O7eQMhO'#F{O9UQ`O'#FzOAdQ`O'#ElO!(yQlO,5;sO!3^Q`O'#GXO!3^Q`O'#GXO!3^Q`O'#GZO!3^Q`O'#GZO!+rQMhO7+(bO!+rQMhO7+(bO%-ZQ!dO1G2vO%-ZQ!dO1G2vO!&iQMhO,5=[O!&iQMhO,5=[",
			stateData:
				"((P~O'zOS'{OSTOS'|RQ~OPYOQYOSfOY!VOaqOdzOeyOj!POnkOpYOqkOrkOxkOzYO|YO!QWO!UkO!VkO!]XO!guO!jZO!mYO!nYO!oYO!qvO!swO!vxO!z]O$V|O$miO%g}O%i!QO%k!OO%l!OO%m!OO%p!RO%r!SO%u!TO%v!TO%x!UO&U!WO&[!XO&^!YO&`!ZO&b![O&e!]O&k!^O&q!_O&s!`O&u!aO&w!bO&y!cO(RSO(TTO(WUO(_VO(m[O~OWtO~P`OPYOQYOSfOd!jOe!iOnkOpYOqkOrkOxkOzYO|YO!QWO!UkO!VkO!]!eO!guO!jZO!mYO!nYO!oYO!qvO!s!gO!v!hO$V!kO$miO(R!dO(TTO(WUO(_VO(m[O~Oa!wOq!nO!Q!oO!`!yO!a!vO!b!vO!z;wO#R!pO#S!pO#T!xO#U!pO#V!pO#Y!zO#Z!zO(S!lO(TTO(WUO(c!mO(m!sO~O'|!{O~OP]XR]X[]Xa]Xp]X!O]X!Q]X!Z]X!j]X!n]X#P]X#Q]X#^]X#ifX#l]X#m]X#n]X#o]X#p]X#q]X#r]X#s]X#t]X#u]X#w]X#y]X#z]X$P]X'x]X(_]X(p]X(w]X(x]X~O!e%QX~P(qO_!}O(T#PO(U!}O(V#PO~O_#QO(V#PO(W#PO(X#QO~Ov#SO!S#TO(`#TO(a#VO~OPYOQYOSfOd!jOe!iOnkOpYOqkOrkOxkOzYO|YO!QWO!UkO!VkO!]!eO!guO!jZO!mYO!nYO!oYO!qvO!s!gO!v!hO$V!kO$miO(R;{O(TTO(WUO(_VO(m[O~O!Y#ZO!Z#WO!W(fP!W(tP~P+}O![#cO~P`OPYOQYOSfOd!jOe!iOpYOqkOrkOxkOzYO|YO!QWO!UkO!VkO!]!eO!guO!jZO!mYO!nYO!oYO!qvO!s!gO!v!hO$V!kO$miO(TTO(WUO(_VO(m[O~On#mO!Y#iO!z]O#g#lO#h#iO(R;|O!i(qP~P.iO!j#oO(R#nO~O!v#sO!z]O%g#tO~O#i#uO~O!e#vO#i#uO~OP$[OR#zO[$cOp$aO!O#yO!Q#{O!Z$_O!j#xO!n$[O#P$RO#l$OO#m$PO#n$PO#o$PO#p$QO#q$RO#r$RO#s$bO#t$RO#u$SO#w$UO#y$WO#z$XO(_VO(p$YO(w#|O(x#}O~Oa(dX'x(dX'u(dX!i(dX!W(dX!](dX%h(dX!e(dX~P1qO#Q$dO#^$eO$P$eOP(eXR(eX[(eXp(eX!O(eX!Q(eX!Z(eX!j(eX!n(eX#P(eX#l(eX#m(eX#n(eX#o(eX#p(eX#q(eX#r(eX#s(eX#t(eX#u(eX#w(eX#y(eX#z(eX(_(eX(p(eX(w(eX(x(eX!](eX%h(eX~Oa(eX'x(eX'u(eX!W(eX!i(eXt(eX!e(eX~P4UO#^$eO~O$[$hO$^$gO$e$mO~OSfO!]$nO$h$oO$j$qO~Oh%VOj%cOn%WOp%XOq$tOr$tOx%YOz%ZO|%[O!Q${O!]$|O!g%aO!j$xO#h%bO$V%_O$s%]O$u%^O$x%`O(R$sO(TTO(WUO(_$uO(w$}O(x%POg([P~O!j%dO~O!Q%gO!]%hO(R%fO~O!e%lO~Oa%mO'x%mO~O!O%qO~P%[O(S!lO~P%[O%m%uO~P%[Oh%VO!j%dO(R%fO(S!lO~Oe%|O!j%dO(R%fO~O#t$RO~O!O&RO!]&OO!j&QO%i&UO(R%fO(S!lO(TTO(WUO`)UP~O!v#sO~O%r&WO!Q)QX!])QX(R)QX~O(R&XO~Oj!PO!s&^O%i!QO%k!OO%l!OO%m!OO%p!RO%r!SO%u!TO%v!TO~Od&cOe&bO!v&`O%g&aO%z&_O~P<POd&fOeyOj!PO!]&eO!s&^O!vxO!z]O%g}O%k!OO%l!OO%m!OO%p!RO%r!SO%u!TO%v!TO%x!UO~Ob&iO#^&lO%i&gO(S!lO~P=UO!j&mO!s&qO~O!j#oO~O!]XO~Oa%mO'v&yO'x%mO~Oa%mO'v&|O'x%mO~Oa%mO'v'OO'x%mO~O'u]X!W]Xt]X!i]X&Y]X!]]X%h]X!e]X~P(qO!`']O!a'UO!b'UO(S!lO(TTO(WUO~Oq'SO!Q'RO!Y'VO(c'QO![(gP![(vP~P@]Ol'`O!]'^O(R%fO~Oe'eO!j%dO(R%fO~O!O&RO!j&QO~Oq!nO!Q!oO!z;wO#R!pO#S!pO#U!pO#V!pO(S!lO(TTO(WUO(c!mO(m!sO~O!`'kO!a'jO!b'jO#T!pO#Y'lO#Z'lO~PAwOa%mOh%VO!e#vO!j%dO'x%mO(p'nO~O!n'rO#^'pO~PCVOq!nO!Q!oO(TTO(WUO(c!mO(m!sO~O!]XOq(kX!Q(kX!`(kX!a(kX!b(kX!z(kX#R(kX#S(kX#T(kX#U(kX#V(kX#Y(kX#Z(kX(S(kX(T(kX(W(kX(c(kX(m(kX~O!a'jO!b'jO(S!lO~PCuO'}'vO(O'vO(P'xO~O_!}O(T'zO(U!}O(V'zO~O_#QO(V'zO(W'zO(X#QO~Ot'|O~P%[Ov#SO!S#TO(`#TO(a(PO~O!Y(RO!W'UX!W'[X!Z'UX!Z'[X~P+}O!Z(TO!W(fX~OP$[OR#zO[$cOp$aO!O#yO!Q#{O!Z(TO!j#xO!n$[O#P$RO#l$OO#m$PO#n$PO#o$PO#p$QO#q$RO#r$RO#s$bO#t$RO#u$SO#w$UO#y$WO#z$XO(_VO(p$YO(w#|O(x#}O~O!W(fX~PGpO!W(YO~O!W(sX!Z(sX!e(sX!i(sX(p(sX~O#^(sX#i#bX![(sX~PIsO#^(ZO!W(uX!Z(uX~O!Z([O!W(tX~O!W(_O~O#^$eO~PIsO![(`O~P`OR#zO!O#yO!Q#{O!j#xO(_VOP!la[!lap!la!Z!la!n!la#P!la#l!la#m!la#n!la#o!la#p!la#q!la#r!la#s!la#t!la#u!la#w!la#y!la#z!la(p!la(w!la(x!la~Oa!la'x!la'u!la!W!la!i!lat!la!]!la%h!la!e!la~PKZO!i(aO~O!e#vO#^(bO(p'nO!Z(rXa(rX'x(rX~O!i(rX~PMvO!Q%gO!]%hO!z]O#g(gO#h(fO(R%fO~O!Z(hO!i(qX~O!i(jO~O!Q%gO!]%hO#h(fO(R%fO~OP(eXR(eX[(eXp(eX!O(eX!Q(eX!Z(eX!j(eX!n(eX#P(eX#l(eX#m(eX#n(eX#o(eX#p(eX#q(eX#r(eX#s(eX#t(eX#u(eX#w(eX#y(eX#z(eX(_(eX(p(eX(w(eX(x(eX~O!e#vO!i(eX~P! dOR(lO!O(kO!j#xO#Q$dO!z!ya!Q!ya~O!v!ya%g!ya!]!ya#g!ya#h!ya(R!ya~P!#eO!v(pO~OPYOQYOSfOd!jOe!iOnkOpYOqkOrkOxkOzYO|YO!QWO!UkO!VkO!]XO!guO!jZO!mYO!nYO!oYO!qvO!s!gO!v!hO$V!kO$miO(R!dO(TTO(WUO(_VO(m[O~Oh%VOn%WOp%XOq$tOr$tOx%YOz%ZO|<eO!Q${O!]$|O!g=vO!j$xO#h<kO$V%_O$s<gO$u<iO$x%`O(R(tO(TTO(WUO(_$uO(w$}O(x%PO~O#i(vO~O!Y(xO!i(iP~P%[O(c(zO(m[O~O!Q(|O!j#xO(c(zO(m[O~OP;vOQ;vOSfOd=rOe!iOnkOp;vOqkOrkOxkOz;vO|;vO!QWO!UkO!VkO!]!eO!g;yO!jZO!m;vO!n;vO!o;vO!q;zO!s;}O!v!hO$V!kO$m=pO(R)ZO(TTO(WUO(_VO(m[O~O!Z$_Oa$pa'x$pa'u$pa!i$pa!W$pa!]$pa%h$pa!e$pa~Oj)bO~P!&iOh%VOn%WOp%XOq$tOr$tOx%YOz%ZO|%[O!Q${O!]$|O!g%aO!j$xO#h%bO$V%_O$s%]O$u%^O$x%`O(R(tO(TTO(WUO(_$uO(w$}O(x%PO~Og(nP~P!+rO!O)gO!e)fO!]$]X$Y$]X$[$]X$^$]X$e$]X~O!e)fO!](yX$Y(yX$[(yX$^(yX$e(yX~O!O)gO~P!-{O!O)gO!](yX$Y(yX$[(yX$^(yX$e(yX~O!])iO$Y)mO$[)hO$^)hO$e)nO~O!Y)qO~P!(yO$[$hO$^$gO$e)uO~Ol$yX!O$yX#Q$yX'w$yX(w$yX(x$yX~OgkXg$yXlkX!ZkX#^kX~P!/qOv)wO(`)xO(a)zO~Ol*TO!O)|O'w)}O(w$}O(x%PO~Og){O~P!0uOg*UO~Oh%VOn%WOp%XOq$tOr$tOx%YOz%ZO|<eO!Q*WO!]*XO!g=vO!j$xO#h<kO$V%_O$s<gO$u<iO$x%`O(TTO(WUO(_$uO(w$}O(x%PO~O!Y*[O(R*VO!i(|P~P!1dO#i*^O~O!j*_O~Oh%VOn%WOp%XOq$tOr$tOx%YOz%ZO|<eO!Q${O!]$|O!g=vO!j$xO#h<kO$V%_O$s<gO$u<iO$x%`O(R*aO(TTO(WUO(_$uO(w$}O(x%PO~O!Y*dO!W(}P~P!3cOp*pOq!nO!Q*fO!`*nO!a*hO!b*hO!j*_O#Y*oO%_*jO(S!lO(TTO(WUO(c!mO~O![*mO~P!5WO#Q$dOl(^X!O(^X'w(^X(w(^X(x(^X!Z(^X#^(^X~Og(^X#}(^X~P!6YOl*uO#^*tOg(]X!Z(]X~O!Z*vOg([X~Oj%cO(R&XOg([P~Oq*yO~O!j+OO~O(R(tO~On+TO!Q%gO!Y#iO!]%hO!z]O#g#lO#h#iO(R%fO!i(qP~O!e#vO#i+UO~O!Q%gO!Y+WO!Z([O!]%hO(R%fO!W(tP~Oq'YO!Q+YO!Y+XO(TTO(WUO(c(zO~O![(vP~P!9]O!Z+ZOa)RX'x)RX~OP$[OR#zO[$cOp$aO!O#yO!Q#{O!j#xO!n$[O#P$RO#l$OO#m$PO#n$PO#o$PO#p$QO#q$RO#r$RO#s$bO#t$RO#u$SO#w$UO#y$WO#z$XO(_VO(p$YO(w#|O(x#}O~Oa!ha!Z!ha'x!ha'u!ha!W!ha!i!hat!ha!]!ha%h!ha!e!ha~P!:TOR#zO!O#yO!Q#{O!j#xO(_VOP!pa[!pap!pa!Z!pa!n!pa#P!pa#l!pa#m!pa#n!pa#o!pa#p!pa#q!pa#r!pa#s!pa#t!pa#u!pa#w!pa#y!pa#z!pa(p!pa(w!pa(x!pa~Oa!pa'x!pa'u!pa!W!pa!i!pat!pa!]!pa%h!pa!e!pa~P!<kOR#zO!O#yO!Q#{O!j#xO(_VOP!ra[!rap!ra!Z!ra!n!ra#P!ra#l!ra#m!ra#n!ra#o!ra#p!ra#q!ra#r!ra#s!ra#t!ra#u!ra#w!ra#y!ra#z!ra(p!ra(w!ra(x!ra~Oa!ra'x!ra'u!ra!W!ra!i!rat!ra!]!ra%h!ra!e!ra~P!?ROh%VOl+dO!]'^O%h+cO~O!e+fOa(ZX!](ZX'x(ZX!Z(ZX~Oa%mO!]XO'x%mO~Oh%VO!j%dO~Oh%VO!j%dO(R%fO~O!e#vO#i(vO~Ob+qO%i+rO(R+nO(TTO(WUO![)VP~O!Z+sO`)UX~O[+wO~O`+xO~O!]&OO(R%fO(S!lO`)UP~Oh%VO#^+}O~Oh%VOl,QO!]$|O~O!],SO~O!O,UO!]XO~O%m%uO~O!v,ZO~Oe,`O~Ob,aO(R#nO(TTO(WUO![)TP~Oe%|O~O%i!QO(R&XO~P=UO[,fO`,eO~OPYOQYOSfOdzOeyOnkOpYOqkOrkOxkOzYO|YO!QWO!UkO!VkO!guO!jZO!mYO!nYO!oYO!qvO!vxO!z]O$miO%g}O(TTO(WUO(_VO(m[O~O!]!eO!s!gO$V!kO(R!dO~P!FRO`,eOa%mO'x%mO~OPYOQYOSfOd!jOe!iOnkOpYOqkOrkOxkOzYO|YO!QWO!UkO!VkO!]!eO!guO!jZO!mYO!nYO!oYO!qvO!v!hO$V!kO$miO(R!dO(TTO(WUO(_VO(m[O~Oa,kOj!OO!swO%k!OO%l!OO%m!OO~P!HkO!j&mO~O&[,qO~O!],sO~O&m,uO&o,vOP&jaQ&jaS&jaY&jaa&jad&jae&jaj&jan&jap&jaq&jar&jax&jaz&ja|&ja!Q&ja!U&ja!V&ja!]&ja!g&ja!j&ja!m&ja!n&ja!o&ja!q&ja!s&ja!v&ja!z&ja$V&ja$m&ja%g&ja%i&ja%k&ja%l&ja%m&ja%p&ja%r&ja%u&ja%v&ja%x&ja&U&ja&[&ja&^&ja&`&ja&b&ja&e&ja&k&ja&q&ja&s&ja&u&ja&w&ja&y&ja'u&ja(R&ja(T&ja(W&ja(_&ja(m&ja![&ja&c&jab&ja&h&ja~O(R,{O~Oh!cX!Z!PX![!PX!e!PX!e!cX!j!cX#^!PX~O!Z!cX![!cX~P# qO!e-QO#^-POh(hX!Z#fX![#fX!e(hX!j(hX~O!Z(hX![(hX~P#!dOh%VO!e-SO!j%dO!Z!_X![!_X~Oq!nO!Q!oO(TTO(WUO(c!mO~OP;vOQ;vOSfOd=rOe!iOnkOp;vOqkOrkOxkOz;vO|;vO!QWO!UkO!VkO!]!eO!g;yO!jZO!m;vO!n;vO!o;vO!q;zO!s;}O!v!hO$V!kO$m=pO(TTO(WUO(_VO(m[O~O(R<rO~P##yO!Z-WO![(gX~O![-YO~O!e-QO#^-PO!Z#fX![#fX~O!Z-ZO![(vX~O![-]O~O!a-^O!b-^O(S!lO~P##hO![-aO~P'_Ol-dO!]'^O~O!W-iO~Oq!ya!`!ya!a!ya!b!ya#R!ya#S!ya#T!ya#U!ya#V!ya#Y!ya#Z!ya(S!ya(T!ya(W!ya(c!ya(m!ya~P!#eO!n-nO#^-lO~PCVO!a-pO!b-pO(S!lO~PCuOa%mO#^-lO'x%mO~Oa%mO!e#vO#^-lO'x%mO~Oa%mO!e#vO!n-nO#^-lO'x%mO(p'nO~O'}'vO(O'vO(P-uO~Ot-vO~O!W'Ua!Z'Ua~P!:TO!Y-zO!W'UX!Z'UX~P%[O!Z(TO!W(fa~O!W(fa~PGpO!Z([O!W(ta~O!Q%gO!Y.OO!]%hO(R%fO!W'[X!Z'[X~O#^.QO!Z(ra!i(raa(ra'x(ra~O!e#vO~P#,PO!Z(hO!i(qa~O!Q%gO!]%hO#h.UO(R%fO~On.ZO!Q%gO!Y.WO!]%hO!z]O#g.YO#h.WO(R%fO!Z'_X!i'_X~OR._O!j#xO~Oh%VOl.bO!]'^O%h.aO~Oa#ai!Z#ai'x#ai'u#ai!W#ai!i#ait#ai!]#ai%h#ai!e#ai~P!:TOl=|O!O)|O'w)}O(w$}O(x%PO~O#i#]aa#]a#^#]a'x#]a!Z#]a!i#]a!]#]a!W#]a~P#.{O#i(^XP(^XR(^X[(^Xa(^Xp(^X!Q(^X!j(^X!n(^X#P(^X#l(^X#m(^X#n(^X#o(^X#p(^X#q(^X#r(^X#s(^X#t(^X#u(^X#w(^X#y(^X#z(^X'x(^X(_(^X(p(^X!i(^X!W(^X'u(^Xt(^X!](^X%h(^X!e(^X~P!6YO!Z.oO!i(iX~P!:TO!i.rO~O!W.tO~OP$[OR#zO!O#yO!Q#{O!j#xO!n$[O(_VO[#kia#kip#ki!Z#ki#P#ki#m#ki#n#ki#o#ki#p#ki#q#ki#r#ki#s#ki#t#ki#u#ki#w#ki#y#ki#z#ki'x#ki(p#ki(w#ki(x#ki'u#ki!W#ki!i#kit#ki!]#ki%h#ki!e#ki~O#l#ki~P#2kO#l$OO~P#2kOP$[OR#zOp$aO!O#yO!Q#{O!j#xO!n$[O#l$OO#m$PO#n$PO#o$PO(_VO[#kia#ki!Z#ki#P#ki#q#ki#r#ki#s#ki#t#ki#u#ki#w#ki#y#ki#z#ki'x#ki(p#ki(w#ki(x#ki'u#ki!W#ki!i#kit#ki!]#ki%h#ki!e#ki~O#p#ki~P#5YO#p$QO~P#5YOP$[OR#zO[$cOp$aO!O#yO!Q#{O!j#xO!n$[O#P$RO#l$OO#m$PO#n$PO#o$PO#p$QO#q$RO#r$RO#s$bO#t$RO(_VOa#ki!Z#ki#w#ki#y#ki#z#ki'x#ki(p#ki(w#ki(x#ki'u#ki!W#ki!i#kit#ki!]#ki%h#ki!e#ki~O#u#ki~P#7wOP$[OR#zO[$cOp$aO!O#yO!Q#{O!j#xO!n$[O#P$RO#l$OO#m$PO#n$PO#o$PO#p$QO#q$RO#r$RO#s$bO#t$RO#u$SO(_VO(x#}Oa#ki!Z#ki#y#ki#z#ki'x#ki(p#ki(w#ki'u#ki!W#ki!i#kit#ki!]#ki%h#ki!e#ki~O#w$UO~P#:_O#w#ki~P#:_O#u$SO~P#7wOP$[OR#zO[$cOp$aO!O#yO!Q#{O!j#xO!n$[O#P$RO#l$OO#m$PO#n$PO#o$PO#p$QO#q$RO#r$RO#s$bO#t$RO#u$SO#w$UO(_VO(w#|O(x#}Oa#ki!Z#ki#z#ki'x#ki(p#ki'u#ki!W#ki!i#kit#ki!]#ki%h#ki!e#ki~O#y#ki~P#=TO#y$WO~P#=TOP]XR]X[]Xp]X!O]X!Q]X!j]X!n]X#P]X#Q]X#^]X#ifX#l]X#m]X#n]X#o]X#p]X#q]X#r]X#s]X#t]X#u]X#w]X#y]X#z]X$P]X(_]X(p]X(w]X(x]X!Z]X![]X~O#}]X~P#?rOP$[OR#zO[<_Op<]O!O#yO!Q#{O!j#xO!n$[O#P<SO#l<PO#m<QO#n<QO#o<QO#p<RO#q<SO#r<SO#s<^O#t<SO#u<TO#w<VO#y<XO#z<YO(_VO(p$YO(w#|O(x#}O~O#}.vO~P#BPO#Q$dO#^<`O$P<`O#}(eX![(eX~P! dOa'ba!Z'ba'x'ba'u'ba!i'ba!W'bat'ba!]'ba%h'ba!e'ba~P!:TO[#kia#kip#ki!Z#ki#P#ki#p#ki#q#ki#r#ki#s#ki#t#ki#u#ki#w#ki#y#ki#z#ki'x#ki(p#ki'u#ki!W#ki!i#kit#ki!]#ki%h#ki!e#ki~OP$[OR#zO!O#yO!Q#{O!j#xO!n$[O#l$OO#m$PO#n$PO#o$PO(_VO(w#ki(x#ki~P#EROl=|O!O)|O'w)}O(w$}O(x%POP#kiR#ki!Q#ki!j#ki!n#ki#l#ki#m#ki#n#ki#o#ki(_#ki~P#ERO!Z.zOg(nX~P!0uOg.|O~Oa$Oi!Z$Oi'x$Oi'u$Oi!W$Oi!i$Oit$Oi!]$Oi%h$Oi!e$Oi~P!:TO$[.}O$^.}O~O$[/OO$^/OO~O!e)fO#^/PO!]$bX$Y$bX$[$bX$^$bX$e$bX~O!Y/QO~O!])iO$Y/SO$[)hO$^)hO$e/TO~O!Z<ZO![(dX~P#BPO![/UO~O!e)fO$e(yX~O$e/WO~Ot/XO~P!&iOv)wO(`)xO(a/[O~O!Q/_O~O(w$}Ol%`a!O%`a'w%`a(x%`a!Z%`a#^%`a~Og%`a#}%`a~P#LTO(x%POl%ba!O%ba'w%ba(w%ba!Z%ba#^%ba~Og%ba#}%ba~P#LvO!ZfX!efX!ifX!i$yX(pfX~P!/qO!Y/hO!Z([O(R/gO!W(tP!W(}P~P!1dOp*pO!`*nO!a*hO!b*hO!j*_O#Y*oO%_*jO(S!lO(TTO(WUO~Oq<oO!Q/iO!Y+XO![*mO(c<nO![(vP~P#NaO!i/jO~P#.{O!Z/kO!e#vO(p'nO!i(|X~O!i/pO~O!Q%gO!Y*[O!]%hO(R%fO!i(|P~O#i/rO~O!W$yX!Z$yX!e%QX~P!/qO!Z/sO!W(}X~P#.{O!e/uO~O!W/wO~OnkO(R/xO~P.iOh%VOp/}O!e#vO!j%dO(p'nO~O!e+fO~Oa%mO!Z0RO'x%mO~O![0TO~P!5WO!a0UO!b0UO(S!lO~P##hOq!nO!Q0VO(TTO(WUO(c!mO~O#Y0XO~Og%`a!Z%`a#^%`a#}%`a~P!0uOg%ba!Z%ba#^%ba#}%ba~P!0uOj%cO(R&XOg'kX!Z'kX~O!Z*vOg([a~Og0bO~OR0cO!O0cO!Q0dO#Q$dOl{a'w{a(w{a(x{a!Z{a#^{a~Og{a#}{a~P$&dO!O)|O'w)}Ol$ra(w$ra(x$ra!Z$ra#^$ra~Og$ra#}$ra~P$'`O!O)|O'w)}Ol$ta(w$ta(x$ta!Z$ta#^$ta~Og$ta#}$ta~P$(RO#i0gO~Og%Sa!Z%Sa#^%Sa#}%Sa~P!0uOl0iO#^0hOg(]a!Z(]a~O!e#vO~O#i0lO~O!Z+ZOa)Ra'x)Ra~OR#zO!O#yO!Q#{O!j#xO(_VOP!pi[!pip!pi!Z!pi!n!pi#P!pi#l!pi#m!pi#n!pi#o!pi#p!pi#q!pi#r!pi#s!pi#t!pi#u!pi#w!pi#y!pi#z!pi(p!pi(w!pi(x!pi~Oa!pi'x!pi'u!pi!W!pi!i!pit!pi!]!pi%h!pi!e!pi~P$*OOh%VOp%XOq$tOr$tOx%YOz%ZO|<eO!Q${O!]$|O!g=vO!j$xO#h<kO$V%_O$s<gO$u<iO$x%`O(TTO(WUO(_$uO(w$}O(x%PO~On0vO%[0wO(R0tO~P$,fO!e+fOa(Za!](Za'x(Za!Z(Za~O#i0|O~O[]X!ZfX![fX~O!Z0}O![)VX~O![1PO~O[1QO~Ob1SO(R+nO(TTO(WUO~O!]&OO(R%fO`'sX!Z'sX~O!Z+sO`)Ua~O!i1VO~P!:TO[1YO~O`1ZO~O#^1^O~Ol1aO!]$|O~O(c(zO![)SP~Oh%VOl1jO!]1gO%h1iO~O[1tO!Z1rO![)TX~O![1uO~O`1wOa%mO'x%mO~O(R#nO(TTO(WUO~O#Q$dO#^$eO$P$eOP(eXR(eX[(eXp(eX!O(eX!Q(eX!Z(eX!j(eX!n(eX#P(eX#l(eX#m(eX#n(eX#o(eX#p(eX#q(eX#r(eX#s(eX#u(eX#w(eX#y(eX#z(eX(_(eX(p(eX(w(eX(x(eX~O#t1zO&Y1{Oa(eX~P$2PO#^$eO#t1zO&Y1{O~Oa1}O~P%[Oa2PO~O&c2SOP&aiQ&aiS&aiY&aia&aid&aie&aij&ain&aip&aiq&air&aix&aiz&ai|&ai!Q&ai!U&ai!V&ai!]&ai!g&ai!j&ai!m&ai!n&ai!o&ai!q&ai!s&ai!v&ai!z&ai$V&ai$m&ai%g&ai%i&ai%k&ai%l&ai%m&ai%p&ai%r&ai%u&ai%v&ai%x&ai&U&ai&[&ai&^&ai&`&ai&b&ai&e&ai&k&ai&q&ai&s&ai&u&ai&w&ai&y&ai'u&ai(R&ai(T&ai(W&ai(_&ai(m&ai![&aib&ai&h&ai~Ob2YO![2WO&h2XO~P`O!]XO!j2[O~O&o,vOP&jiQ&jiS&jiY&jia&jid&jie&jij&jin&jip&jiq&jir&jix&jiz&ji|&ji!Q&ji!U&ji!V&ji!]&ji!g&ji!j&ji!m&ji!n&ji!o&ji!q&ji!s&ji!v&ji!z&ji$V&ji$m&ji%g&ji%i&ji%k&ji%l&ji%m&ji%p&ji%r&ji%u&ji%v&ji%x&ji&U&ji&[&ji&^&ji&`&ji&b&ji&e&ji&k&ji&q&ji&s&ji&u&ji&w&ji&y&ji'u&ji(R&ji(T&ji(W&ji(_&ji(m&ji![&ji&c&jib&ji&h&ji~O!W2bO~O!Z!_a![!_a~P#BPOq!nO!Q!oO!Y2hO(c!mO!Z'VX!['VX~P@]O!Z-WO![(ga~O!Z']X![']X~P!9]O!Z-ZO![(va~O![2oO~P'_Oa%mO#^2xO'x%mO~Oa%mO!e#vO#^2xO'x%mO~Oa%mO!e#vO!n2|O#^2xO'x%mO(p'nO~Oa%mO'x%mO~P!:TO!Z$_Ot$pa~O!W'Ui!Z'Ui~P!:TO!Z(TO!W(fi~O!Z([O!W(ti~O!W(ui!Z(ui~P!:TO!Z(ri!i(ria(ri'x(ri~P!:TO#^3OO!Z(ri!i(ria(ri'x(ri~O!Z(hO!i(qi~O!Q%gO!]%hO!z]O#g3TO#h3SO(R%fO~O!Q%gO!]%hO#h3SO(R%fO~Ol3[O!]'^O%h3ZO~Oh%VOl3[O!]'^O%h3ZO~O#i%`aP%`aR%`a[%`aa%`ap%`a!Q%`a!j%`a!n%`a#P%`a#l%`a#m%`a#n%`a#o%`a#p%`a#q%`a#r%`a#s%`a#t%`a#u%`a#w%`a#y%`a#z%`a'x%`a(_%`a(p%`a!i%`a!W%`a'u%`at%`a!]%`a%h%`a!e%`a~P#LTO#i%baP%baR%ba[%baa%bap%ba!Q%ba!j%ba!n%ba#P%ba#l%ba#m%ba#n%ba#o%ba#p%ba#q%ba#r%ba#s%ba#t%ba#u%ba#w%ba#y%ba#z%ba'x%ba(_%ba(p%ba!i%ba!W%ba'u%bat%ba!]%ba%h%ba!e%ba~P#LvO#i%`aP%`aR%`a[%`aa%`ap%`a!Q%`a!Z%`a!j%`a!n%`a#P%`a#l%`a#m%`a#n%`a#o%`a#p%`a#q%`a#r%`a#s%`a#t%`a#u%`a#w%`a#y%`a#z%`a'x%`a(_%`a(p%`a!i%`a!W%`a'u%`a#^%`at%`a!]%`a%h%`a!e%`a~P#.{O#i%baP%baR%ba[%baa%bap%ba!Q%ba!Z%ba!j%ba!n%ba#P%ba#l%ba#m%ba#n%ba#o%ba#p%ba#q%ba#r%ba#s%ba#t%ba#u%ba#w%ba#y%ba#z%ba'x%ba(_%ba(p%ba!i%ba!W%ba'u%ba#^%bat%ba!]%ba%h%ba!e%ba~P#.{O#i{aP{a[{aa{ap{a!j{a!n{a#P{a#l{a#m{a#n{a#o{a#p{a#q{a#r{a#s{a#t{a#u{a#w{a#y{a#z{a'x{a(_{a(p{a!i{a!W{a'u{at{a!]{a%h{a!e{a~P$&dO#i$raP$raR$ra[$raa$rap$ra!Q$ra!j$ra!n$ra#P$ra#l$ra#m$ra#n$ra#o$ra#p$ra#q$ra#r$ra#s$ra#t$ra#u$ra#w$ra#y$ra#z$ra'x$ra(_$ra(p$ra!i$ra!W$ra'u$rat$ra!]$ra%h$ra!e$ra~P$'`O#i$taP$taR$ta[$taa$tap$ta!Q$ta!j$ta!n$ta#P$ta#l$ta#m$ta#n$ta#o$ta#p$ta#q$ta#r$ta#s$ta#t$ta#u$ta#w$ta#y$ta#z$ta'x$ta(_$ta(p$ta!i$ta!W$ta'u$tat$ta!]$ta%h$ta!e$ta~P$(RO#i%SaP%SaR%Sa[%Saa%Sap%Sa!Q%Sa!Z%Sa!j%Sa!n%Sa#P%Sa#l%Sa#m%Sa#n%Sa#o%Sa#p%Sa#q%Sa#r%Sa#s%Sa#t%Sa#u%Sa#w%Sa#y%Sa#z%Sa'x%Sa(_%Sa(p%Sa!i%Sa!W%Sa'u%Sa#^%Sat%Sa!]%Sa%h%Sa!e%Sa~P#.{Oa#aq!Z#aq'x#aq'u#aq!W#aq!i#aqt#aq!]#aq%h#aq!e#aq~P!:TO!Y3dO!Z'WX!i'WX~P%[O!Z.oO!i(ia~O!Z.oO!i(ia~P!:TO!W3gO~O#}!la![!la~PKZO#}!ha!Z!ha![!ha~P#BPO#}!pa![!pa~P!<kO#}!ra![!ra~P!?ROg'ZX!Z'ZX~P!+rO!Z.zOg(na~OSfO!]3{O$c3|O~O![4QO~Ot4RO~P#.{Oa$lq!Z$lq'x$lq'u$lq!W$lq!i$lqt$lq!]$lq%h$lq!e$lq~P!:TO!W4TO~P!&iO!Q4UO~O!O)|O'w)}O(x%POl'ga(w'ga!Z'ga#^'ga~Og'ga#}'ga~P%+uO!O)|O'w)}Ol'ia(w'ia(x'ia!Z'ia#^'ia~Og'ia#}'ia~P%,hO(p$YO~P#.{O!WfX!W$yX!ZfX!Z$yX!e%QX#^fX~P!/qO(R<xO~P!1dO!Q%gO!Y4XO!]%hO(R%fO!Z'cX!i'cX~O!Z/kO!i(|a~O!Z/kO!e#vO!i(|a~O!Z/kO!e#vO(p'nO!i(|a~Og${i!Z${i#^${i#}${i~P!0uO!Y4aO!W'eX!Z'eX~P!3cO!Z/sO!W(}a~O!Z/sO!W(}a~P#.{OP]XR]X[]Xp]X!O]X!Q]X!W]X!Z]X!j]X!n]X#P]X#Q]X#^]X#ifX#l]X#m]X#n]X#o]X#p]X#q]X#r]X#s]X#t]X#u]X#w]X#y]X#z]X$P]X(_]X(p]X(w]X(x]X~O!e%XX#t%XX~P%0XO!e#vO#t4fO~Oh%VO!e#vO!j%dO~Oh%VOp4kO!j%dO(p'nO~Op4pO!e#vO(p'nO~Oq!nO!Q4qO(TTO(WUO(c!mO~O(w$}Ol%`i!O%`i'w%`i(x%`i!Z%`i#^%`i~Og%`i#}%`i~P%3xO(x%POl%bi!O%bi'w%bi(w%bi!Z%bi#^%bi~Og%bi#}%bi~P%4kOg(]i!Z(]i~P!0uO#^4wOg(]i!Z(]i~P!0uO!i4zO~Oa$nq!Z$nq'x$nq'u$nq!W$nq!i$nqt$nq!]$nq%h$nq!e$nq~P!:TO!W5QO~O!Z5RO!])OX~P#.{Oa]Xa$yX!]]X!]$yX%]]X'x]X'x$yX!Z]X!Z$yX~P!/qO%]5UOa%Za!]%Za'x%Za!Z%Za~OlmX!OmX'wmX(wmX(xmX~P%7nOn5VO(R#nO~Ob5]O%i5^O(R+nO(TTO(WUO!Z'rX!['rX~O!Z0}O![)Va~O[5bO~O`5cO~Oa%mO'x%mO~P#.{O!Z5kO#^5mO![)SX~O![5nO~Op5tOq!nO!Q*fO!`!yO!a!vO!b!vO!z;wO#R!pO#S!pO#T!pO#U!pO#V!pO#Y5sO#Z!zO(S!lO(TTO(WUO(c!mO(m!sO~O![5rO~P%:ROl5yO!]1gO%h5xO~Oh%VOl5yO!]1gO%h5xO~Ob6QO(R#nO(TTO(WUO!Z'qX!['qX~O!Z1rO![)Ta~O(TTO(WUO(c6SO~O`6WO~O#t6ZO&Y6[O~PMvO!i6]O~P%[Oa6_O~Oa6_O~P%[Ob2YO![6dO&h2XO~P`O!e6fO~O!e6hOh(hi!Z(hi![(hi!e(hi!j(hip(hi(p(hi~O!Z#fi![#fi~P#BPO#^6iO!Z#fi![#fi~O!Z!_i![!_i~P#BPOa%mO#^6rO'x%mO~Oa%mO!e#vO#^6rO'x%mO~O!Z(rq!i(rqa(rq'x(rq~P!:TO!Z(hO!i(qq~O!Q%gO!]%hO#h6yO(R%fO~O!]'^O%h6|O~Ol7QO!]'^O%h6|O~O#i'gaP'gaR'ga['gaa'gap'ga!Q'ga!j'ga!n'ga#P'ga#l'ga#m'ga#n'ga#o'ga#p'ga#q'ga#r'ga#s'ga#t'ga#u'ga#w'ga#y'ga#z'ga'x'ga(_'ga(p'ga!i'ga!W'ga'u'gat'ga!]'ga%h'ga!e'ga~P%+uO#i'iaP'iaR'ia['iaa'iap'ia!Q'ia!j'ia!n'ia#P'ia#l'ia#m'ia#n'ia#o'ia#p'ia#q'ia#r'ia#s'ia#t'ia#u'ia#w'ia#y'ia#z'ia'x'ia(_'ia(p'ia!i'ia!W'ia'u'iat'ia!]'ia%h'ia!e'ia~P%,hO#i${iP${iR${i[${ia${ip${i!Q${i!Z${i!j${i!n${i#P${i#l${i#m${i#n${i#o${i#p${i#q${i#r${i#s${i#t${i#u${i#w${i#y${i#z${i'x${i(_${i(p${i!i${i!W${i'u${i#^${it${i!]${i%h${i!e${i~P#.{O#i%`iP%`iR%`i[%`ia%`ip%`i!Q%`i!j%`i!n%`i#P%`i#l%`i#m%`i#n%`i#o%`i#p%`i#q%`i#r%`i#s%`i#t%`i#u%`i#w%`i#y%`i#z%`i'x%`i(_%`i(p%`i!i%`i!W%`i'u%`it%`i!]%`i%h%`i!e%`i~P%3xO#i%biP%biR%bi[%bia%bip%bi!Q%bi!j%bi!n%bi#P%bi#l%bi#m%bi#n%bi#o%bi#p%bi#q%bi#r%bi#s%bi#t%bi#u%bi#w%bi#y%bi#z%bi'x%bi(_%bi(p%bi!i%bi!W%bi'u%bit%bi!]%bi%h%bi!e%bi~P%4kO!Z'Wa!i'Wa~P!:TO!Z.oO!i(ii~O#}#ai!Z#ai![#ai~P#BPOP$[OR#zO!O#yO!Q#{O!j#xO!n$[O(_VO[#kip#ki#P#ki#m#ki#n#ki#o#ki#p#ki#q#ki#r#ki#s#ki#t#ki#u#ki#w#ki#y#ki#z#ki#}#ki(p#ki(w#ki(x#ki!Z#ki![#ki~O#l#ki~P%MQO#l<PO~P%MQOP$[OR#zOp<]O!O#yO!Q#{O!j#xO!n$[O#l<PO#m<QO#n<QO#o<QO(_VO[#ki#P#ki#q#ki#r#ki#s#ki#t#ki#u#ki#w#ki#y#ki#z#ki#}#ki(p#ki(w#ki(x#ki!Z#ki![#ki~O#p#ki~P& YO#p<RO~P& YOP$[OR#zO[<_Op<]O!O#yO!Q#{O!j#xO!n$[O#P<SO#l<PO#m<QO#n<QO#o<QO#p<RO#q<SO#r<SO#s<^O#t<SO(_VO#w#ki#y#ki#z#ki#}#ki(p#ki(w#ki(x#ki!Z#ki![#ki~O#u#ki~P&#bOP$[OR#zO[<_Op<]O!O#yO!Q#{O!j#xO!n$[O#P<SO#l<PO#m<QO#n<QO#o<QO#p<RO#q<SO#r<SO#s<^O#t<SO#u<TO(_VO(x#}O#y#ki#z#ki#}#ki(p#ki(w#ki!Z#ki![#ki~O#w<VO~P&%cO#w#ki~P&%cO#u<TO~P&#bOP$[OR#zO[<_Op<]O!O#yO!Q#{O!j#xO!n$[O#P<SO#l<PO#m<QO#n<QO#o<QO#p<RO#q<SO#r<SO#s<^O#t<SO#u<TO#w<VO(_VO(w#|O(x#}O#z#ki#}#ki(p#ki!Z#ki![#ki~O#y#ki~P&'rO#y<XO~P&'rOa#{y!Z#{y'x#{y'u#{y!W#{y!i#{yt#{y!]#{y%h#{y!e#{y~P!:TO[#kip#ki#P#ki#p#ki#q#ki#r#ki#s#ki#t#ki#u#ki#w#ki#y#ki#z#ki#}#ki(p#ki!Z#ki![#ki~OP$[OR#zO!O#yO!Q#{O!j#xO!n$[O#l<PO#m<QO#n<QO#o<QO(_VO(w#ki(x#ki~P&*nOl=}O!O)|O'w)}O(w$}O(x%POP#kiR#ki!Q#ki!j#ki!n#ki#l#ki#m#ki#n#ki#o#ki(_#ki~P&*nO#Q$dOP(^XR(^X[(^Xl(^Xp(^X!O(^X!Q(^X!j(^X!n(^X#P(^X#l(^X#m(^X#n(^X#o(^X#p(^X#q(^X#r(^X#s(^X#t(^X#u(^X#w(^X#y(^X#z(^X#}(^X'w(^X(_(^X(p(^X(w(^X(x(^X!Z(^X![(^X~O#}$Oi!Z$Oi![$Oi~P#BPO#}!pi![!pi~P$*OOg'Za!Z'Za~P!0uO![7dO~O!Z'ba!['ba~P#BPO!W7eO~P#.{O!e#vO(p'nO!Z'ca!i'ca~O!Z/kO!i(|i~O!Z/kO!e#vO!i(|i~Og${q!Z${q#^${q#}${q~P!0uO!W'ea!Z'ea~P#.{O!e7lO~O!Z/sO!W(}i~P#.{O!Z/sO!W(}i~O!W7oO~Oh%VOp7tO!j%dO(p'nO~O!e#vO#t7vO~Op7yO!e#vO(p'nO~O!O)|O'w)}O(x%POl'ha(w'ha!Z'ha#^'ha~Og'ha#}'ha~P&3oO!O)|O'w)}Ol'ja(w'ja(x'ja!Z'ja#^'ja~Og'ja#}'ja~P&4bO!W7{O~Og$}q!Z$}q#^$}q#}$}q~P!0uOg(]q!Z(]q~P!0uO#^7|Og(]q!Z(]q~P!0uOa$ny!Z$ny'x$ny'u$ny!W$ny!i$nyt$ny!]$ny%h$ny!e$ny~P!:TO!e6hO~O!Z5RO!])Oa~O!]'^OP$SaR$Sa[$Sap$Sa!O$Sa!Q$Sa!Z$Sa!j$Sa!n$Sa#P$Sa#l$Sa#m$Sa#n$Sa#o$Sa#p$Sa#q$Sa#r$Sa#s$Sa#t$Sa#u$Sa#w$Sa#y$Sa#z$Sa(_$Sa(p$Sa(w$Sa(x$Sa~O%h6|O~P&7SO%]8QOa%Zi!]%Zi'x%Zi!Z%Zi~Oa#ay!Z#ay'x#ay'u#ay!W#ay!i#ayt#ay!]#ay%h#ay!e#ay~P!:TO[8SO~Ob8UO(R+nO(TTO(WUO~O!Z0}O![)Vi~O`8YO~O(c(zO!Z'nX!['nX~O!Z5kO![)Sa~O![8cO~P%:RO(m!sO~P$$oO#Y8dO~O!]1gO~O!]1gO%h8fO~Ol8iO!]1gO%h8fO~O[8nO!Z'qa!['qa~O!Z1rO![)Ti~O!i8rO~O!i8sO~O!i8vO~O!i8vO~P%[Oa8xO~O!e8yO~O!i8zO~O!Z(ui![(ui~P#BPOa%mO#^9SO'x%mO~O!Z(ry!i(rya(ry'x(ry~P!:TO!Z(hO!i(qy~O%h9VO~P&7SO!]'^O%h9VO~O#i${qP${qR${q[${qa${qp${q!Q${q!Z${q!j${q!n${q#P${q#l${q#m${q#n${q#o${q#p${q#q${q#r${q#s${q#t${q#u${q#w${q#y${q#z${q'x${q(_${q(p${q!i${q!W${q'u${q#^${qt${q!]${q%h${q!e${q~P#.{O#i'haP'haR'ha['haa'hap'ha!Q'ha!j'ha!n'ha#P'ha#l'ha#m'ha#n'ha#o'ha#p'ha#q'ha#r'ha#s'ha#t'ha#u'ha#w'ha#y'ha#z'ha'x'ha(_'ha(p'ha!i'ha!W'ha'u'hat'ha!]'ha%h'ha!e'ha~P&3oO#i'jaP'jaR'ja['jaa'jap'ja!Q'ja!j'ja!n'ja#P'ja#l'ja#m'ja#n'ja#o'ja#p'ja#q'ja#r'ja#s'ja#t'ja#u'ja#w'ja#y'ja#z'ja'x'ja(_'ja(p'ja!i'ja!W'ja'u'jat'ja!]'ja%h'ja!e'ja~P&4bO#i$}qP$}qR$}q[$}qa$}qp$}q!Q$}q!Z$}q!j$}q!n$}q#P$}q#l$}q#m$}q#n$}q#o$}q#p$}q#q$}q#r$}q#s$}q#t$}q#u$}q#w$}q#y$}q#z$}q'x$}q(_$}q(p$}q!i$}q!W$}q'u$}q#^$}qt$}q!]$}q%h$}q!e$}q~P#.{O!Z'Wi!i'Wi~P!:TO#}#aq!Z#aq![#aq~P#BPO(w$}OP%`aR%`a[%`ap%`a!Q%`a!j%`a!n%`a#P%`a#l%`a#m%`a#n%`a#o%`a#p%`a#q%`a#r%`a#s%`a#t%`a#u%`a#w%`a#y%`a#z%`a#}%`a(_%`a(p%`a!Z%`a![%`a~Ol%`a!O%`a'w%`a(x%`a~P&HgO(x%POP%baR%ba[%bap%ba!Q%ba!j%ba!n%ba#P%ba#l%ba#m%ba#n%ba#o%ba#p%ba#q%ba#r%ba#s%ba#t%ba#u%ba#w%ba#y%ba#z%ba#}%ba(_%ba(p%ba!Z%ba![%ba~Ol%ba!O%ba'w%ba(w%ba~P&JnOl=}O!O)|O'w)}O(x%PO~P&HgOl=}O!O)|O'w)}O(w$}O~P&JnOR0cO!O0cO!Q0dO#Q$dOP{a[{al{ap{a!j{a!n{a#P{a#l{a#m{a#n{a#o{a#p{a#q{a#r{a#s{a#t{a#u{a#w{a#y{a#z{a#}{a'w{a(_{a(p{a(w{a(x{a!Z{a![{a~O!O)|O'w)}OP$raR$ra[$ral$rap$ra!Q$ra!j$ra!n$ra#P$ra#l$ra#m$ra#n$ra#o$ra#p$ra#q$ra#r$ra#s$ra#t$ra#u$ra#w$ra#y$ra#z$ra#}$ra(_$ra(p$ra(w$ra(x$ra!Z$ra![$ra~O!O)|O'w)}OP$taR$ta[$tal$tap$ta!Q$ta!j$ta!n$ta#P$ta#l$ta#m$ta#n$ta#o$ta#p$ta#q$ta#r$ta#s$ta#t$ta#u$ta#w$ta#y$ta#z$ta#}$ta(_$ta(p$ta(w$ta(x$ta!Z$ta![$ta~Ol=}O!O)|O'w)}O(w$}O(x%PO~OP%SaR%Sa[%Sap%Sa!Q%Sa!j%Sa!n%Sa#P%Sa#l%Sa#m%Sa#n%Sa#o%Sa#p%Sa#q%Sa#r%Sa#s%Sa#t%Sa#u%Sa#w%Sa#y%Sa#z%Sa#}%Sa(_%Sa(p%Sa!Z%Sa![%Sa~P'%sO#}$lq!Z$lq![$lq~P#BPO#}$nq!Z$nq![$nq~P#BPO![9dO~O#}9eO~P!0uO!e#vO!Z'ci!i'ci~O!e#vO(p'nO!Z'ci!i'ci~O!Z/kO!i(|q~O!W'ei!Z'ei~P#.{O!Z/sO!W(}q~Op9lO!e#vO(p'nO~O[9nO!W9mO~P#.{O!W9mO~O!e#vO#t9tO~Og(]y!Z(]y~P!0uO!Z'la!]'la~P#.{Oa%Zq!]%Zq'x%Zq!Z%Zq~P#.{O[9yO~O!Z0}O![)Vq~O#^9}O!Z'na!['na~O!Z5kO![)Si~P#BPO!Q:PO~O!]1gO%h:SO~O(TTO(WUO(c:XO~O!Z1rO![)Tq~O!i:[O~O!i:]O~O!i:^O~O!i:^O~P%[O#^:aO!Z#fy![#fy~O!Z#fy![#fy~P#BPO%h:fO~P&7SO!]'^O%h:fO~O#}#{y!Z#{y![#{y~P#BPOP${iR${i[${ip${i!Q${i!j${i!n${i#P${i#l${i#m${i#n${i#o${i#p${i#q${i#r${i#s${i#t${i#u${i#w${i#y${i#z${i#}${i(_${i(p${i!Z${i![${i~P'%sO!O)|O'w)}O(x%POP'gaR'ga['gal'gap'ga!Q'ga!j'ga!n'ga#P'ga#l'ga#m'ga#n'ga#o'ga#p'ga#q'ga#r'ga#s'ga#t'ga#u'ga#w'ga#y'ga#z'ga#}'ga(_'ga(p'ga(w'ga!Z'ga!['ga~O!O)|O'w)}OP'iaR'ia['ial'iap'ia!Q'ia!j'ia!n'ia#P'ia#l'ia#m'ia#n'ia#o'ia#p'ia#q'ia#r'ia#s'ia#t'ia#u'ia#w'ia#y'ia#z'ia#}'ia(_'ia(p'ia(w'ia(x'ia!Z'ia!['ia~O(w$}OP%`iR%`i[%`il%`ip%`i!O%`i!Q%`i!j%`i!n%`i#P%`i#l%`i#m%`i#n%`i#o%`i#p%`i#q%`i#r%`i#s%`i#t%`i#u%`i#w%`i#y%`i#z%`i#}%`i'w%`i(_%`i(p%`i(x%`i!Z%`i![%`i~O(x%POP%biR%bi[%bil%bip%bi!O%bi!Q%bi!j%bi!n%bi#P%bi#l%bi#m%bi#n%bi#o%bi#p%bi#q%bi#r%bi#s%bi#t%bi#u%bi#w%bi#y%bi#z%bi#}%bi'w%bi(_%bi(p%bi(w%bi!Z%bi![%bi~O#}$ny!Z$ny![$ny~P#BPO#}#ay!Z#ay![#ay~P#BPO!e#vO!Z'cq!i'cq~O!Z/kO!i(|y~O!W'eq!Z'eq~P#.{Op:pO!e#vO(p'nO~O[:tO!W:sO~P#.{O!W:sO~Og(]!R!Z(]!R~P!0uOa%Zy!]%Zy'x%Zy!Z%Zy~P#.{O!Z0}O![)Vy~O!Z5kO![)Sq~O(R:zO~O!]1gO%h:}O~O!i;QO~O%h;VO~P&7SOP${qR${q[${qp${q!Q${q!j${q!n${q#P${q#l${q#m${q#n${q#o${q#p${q#q${q#r${q#s${q#t${q#u${q#w${q#y${q#z${q#}${q(_${q(p${q!Z${q![${q~P'%sO!O)|O'w)}O(x%POP'haR'ha['hal'hap'ha!Q'ha!j'ha!n'ha#P'ha#l'ha#m'ha#n'ha#o'ha#p'ha#q'ha#r'ha#s'ha#t'ha#u'ha#w'ha#y'ha#z'ha#}'ha(_'ha(p'ha(w'ha!Z'ha!['ha~O!O)|O'w)}OP'jaR'ja['jal'jap'ja!Q'ja!j'ja!n'ja#P'ja#l'ja#m'ja#n'ja#o'ja#p'ja#q'ja#r'ja#s'ja#t'ja#u'ja#w'ja#y'ja#z'ja#}'ja(_'ja(p'ja(w'ja(x'ja!Z'ja!['ja~OP$}qR$}q[$}qp$}q!Q$}q!j$}q!n$}q#P$}q#l$}q#m$}q#n$}q#o$}q#p$}q#q$}q#r$}q#s$}q#t$}q#u$}q#w$}q#y$}q#z$}q#}$}q(_$}q(p$}q!Z$}q![$}q~P'%sOg%d!Z!Z%d!Z#^%d!Z#}%d!Z~P!0uO!W;ZO~P#.{Op;[O!e#vO(p'nO~O[;^O!W;ZO~P#.{O!Z'nq!['nq~P#BPO!Z#f!Z![#f!Z~P#BPO#i%d!ZP%d!ZR%d!Z[%d!Za%d!Zp%d!Z!Q%d!Z!Z%d!Z!j%d!Z!n%d!Z#P%d!Z#l%d!Z#m%d!Z#n%d!Z#o%d!Z#p%d!Z#q%d!Z#r%d!Z#s%d!Z#t%d!Z#u%d!Z#w%d!Z#y%d!Z#z%d!Z'x%d!Z(_%d!Z(p%d!Z!i%d!Z!W%d!Z'u%d!Z#^%d!Zt%d!Z!]%d!Z%h%d!Z!e%d!Z~P#.{Op;fO!e#vO(p'nO~O!W;gO~P#.{Op;nO!e#vO(p'nO~O!W;oO~P#.{OP%d!ZR%d!Z[%d!Zp%d!Z!Q%d!Z!j%d!Z!n%d!Z#P%d!Z#l%d!Z#m%d!Z#n%d!Z#o%d!Z#p%d!Z#q%d!Z#r%d!Z#s%d!Z#t%d!Z#u%d!Z#w%d!Z#y%d!Z#z%d!Z#}%d!Z(_%d!Z(p%d!Z!Z%d!Z![%d!Z~P'%sOp;rO!e#vO(p'nO~Ot(dX~P1qO!O%qO~P!(yO(S!lO~P!(yO!WfX!ZfX#^fX~P%0XOP]XR]X[]Xp]X!O]X!Q]X!Z]X!ZfX!j]X!n]X#P]X#Q]X#^]X#^fX#ifX#l]X#m]X#n]X#o]X#p]X#q]X#r]X#s]X#t]X#u]X#w]X#y]X#z]X$P]X(_]X(p]X(w]X(x]X~O!efX!i]X!ifX(pfX~P'JlOP;vOQ;vOSfOd=rOe!iOnkOp;vOqkOrkOxkOz;vO|;vO!QWO!UkO!VkO!]XO!g;yO!jZO!m;vO!n;vO!o;vO!q;zO!s;}O!v!hO$V!kO$m=pO(R)ZO(TTO(WUO(_VO(m[O~O!Z<ZO![$pa~Oh%VOn%WOp%XOq$tOr$tOx%YOz%ZO|<fO!Q${O!]$|O!g=wO!j$xO#h<lO$V%_O$s<hO$u<jO$x%`O(R(tO(TTO(WUO(_$uO(w$}O(x%PO~Oj)bO~P( bOp!cX(p!cX~P# qOp(hX(p(hX~P#!dO![]X![fX~P'JlO!WfX!W$yX!ZfX!Z$yX#^fX~P!/qO#i<OO~O!e#vO#i<OO~O#^<`O~O#t<SO~O#^<pO!Z(uX![(uX~O#^<`O!Z(sX![(sX~O#i<qO~Og<sO~P!0uO#i<yO~O#i<zO~O!e#vO#i<{O~O!e#vO#i<qO~O#}<|O~P#BPO#i<}O~O#i=OO~O#i=TO~O#i=UO~O#i=VO~O#i=WO~O#}=XO~P!0uO#}=YO~P!0uO#Q#R#S#U#V#Y#g#h#s$m$s$u$x%[%]%g%h%i%p%r%u%v%x%z~'|T#m!V'z(S#nq#l#op!O'{$['{(R$^(c~",
			goto: "$8f)ZPPPPPP)[PP)_P)pP+Q/VPPPP6aPP6wPP<oP@cP@yP@yPPP@yPCRP@yP@yP@yPCVPC[PCyPHsPPPHwPPPPHwKzPPPLQLrPHwPHwPP! QHwPPPHwPHwP!#XHwP!&o!'t!'}P!(q!(u!(q!,SPPPPPPP!,s!'tPP!-T!.uP!2RHwHw!2W!5d!:Q!:Q!>PPPP!>XHwPPPPPPPPPP!AhP!BuPPHw!DWPHwPHwHwHwHwHwPHw!EjP!HtP!KzP!LO!LY!L^!L^P!HqP!Lb!LbP# hP# lHwPHw# r#$wCV@yP@yP@y@yP#&U@y@y#(h@y#+`@y#-l@y@y#.[#0p#0p#0u#1O#0p#1ZPP#0pP@y#1s@y#5r@y@y6aPPP#9wPPP#:b#:bP#:bP#:x#:bPP#;OP#:uP#:u#;c#:u#;}#<T#<W)_#<Z)_P#<b#<b#<bP)_P)_P)_P)_PP)_P#<h#<kP#<k)_P#<oP#<rP)_P)_P)_P)_P)_P)_)_PP#<x#=O#=Z#=a#=g#=m#=s#>R#>X#>c#>i#>s#>y#?Z#?a#@R#@e#@k#@q#AP#Af#CZ#Ci#Cp#E[#Ej#G[#Gj#Gp#Gv#G|#HW#H^#Hd#Hn#IQ#IWPPPPPPPPPPP#I^PPPPPPP#JR#MY#Nr#Ny$ RPPP$&mP$&v$)o$0Y$0]$0`$1_$1b$1i$1qP$1w$1zP$2h$2l$3d$4r$4w$5_PP$5d$5j$5n$5q$5u$5y$6u$7^$7u$7y$7|$8P$8V$8Y$8^$8bR!|RoqOXst!Z#d%l&p&r&s&u,n,s2S2VY!vQ'^-`1g5qQ%svQ%{yQ&S|Q&h!VS'U!e-WQ'd!iS'j!r!yU*h$|*X*lQ+l%|Q+y&UQ,_&bQ-^']Q-h'eQ-p'kQ0U*nQ1q,`R<m;z%SdOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%l%s&Q&i&l&p&r&s&u&y'R'`'p(R(T(Z(b(v(x(|){*f+U+Y,k,n,s-d-l-z.Q.o.v/i0V0d0l0|1j1z1{1}2P2S2V2X2x3O3d4q5y6Z6[6_6r8i8x9SS#q];w!r)]$Z$n'V)q-P-S/Q2h3{5m6i9}:a;v;y;z;}<O<P<Q<R<S<T<U<V<W<X<Y<Z<]<`<m<p<q<s<{<|=V=W=sU*{%[<e<fQ+q&OQ,a&eQ,h&mQ0r+dQ0u+fQ1S+rQ1y,fQ3W.bQ5V0wQ5]0}Q6Q1rQ7O3[Q8U5^R9Y7Q'QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%l%s&Q&i&l&m&p&r&s&u&y'R'V'`'p(R(T(Z(b(v(x(|)q){*f+U+Y+d,k,n,s-P-S-d-l-z.Q.b.o.v/Q/i0V0d0l0|1j1z1{1}2P2S2V2X2h2x3O3[3d3{4q5m5y6Z6[6_6i6r7Q8i8x9S9}:a;v;y;z;}<O<P<Q<R<S<T<U<V<W<X<Y<Z<]<`<m<p<q<s<{<|=V=W=s!S!nQ!r!v!y!z$|'U']'^'j'k'l*h*l*n*o-W-^-`-p0U0X1g5q5s%[$ti#v$b$c$d$x${%O%Q%]%^%b)w*P*R*T*W*^*d*t*u+c+f+},Q.a.z/_/h/r/s/u0Y0[0g0h0i1^1a1i3Z4U4V4a4f4w5R5U5x6|7l7v7|8Q8f9V9e9n9t:S:f:t:};V;^<^<_<a<b<c<d<g<h<i<j<k<l<t<u<v<w<y<z<}=O=P=Q=R=S=T=U=X=Y=p=x=y=|=}Q&V|Q'S!eS'Y%h-ZQ+q&OQ,a&eQ0f+OQ1S+rQ1X+xQ1x,eQ1y,fQ5]0}Q5f1ZQ6Q1rQ6T1tQ6U1wQ8U5^Q8X5cQ8q6WQ9|8YQ:Y8nR<o*XrnOXst!V!Z#d%l&g&p&r&s&u,n,s2S2VR,c&i&z^OPXYstuvwz!Z!`!g!j!o#S#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%l%s&Q&i&l&m&p&r&s&u&y'R'`'p(T(Z(b(v(x(|)q){*f+U+Y+d,k,n,s-P-S-d-l-z.Q.b.o.v/Q/i0V0d0l0|1j1z1{1}2P2S2V2X2h2x3O3[3d3{4q5m5y6Z6[6_6i6r7Q8i8x9S9}:a;v;y;z;}<O<P<Q<R<S<T<U<V<W<X<Y<Z<]<`<m<p<q<s<{<|=V=W=r=s[#]WZ#W#Z'V(R!b%im#h#i#l$x%d%g([(f(g(h*W*[*_+W+X+Z,j-Q.O.U.V.W.Y/h/k2[3S3T4X6h6yQ%vxQ%zyS&P|&UQ&]!TQ'a!hQ'c!iQ(o#sS+k%{%|Q+o&OQ,Y&`Q,^&bS-g'd'eQ.d(pQ0{+lQ1R+rQ1T+sQ1W+wQ1l,ZS1p,_,`Q2t-hQ5[0}Q5`1QQ5e1YQ6P1qQ8T5^Q8W5bQ9x8SR:w9y!U$zi$d%O%Q%]%^%b*P*R*^*t*u.z/r0Y0[0g0h0i4V4w7|9e=p=x=y!^%xy!i!u%z%{%|'T'c'd'e'i's*g+k+l-T-g-h-o/{0O0{2m2t2{4i4j4m7s9pQ+e%vQ,O&YQ,R&ZQ,]&bQ.c(oQ1k,YU1o,^,_,`Q3].dQ5z1lS6O1p1qQ8m6P#f=t#v$b$c$x${)w*T*W*d+c+f+},Q.a/_/h/s/u1^1a1i3Z4U4a4f5R5U5x6|7l7v8Q8f9V9n9t:S:f:t:};V;^<a<c<g<i<k<t<v<y<}=P=R=T=X=|=}o=u<^<_<b<d<h<j<l<u<w<z=O=Q=S=U=YW%Ti%V*v=pS&Y!Q&gQ&Z!RQ&[!SQ+S%cR+|&W%]%Si#v$b$c$d$x${%O%Q%]%^%b)w*P*R*T*W*^*d*t*u+c+f+},Q.a.z/_/h/r/s/u0Y0[0g0h0i1^1a1i3Z4U4V4a4f4w5R5U5x6|7l7v7|8Q8f9V9e9n9t:S:f:t:};V;^<^<_<a<b<c<d<g<h<i<j<k<l<t<u<v<w<y<z<}=O=P=Q=R=S=T=U=X=Y=p=x=y=|=}T)x$u)yV*{%[<e<fW'Y!e%h*X-ZS({#y#zQ+`%qQ+v&RS.](k(lQ1b,SQ4x0cR8^5k'QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%l%s&Q&i&l&m&p&r&s&u&y'R'V'`'p(R(T(Z(b(v(x(|)q){*f+U+Y+d,k,n,s-P-S-d-l-z.Q.b.o.v/Q/i0V0d0l0|1j1z1{1}2P2S2V2X2h2x3O3[3d3{4q5m5y6Z6[6_6i6r7Q8i8x9S9}:a;v;y;z;}<O<P<Q<R<S<T<U<V<W<X<Y<Z<]<`<m<p<q<s<{<|=V=W=s$i$^c#Y#e%p%r%t(Q(W(r(w)P)Q)R)S)T)U)V)W)X)Y)[)^)`)e)o+a+u-U-s-x-}.P.n.q.u.w.x.y/]0j2c2f2v2}3c3h3i3j3k3l3m3n3o3p3q3r3s3t3w3x4P5O5Y6k6q6v7V7W7a7b8`8|9Q9[9b9c:c:y;R;x=gT#TV#U'RkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%l%s&Q&i&l&m&p&r&s&u&y'R'V'`'p(R(T(Z(b(v(x(|)q){*f+U+Y+d,k,n,s-P-S-d-l-z.Q.b.o.v/Q/i0V0d0l0|1j1z1{1}2P2S2V2X2h2x3O3[3d3{4q5m5y6Z6[6_6i6r7Q8i8x9S9}:a;v;y;z;}<O<P<Q<R<S<T<U<V<W<X<Y<Z<]<`<m<p<q<s<{<|=V=W=sQ'W!eR2i-W!W!nQ!e!r!v!y!z$|'U']'^'j'k'l*X*h*l*n*o-W-^-`-p0U0X1g5q5sR1d,UnqOXst!Z#d%l&p&r&s&u,n,s2S2VQ&w!^Q't!xS(q#u<OQ+i%yQ,W&]Q,X&_Q-e'bQ-r'mS.m(v<qS0k+U<{Q0y+jQ1f,VQ2Z,uQ2],vQ2e-RQ2r-fQ2u-jS5P0l=VQ5W0zS5Z0|=WQ6j2gQ6n2sQ6s2zQ8R5XQ8}6lQ9O6oQ9R6tR:`8z$d$]c#Y#e%r%t(Q(W(r(w)P)Q)R)S)T)U)V)W)X)Y)[)^)`)e)o+a+u-U-s-x-}.P.n.q.u.x.y/]0j2c2f2v2}3c3h3i3j3k3l3m3n3o3p3q3r3s3t3w3x4P5O5Y6k6q6v7V7W7a7b8`8|9Q9[9b9c:c:y;R;x=gS(m#p'gQ(}#zS+_%p.wS.^(l(nR3U._'QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%l%s&Q&i&l&m&p&r&s&u&y'R'V'`'p(R(T(Z(b(v(x(|)q){*f+U+Y+d,k,n,s-P-S-d-l-z.Q.b.o.v/Q/i0V0d0l0|1j1z1{1}2P2S2V2X2h2x3O3[3d3{4q5m5y6Z6[6_6i6r7Q8i8x9S9}:a;v;y;z;}<O<P<Q<R<S<T<U<V<W<X<Y<Z<]<`<m<p<q<s<{<|=V=W=sS#q];wQ&r!XQ&s!YQ&u![Q&v!]R2R,qQ'_!hQ+b%vQ-c'aS.`(o+eQ2p-bW3Y.c.d0q0sQ6m2qW6z3V3X3]5TU9U6{6}7PU:e9W9X9ZS;T:d:gQ;b;UR;j;cU!wQ'^-`T5o1g5q!Q_OXZ`st!V!Z#d#h%d%l&g&i&p&r&s&u(h,n,s.V2S2V]!pQ!r'^-`1g5qT#q];w%^{OPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%l%s&Q&i&l&m&p&r&s&u&y'R'`'p(R(T(Z(b(v(x(|){*f+U+Y+d,k,n,s-d-l-z.Q.b.o.v/i0V0d0l0|1j1z1{1}2P2S2V2X2x3O3[3d4q5y6Z6[6_6r7Q8i8x9SS({#y#zS.](k(l!s=^$Z$n'V)q-P-S/Q2h3{5m6i9}:a;v;y;z;}<O<P<Q<R<S<T<U<V<W<X<Y<Z<]<`<m<p<q<s<{<|=V=W=sU$fd)],hS(n#p'gU*s%R(u3vU0e*z.i7]Q5T0rQ6{3WQ9X7OR:g9Ym!tQ!r!v!y!z'^'j'k'l-`-p1g5q5sQ'r!uS(d#g1|S-n'i'uQ/n*ZQ/{*gQ2|-qQ4]/oQ4i/}Q4j0OQ4o0WQ7h4WS7s4k4mS7w4p4rQ9g7iQ9k7oQ9p7tQ9u7yS:o9l9mS;Y:p:sS;e;Z;[S;m;f;gS;q;n;oR;t;rQ#wbQ'q!uS(c#g1|S(e#m+TQ+V%eQ+g%wQ+m%}U-m'i'r'uQ.R(dQ/m*ZQ/|*gQ0P*iQ0x+hQ1m,[S2y-n-qQ3R.ZS4[/n/oQ4e/yS4h/{0WQ4l0QQ5|1nQ6u2|Q7g4WQ7k4]U7r4i4o4rQ7u4nQ8k5}S9f7h7iQ9j7oQ9r7wQ9s7xQ:V8lQ:m9gS:n9k9mQ:v9uQ;P:WS;X:o:sS;d;Y;ZS;l;e;gS;p;m;oQ;s;qQ;u;tQ=a=[Q=l=eR=m=fV!wQ'^-`%^aOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%l%s&Q&i&l&m&p&r&s&u&y'R'`'p(R(T(Z(b(v(x(|){*f+U+Y+d,k,n,s-d-l-z.Q.b.o.v/i0V0d0l0|1j1z1{1}2P2S2V2X2x3O3[3d4q5y6Z6[6_6r7Q8i8x9SS#wz!j!r=Z$Z$n'V)q-P-S/Q2h3{5m6i9}:a;v;y;z;}<O<P<Q<R<S<T<U<V<W<X<Y<Z<]<`<m<p<q<s<{<|=V=W=sR=a=r%^bOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%l%s&Q&i&l&m&p&r&s&u&y'R'`'p(R(T(Z(b(v(x(|){*f+U+Y+d,k,n,s-d-l-z.Q.b.o.v/i0V0d0l0|1j1z1{1}2P2S2V2X2x3O3[3d4q5y6Z6[6_6r7Q8i8x9SQ%ej!^%wy!i!u%z%{%|'T'c'd'e'i's*g+k+l-T-g-h-o/{0O0{2m2t2{4i4j4m7s9pS%}z!jQ+h%xQ,[&bW1n,],^,_,`U5}1o1p1qS8l6O6PQ:W8m!r=[$Z$n'V)q-P-S/Q2h3{5m6i9}:a;v;y;z;}<O<P<Q<R<S<T<U<V<W<X<Y<Z<]<`<m<p<q<s<{<|=V=W=sQ=e=qR=f=r%QeOPXYstuvw!Z!`!g!o#S#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%l%s&Q&i&l&p&r&s&u&y'R'`'p(T(Z(b(v(x(|){*f+U+Y+d,k,n,s-d-l-z.Q.b.o.v/i0V0d0l0|1j1z1{1}2P2S2V2X2x3O3[3d4q5y6Z6[6_6r7Q8i8x9SY#bWZ#W#Z(R!b%im#h#i#l$x%d%g([(f(g(h*W*[*_+W+X+Z,j-Q.O.U.V.W.Y/h/k2[3S3T4X6h6yQ,i&m!p=]$Z$n)q-P-S/Q2h3{5m6i9}:a;v;y;z;}<O<P<Q<R<S<T<U<V<W<X<Y<Z<]<`<m<p<q<s<{<|=V=W=sR=`'VU'Z!e%h*XR2k-Z%SdOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%l%s&Q&i&l&p&r&s&u&y'R'`'p(R(T(Z(b(v(x(|){*f+U+Y,k,n,s-d-l-z.Q.o.v/i0V0d0l0|1j1z1{1}2P2S2V2X2x3O3d4q5y6Z6[6_6r8i8x9S!r)]$Z$n'V)q-P-S/Q2h3{5m6i9}:a;v;y;z;}<O<P<Q<R<S<T<U<V<W<X<Y<Z<]<`<m<p<q<s<{<|=V=W=sQ,h&mQ0r+dQ3W.bQ7O3[R9Y7Q!b$Tc#Y%p(Q(W(r(w)X)Y)^)e+u-s-x-}.P.n.q/]0j2v2}3c3s5O5Y6q6v7V9Q:c;x!P<U)[)o-U.w2c2f3h3q3r3w4P6k7W7a7b8`8|9[9b9c:y;R=g!f$Vc#Y%p(Q(W(r(w)U)V)X)Y)^)e+u-s-x-}.P.n.q/]0j2v2}3c3s5O5Y6q6v7V9Q:c;x!T<W)[)o-U.w2c2f3h3n3o3q3r3w4P6k7W7a7b8`8|9[9b9c:y;R=g!^$Zc#Y%p(Q(W(r(w)^)e+u-s-x-}.P.n.q/]0j2v2}3c3s5O5Y6q6v7V9Q:c;xQ4V/fz=s)[)o-U.w2c2f3h3w4P6k7W7a7b8`8|9[9b9c:y;R=gQ=x=zR=y={'QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%l%s&Q&i&l&m&p&r&s&u&y'R'V'`'p(R(T(Z(b(v(x(|)q){*f+U+Y+d,k,n,s-P-S-d-l-z.Q.b.o.v/Q/i0V0d0l0|1j1z1{1}2P2S2V2X2h2x3O3[3d3{4q5m5y6Z6[6_6i6r7Q8i8x9S9}:a;v;y;z;}<O<P<Q<R<S<T<U<V<W<X<Y<Z<]<`<m<p<q<s<{<|=V=W=sS$oh$pR3|/P'XgOPWXYZhstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n$p%l%s&Q&i&l&m&p&r&s&u&y'R'V'`'p(R(T(Z(b(v(x(|)q){*f+U+Y+d,k,n,s-P-S-d-l-z.Q.b.o.v/P/Q/i0V0d0l0|1j1z1{1}2P2S2V2X2h2x3O3[3d3{4q5m5y6Z6[6_6i6r7Q8i8x9S9}:a;v;y;z;}<O<P<Q<R<S<T<U<V<W<X<Y<Z<]<`<m<p<q<s<{<|=V=W=sT$kf$qQ$ifS)h$l)lR)t$qT$jf$qT)j$l)l'XhOPWXYZhstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n$p%l%s&Q&i&l&m&p&r&s&u&y'R'V'`'p(R(T(Z(b(v(x(|)q){*f+U+Y+d,k,n,s-P-S-d-l-z.Q.b.o.v/P/Q/i0V0d0l0|1j1z1{1}2P2S2V2X2h2x3O3[3d3{4q5m5y6Z6[6_6i6r7Q8i8x9S9}:a;v;y;z;}<O<P<Q<R<S<T<U<V<W<X<Y<Z<]<`<m<p<q<s<{<|=V=W=sT$oh$pQ$rhR)s$p%^jOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%l%s&Q&i&l&m&p&r&s&u&y'R'`'p(R(T(Z(b(v(x(|){*f+U+Y+d,k,n,s-d-l-z.Q.b.o.v/i0V0d0l0|1j1z1{1}2P2S2V2X2x3O3[3d4q5y6Z6[6_6r7Q8i8x9S!s=q$Z$n'V)q-P-S/Q2h3{5m6i9}:a;v;y;z;}<O<P<Q<R<S<T<U<V<W<X<Y<Z<]<`<m<p<q<s<{<|=V=W=s#glOPXZst!Z!`!o#S#d#o#{$n%l&i&l&m&p&r&s&u&y'R'`(|)q*f+Y+d,k,n,s-d.b/Q/i0V0d1j1z1{1}2P2S2V2X3[3{4q5y6Z6[6_7Q8i8x!U%Ri$d%O%Q%]%^%b*P*R*^*t*u.z/r0Y0[0g0h0i4V4w7|9e=p=x=y#f(u#v$b$c$x${)w*T*W*d+c+f+},Q.a/_/h/s/u1^1a1i3Z4U4a4f5R5U5x6|7l7v8Q8f9V9n9t:S:f:t:};V;^<a<c<g<i<k<t<v<y<}=P=R=T=X=|=}Q+P%`Q/^)|o3v<^<_<b<d<h<j<l<u<w<z=O=Q=S=U=Y!U$yi$d%O%Q%]%^%b*P*R*^*t*u.z/r0Y0[0g0h0i4V4w7|9e=p=x=yQ*`$zU*i$|*X*lQ+Q%aQ0Q*j#f=c#v$b$c$x${)w*T*W*d+c+f+},Q.a/_/h/s/u1^1a1i3Z4U4a4f5R5U5x6|7l7v8Q8f9V9n9t:S:f:t:};V;^<a<c<g<i<k<t<v<y<}=P=R=T=X=|=}n=d<^<_<b<d<h<j<l<u<w<z=O=Q=S=U=YQ=h=tQ=i=uQ=j=vR=k=w!U%Ri$d%O%Q%]%^%b*P*R*^*t*u.z/r0Y0[0g0h0i4V4w7|9e=p=x=y#f(u#v$b$c$x${)w*T*W*d+c+f+},Q.a/_/h/s/u1^1a1i3Z4U4a4f5R5U5x6|7l7v8Q8f9V9n9t:S:f:t:};V;^<a<c<g<i<k<t<v<y<}=P=R=T=X=|=}o3v<^<_<b<d<h<j<l<u<w<z=O=Q=S=U=YnoOXst!Z#d%l&p&r&s&u,n,s2S2VS*c${*WQ,|&|Q,}'OR4`/s%[%Si#v$b$c$d$x${%O%Q%]%^%b)w*P*R*T*W*^*d*t*u+c+f+},Q.a.z/_/h/r/s/u0Y0[0g0h0i1^1a1i3Z4U4V4a4f4w5R5U5x6|7l7v7|8Q8f9V9e9n9t:S:f:t:};V;^<^<_<a<b<c<d<g<h<i<j<k<l<t<u<v<w<y<z<}=O=P=Q=R=S=T=U=X=Y=p=x=y=|=}Q,P&ZQ1`,RQ5i1_R8]5jV*k$|*X*lU*k$|*X*lT5p1g5qS/y*f/iQ4n0VT7x4q:PQ+g%wQ0P*iQ0x+hQ1m,[Q5|1nQ8k5}Q:V8lR;P:W!U%Oi$d%O%Q%]%^%b*P*R*^*t*u.z/r0Y0[0g0h0i4V4w7|9e=p=x=yx*P$v)c*Q*r+R/q0^0_3y4^4{4|4}7f7z9v:l=b=n=oS0Y*q0Z#f<a#v$b$c$x${)w*T*W*d+c+f+},Q.a/_/h/s/u1^1a1i3Z4U4a4f5R5U5x6|7l7v8Q8f9V9n9t:S:f:t:};V;^<a<c<g<i<k<t<v<y<}=P=R=T=X=|=}n<b<^<_<b<d<h<j<l<u<w<z=O=Q=S=U=Y!d<t(s)a*Y*b.e.h.l/Y/f/v0p1]3`4S4_4c5h7R7U7m7p7}8P9i9q9w:q:u;W;];h=z={`<u3u7X7[7`9]:h:k;kS=P.g3aT=Q7Z9`!U%Qi$d%O%Q%]%^%b*P*R*^*t*u.z/r0Y0[0g0h0i4V4w7|9e=p=x=y|*R$v)c*S*q+R/b/q0^0_3y4^4s4{4|4}7f7z9v:l=b=n=oS0[*r0]#f<c#v$b$c$x${)w*T*W*d+c+f+},Q.a/_/h/s/u1^1a1i3Z4U4a4f5R5U5x6|7l7v8Q8f9V9n9t:S:f:t:};V;^<a<c<g<i<k<t<v<y<}=P=R=T=X=|=}n<d<^<_<b<d<h<j<l<u<w<z=O=Q=S=U=Y!h<v(s)a*Y*b.f.g.l/Y/f/v0p1]3^3`4S4_4c5h7R7S7U7m7p7}8P9i9q9w:q:u;W;];h=z={d<w3u7Y7Z7`9]9^:h:i:k;kS=R.h3bT=S7[9arnOXst!V!Z#d%l&g&p&r&s&u,n,s2S2VQ&d!UR,k&mrnOXst!V!Z#d%l&g&p&r&s&u,n,s2S2VR&d!UQ,T&[R1[+|snOXst!V!Z#d%l&g&p&r&s&u,n,s2S2VQ1h,YS5w1k1lU8e5u5v5zS:R8g8hS:{:Q:TQ;_:|R;i;`Q&k!VR,d&gR6T1tR:Y8nS&P|&UR1T+sQ&p!WR,n&qR,t&vT2T,s2VR,x&wQ,w&wR2^,xQ'w!{R-t'wSsOtQ#dXT%os#dQ#OTR'y#OQ#RUR'{#RQ)y$uR/Z)yQ#UVR(O#UQ#XWU(U#X(V-{Q(V#YR-{(WQ-X'WR2j-XQ.p(wS3e.p3fR3f.qQ-`'^R2n-`Y!rQ'^-`1g5qR'h!rQ.{)cR3z.{U#_W%g*WU(]#_(^-|Q(^#`R-|(XQ-['ZR2l-[t`OXst!V!Z#d%l&g&i&p&r&s&u,n,s2S2VS#hZ%dU#r`#h.VR.V(hQ(i#jQ.S(eW.[(i.S3P6wQ3P.TR6w3QQ)l$lR/R)lQ$phR)r$pQ$`cU)_$`-w<[Q-w;xR<[)oQ/l*ZW4Y/l4Z7j9hU4Z/m/n/oS7j4[4]R9h7k$e*O$v(s)a)c*Y*b*q*r*|*}+R.g.h.j.k.l/Y/b/d/f/q/v0^0_0p1]3^3_3`3u3y4S4^4_4c4s4u4{4|4}5h7R7S7T7U7Z7[7^7_7`7f7m7p7z7}8P9]9^9_9i9q9v9w:h:i:j:k:l:q:u;W;];h;k=b=n=o=z={Q/t*bU4b/t4d7nQ4d/vR7n4cS*l$|*XR0S*lx*Q$v)c*q*r+R/q0^0_3y4^4{4|4}7f7z9v:l=b=n=o!d.e(s)a*Y*b.g.h.l/Y/f/v0p1]3`4S4_4c5h7R7U7m7p7}8P9i9q9w:q:u;W;];h=z={U/c*Q.e7Xa7X3u7Z7[7`9]:h:k;kQ0Z*qQ3a.gU4t0Z3a9`R9`7Z|*S$v)c*q*r+R/b/q0^0_3y4^4s4{4|4}7f7z9v:l=b=n=o!h.f(s)a*Y*b.g.h.l/Y/f/v0p1]3^3`4S4_4c5h7R7S7U7m7p7}8P9i9q9w:q:u;W;];h=z={U/e*S.f7Ye7Y3u7Z7[7`9]9^:h:i:k;kQ0]*rQ3b.hU4v0]3b9aR9a7[Q*w%UR0a*wQ5S0pR8O5SQ+[%jR0o+[Q5l1bS8_5l:OR:O8`Q,V&]R1e,VQ5q1gR8b5qQ1s,aS6R1s8oR8o6TQ1O+oW5_1O5a8V9zQ5a1RQ8V5`R9z8WQ+t&PR1U+tQ2V,sR6c2VYrOXst#dQ&t!ZQ+^%lQ,m&pQ,o&rQ,p&sQ,r&uQ2Q,nS2T,s2VR6b2SQ%npQ&x!_Q&{!aQ&}!bQ'P!cQ'o!uQ+]%kQ+i%yQ+{&VQ,c&kQ,z&zW-k'i'q'r'uQ-r'mQ0R*kQ0y+jS1v,d,gQ2_,yQ2`,|Q2a,}Q2u-jW2w-m-n-q-sQ5W0zQ5d1XQ5g1]Q5{1mQ6V1xQ6a2RU6p2v2y2|Q6s2zQ8R5XQ8Z5fQ8[5hQ8a5pQ8j5|Q8p6US9P6q6uQ9R6tQ9{8XQ:U8kQ:Z8qQ:b9QQ:x9|Q;O:VQ;S:cR;a;PQ%yyQ'b!iQ'm!uU+j%z%{%|Q-R'TU-f'c'd'eS-j'i'sQ/z*gS0z+k+lQ2g-TS2s-g-hQ2z-oS4g/{0OQ5X0{Q6l2mQ6o2tQ6t2{U7q4i4j4mQ9o7sR:r9pS$wi=pR*x%VU%Ui%V=pR0`*vQ$viS(s#v+fS)a$b$cQ)c$dQ*Y$xS*b${*WQ*q%OQ*r%QQ*|%]Q*}%^Q+R%bQ.g<aQ.h<cQ.j<gQ.k<iQ.l<kQ/Y)wQ/b*PQ/d*RQ/f*TQ/q*^S/v*d/hQ0^*tQ0_*ul0p+c,Q.a1a1i3Z5x6|8f9V:S:f:};VQ1]+}Q3^<tQ3_<vQ3`<yS3u<^<_Q3y.zS4S/_4UQ4^/rQ4_/sQ4c/uQ4s0YQ4u0[Q4{0gQ4|0hQ4}0iQ5h1^Q7R<}Q7S=PQ7T=RQ7U=TQ7Z<bQ7[<dQ7^<hQ7_<jQ7`<lQ7f4VQ7m4aQ7p4fQ7z4wQ7}5RQ8P5UQ9]<zQ9^<uQ9_<wQ9i7lQ9q7vQ9v7|Q9w8QQ:h=OQ:i=QQ:j=SQ:k=UQ:l9eQ:q9nQ:u9tQ;W=XQ;]:tQ;h;^Q;k=YQ=b=pQ=n=xQ=o=yQ=z=|R={=}Q*z%[Q.i<eR7]<fnpOXst!Z#d%l&p&r&s&u,n,s2S2VQ!fPS#fZ#oQ&z!`W'f!o*f0V4qQ'}#SQ)O#{Q)p$nS,g&i&lQ,l&mQ,y&yS-O'R/iQ-b'`Q.s(|Q/V)qQ0m+YQ0s+dQ2O,kQ2q-dQ3X.bQ4O/QQ4y0dQ5v1jQ6X1zQ6Y1{Q6^1}Q6`2PQ6e2XQ7P3[Q7c3{Q8h5yQ8t6ZQ8u6[Q8w6_Q9Z7QQ:T8iR:_8x#[cOPXZst!Z!`!o#d#o#{%l&i&l&m&p&r&s&u&y'R'`(|*f+Y+d,k,n,s-d.b/i0V0d1j1z1{1}2P2S2V2X3[4q5y6Z6[6_7Q8i8xQ#YWQ#eYQ%puQ%rvS%tw!gS(Q#W(TQ(W#ZQ(r#uQ(w#xQ)P$OQ)Q$PQ)R$QQ)S$RQ)T$SQ)U$TQ)V$UQ)W$VQ)X$WQ)Y$XQ)[$ZQ)^$_Q)`$aQ)e$eW)o$n)q/Q3{Q+a%sQ+u&QS-U'V2hQ-s'pS-x(R-zQ-}(ZQ.P(bQ.n(vQ.q(xQ.u;vQ.w;yQ.x;zQ.y;}Q/]){Q0j+UQ2c-PQ2f-SQ2v-lQ2}.QQ3c.oQ3h<OQ3i<PQ3j<QQ3k<RQ3l<SQ3m<TQ3n<UQ3o<VQ3p<WQ3q<XQ3r<YQ3s.vQ3t<]Q3w<`Q3x<mQ4P<ZQ5O0lQ5Y0|Q6k<pQ6q2xQ6v3OQ7V3dQ7W<qQ7a<sQ7b<{Q8`5mQ8|6iQ9Q6rQ9[<|Q9b=VQ9c=WQ:c9SQ:y9}Q;R:aQ;x#SR=g=sR#[WR'X!el!tQ!r!v!y!z'^'j'k'l-`-p1g5q5sS'T!e-WU*g$|*X*lS-T'U']S0O*h*nQ0W*oQ2m-^Q4m0UR4r0XR(y#xQ!fQT-_'^-`]!qQ!r'^-`1g5qQ#p]R'g;wR)d$dY!uQ'^-`1g5qQ'i!rS's!v!yS'u!z5sS-o'j'kQ-q'lR2{-pT#kZ%dS#jZ%dS%jm,jU(e#h#i#lS.T(f(gQ.X(hQ0n+ZQ3Q.UU3R.V.W.YS6x3S3TR9T6yd#^W#W#Z%g(R([*W+W.O/hr#gZm#h#i#l%d(f(g(h+Z.U.V.W.Y3S3T6yS*Z$x*_Q/o*[Q1|,jQ2d-QQ4W/kQ6g2[Q7i4XQ8{6hT=_'V+XV#aW%g*WU#`W%g*WS(S#W([U(X#Z+W/hS-V'V+XT-y(R.OV'[!e%h*XQ$lfR)v$qT)k$l)lR3}/PT*]$x*_T*e${*WQ0q+cQ1_,QQ3V.aQ5j1aQ5u1iQ6}3ZQ8g5xQ9W6|Q:Q8fQ:d9VQ:|:SQ;U:fQ;`:}R;c;VnqOXst!Z#d%l&p&r&s&u,n,s2S2VQ&j!VR,c&gtmOXst!U!V!Z#d%l&g&p&r&s&u,n,s2S2VR,j&mT%km,jR1c,SR,b&eQ&T|R+z&UR+p&OT&n!W&qT&o!W&qT2U,s2V",
			nodeNames:
				'⚠ ArithOp ArithOp ?. JSXStartTag LineComment BlockComment Script Hashbang ExportDeclaration export Star as VariableName String Escape from ; default FunctionDeclaration async function VariableDefinition > < TypeParamList const TypeDefinition extends ThisType this LiteralType ArithOp Number BooleanLiteral TemplateType InterpolationEnd Interpolation InterpolationStart NullType null VoidType void TypeofType typeof MemberExpression . PropertyName [ TemplateString Escape Interpolation super RegExp ] ArrayExpression Spread , } { ObjectExpression Property async get set PropertyDefinition Block : NewTarget new NewExpression ) ( ArgList UnaryExpression delete LogicOp BitOp YieldExpression yield AwaitExpression await ParenthesizedExpression ClassExpression class ClassBody MethodDeclaration Decorator @ MemberExpression PrivatePropertyName CallExpression TypeArgList CompareOp < declare Privacy static abstract override PrivatePropertyDefinition PropertyDeclaration readonly accessor Optional TypeAnnotation Equals StaticBlock FunctionExpression ArrowFunction ParamList ParamList ArrayPattern ObjectPattern PatternProperty Privacy readonly Arrow MemberExpression BinaryExpression ArithOp ArithOp ArithOp ArithOp BitOp CompareOp instanceof satisfies in CompareOp BitOp BitOp BitOp LogicOp LogicOp ConditionalExpression LogicOp LogicOp AssignmentExpression UpdateOp PostfixExpression CallExpression InstantiationExpression TaggedTemplateExpression DynamicImport import ImportMeta JSXElement JSXSelfCloseEndTag JSXSelfClosingTag JSXIdentifier JSXBuiltin JSXIdentifier JSXNamespacedName JSXMemberExpression JSXSpreadAttribute JSXAttribute JSXAttributeValue JSXEscape JSXEndTag JSXOpenTag JSXFragmentTag JSXText JSXEscape JSXStartCloseTag JSXCloseTag PrefixCast < ArrowFunction TypeParamList SequenceExpression InstantiationExpression KeyofType keyof UniqueType unique ImportType InferredType infer TypeName ParenthesizedType FunctionSignature ParamList NewSignature IndexedType TupleType Label ArrayType ReadonlyType ObjectType MethodType PropertyType IndexSignature PropertyDefinition CallSignature TypePredicate asserts is NewSignature new UnionType LogicOp IntersectionType LogicOp ConditionalType ParameterizedType ClassDeclaration abstract implements type VariableDeclaration let var using TypeAliasDeclaration InterfaceDeclaration interface EnumDeclaration enum EnumBody NamespaceDeclaration namespace module AmbientDeclaration declare GlobalDeclaration global ClassDeclaration ClassBody AmbientFunctionDeclaration ExportGroup VariableName VariableName ImportDeclaration ImportGroup ForStatement for ForSpec ForInSpec ForOfSpec of WhileStatement while WithStatement with DoStatement do IfStatement if else SwitchStatement switch SwitchBody CaseLabel case DefaultLabel TryStatement try CatchClause catch FinallyClause finally ReturnStatement return ThrowStatement throw BreakStatement break ContinueStatement continue DebuggerStatement debugger LabeledStatement ExpressionStatement SingleExpression SingleClassItem',
			maxTerm: 378,
			context: Ud,
			nodeProps: [
				['isolate', -8, 5, 6, 14, 35, 37, 49, 51, 53, ''],
				[
					'group',
					-26,
					9,
					17,
					19,
					66,
					206,
					210,
					214,
					215,
					217,
					220,
					223,
					233,
					235,
					241,
					243,
					245,
					247,
					250,
					256,
					262,
					264,
					266,
					268,
					270,
					272,
					273,
					'Statement',
					-34,
					13,
					14,
					30,
					33,
					34,
					40,
					49,
					52,
					53,
					55,
					60,
					68,
					70,
					74,
					78,
					80,
					82,
					83,
					108,
					109,
					118,
					119,
					135,
					138,
					140,
					141,
					142,
					143,
					144,
					146,
					147,
					166,
					168,
					170,
					'Expression',
					-23,
					29,
					31,
					35,
					39,
					41,
					43,
					172,
					174,
					176,
					177,
					179,
					180,
					181,
					183,
					184,
					185,
					187,
					188,
					189,
					200,
					202,
					204,
					205,
					'Type',
					-3,
					86,
					101,
					107,
					'ClassItem',
				],
				[
					'openedBy',
					23,
					'<',
					36,
					'InterpolationStart',
					54,
					'[',
					58,
					'{',
					71,
					'(',
					159,
					'JSXStartCloseTag',
				],
				[
					'closedBy',
					-2,
					24,
					167,
					'>',
					38,
					'InterpolationEnd',
					48,
					']',
					59,
					'}',
					72,
					')',
					164,
					'JSXEndTag',
				],
			],
			propSources: [Jd],
			skippedNodes: [0, 5, 6, 276],
			repeatNodeCount: 37,
			tokenData:
				"$Fq07[R!bOX%ZXY+gYZ-yZ[+g[]%Z]^.c^p%Zpq+gqr/mrs3cst:_tuEruvJSvwLkwx! Yxy!'iyz!(sz{!)}{|!,q|}!.O}!O!,q!O!P!/Y!P!Q!9j!Q!R#:O!R![#<_![!]#I_!]!^#Jk!^!_#Ku!_!`$![!`!a$$v!a!b$*T!b!c$,r!c!}Er!}#O$-|#O#P$/W#P#Q$4o#Q#R$5y#R#SEr#S#T$7W#T#o$8b#o#p$<r#p#q$=h#q#r$>x#r#s$@U#s$f%Z$f$g+g$g#BYEr#BY#BZ$A`#BZ$ISEr$IS$I_$A`$I_$I|Er$I|$I}$Dk$I}$JO$Dk$JO$JTEr$JT$JU$A`$JU$KVEr$KV$KW$A`$KW&FUEr&FU&FV$A`&FV;'SEr;'S;=`I|<%l?HTEr?HT?HU$A`?HUOEr(n%d_$h&j(Up(X!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z&j&hT$h&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c&j&zP;=`<%l&c'|'U]$h&j(X!bOY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}!b(SU(X!bOY'}Zw'}x#O'}#P;'S'};'S;=`(f<%lO'}!b(iP;=`<%l'}'|(oP;=`<%l&}'[(y]$h&j(UpOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(rp)wU(UpOY)rZr)rs#O)r#P;'S)r;'S;=`*Z<%lO)rp*^P;=`<%l)r'[*dP;=`<%l(r#S*nX(Up(X!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g#S+^P;=`<%l*g(n+dP;=`<%l%Z07[+rq$h&j(Up(X!b'z0/lOX%ZXY+gYZ&cZ[+g[p%Zpq+gqr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p$f%Z$f$g+g$g#BY%Z#BY#BZ+g#BZ$IS%Z$IS$I_+g$I_$JT%Z$JT$JU+g$JU$KV%Z$KV$KW+g$KW&FU%Z&FU&FV+g&FV;'S%Z;'S;=`+a<%l?HT%Z?HT?HU+g?HUO%Z07[.ST(V#S$h&j'{0/lO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c07[.n_$h&j(Up(X!b'{0/lOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z)3p/x`$h&j!n),Q(Up(X!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`0z!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW1V`#u(Ch$h&j(Up(X!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`2X!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW2d_#u(Ch$h&j(Up(X!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'At3l_(T':f$h&j(X!bOY4kYZ5qZr4krs7nsw4kwx5qx!^4k!^!_8p!_#O4k#O#P5q#P#o4k#o#p8p#p;'S4k;'S;=`:X<%lO4k(^4r_$h&j(X!bOY4kYZ5qZr4krs7nsw4kwx5qx!^4k!^!_8p!_#O4k#O#P5q#P#o4k#o#p8p#p;'S4k;'S;=`:X<%lO4k&z5vX$h&jOr5qrs6cs!^5q!^!_6y!_#o5q#o#p6y#p;'S5q;'S;=`7h<%lO5q&z6jT$c`$h&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c`6|TOr6yrs7]s;'S6y;'S;=`7b<%lO6y`7bO$c``7eP;=`<%l6y&z7kP;=`<%l5q(^7w]$c`$h&j(X!bOY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}!r8uZ(X!bOY8pYZ6yZr8prs9hsw8pwx6yx#O8p#O#P6y#P;'S8p;'S;=`:R<%lO8p!r9oU$c`(X!bOY'}Zw'}x#O'}#P;'S'};'S;=`(f<%lO'}!r:UP;=`<%l8p(^:[P;=`<%l4k%9[:hh$h&j(Up(X!bOY%ZYZ&cZq%Zqr<Srs&}st%ZtuCruw%Zwx(rx!^%Z!^!_*g!_!c%Z!c!}Cr!}#O%Z#O#P&c#P#R%Z#R#SCr#S#T%Z#T#oCr#o#p*g#p$g%Z$g;'SCr;'S;=`El<%lOCr(r<__WS$h&j(Up(X!bOY<SYZ&cZr<Srs=^sw<Swx@nx!^<S!^!_Bm!_#O<S#O#P>`#P#o<S#o#pBm#p;'S<S;'S;=`Cl<%lO<S(Q=g]WS$h&j(X!bOY=^YZ&cZw=^wx>`x!^=^!^!_?q!_#O=^#O#P>`#P#o=^#o#p?q#p;'S=^;'S;=`@h<%lO=^&n>gXWS$h&jOY>`YZ&cZ!^>`!^!_?S!_#o>`#o#p?S#p;'S>`;'S;=`?k<%lO>`S?XSWSOY?SZ;'S?S;'S;=`?e<%lO?SS?hP;=`<%l?S&n?nP;=`<%l>`!f?xWWS(X!bOY?qZw?qwx?Sx#O?q#O#P?S#P;'S?q;'S;=`@b<%lO?q!f@eP;=`<%l?q(Q@kP;=`<%l=^'`@w]WS$h&j(UpOY@nYZ&cZr@nrs>`s!^@n!^!_Ap!_#O@n#O#P>`#P#o@n#o#pAp#p;'S@n;'S;=`Bg<%lO@ntAwWWS(UpOYApZrAprs?Ss#OAp#O#P?S#P;'SAp;'S;=`Ba<%lOAptBdP;=`<%lAp'`BjP;=`<%l@n#WBvYWS(Up(X!bOYBmZrBmrs?qswBmwxApx#OBm#O#P?S#P;'SBm;'S;=`Cf<%lOBm#WCiP;=`<%lBm(rCoP;=`<%l<S%9[C}i$h&j(m%1l(Up(X!bOY%ZYZ&cZr%Zrs&}st%ZtuCruw%Zwx(rx!Q%Z!Q![Cr![!^%Z!^!_*g!_!c%Z!c!}Cr!}#O%Z#O#P&c#P#R%Z#R#SCr#S#T%Z#T#oCr#o#p*g#p$g%Z$g;'SCr;'S;=`El<%lOCr%9[EoP;=`<%lCr07[FRk$h&j(Up(X!b$[#t(R,2j(c$I[OY%ZYZ&cZr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$g%Z$g;'SEr;'S;=`I|<%lOEr+dHRk$h&j(Up(X!b$[#tOY%ZYZ&cZr%Zrs&}st%ZtuGvuw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Gv![!^%Z!^!_*g!_!c%Z!c!}Gv!}#O%Z#O#P&c#P#R%Z#R#SGv#S#T%Z#T#oGv#o#p*g#p$g%Z$g;'SGv;'S;=`Iv<%lOGv+dIyP;=`<%lGv07[JPP;=`<%lEr(KWJ_`$h&j(Up(X!b#n(ChOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KWKl_$h&j$P(Ch(Up(X!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z,#xLva(x+JY$h&j(Up(X!bOY%ZYZ&cZr%Zrs&}sv%ZvwM{wx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KWNW`$h&j#y(Ch(Up(X!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'At! c_(W';W$h&j(UpOY!!bYZ!#hZr!!brs!#hsw!!bwx!$xx!^!!b!^!_!%z!_#O!!b#O#P!#h#P#o!!b#o#p!%z#p;'S!!b;'S;=`!'c<%lO!!b'l!!i_$h&j(UpOY!!bYZ!#hZr!!brs!#hsw!!bwx!$xx!^!!b!^!_!%z!_#O!!b#O#P!#h#P#o!!b#o#p!%z#p;'S!!b;'S;=`!'c<%lO!!b&z!#mX$h&jOw!#hwx6cx!^!#h!^!_!$Y!_#o!#h#o#p!$Y#p;'S!#h;'S;=`!$r<%lO!#h`!$]TOw!$Ywx7]x;'S!$Y;'S;=`!$l<%lO!$Y`!$oP;=`<%l!$Y&z!$uP;=`<%l!#h'l!%R]$c`$h&j(UpOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(r!Q!&PZ(UpOY!%zYZ!$YZr!%zrs!$Ysw!%zwx!&rx#O!%z#O#P!$Y#P;'S!%z;'S;=`!']<%lO!%z!Q!&yU$c`(UpOY)rZr)rs#O)r#P;'S)r;'S;=`*Z<%lO)r!Q!'`P;=`<%l!%z'l!'fP;=`<%l!!b/5|!'t_!j/.^$h&j(Up(X!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#&U!)O_!i!Lf$h&j(Up(X!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z-!n!*[b$h&j(Up(X!b(S%&f#o(ChOY%ZYZ&cZr%Zrs&}sw%Zwx(rxz%Zz{!+d{!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW!+o`$h&j(Up(X!b#l(ChOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z+;x!,|`$h&j(Up(X!bp+4YOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z,$U!.Z_!Z+Jf$h&j(Up(X!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[!/ec$h&j(Up(X!b!O.2^OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!0p!P!Q%Z!Q![!3Y![!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#%|!0ya$h&j(Up(X!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!2O!P!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#%|!2Z_!Y!L^$h&j(Up(X!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!3eg$h&j(Up(X!bq'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!3Y![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S!3Y#S#X%Z#X#Y!4|#Y#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!5Vg$h&j(Up(X!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx{%Z{|!6n|}%Z}!O!6n!O!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!6wc$h&j(Up(X!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!8_c$h&j(Up(X!bq'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[!9uf$h&j(Up(X!b#m(ChOY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcxz!;Zz{#-}{!P!;Z!P!Q#/d!Q!^!;Z!^!_#(i!_!`#7S!`!a#8i!a!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z?O!;fb$h&j(Up(X!b!V7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z>^!<w`$h&j(X!b!V7`OY!<nYZ&cZw!<nwx!=yx!P!<n!P!Q!Eq!Q!^!<n!^!_!Gr!_!}!<n!}#O!KS#O#P!Dy#P#o!<n#o#p!Gr#p;'S!<n;'S;=`!L]<%lO!<n<z!>Q^$h&j!V7`OY!=yYZ&cZ!P!=y!P!Q!>|!Q!^!=y!^!_!@c!_!}!=y!}#O!CW#O#P!Dy#P#o!=y#o#p!@c#p;'S!=y;'S;=`!Ek<%lO!=y<z!?Td$h&j!V7`O!^&c!_#W&c#W#X!>|#X#Z&c#Z#[!>|#[#]&c#]#^!>|#^#a&c#a#b!>|#b#g&c#g#h!>|#h#i&c#i#j!>|#j#k!>|#k#m&c#m#n!>|#n#o&c#p;'S&c;'S;=`&w<%lO&c7`!@hX!V7`OY!@cZ!P!@c!P!Q!AT!Q!}!@c!}#O!Ar#O#P!Bq#P;'S!@c;'S;=`!CQ<%lO!@c7`!AYW!V7`#W#X!AT#Z#[!AT#]#^!AT#a#b!AT#g#h!AT#i#j!AT#j#k!AT#m#n!AT7`!AuVOY!ArZ#O!Ar#O#P!B[#P#Q!@c#Q;'S!Ar;'S;=`!Bk<%lO!Ar7`!B_SOY!ArZ;'S!Ar;'S;=`!Bk<%lO!Ar7`!BnP;=`<%l!Ar7`!BtSOY!@cZ;'S!@c;'S;=`!CQ<%lO!@c7`!CTP;=`<%l!@c<z!C][$h&jOY!CWYZ&cZ!^!CW!^!_!Ar!_#O!CW#O#P!DR#P#Q!=y#Q#o!CW#o#p!Ar#p;'S!CW;'S;=`!Ds<%lO!CW<z!DWX$h&jOY!CWYZ&cZ!^!CW!^!_!Ar!_#o!CW#o#p!Ar#p;'S!CW;'S;=`!Ds<%lO!CW<z!DvP;=`<%l!CW<z!EOX$h&jOY!=yYZ&cZ!^!=y!^!_!@c!_#o!=y#o#p!@c#p;'S!=y;'S;=`!Ek<%lO!=y<z!EnP;=`<%l!=y>^!Ezl$h&j(X!b!V7`OY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#W&}#W#X!Eq#X#Z&}#Z#[!Eq#[#]&}#]#^!Eq#^#a&}#a#b!Eq#b#g&}#g#h!Eq#h#i&}#i#j!Eq#j#k!Eq#k#m&}#m#n!Eq#n#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}8r!GyZ(X!b!V7`OY!GrZw!Grwx!@cx!P!Gr!P!Q!Hl!Q!}!Gr!}#O!JU#O#P!Bq#P;'S!Gr;'S;=`!J|<%lO!Gr8r!Hse(X!b!V7`OY'}Zw'}x#O'}#P#W'}#W#X!Hl#X#Z'}#Z#[!Hl#[#]'}#]#^!Hl#^#a'}#a#b!Hl#b#g'}#g#h!Hl#h#i'}#i#j!Hl#j#k!Hl#k#m'}#m#n!Hl#n;'S'};'S;=`(f<%lO'}8r!JZX(X!bOY!JUZw!JUwx!Arx#O!JU#O#P!B[#P#Q!Gr#Q;'S!JU;'S;=`!Jv<%lO!JU8r!JyP;=`<%l!JU8r!KPP;=`<%l!Gr>^!KZ^$h&j(X!bOY!KSYZ&cZw!KSwx!CWx!^!KS!^!_!JU!_#O!KS#O#P!DR#P#Q!<n#Q#o!KS#o#p!JU#p;'S!KS;'S;=`!LV<%lO!KS>^!LYP;=`<%l!KS>^!L`P;=`<%l!<n=l!Ll`$h&j(Up!V7`OY!LcYZ&cZr!Lcrs!=ys!P!Lc!P!Q!Mn!Q!^!Lc!^!_# o!_!}!Lc!}#O#%P#O#P!Dy#P#o!Lc#o#p# o#p;'S!Lc;'S;=`#&Y<%lO!Lc=l!Mwl$h&j(Up!V7`OY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#W(r#W#X!Mn#X#Z(r#Z#[!Mn#[#](r#]#^!Mn#^#a(r#a#b!Mn#b#g(r#g#h!Mn#h#i(r#i#j!Mn#j#k!Mn#k#m(r#m#n!Mn#n#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(r8Q# vZ(Up!V7`OY# oZr# ors!@cs!P# o!P!Q#!i!Q!}# o!}#O#$R#O#P!Bq#P;'S# o;'S;=`#$y<%lO# o8Q#!pe(Up!V7`OY)rZr)rs#O)r#P#W)r#W#X#!i#X#Z)r#Z#[#!i#[#])r#]#^#!i#^#a)r#a#b#!i#b#g)r#g#h#!i#h#i)r#i#j#!i#j#k#!i#k#m)r#m#n#!i#n;'S)r;'S;=`*Z<%lO)r8Q#$WX(UpOY#$RZr#$Rrs!Ars#O#$R#O#P!B[#P#Q# o#Q;'S#$R;'S;=`#$s<%lO#$R8Q#$vP;=`<%l#$R8Q#$|P;=`<%l# o=l#%W^$h&j(UpOY#%PYZ&cZr#%Prs!CWs!^#%P!^!_#$R!_#O#%P#O#P!DR#P#Q!Lc#Q#o#%P#o#p#$R#p;'S#%P;'S;=`#&S<%lO#%P=l#&VP;=`<%l#%P=l#&]P;=`<%l!Lc?O#&kn$h&j(Up(X!b!V7`OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#W%Z#W#X#&`#X#Z%Z#Z#[#&`#[#]%Z#]#^#&`#^#a%Z#a#b#&`#b#g%Z#g#h#&`#h#i%Z#i#j#&`#j#k#&`#k#m%Z#m#n#&`#n#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z9d#(r](Up(X!b!V7`OY#(iZr#(irs!Grsw#(iwx# ox!P#(i!P!Q#)k!Q!}#(i!}#O#+`#O#P!Bq#P;'S#(i;'S;=`#,`<%lO#(i9d#)th(Up(X!b!V7`OY*gZr*grs'}sw*gwx)rx#O*g#P#W*g#W#X#)k#X#Z*g#Z#[#)k#[#]*g#]#^#)k#^#a*g#a#b#)k#b#g*g#g#h#)k#h#i*g#i#j#)k#j#k#)k#k#m*g#m#n#)k#n;'S*g;'S;=`+Z<%lO*g9d#+gZ(Up(X!bOY#+`Zr#+`rs!JUsw#+`wx#$Rx#O#+`#O#P!B[#P#Q#(i#Q;'S#+`;'S;=`#,Y<%lO#+`9d#,]P;=`<%l#+`9d#,cP;=`<%l#(i?O#,o`$h&j(Up(X!bOY#,fYZ&cZr#,frs!KSsw#,fwx#%Px!^#,f!^!_#+`!_#O#,f#O#P!DR#P#Q!;Z#Q#o#,f#o#p#+`#p;'S#,f;'S;=`#-q<%lO#,f?O#-tP;=`<%l#,f?O#-zP;=`<%l!;Z07[#.[b$h&j(Up(X!b'|0/l!V7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z07[#/o_$h&j(Up(X!bT0/lOY#/dYZ&cZr#/drs#0nsw#/dwx#4Ox!^#/d!^!_#5}!_#O#/d#O#P#1p#P#o#/d#o#p#5}#p;'S#/d;'S;=`#6|<%lO#/d06j#0w]$h&j(X!bT0/lOY#0nYZ&cZw#0nwx#1px!^#0n!^!_#3R!_#O#0n#O#P#1p#P#o#0n#o#p#3R#p;'S#0n;'S;=`#3x<%lO#0n05W#1wX$h&jT0/lOY#1pYZ&cZ!^#1p!^!_#2d!_#o#1p#o#p#2d#p;'S#1p;'S;=`#2{<%lO#1p0/l#2iST0/lOY#2dZ;'S#2d;'S;=`#2u<%lO#2d0/l#2xP;=`<%l#2d05W#3OP;=`<%l#1p01O#3YW(X!bT0/lOY#3RZw#3Rwx#2dx#O#3R#O#P#2d#P;'S#3R;'S;=`#3r<%lO#3R01O#3uP;=`<%l#3R06j#3{P;=`<%l#0n05x#4X]$h&j(UpT0/lOY#4OYZ&cZr#4Ors#1ps!^#4O!^!_#5Q!_#O#4O#O#P#1p#P#o#4O#o#p#5Q#p;'S#4O;'S;=`#5w<%lO#4O00^#5XW(UpT0/lOY#5QZr#5Qrs#2ds#O#5Q#O#P#2d#P;'S#5Q;'S;=`#5q<%lO#5Q00^#5tP;=`<%l#5Q05x#5zP;=`<%l#4O01p#6WY(Up(X!bT0/lOY#5}Zr#5}rs#3Rsw#5}wx#5Qx#O#5}#O#P#2d#P;'S#5};'S;=`#6v<%lO#5}01p#6yP;=`<%l#5}07[#7PP;=`<%l#/d)3h#7ab$h&j$P(Ch(Up(X!b!V7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;ZAt#8vb$Y#t$h&j(Up(X!b!V7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z'Ad#:Zp$h&j(Up(X!bq'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!3Y!P!Q%Z!Q![#<_![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S#<_#S#U%Z#U#V#?i#V#X%Z#X#Y!4|#Y#b%Z#b#c#>_#c#d#Bq#d#l%Z#l#m#Es#m#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#<jk$h&j(Up(X!bq'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!3Y!P!Q%Z!Q![#<_![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S#<_#S#X%Z#X#Y!4|#Y#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#>j_$h&j(Up(X!bq'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#?rd$h&j(Up(X!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!R#AQ!R!S#AQ!S!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#AQ#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#A]f$h&j(Up(X!bq'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!R#AQ!R!S#AQ!S!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#AQ#S#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#Bzc$h&j(Up(X!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!Y#DV!Y!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#DV#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#Dbe$h&j(Up(X!bq'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!Y#DV!Y!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#DV#S#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#E|g$h&j(Up(X!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![#Ge![!^%Z!^!_*g!_!c%Z!c!i#Ge!i#O%Z#O#P&c#P#R%Z#R#S#Ge#S#T%Z#T#Z#Ge#Z#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#Gpi$h&j(Up(X!bq'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![#Ge![!^%Z!^!_*g!_!c%Z!c!i#Ge!i#O%Z#O#P&c#P#R%Z#R#S#Ge#S#T%Z#T#Z#Ge#Z#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z*)x#Il_!e$b$h&j#})Lv(Up(X!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z)[#Jv_al$h&j(Up(X!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z04f#LS^h#)`#P-<U(Up(X!b$m7`OY*gZr*grs'}sw*gwx)rx!P*g!P!Q#MO!Q!^*g!^!_#Mt!_!`$ f!`#O*g#P;'S*g;'S;=`+Z<%lO*g(n#MXX$j&j(Up(X!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g(El#M}Z#p(Ch(Up(X!bOY*gZr*grs'}sw*gwx)rx!_*g!_!`#Np!`#O*g#P;'S*g;'S;=`+Z<%lO*g(El#NyX$P(Ch(Up(X!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g(El$ oX#q(Ch(Up(X!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g*)x$!ga#^*!Y$h&j(Up(X!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`0z!`!a$#l!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(K[$#w_#i(Cl$h&j(Up(X!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z*)x$%Vag!*r#q(Ch$e#|$h&j(Up(X!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`$&[!`!a$'f!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$&g_#q(Ch$h&j(Up(X!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$'qa#p(Ch$h&j(Up(X!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`!a$(v!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$)R`#p(Ch$h&j(Up(X!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(Kd$*`a(p(Ct$h&j(Up(X!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!a%Z!a!b$+e!b#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$+p`$h&j#z(Ch(Up(X!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#`$,}_!z$Ip$h&j(Up(X!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z04f$.X_!Q0,v$h&j(Up(X!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(n$/]Z$h&jO!^$0O!^!_$0f!_#i$0O#i#j$0k#j#l$0O#l#m$2^#m#o$0O#o#p$0f#p;'S$0O;'S;=`$4i<%lO$0O(n$0VT_#S$h&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c#S$0kO_#S(n$0p[$h&jO!Q&c!Q![$1f![!^&c!_!c&c!c!i$1f!i#T&c#T#Z$1f#Z#o&c#o#p$3|#p;'S&c;'S;=`&w<%lO&c(n$1kZ$h&jO!Q&c!Q![$2^![!^&c!_!c&c!c!i$2^!i#T&c#T#Z$2^#Z#o&c#p;'S&c;'S;=`&w<%lO&c(n$2cZ$h&jO!Q&c!Q![$3U![!^&c!_!c&c!c!i$3U!i#T&c#T#Z$3U#Z#o&c#p;'S&c;'S;=`&w<%lO&c(n$3ZZ$h&jO!Q&c!Q![$0O![!^&c!_!c&c!c!i$0O!i#T&c#T#Z$0O#Z#o&c#p;'S&c;'S;=`&w<%lO&c#S$4PR!Q![$4Y!c!i$4Y#T#Z$4Y#S$4]S!Q![$4Y!c!i$4Y#T#Z$4Y#q#r$0f(n$4lP;=`<%l$0O#1[$4z_!W#)l$h&j(Up(X!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$6U`#w(Ch$h&j(Up(X!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z+;p$7c_$h&j(Up(X!b(_+4QOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[$8qk$h&j(Up(X!b(R,2j$^#t(c$I[OY%ZYZ&cZr%Zrs&}st%Ztu$8buw%Zwx(rx}%Z}!O$:f!O!Q%Z!Q![$8b![!^%Z!^!_*g!_!c%Z!c!}$8b!}#O%Z#O#P&c#P#R%Z#R#S$8b#S#T%Z#T#o$8b#o#p*g#p$g%Z$g;'S$8b;'S;=`$<l<%lO$8b+d$:qk$h&j(Up(X!b$^#tOY%ZYZ&cZr%Zrs&}st%Ztu$:fuw%Zwx(rx}%Z}!O$:f!O!Q%Z!Q![$:f![!^%Z!^!_*g!_!c%Z!c!}$:f!}#O%Z#O#P&c#P#R%Z#R#S$:f#S#T%Z#T#o$:f#o#p*g#p$g%Z$g;'S$:f;'S;=`$<f<%lO$:f+d$<iP;=`<%l$:f07[$<oP;=`<%l$8b#Jf$<{X!]#Hb(Up(X!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g,#x$=sa(w+JY$h&j(Up(X!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p#q$+e#q;'S%Z;'S;=`+a<%lO%Z)>v$?V_![(CdtBr$h&j(Up(X!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z?O$@a_!o7`$h&j(Up(X!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[$Aq|$h&j(Up(X!b'z0/l$[#t(R,2j(c$I[OX%ZXY+gYZ&cZ[+g[p%Zpq+gqr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$f%Z$f$g+g$g#BYEr#BY#BZ$A`#BZ$ISEr$IS$I_$A`$I_$JTEr$JT$JU$A`$JU$KVEr$KV$KW$A`$KW&FUEr&FU&FV$A`&FV;'SEr;'S;=`I|<%l?HTEr?HT?HU$A`?HUOEr07[$D|k$h&j(Up(X!b'{0/l$[#t(R,2j(c$I[OY%ZYZ&cZr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$g%Z$g;'SEr;'S;=`I|<%lOEr",
			tokenizers: [
				Gd,
				Id,
				Fd,
				Kd,
				2,
				3,
				4,
				5,
				6,
				7,
				8,
				9,
				10,
				11,
				12,
				13,
				14,
				Nd,
				new De(
					"$S~RRtu[#O#Pg#S#T#|~_P#o#pb~gOv~~jVO#i!P#i#j!U#j#l!P#l#m!q#m;'S!P;'S;=`#v<%lO!P~!UO!S~~!XS!Q![!e!c!i!e#T#Z!e#o#p#Z~!hR!Q![!q!c!i!q#T#Z!q~!tR!Q![!}!c!i!}#T#Z!}~#QR!Q![!P!c!i!P#T#Z!P~#^R!Q![#g!c!i#g#T#Z#g~#jS!Q![#g!c!i#g#T#Z#g#q#r!P~#yP;=`<%l!P~$RO(a~~",
					141,
					338
				),
				new De('j~RQYZXz{^~^O(O~~aP!P!Qd~iO(P~~', 25, 321),
			],
			topRules: {
				Script: [0, 7],
				SingleExpression: [1, 274],
				SingleClassItem: [2, 275],
			},
			dialects: { jsx: 0, ts: 15091 },
			dynamicPrecedences: { 78: 1, 80: 1, 92: 1, 168: 1, 198: 1 },
			specialized: [
				{ term: 325, get: (t) => tf[t] || -1 },
				{ term: 341, get: (t) => ef[t] || -1 },
				{ term: 93, get: (t) => nf[t] || -1 },
			],
			tokenPrec: 15116,
		});
	class sf {
		constructor(t, e, i, n) {
			(this.state = t),
				(this.pos = e),
				(this.explicit = i),
				(this.view = n),
				(this.abortListeners = []),
				(this.abortOnDocChange = !1);
		}
		tokenBefore(t) {
			let e = ou(this.state).resolveInner(this.pos, -1);
			for (; e && t.indexOf(e.name) < 0; ) e = e.parent;
			return e
				? {
						from: e.from,
						to: this.pos,
						text: this.state.sliceDoc(e.from, this.pos),
						type: e.type,
					}
				: null;
		}
		matchBefore(t) {
			let e = this.state.doc.lineAt(this.pos),
				i = Math.max(e.from, this.pos - 250),
				n = e.text.slice(i - e.from, this.pos - e.from),
				r = n.search(cf(t, !1));
			return r < 0
				? null
				: { from: i + r, to: this.pos, text: n.slice(r) };
		}
		get aborted() {
			return null == this.abortListeners;
		}
		addEventListener(t, e, i) {
			'abort' == t &&
				this.abortListeners &&
				(this.abortListeners.push(e),
				i && i.onDocChange && (this.abortOnDocChange = !0));
		}
	}
	function of(t) {
		let e = Object.keys(t).join(''),
			i = /\w/.test(e);
		return (
			i && (e = e.replace(/\w/g, '')),
			`[${i ? '\\w' : ''}${e.replace(/[^\w\s]/g, '\\$&')}]`
		);
	}
	function af(t) {
		let e = t.map((t) => ('string' == typeof t ? { label: t } : t)),
			[i, n] = e.every((t) => /^\w+$/.test(t.label))
				? [/\w*$/, /\w+$/]
				: (function (t) {
						let e = Object.create(null),
							i = Object.create(null);
						for (let { label: n } of t) {
							e[n[0]] = !0;
							for (let t = 1; t < n.length; t++) i[n[t]] = !0;
						}
						let n = of(e) + of(i) + '*$';
						return [new RegExp('^' + n), new RegExp(n)];
					})(e);
		return (t) => {
			let r = t.matchBefore(n);
			return r || t.explicit
				? { from: r ? r.from : t.pos, options: e, validFor: i }
				: null;
		};
	}
	class lf {
		constructor(t, e, i, n) {
			(this.completion = t),
				(this.source = e),
				(this.match = i),
				(this.score = n);
		}
	}
	function hf(t) {
		return t.selection.main.from;
	}
	function cf(t, e) {
		var i;
		let { source: n } = t,
			r = e && '^' != n[0],
			s = '$' != n[n.length - 1];
		return r || s
			? new RegExp(
					`${r ? '^' : ''}(?:${n})${s ? '$' : ''}`,
					null !== (i = t.flags) && void 0 !== i
						? i
						: t.ignoreCase
							? 'i'
							: ''
				)
			: t;
	}
	const uf = Sr.define(),
		df = new WeakMap();
	function ff(t) {
		if (!Array.isArray(t)) return t;
		let e = df.get(t);
		return e || df.set(t, (e = af(t))), e;
	}
	const Of = kr.define(),
		pf = kr.define();
	class mf {
		constructor(t) {
			(this.pattern = t),
				(this.chars = []),
				(this.folded = []),
				(this.any = []),
				(this.precise = []),
				(this.byWord = []),
				(this.score = 0),
				(this.matched = []);
			for (let e = 0; e < t.length; ) {
				let i = Vn(t, e),
					n = jn(i);
				this.chars.push(i);
				let r = t.slice(e, e + n),
					s = r.toUpperCase();
				this.folded.push(Vn(s == r ? r.toLowerCase() : s, 0)), (e += n);
			}
			this.astral = t.length != this.chars.length;
		}
		ret(t, e) {
			return (this.score = t), (this.matched = e), this;
		}
		match(t) {
			if (0 == this.pattern.length) return this.ret(-100, []);
			if (t.length < this.pattern.length) return null;
			let { chars: e, folded: i, any: n, precise: r, byWord: s } = this;
			if (1 == e.length) {
				let n = Vn(t, 0),
					r = jn(n),
					s = r == t.length ? 0 : -100;
				if (n == e[0]);
				else {
					if (n != i[0]) return null;
					s += -200;
				}
				return this.ret(s, [0, r]);
			}
			let o = t.indexOf(this.pattern);
			if (0 == o)
				return this.ret(t.length == this.pattern.length ? 0 : -100, [
					0,
					this.pattern.length,
				]);
			let a = e.length,
				l = 0;
			if (o < 0) {
				for (let r = 0, s = Math.min(t.length, 200); r < s && l < a; ) {
					let s = Vn(t, r);
					(s != e[l] && s != i[l]) || (n[l++] = r), (r += jn(s));
				}
				if (l < a) return null;
			}
			let h = 0,
				c = 0,
				u = !1,
				d = 0,
				f = -1,
				O = -1,
				p = /[a-z]/.test(t),
				m = !0;
			for (
				let n = 0, l = Math.min(t.length, 200), g = 0;
				n < l && c < a;

			) {
				let l = Vn(t, n);
				o < 0 &&
					(h < a && l == e[h] && (r[h++] = n),
					d < a &&
						(l == e[d] || l == i[d]
							? (0 == d && (f = n), (O = n + 1), d++)
							: (d = 0)));
				let b,
					y =
						l < 255
							? (l >= 48 && l <= 57) || (l >= 97 && l <= 122)
								? 2
								: l >= 65 && l <= 90
									? 1
									: 0
							: (b = qn(l)) != b.toLowerCase()
								? 1
								: b != b.toUpperCase()
									? 2
									: 0;
				(!n || (1 == y && p) || (0 == g && 0 != y)) &&
					(e[c] == l || (i[c] == l && (u = !0))
						? (s[c++] = n)
						: s.length && (m = !1)),
					(g = y),
					(n += jn(l));
			}
			return c == a && 0 == s[0] && m
				? this.result((u ? -200 : 0) - 100, s, t)
				: d == a && 0 == f
					? this.ret(-200 - t.length + (O == t.length ? 0 : -100), [
							0,
							O,
						])
					: o > -1
						? this.ret(-700 - t.length, [
								o,
								o + this.pattern.length,
							])
						: d == a
							? this.ret(-900 - t.length, [f, O])
							: c == a
								? this.result(
										(u ? -200 : 0) -
											100 -
											700 +
											(m ? 0 : -1100),
										s,
										t
									)
								: 2 == e.length
									? null
									: this.result(
											(n[0] ? -700 : 0) - 200 - 1100,
											n,
											t
										);
		}
		result(t, e, i) {
			let n = [],
				r = 0;
			for (let t of e) {
				let e = t + (this.astral ? jn(Vn(i, t)) : 1);
				r && n[r - 1] == t
					? (n[r - 1] = e)
					: ((n[r++] = t), (n[r++] = e));
			}
			return this.ret(t - i.length, n);
		}
	}
	class gf {
		constructor(t) {
			(this.pattern = t),
				(this.matched = []),
				(this.score = 0),
				(this.folded = t.toLowerCase());
		}
		match(t) {
			if (t.length < this.pattern.length) return null;
			let e = t.slice(0, this.pattern.length),
				i =
					e == this.pattern
						? 0
						: e.toLowerCase() == this.folded
							? -200
							: null;
			return null == i
				? null
				: ((this.matched = [0, e.length]),
					(this.score =
						i + (t.length == this.pattern.length ? 0 : -100)),
					this);
		}
	}
	const bf = Jn.define({
		combine: (t) =>
			qr(
				t,
				{
					activateOnTyping: !0,
					activateOnCompletion: () => !1,
					activateOnTypingDelay: 100,
					selectOnOpen: !0,
					override: null,
					closeOnBlur: !0,
					maxRenderedOptions: 100,
					defaultKeymap: !0,
					tooltipClass: () => '',
					optionClass: () => '',
					aboveCursor: !1,
					icons: !0,
					addToOptions: [],
					positionInfo: vf,
					filterStrict: !1,
					compareCompletions: (t, e) =>
						t.label.localeCompare(e.label),
					interactionDelay: 75,
					updateSyncTime: 100,
				},
				{
					defaultKeymap: (t, e) => t && e,
					closeOnBlur: (t, e) => t && e,
					icons: (t, e) => t && e,
					tooltipClass: (t, e) => (i) => yf(t(i), e(i)),
					optionClass: (t, e) => (i) => yf(t(i), e(i)),
					addToOptions: (t, e) => t.concat(e),
					filterStrict: (t, e) => t || e,
				}
			),
	});
	function yf(t, e) {
		return t ? (e ? t + ' ' + e : t) : e;
	}
	function vf(t, e, i, n, r, s) {
		let o,
			a,
			l = t.textDirection == Zo.RTL,
			h = l,
			c = !1,
			u = 'top',
			d = e.left - r.left,
			f = r.right - e.right,
			O = n.right - n.left,
			p = n.bottom - n.top;
		if (
			(h && d < Math.min(O, f)
				? (h = !1)
				: !h && f < Math.min(O, d) && (h = !0),
			O <= (h ? d : f))
		)
			(o = Math.max(r.top, Math.min(i.top, r.bottom - p)) - e.top),
				(a = Math.min(400, h ? d : f));
		else {
			(c = !0),
				(a = Math.min(400, (l ? e.right : r.right - e.left) - 30));
			let t = r.bottom - e.bottom;
			t >= p || t > e.top
				? (o = i.bottom - e.top)
				: ((u = 'bottom'), (o = e.bottom - i.top));
		}
		return {
			style: `${u}: ${o / ((e.bottom - e.top) / s.offsetHeight)}px; max-width: ${a / ((e.right - e.left) / s.offsetWidth)}px`,
			class:
				'cm-completionInfo-' +
				(c
					? l
						? 'left-narrow'
						: 'right-narrow'
					: h
						? 'left'
						: 'right'),
		};
	}
	function wf(t, e, i) {
		if (t <= i) return { from: 0, to: t };
		if ((e < 0 && (e = 0), e <= t >> 1)) {
			let t = Math.floor(e / i);
			return { from: t * i, to: (t + 1) * i };
		}
		let n = Math.floor((t - e) / i);
		return { from: t - (n + 1) * i, to: t - n * i };
	}
	class Sf {
		constructor(t, e, i) {
			(this.view = t),
				(this.stateField = e),
				(this.applyCompletion = i),
				(this.info = null),
				(this.infoDestroy = null),
				(this.placeInfoReq = {
					read: () => this.measureInfo(),
					write: (t) => this.placeInfo(t),
					key: this,
				}),
				(this.space = null),
				(this.currentClass = '');
			let n = t.state.field(e),
				{ options: r, selected: s } = n.open,
				o = t.state.facet(bf);
			(this.optionContent = (function (t) {
				let e = t.addToOptions.slice();
				return (
					t.icons &&
						e.push({
							render(t) {
								let e = document.createElement('div');
								return (
									e.classList.add('cm-completionIcon'),
									t.type &&
										e.classList.add(
											...t.type
												.split(/\s+/g)
												.map(
													(t) =>
														'cm-completionIcon-' + t
												)
										),
									e.setAttribute('aria-hidden', 'true'),
									e
								);
							},
							position: 20,
						}),
					e.push(
						{
							render(t, e, i, n) {
								let r = document.createElement('span');
								r.className = 'cm-completionLabel';
								let s = t.displayLabel || t.label,
									o = 0;
								for (let t = 0; t < n.length; ) {
									let e = n[t++],
										i = n[t++];
									e > o &&
										r.appendChild(
											document.createTextNode(
												s.slice(o, e)
											)
										);
									let a = r.appendChild(
										document.createElement('span')
									);
									a.appendChild(
										document.createTextNode(s.slice(e, i))
									),
										(a.className =
											'cm-completionMatchedText'),
										(o = i);
								}
								return (
									o < s.length &&
										r.appendChild(
											document.createTextNode(s.slice(o))
										),
									r
								);
							},
							position: 50,
						},
						{
							render(t) {
								if (!t.detail) return null;
								let e = document.createElement('span');
								return (
									(e.className = 'cm-completionDetail'),
									(e.textContent = t.detail),
									e
								);
							},
							position: 80,
						}
					),
					e
						.sort((t, e) => t.position - e.position)
						.map((t) => t.render)
				);
			})(o)),
				(this.optionClass = o.optionClass),
				(this.tooltipClass = o.tooltipClass),
				(this.range = wf(r.length, s, o.maxRenderedOptions)),
				(this.dom = document.createElement('div')),
				(this.dom.className = 'cm-tooltip-autocomplete'),
				this.updateTooltipClass(t.state),
				this.dom.addEventListener('mousedown', (i) => {
					let { options: n } = t.state.field(e).open;
					for (
						let e, r = i.target;
						r && r != this.dom;
						r = r.parentNode
					)
						if (
							'LI' == r.nodeName &&
							(e = /-(\d+)$/.exec(r.id)) &&
							+e[1] < n.length
						)
							return (
								this.applyCompletion(t, n[+e[1]]),
								void i.preventDefault()
							);
				}),
				this.dom.addEventListener('focusout', (e) => {
					let i = t.state.field(this.stateField, !1);
					i &&
						i.tooltip &&
						t.state.facet(bf).closeOnBlur &&
						e.relatedTarget != t.contentDOM &&
						t.dispatch({ effects: pf.of(null) });
				}),
				this.showOptions(r, n.id);
		}
		mount() {
			this.updateSel();
		}
		showOptions(t, e) {
			this.list && this.list.remove(),
				(this.list = this.dom.appendChild(
					this.createListBox(t, e, this.range)
				)),
				this.list.addEventListener('scroll', () => {
					this.info && this.view.requestMeasure(this.placeInfoReq);
				});
		}
		update(t) {
			var e;
			let i = t.state.field(this.stateField),
				n = t.startState.field(this.stateField);
			if ((this.updateTooltipClass(t.state), i != n)) {
				let { options: r, selected: s, disabled: o } = i.open;
				(n.open && n.open.options == r) ||
					((this.range = wf(
						r.length,
						s,
						t.state.facet(bf).maxRenderedOptions
					)),
					this.showOptions(r, i.id)),
					this.updateSel(),
					o !=
						(null === (e = n.open) || void 0 === e
							? void 0
							: e.disabled) &&
						this.dom.classList.toggle(
							'cm-tooltip-autocomplete-disabled',
							!!o
						);
			}
		}
		updateTooltipClass(t) {
			let e = this.tooltipClass(t);
			if (e != this.currentClass) {
				for (let t of this.currentClass.split(' '))
					t && this.dom.classList.remove(t);
				for (let t of e.split(' ')) t && this.dom.classList.add(t);
				this.currentClass = e;
			}
		}
		positioned(t) {
			(this.space = t),
				this.info && this.view.requestMeasure(this.placeInfoReq);
		}
		updateSel() {
			let t = this.view.state.field(this.stateField),
				e = t.open;
			if (
				(((e.selected > -1 && e.selected < this.range.from) ||
					e.selected >= this.range.to) &&
					((this.range = wf(
						e.options.length,
						e.selected,
						this.view.state.facet(bf).maxRenderedOptions
					)),
					this.showOptions(e.options, t.id)),
				this.updateSelectedOption(e.selected))
			) {
				this.destroyInfo();
				let { completion: i } = e.options[e.selected],
					{ info: n } = i;
				if (!n) return;
				let r =
					'string' == typeof n ? document.createTextNode(n) : n(i);
				if (!r) return;
				'then' in r
					? r
							.then((e) => {
								e &&
									this.view.state.field(
										this.stateField,
										!1
									) == t &&
									this.addInfoPane(e, i);
							})
							.catch((t) =>
								la(this.view.state, t, 'completion info')
							)
					: this.addInfoPane(r, i);
			}
		}
		addInfoPane(t, e) {
			this.destroyInfo();
			let i = (this.info = document.createElement('div'));
			if (
				((i.className = 'cm-tooltip cm-completionInfo'),
				null != t.nodeType)
			)
				i.appendChild(t), (this.infoDestroy = null);
			else {
				let { dom: e, destroy: n } = t;
				i.appendChild(e), (this.infoDestroy = n || null);
			}
			this.dom.appendChild(i),
				this.view.requestMeasure(this.placeInfoReq);
		}
		updateSelectedOption(t) {
			let e = null;
			for (
				let i = this.list.firstChild, n = this.range.from;
				i;
				i = i.nextSibling, n++
			)
				'LI' == i.nodeName && i.id
					? n == t
						? i.hasAttribute('aria-selected') ||
							(i.setAttribute('aria-selected', 'true'), (e = i))
						: i.hasAttribute('aria-selected') &&
							i.removeAttribute('aria-selected')
					: n--;
			return (
				e &&
					(function (t, e) {
						let i = t.getBoundingClientRect(),
							n = e.getBoundingClientRect(),
							r = i.height / t.offsetHeight;
						n.top < i.top
							? (t.scrollTop -= (i.top - n.top) / r)
							: n.bottom > i.bottom &&
								(t.scrollTop += (n.bottom - i.bottom) / r);
					})(this.list, e),
				e
			);
		}
		measureInfo() {
			let t = this.dom.querySelector('[aria-selected]');
			if (!t || !this.info) return null;
			let e = this.dom.getBoundingClientRect(),
				i = this.info.getBoundingClientRect(),
				n = t.getBoundingClientRect(),
				r = this.space;
			if (!r) {
				let t = this.dom.ownerDocument.defaultView || window;
				r = {
					left: 0,
					top: 0,
					right: t.innerWidth,
					bottom: t.innerHeight,
				};
			}
			return n.top > Math.min(r.bottom, e.bottom) - 10 ||
				n.bottom < Math.max(r.top, e.top) + 10
				? null
				: this.view.state
						.facet(bf)
						.positionInfo(this.view, e, n, i, r, this.dom);
		}
		placeInfo(t) {
			this.info &&
				(t
					? (t.style && (this.info.style.cssText = t.style),
						(this.info.className =
							'cm-tooltip cm-completionInfo ' + (t.class || '')))
					: (this.info.style.cssText = 'top: -1e6px'));
		}
		createListBox(t, e, i) {
			const n = document.createElement('ul');
			(n.id = e),
				n.setAttribute('role', 'listbox'),
				n.setAttribute('aria-expanded', 'true'),
				n.setAttribute(
					'aria-label',
					this.view.state.phrase('Completions')
				);
			let r = null;
			for (let s = i.from; s < i.to; s++) {
				let { completion: o, match: a } = t[s],
					{ section: l } = o;
				if (l) {
					let t = 'string' == typeof l ? l : l.name;
					t != r &&
						(s > i.from || 0 == i.from) &&
						((r = t),
						'string' != typeof l && l.header
							? n.appendChild(l.header(l))
							: (n.appendChild(
									document.createElement('completion-section')
								).textContent = t));
				}
				const h = n.appendChild(document.createElement('li'));
				(h.id = e + '-' + s), h.setAttribute('role', 'option');
				let c = this.optionClass(o);
				c && (h.className = c);
				for (let t of this.optionContent) {
					let e = t(o, this.view.state, this.view, a);
					e && h.appendChild(e);
				}
			}
			return (
				i.from && n.classList.add('cm-completionListIncompleteTop'),
				i.to < t.length &&
					n.classList.add('cm-completionListIncompleteBottom'),
				n
			);
		}
		destroyInfo() {
			this.info &&
				(this.infoDestroy && this.infoDestroy(),
				this.info.remove(),
				(this.info = null));
		}
		destroy() {
			this.destroyInfo();
		}
	}
	function xf(t, e) {
		return (i) => new Sf(i, t, e);
	}
	function Qf(t) {
		return (
			100 * (t.boost || 0) +
			(t.apply ? 10 : 0) +
			(t.info ? 5 : 0) +
			(t.type ? 1 : 0)
		);
	}
	class kf {
		constructor(t, e, i, n, r, s) {
			(this.options = t),
				(this.attrs = e),
				(this.tooltip = i),
				(this.timestamp = n),
				(this.selected = r),
				(this.disabled = s);
		}
		setSelected(t, e) {
			return t == this.selected || t >= this.options.length
				? this
				: new kf(
						this.options,
						Tf(e, t),
						this.tooltip,
						this.timestamp,
						t,
						this.disabled
					);
		}
		static build(t, e, i, n, r, s) {
			if (n && !s && t.some((t) => t.isPending)) return n.setDisabled();
			let o = (function (t, e) {
				let i = [],
					n = null,
					r = (t) => {
						i.push(t);
						let { section: e } = t.completion;
						if (e) {
							n || (n = []);
							let t = 'string' == typeof e ? e : e.name;
							n.some((e) => e.name == t) ||
								n.push('string' == typeof e ? { name: t } : e);
						}
					},
					s = e.facet(bf);
				for (let n of t)
					if (n.hasResult()) {
						let t = n.result.getMatch;
						if (!1 === n.result.filter)
							for (let e of n.result.options)
								r(
									new lf(
										e,
										n.source,
										t ? t(e) : [],
										1e9 - i.length
									)
								);
						else {
							let i,
								o = e.sliceDoc(n.from, n.to),
								a = s.filterStrict ? new gf(o) : new mf(o);
							for (let e of n.result.options)
								if ((i = a.match(e.label))) {
									let s = e.displayLabel
										? t
											? t(e, i.matched)
											: []
										: i.matched;
									r(
										new lf(
											e,
											n.source,
											s,
											i.score + (e.boost || 0)
										)
									);
								}
						}
					}
				if (n) {
					let t = Object.create(null),
						e = 0,
						r = (t, e) => {
							var i, n;
							return (
								(null !== (i = t.rank) && void 0 !== i
									? i
									: 1e9) -
									(null !== (n = e.rank) && void 0 !== n
										? n
										: 1e9) || (t.name < e.name ? -1 : 1)
							);
						};
					for (let i of n.sort(r)) (e -= 1e5), (t[i.name] = e);
					for (let e of i) {
						let { section: i } = e.completion;
						i && (e.score += t['string' == typeof i ? i : i.name]);
					}
				}
				let o = [],
					a = null,
					l = s.compareCompletions;
				for (let t of i.sort(
					(t, e) => e.score - t.score || l(t.completion, e.completion)
				)) {
					let e = t.completion;
					!a ||
					a.label != e.label ||
					a.detail != e.detail ||
					(null != a.type && null != e.type && a.type != e.type) ||
					a.apply != e.apply ||
					a.boost != e.boost
						? o.push(t)
						: Qf(t.completion) > Qf(a) && (o[o.length - 1] = t),
						(a = t.completion);
				}
				return o;
			})(t, e);
			if (!o.length)
				return n && t.some((t) => t.isPending) ? n.setDisabled() : null;
			let a = e.facet(bf).selectOnOpen ? 0 : -1;
			if (n && n.selected != a && -1 != n.selected) {
				let t = n.options[n.selected].completion;
				for (let e = 0; e < o.length; e++)
					if (o[e].completion == t) {
						a = e;
						break;
					}
			}
			return new kf(
				o,
				Tf(i, a),
				{
					pos: t.reduce(
						(t, e) => (e.hasResult() ? Math.min(t, e.from) : t),
						1e8
					),
					create: jf,
					above: r.aboveCursor,
				},
				n ? n.timestamp : Date.now(),
				a,
				!1
			);
		}
		map(t) {
			return new kf(
				this.options,
				this.attrs,
				Object.assign(Object.assign({}, this.tooltip), {
					pos: t.mapPos(this.tooltip.pos),
				}),
				this.timestamp,
				this.selected,
				this.disabled
			);
		}
		setDisabled() {
			return new kf(
				this.options,
				this.attrs,
				this.tooltip,
				this.timestamp,
				this.selected,
				!0
			);
		}
	}
	class $f {
		constructor(t, e, i) {
			(this.active = t), (this.id = e), (this.open = i);
		}
		static start() {
			return new $f(
				Cf,
				'cm-ac-' + Math.floor(2e6 * Math.random()).toString(36),
				null
			);
		}
		update(t) {
			let { state: e } = t,
				i = e.facet(bf),
				n = (
					i.override ||
					e.languageDataAt('autocomplete', hf(e)).map(ff)
				).map((e) =>
					(
						this.active.find((t) => t.source == e) ||
						new Xf(e, this.active.some((t) => 0 != t.state) ? 1 : 0)
					).update(t, i)
				);
			n.length == this.active.length &&
				n.every((t, e) => t == this.active[e]) &&
				(n = this.active);
			let r = this.open,
				s = t.effects.some((t) => t.is(Rf));
			r && t.docChanged && (r = r.map(t.changes)),
				t.selection ||
				n.some(
					(e) => e.hasResult() && t.changes.touchesRange(e.from, e.to)
				) ||
				!(function (t, e) {
					if (t == e) return !0;
					for (let i = 0, n = 0; ; ) {
						for (; i < t.length && !t[i].hasResult(); ) i++;
						for (; n < e.length && !e[n].hasResult(); ) n++;
						let r = i == t.length,
							s = n == e.length;
						if (r || s) return r == s;
						if (t[i++].result != e[n++].result) return !1;
					}
				})(n, this.active) ||
				s
					? (r = kf.build(n, e, this.id, r, i, s))
					: r &&
						r.disabled &&
						!n.some((t) => t.isPending) &&
						(r = null),
				!r &&
					n.every((t) => !t.isPending) &&
					n.some((t) => t.hasResult()) &&
					(n = n.map((t) =>
						t.hasResult() ? new Xf(t.source, 0) : t
					));
			for (let e of t.effects)
				e.is(_f) && (r = r && r.setSelected(e.value, this.id));
			return n == this.active && r == this.open
				? this
				: new $f(n, this.id, r);
		}
		get tooltip() {
			return this.open ? this.open.tooltip : null;
		}
		get attrs() {
			return this.open ? this.open.attrs : this.active.length ? Pf : Zf;
		}
	}
	const Pf = { 'aria-autocomplete': 'list' },
		Zf = {};
	function Tf(t, e) {
		let i = {
			'aria-autocomplete': 'list',
			'aria-haspopup': 'listbox',
			'aria-controls': t,
		};
		return e > -1 && (i['aria-activedescendant'] = t + '-' + e), i;
	}
	const Cf = [];
	function Af(t, e) {
		if (t.isUserEvent('input.complete')) {
			let i = t.annotation(uf);
			if (i && e.activateOnCompletion(i)) return 12;
		}
		let i = t.isUserEvent('input.type');
		return i && e.activateOnTyping
			? 5
			: i
				? 1
				: t.isUserEvent('delete.backward')
					? 2
					: t.selection
						? 8
						: t.docChanged
							? 16
							: 0;
	}
	class Xf {
		constructor(t, e, i = !1) {
			(this.source = t), (this.state = e), (this.explicit = i);
		}
		hasResult() {
			return !1;
		}
		get isPending() {
			return 1 == this.state;
		}
		update(t, e) {
			let i = Af(t, e),
				n = this;
			(8 & i || (16 & i && this.touches(t))) && (n = new Xf(n.source, 0)),
				4 & i && 0 == n.state && (n = new Xf(this.source, 1)),
				(n = n.updateFor(t, i));
			for (let e of t.effects)
				if (e.is(Of)) n = new Xf(n.source, 1, e.value);
				else if (e.is(pf)) n = new Xf(n.source, 0);
				else if (e.is(Rf))
					for (let t of e.value) t.source == n.source && (n = t);
			return n;
		}
		updateFor(t, e) {
			return this.map(t.changes);
		}
		map(t) {
			return this;
		}
		touches(t) {
			return t.changes.touchesRange(hf(t.state));
		}
	}
	class Mf extends Xf {
		constructor(t, e, i, n, r, s) {
			super(t, 3, e),
				(this.limit = i),
				(this.result = n),
				(this.from = r),
				(this.to = s);
		}
		hasResult() {
			return !0;
		}
		updateFor(t, e) {
			var i;
			if (!(3 & e)) return this.map(t.changes);
			let n = this.result;
			n.map && !t.changes.empty && (n = n.map(n, t.changes));
			let r = t.changes.mapPos(this.from),
				s = t.changes.mapPos(this.to, 1),
				o = hf(t.state);
			if (
				o > s ||
				!n ||
				(2 & e && (hf(t.startState) == this.from || o < this.limit))
			)
				return new Xf(this.source, 4 & e ? 1 : 0);
			let a = t.changes.mapPos(this.limit);
			return (function (t, e, i, n) {
				if (!t) return !1;
				let r = e.sliceDoc(i, n);
				return 'function' == typeof t
					? t(r, i, n, e)
					: cf(t, !0).test(r);
			})(n.validFor, t.state, r, s)
				? new Mf(this.source, this.explicit, a, n, r, s)
				: n.update && (n = n.update(n, r, s, new sf(t.state, o, !1)))
					? new Mf(
							this.source,
							this.explicit,
							a,
							n,
							n.from,
							null !== (i = n.to) && void 0 !== i
								? i
								: hf(t.state)
						)
					: new Xf(this.source, 1, this.explicit);
		}
		map(t) {
			return t.empty
				? this
				: (
							this.result.map
								? this.result.map(this.result, t)
								: this.result
					  )
					? new Mf(
							this.source,
							this.explicit,
							t.mapPos(this.limit),
							this.result,
							t.mapPos(this.from),
							t.mapPos(this.to, 1)
						)
					: new Xf(this.source, 0);
		}
		touches(t) {
			return t.changes.touchesRange(this.from, this.to);
		}
	}
	const Rf = kr.define({ map: (t, e) => t.map((t) => t.map(e)) }),
		_f = kr.define(),
		Vf = or.define({
			create: () => $f.start(),
			update: (t, e) => t.update(e),
			provide: (t) => [
				pc.from(t, (t) => t.tooltip),
				uh.contentAttributes.from(t, (t) => t.attrs),
			],
		});
	function qf(t, e) {
		const i = e.completion.apply || e.completion.label;
		let n = t.state.field(Vf).active.find((t) => t.source == e.source);
		return (
			n instanceof Mf &&
			('string' == typeof i
				? t.dispatch(
						Object.assign(
							Object.assign(
								{},
								(function (t, e, i, n) {
									let { main: r } = t.selection,
										s = i - r.from,
										o = n - r.from;
									return Object.assign(
										Object.assign(
											{},
											t.changeByRange((a) => {
												if (
													a != r &&
													i != n &&
													t.sliceDoc(
														a.from + s,
														a.from + o
													) != t.sliceDoc(i, n)
												)
													return { range: a };
												let l = t.toText(e);
												return {
													changes: {
														from: a.from + s,
														to:
															n == r.from
																? a.to
																: a.from + o,
														insert: l,
													},
													range: Fn.cursor(
														a.from + s + l.length
													),
												};
											})
										),
										{
											scrollIntoView: !0,
											userEvent: 'input.complete',
										}
									);
								})(t.state, i, n.from, n.to)
							),
							{ annotations: uf.of(e.completion) }
						)
					)
				: i(t, e.completion, n.from, n.to),
			!0)
		);
	}
	const jf = xf(Vf, qf);
	function Df(t, e = 'option') {
		return (i) => {
			let n = i.state.field(Vf, !1);
			if (
				!n ||
				!n.open ||
				n.open.disabled ||
				Date.now() - n.open.timestamp <
					i.state.facet(bf).interactionDelay
			)
				return !1;
			let r,
				s = 1;
			'page' == e &&
				(r = Sc(i, n.open.tooltip)) &&
				(s = Math.max(
					2,
					Math.floor(
						r.dom.offsetHeight /
							r.dom.querySelector('li').offsetHeight
					) - 1
				));
			let { length: o } = n.open.options,
				a =
					n.open.selected > -1
						? n.open.selected + s * (t ? 1 : -1)
						: t
							? 0
							: o - 1;
			return (
				a < 0
					? (a = 'page' == e ? 0 : o - 1)
					: a >= o && (a = 'page' == e ? o - 1 : 0),
				i.dispatch({ effects: _f.of(a) }),
				!0
			);
		};
	}
	const Ef = (t) =>
		!!t.state.field(Vf, !1) && (t.dispatch({ effects: Of.of(!0) }), !0);
	class Wf {
		constructor(t, e) {
			(this.active = t),
				(this.context = e),
				(this.time = Date.now()),
				(this.updates = []),
				(this.done = void 0);
		}
	}
	const Yf = da.fromClass(
			class {
				constructor(t) {
					(this.view = t),
						(this.debounceUpdate = -1),
						(this.running = []),
						(this.debounceAccept = -1),
						(this.pendingStart = !1),
						(this.composing = 0);
					for (let e of t.state.field(Vf).active)
						e.isPending && this.startQuery(e);
				}
				update(t) {
					let e = t.state.field(Vf),
						i = t.state.facet(bf);
					if (
						!t.selectionSet &&
						!t.docChanged &&
						t.startState.field(Vf) == e
					)
						return;
					let n = t.transactions.some((t) => {
						let e = Af(t, i);
						return (
							8 & e || ((t.selection || t.docChanged) && !(3 & e))
						);
					});
					for (let e = 0; e < this.running.length; e++) {
						let i = this.running[e];
						if (
							n ||
							(i.context.abortOnDocChange && t.docChanged) ||
							(i.updates.length + t.transactions.length > 50 &&
								Date.now() - i.time > 1e3)
						) {
							for (let t of i.context.abortListeners)
								try {
									t();
								} catch (t) {
									la(this.view.state, t);
								}
							(i.context.abortListeners = null),
								this.running.splice(e--, 1);
						} else i.updates.push(...t.transactions);
					}
					this.debounceUpdate > -1 &&
						clearTimeout(this.debounceUpdate),
						t.transactions.some((t) =>
							t.effects.some((t) => t.is(Of))
						) && (this.pendingStart = !0);
					let r = this.pendingStart ? 50 : i.activateOnTypingDelay;
					if (
						((this.debounceUpdate = e.active.some(
							(t) =>
								t.isPending &&
								!this.running.some(
									(e) => e.active.source == t.source
								)
						)
							? setTimeout(() => this.startUpdate(), r)
							: -1),
						0 != this.composing)
					)
						for (let e of t.transactions)
							e.isUserEvent('input.type')
								? (this.composing = 2)
								: 2 == this.composing &&
									e.selection &&
									(this.composing = 3);
				}
				startUpdate() {
					(this.debounceUpdate = -1), (this.pendingStart = !1);
					let { state: t } = this.view,
						e = t.field(Vf);
					for (let t of e.active)
						t.isPending &&
							!this.running.some(
								(e) => e.active.source == t.source
							) &&
							this.startQuery(t);
					this.running.length &&
						e.open &&
						e.open.disabled &&
						(this.debounceAccept = setTimeout(
							() => this.accept(),
							this.view.state.facet(bf).updateSyncTime
						));
				}
				startQuery(t) {
					let { state: e } = this.view,
						i = hf(e),
						n = new sf(e, i, t.explicit, this.view),
						r = new Wf(t, n);
					this.running.push(r),
						Promise.resolve(t.source(n)).then(
							(t) => {
								r.context.aborted ||
									((r.done = t || null),
									this.scheduleAccept());
							},
							(t) => {
								this.view.dispatch({ effects: pf.of(null) }),
									la(this.view.state, t);
							}
						);
				}
				scheduleAccept() {
					this.running.every((t) => void 0 !== t.done)
						? this.accept()
						: this.debounceAccept < 0 &&
							(this.debounceAccept = setTimeout(
								() => this.accept(),
								this.view.state.facet(bf).updateSyncTime
							));
				}
				accept() {
					var t;
					this.debounceAccept > -1 &&
						clearTimeout(this.debounceAccept),
						(this.debounceAccept = -1);
					let e = [],
						i = this.view.state.facet(bf),
						n = this.view.state.field(Vf);
					for (let r = 0; r < this.running.length; r++) {
						let s = this.running[r];
						if (void 0 === s.done) continue;
						if ((this.running.splice(r--, 1), s.done)) {
							let n = hf(
									s.updates.length
										? s.updates[0].startState
										: this.view.state
								),
								r = Math.min(
									n,
									s.done.from + (s.active.explicit ? 0 : 1)
								),
								o = new Mf(
									s.active.source,
									s.active.explicit,
									r,
									s.done,
									s.done.from,
									null !== (t = s.done.to) && void 0 !== t
										? t
										: n
								);
							for (let t of s.updates) o = o.update(t, i);
							if (o.hasResult()) {
								e.push(o);
								continue;
							}
						}
						let o = n.active.find(
							(t) => t.source == s.active.source
						);
						if (o && o.isPending)
							if (null == s.done) {
								let t = new Xf(s.active.source, 0);
								for (let e of s.updates) t = t.update(e, i);
								t.isPending || e.push(t);
							} else this.startQuery(o);
					}
					(e.length || (n.open && n.open.disabled)) &&
						this.view.dispatch({ effects: Rf.of(e) });
				}
			},
			{
				eventHandlers: {
					blur(t) {
						let e = this.view.state.field(Vf, !1);
						if (
							e &&
							e.tooltip &&
							this.view.state.facet(bf).closeOnBlur
						) {
							let i = e.open && Sc(this.view, e.open.tooltip);
							(i && i.dom.contains(t.relatedTarget)) ||
								setTimeout(
									() =>
										this.view.dispatch({
											effects: pf.of(null),
										}),
									10
								);
						}
					},
					compositionstart() {
						this.composing = 1;
					},
					compositionend() {
						3 == this.composing &&
							setTimeout(
								() =>
									this.view.dispatch({ effects: Of.of(!1) }),
								20
							),
							(this.composing = 0);
					},
				},
			}
		),
		zf = 'object' == typeof navigator && /Win/.test(navigator.platform),
		Lf = lr.highest(
			uh.domEventHandlers({
				keydown(t, e) {
					let i = e.state.field(Vf, !1);
					if (
						!i ||
						!i.open ||
						i.open.disabled ||
						i.open.selected < 0 ||
						t.key.length > 1 ||
						(t.ctrlKey && (!zf || !t.altKey)) ||
						t.metaKey
					)
						return !1;
					let n = i.open.options[i.open.selected],
						r = i.active.find((t) => t.source == n.source),
						s =
							n.completion.commitCharacters ||
							r.result.commitCharacters;
					return s && s.indexOf(t.key) > -1 && qf(e, n), !1;
				},
			})
		),
		Bf = uh.baseTheme({
			'.cm-tooltip.cm-tooltip-autocomplete': {
				'& > ul': {
					fontFamily: 'monospace',
					whiteSpace: 'nowrap',
					overflow: 'hidden auto',
					maxWidth_fallback: '700px',
					maxWidth: 'min(700px, 95vw)',
					minWidth: '250px',
					maxHeight: '10em',
					height: '100%',
					listStyle: 'none',
					margin: 0,
					padding: 0,
					'& > li, & > completion-section': {
						padding: '1px 3px',
						lineHeight: 1.2,
					},
					'& > li': {
						overflowX: 'hidden',
						textOverflow: 'ellipsis',
						cursor: 'pointer',
					},
					'& > completion-section': {
						display: 'list-item',
						borderBottom: '1px solid silver',
						paddingLeft: '0.5em',
						opacity: 0.7,
					},
				},
			},
			'&light .cm-tooltip-autocomplete ul li[aria-selected]': {
				background: '#17c',
				color: 'white',
			},
			'&light .cm-tooltip-autocomplete-disabled ul li[aria-selected]': {
				background: '#777',
			},
			'&dark .cm-tooltip-autocomplete ul li[aria-selected]': {
				background: '#347',
				color: 'white',
			},
			'&dark .cm-tooltip-autocomplete-disabled ul li[aria-selected]': {
				background: '#444',
			},
			'.cm-completionListIncompleteTop:before, .cm-completionListIncompleteBottom:after':
				{
					content: '"···"',
					opacity: 0.5,
					display: 'block',
					textAlign: 'center',
				},
			'.cm-tooltip.cm-completionInfo': {
				position: 'absolute',
				padding: '3px 9px',
				width: 'max-content',
				maxWidth: '400px',
				boxSizing: 'border-box',
				whiteSpace: 'pre-line',
			},
			'.cm-completionInfo.cm-completionInfo-left': { right: '100%' },
			'.cm-completionInfo.cm-completionInfo-right': { left: '100%' },
			'.cm-completionInfo.cm-completionInfo-left-narrow': {
				right: '30px',
			},
			'.cm-completionInfo.cm-completionInfo-right-narrow': {
				left: '30px',
			},
			'&light .cm-snippetField': { backgroundColor: '#00000022' },
			'&dark .cm-snippetField': { backgroundColor: '#ffffff22' },
			'.cm-snippetFieldPosition': {
				verticalAlign: 'text-top',
				width: 0,
				height: '1.15em',
				display: 'inline-block',
				margin: '0 -0.7px -.7em',
				borderLeft: '1.4px dotted #888',
			},
			'.cm-completionMatchedText': { textDecoration: 'underline' },
			'.cm-completionDetail': {
				marginLeft: '0.5em',
				fontStyle: 'italic',
			},
			'.cm-completionIcon': {
				fontSize: '90%',
				width: '.8em',
				display: 'inline-block',
				textAlign: 'center',
				paddingRight: '.6em',
				opacity: '0.6',
				boxSizing: 'content-box',
			},
			'.cm-completionIcon-function, .cm-completionIcon-method': {
				'&:after': { content: "'ƒ'" },
			},
			'.cm-completionIcon-class': { '&:after': { content: "'○'" } },
			'.cm-completionIcon-interface': { '&:after': { content: "'◌'" } },
			'.cm-completionIcon-variable': { '&:after': { content: "'𝑥'" } },
			'.cm-completionIcon-constant': { '&:after': { content: "'𝐶'" } },
			'.cm-completionIcon-type': { '&:after': { content: "'𝑡'" } },
			'.cm-completionIcon-enum': { '&:after': { content: "'∪'" } },
			'.cm-completionIcon-property': { '&:after': { content: "'□'" } },
			'.cm-completionIcon-keyword': { '&:after': { content: "'🔑︎'" } },
			'.cm-completionIcon-namespace': { '&:after': { content: "'▢'" } },
			'.cm-completionIcon-text': {
				'&:after': {
					content: "'abc'",
					fontSize: '50%',
					verticalAlign: 'middle',
				},
			},
		});
	class Uf {
		constructor(t, e, i, n) {
			(this.field = t), (this.line = e), (this.from = i), (this.to = n);
		}
	}
	class Nf {
		constructor(t, e, i) {
			(this.field = t), (this.from = e), (this.to = i);
		}
		map(t) {
			let e = t.mapPos(this.from, -1, En.TrackDel),
				i = t.mapPos(this.to, 1, En.TrackDel);
			return null == e || null == i ? null : new Nf(this.field, e, i);
		}
	}
	class Gf {
		constructor(t, e) {
			(this.lines = t), (this.fieldPositions = e);
		}
		instantiate(t, e) {
			let i = [],
				n = [e],
				r = t.doc.lineAt(e),
				s = /^\s*/.exec(r.text)[0];
			for (let r of this.lines) {
				if (i.length) {
					let i = s,
						o = /^\t*/.exec(r)[0].length;
					for (let e = 0; e < o; e++) i += t.facet(bu);
					n.push(e + i.length - o), (r = i + r.slice(o));
				}
				i.push(r), (e += r.length + 1);
			}
			let o = this.fieldPositions.map(
				(t) => new Nf(t.field, n[t.line] + t.from, n[t.line] + t.to)
			);
			return { text: i, ranges: o };
		}
		static parse(t) {
			let e,
				i = [],
				n = [],
				r = [];
			for (let s of t.split(/\r\n?|\n/)) {
				for (
					;
					(e =
						/[#$]\{(?:(\d+)(?::([^}]*))?|((?:\\[{}]|[^}])*))\}/.exec(
							s
						));

				) {
					let t = e[1] ? +e[1] : null,
						o = e[2] || e[3] || '',
						a = -1,
						l = o.replace(/\\[{}]/g, (t) => t[1]);
					for (let e = 0; e < i.length; e++)
						(null != t ? i[e].seq == t : l && i[e].name == l) &&
							(a = e);
					if (a < 0) {
						let e = 0;
						for (
							;
							e < i.length &&
							(null == t || (null != i[e].seq && i[e].seq < t));

						)
							e++;
						i.splice(e, 0, { seq: t, name: l }), (a = e);
						for (let t of r) t.field >= a && t.field++;
					}
					r.push(new Uf(a, n.length, e.index, e.index + l.length)),
						(s =
							s.slice(0, e.index) +
							o +
							s.slice(e.index + e[0].length));
				}
				(s = s.replace(/\\([{}])/g, (t, e, i) => {
					for (let t of r)
						t.line == n.length && t.from > i && (t.from--, t.to--);
					return e;
				})),
					n.push(s);
			}
			return new Gf(n, r);
		}
	}
	let If = mo.widget({
			widget: new (class extends Oo {
				toDOM() {
					let t = document.createElement('span');
					return (t.className = 'cm-snippetFieldPosition'), t;
				}
				ignoreEvent() {
					return !1;
				}
			})(),
		}),
		Ff = mo.mark({ class: 'cm-snippetField' });
	class Hf {
		constructor(t, e) {
			(this.ranges = t),
				(this.active = e),
				(this.deco = mo.set(
					t.map((t) => (t.from == t.to ? If : Ff).range(t.from, t.to))
				));
		}
		map(t) {
			let e = [];
			for (let i of this.ranges) {
				let n = i.map(t);
				if (!n) return null;
				e.push(n);
			}
			return new Hf(e, this.active);
		}
		selectionInsideField(t) {
			return t.ranges.every((t) =>
				this.ranges.some(
					(e) =>
						e.field == this.active &&
						e.from <= t.from &&
						e.to >= t.to
				)
			);
		}
	}
	const Kf = kr.define({ map: (t, e) => t && t.map(e) }),
		Jf = kr.define(),
		tO = or.define({
			create: () => null,
			update(t, e) {
				for (let i of e.effects) {
					if (i.is(Kf)) return i.value;
					if (i.is(Jf) && t) return new Hf(t.ranges, i.value);
				}
				return (
					t && e.docChanged && (t = t.map(e.changes)),
					t &&
						e.selection &&
						!t.selectionInsideField(e.selection) &&
						(t = null),
					t
				);
			},
			provide: (t) =>
				uh.decorations.from(t, (t) => (t ? t.deco : mo.none)),
		});
	function eO(t, e) {
		return Fn.create(
			t.filter((t) => t.field == e).map((t) => Fn.range(t.from, t.to))
		);
	}
	function iO(t) {
		let e = Gf.parse(t);
		return (t, i, n, r) => {
			let { text: s, ranges: o } = e.instantiate(t.state, n),
				a = {
					changes: { from: n, to: r, insert: Qn.of(s) },
					scrollIntoView: !0,
					annotations: i
						? [uf.of(i), $r.userEvent.of('input.complete')]
						: void 0,
				};
			if (
				(o.length && (a.selection = eO(o, 0)),
				o.some((t) => t.field > 0))
			) {
				let e = new Hf(o, 0),
					i = (a.effects = [Kf.of(e)]);
				void 0 === t.state.field(tO, !1) &&
					i.push(kr.appendConfig.of([tO, oO, lO, Bf]));
			}
			t.dispatch(t.state.update(a));
		};
	}
	function nO(t) {
		return ({ state: e, dispatch: i }) => {
			let n = e.field(tO, !1);
			if (!n || (t < 0 && 0 == n.active)) return !1;
			let r = n.active + t,
				s = t > 0 && !n.ranges.some((e) => e.field == r + t);
			return (
				i(
					e.update({
						selection: eO(n.ranges, r),
						effects: Kf.of(s ? null : new Hf(n.ranges, r)),
						scrollIntoView: !0,
					})
				),
				!0
			);
		};
	}
	const rO = [
			{ key: 'Tab', run: nO(1), shift: nO(-1) },
			{
				key: 'Escape',
				run: ({ state: t, dispatch: e }) =>
					!!t.field(tO, !1) &&
					(e(t.update({ effects: Kf.of(null) })), !0),
			},
		],
		sO = Jn.define({ combine: (t) => (t.length ? t[0] : rO) }),
		oO = lr.highest(yh.compute([sO], (t) => t.facet(sO)));
	function aO(t, e) {
		return Object.assign(Object.assign({}, e), { apply: iO(t) });
	}
	const lO = uh.domEventHandlers({
			mousedown(t, e) {
				let i,
					n = e.state.field(tO, !1);
				if (
					!n ||
					null == (i = e.posAtCoords({ x: t.clientX, y: t.clientY }))
				)
					return !1;
				let r = n.ranges.find((t) => t.from <= i && t.to >= i);
				return !(
					!r ||
					r.field == n.active ||
					(e.dispatch({
						selection: eO(n.ranges, r.field),
						effects: Kf.of(
							n.ranges.some((t) => t.field > r.field)
								? new Hf(n.ranges, r.field)
								: null
						),
						scrollIntoView: !0,
					}),
					0)
				);
			},
		}),
		hO = {
			brackets: ['(', '[', '{', "'", '"'],
			before: ')]}:;>',
			stringPrefixes: [],
		},
		cO = kr.define({
			map(t, e) {
				let i = e.mapPos(t, -1, En.TrackAfter);
				return null == i ? void 0 : i;
			},
		}),
		uO = new (class extends jr {})();
	(uO.startSide = 1), (uO.endSide = -1);
	const dO = or.define({
			create: () => Yr.empty,
			update(t, e) {
				if (((t = t.map(e.changes)), e.selection)) {
					let i = e.state.doc.lineAt(e.selection.main.head);
					t = t.update({ filter: (t) => t >= i.from && t <= i.to });
				}
				for (let i of e.effects)
					i.is(cO) &&
						(t = t.update({
							add: [uO.range(i.value, i.value + 1)],
						}));
				return t;
			},
		}),
		fO = '()[]{}<>';
	function OO(t) {
		for (let e = 0; e < 8; e += 2)
			if (fO.charCodeAt(e) == t) return fO.charAt(e + 1);
		return qn(t < 128 ? t : t + 1);
	}
	function pO(t, e) {
		return t.languageDataAt('closeBrackets', e)[0] || hO;
	}
	const mO =
			'object' == typeof navigator &&
			/Android\b/.test(navigator.userAgent),
		gO = uh.inputHandler.of((t, e, i, n) => {
			if ((mO ? t.composing : t.compositionStarted) || t.state.readOnly)
				return !1;
			let r = t.state.selection.main;
			if (
				n.length > 2 ||
				(2 == n.length && 1 == jn(Vn(n, 0))) ||
				e != r.from ||
				i != r.to
			)
				return !1;
			let s = (function (t, e) {
				let i = pO(t, t.selection.main.head),
					n = i.brackets || hO.brackets;
				for (let r of n) {
					let s = OO(Vn(r, 0));
					if (e == r)
						return s == r
							? xO(t, r, n.indexOf(r + r + r) > -1, i)
							: wO(t, r, s, i.before || hO.before);
					if (e == s && yO(t, t.selection.main.from))
						return SO(t, 0, s);
				}
				return null;
			})(t.state, n);
			return !!s && (t.dispatch(s), !0);
		}),
		bO = [
			{
				key: 'Backspace',
				run: ({ state: t, dispatch: e }) => {
					if (t.readOnly) return !1;
					let i =
							pO(t, t.selection.main.head).brackets ||
							hO.brackets,
						n = null,
						r = t.changeByRange((e) => {
							if (e.empty) {
								let n = (function (t, e) {
									let i = t.sliceString(e - 2, e);
									return jn(Vn(i, 0)) == i.length
										? i
										: i.slice(1);
								})(t.doc, e.head);
								for (let r of i)
									if (
										r == n &&
										vO(t.doc, e.head) == OO(Vn(r, 0))
									)
										return {
											changes: {
												from: e.head - r.length,
												to: e.head + r.length,
											},
											range: Fn.cursor(e.head - r.length),
										};
							}
							return { range: (n = e) };
						});
					return (
						n ||
							e(
								t.update(r, {
									scrollIntoView: !0,
									userEvent: 'delete.backward',
								})
							),
						!n
					);
				},
			},
		];
	function yO(t, e) {
		let i = !1;
		return (
			t.field(dO).between(0, t.doc.length, (t) => {
				t == e && (i = !0);
			}),
			i
		);
	}
	function vO(t, e) {
		let i = t.sliceString(e, e + 2);
		return i.slice(0, jn(Vn(i, 0)));
	}
	function wO(t, e, i, n) {
		let r = null,
			s = t.changeByRange((s) => {
				if (!s.empty)
					return {
						changes: [
							{ insert: e, from: s.from },
							{ insert: i, from: s.to },
						],
						effects: cO.of(s.to + e.length),
						range: Fn.range(s.anchor + e.length, s.head + e.length),
					};
				let o = vO(t.doc, s.head);
				return !o || /\s/.test(o) || n.indexOf(o) > -1
					? {
							changes: { insert: e + i, from: s.head },
							effects: cO.of(s.head + e.length),
							range: Fn.cursor(s.head + e.length),
						}
					: { range: (r = s) };
			});
		return r
			? null
			: t.update(s, { scrollIntoView: !0, userEvent: 'input.type' });
	}
	function SO(t, e, i) {
		let n = null,
			r = t.changeByRange((e) =>
				e.empty && vO(t.doc, e.head) == i
					? {
							changes: {
								from: e.head,
								to: e.head + i.length,
								insert: i,
							},
							range: Fn.cursor(e.head + i.length),
						}
					: (n = { range: e })
			);
		return n
			? null
			: t.update(r, { scrollIntoView: !0, userEvent: 'input.type' });
	}
	function xO(t, e, i, n) {
		let r = n.stringPrefixes || hO.stringPrefixes,
			s = null,
			o = t.changeByRange((n) => {
				if (!n.empty)
					return {
						changes: [
							{ insert: e, from: n.from },
							{ insert: e, from: n.to },
						],
						effects: cO.of(n.to + e.length),
						range: Fn.range(n.anchor + e.length, n.head + e.length),
					};
				let o,
					a = n.head,
					l = vO(t.doc, a);
				if (l == e) {
					if (QO(t, a))
						return {
							changes: { insert: e + e, from: a },
							effects: cO.of(a + e.length),
							range: Fn.cursor(a + e.length),
						};
					if (yO(t, a)) {
						let n =
							i && t.sliceDoc(a, a + 3 * e.length) == e + e + e
								? e + e + e
								: e;
						return {
							changes: { from: a, to: a + n.length, insert: n },
							range: Fn.cursor(a + n.length),
						};
					}
				} else {
					if (
						i &&
						t.sliceDoc(a - 2 * e.length, a) == e + e &&
						(o = kO(t, a - 2 * e.length, r)) > -1 &&
						QO(t, o)
					)
						return {
							changes: { insert: e + e + e + e, from: a },
							effects: cO.of(a + e.length),
							range: Fn.cursor(a + e.length),
						};
					if (
						t.charCategorizer(a)(l) != Mr.Word &&
						kO(t, a, r) > -1 &&
						!(function (t, e, i, n) {
							let r = ou(t).resolveInner(e, -1),
								s = n.reduce(
									(t, e) => Math.max(t, e.length),
									0
								);
							for (let o = 0; o < 5; o++) {
								let o = t.sliceDoc(
										r.from,
										Math.min(r.to, r.from + i.length + s)
									),
									a = o.indexOf(i);
								if (
									!a ||
									(a > -1 && n.indexOf(o.slice(0, a)) > -1)
								) {
									let e = r.firstChild;
									for (
										;
										e &&
										e.from == r.from &&
										e.to - e.from > i.length + a;

									) {
										if (
											t.sliceDoc(e.to - i.length, e.to) ==
											i
										)
											return !1;
										e = e.firstChild;
									}
									return !0;
								}
								let l = r.to == e && r.parent;
								if (!l) break;
								r = l;
							}
							return !1;
						})(t, a, e, r)
					)
						return {
							changes: { insert: e + e, from: a },
							effects: cO.of(a + e.length),
							range: Fn.cursor(a + e.length),
						};
				}
				return { range: (s = n) };
			});
		return s
			? null
			: t.update(o, { scrollIntoView: !0, userEvent: 'input.type' });
	}
	function QO(t, e) {
		let i = ou(t).resolveInner(e + 1);
		return i.parent && i.from == e;
	}
	function kO(t, e, i) {
		let n = t.charCategorizer(e);
		if (n(t.sliceDoc(e - 1, e)) != Mr.Word) return e;
		for (let r of i) {
			let i = e - r.length;
			if (t.sliceDoc(i, e) == r && n(t.sliceDoc(i - 1, i)) != Mr.Word)
				return i;
		}
		return -1;
	}
	const $O = [
			{ key: 'Ctrl-Space', run: Ef },
			{ mac: 'Alt-`', run: Ef },
			{
				key: 'Escape',
				run: (t) => {
					let e = t.state.field(Vf, !1);
					return !(
						!e ||
						!e.active.some((t) => 0 != t.state) ||
						(t.dispatch({ effects: pf.of(null) }), 0)
					);
				},
			},
			{ key: 'ArrowDown', run: Df(!0) },
			{ key: 'ArrowUp', run: Df(!1) },
			{ key: 'PageDown', run: Df(!0, 'page') },
			{ key: 'PageUp', run: Df(!1, 'page') },
			{
				key: 'Enter',
				run: (t) => {
					let e = t.state.field(Vf, !1);
					return (
						!(
							t.state.readOnly ||
							!e ||
							!e.open ||
							e.open.selected < 0 ||
							e.open.disabled ||
							Date.now() - e.open.timestamp <
								t.state.facet(bf).interactionDelay
						) && qf(t, e.open.options[e.open.selected])
					);
				},
			},
		],
		PO = lr.highest(
			yh.computeN([bf], (t) => (t.facet(bf).defaultKeymap ? [$O] : []))
		),
		ZO = [
			aO('function ${name}(${params}) {\n\t${}\n}', {
				label: 'function',
				detail: 'definition',
				type: 'keyword',
			}),
			aO(
				'for (let ${index} = 0; ${index} < ${bound}; ${index}++) {\n\t${}\n}',
				{ label: 'for', detail: 'loop', type: 'keyword' }
			),
			aO('for (let ${name} of ${collection}) {\n\t${}\n}', {
				label: 'for',
				detail: 'of loop',
				type: 'keyword',
			}),
			aO('do {\n\t${}\n} while (${})', {
				label: 'do',
				detail: 'loop',
				type: 'keyword',
			}),
			aO('while (${}) {\n\t${}\n}', {
				label: 'while',
				detail: 'loop',
				type: 'keyword',
			}),
			aO('try {\n\t${}\n} catch (${error}) {\n\t${}\n}', {
				label: 'try',
				detail: '/ catch block',
				type: 'keyword',
			}),
			aO('if (${}) {\n\t${}\n}', {
				label: 'if',
				detail: 'block',
				type: 'keyword',
			}),
			aO('if (${}) {\n\t${}\n} else {\n\t${}\n}', {
				label: 'if',
				detail: '/ else block',
				type: 'keyword',
			}),
			aO('class ${name} {\n\tconstructor(${params}) {\n\t\t${}\n\t}\n}', {
				label: 'class',
				detail: 'definition',
				type: 'keyword',
			}),
			aO('import {${names}} from "${module}"\n${}', {
				label: 'import',
				detail: 'named',
				type: 'keyword',
			}),
			aO('import ${name} from "${module}"\n${}', {
				label: 'import',
				detail: 'default',
				type: 'keyword',
			}),
		],
		TO = ZO.concat([
			aO('interface ${name} {\n\t${}\n}', {
				label: 'interface',
				detail: 'definition',
				type: 'keyword',
			}),
			aO('type ${name} = ${type}', {
				label: 'type',
				detail: 'definition',
				type: 'keyword',
			}),
			aO('enum ${name} {\n\t${}\n}', {
				label: 'enum',
				detail: 'definition',
				type: 'keyword',
			}),
		]),
		CO = new fe(),
		AO = new Set([
			'Script',
			'Block',
			'FunctionExpression',
			'FunctionDeclaration',
			'ArrowFunction',
			'MethodDeclaration',
			'ForStatement',
		]);
	function XO(t) {
		return (e, i) => {
			let n = e.node.getChild('VariableDefinition');
			return n && i(n, t), !0;
		};
	}
	const MO = ['FunctionDeclaration'],
		RO = {
			FunctionDeclaration: XO('function'),
			ClassDeclaration: XO('class'),
			ClassExpression: () => !0,
			EnumDeclaration: XO('constant'),
			TypeAliasDeclaration: XO('type'),
			NamespaceDeclaration: XO('namespace'),
			VariableDefinition(t, e) {
				t.matchContext(MO) || e(t, 'variable');
			},
			TypeDefinition(t, e) {
				e(t, 'type');
			},
			__proto__: null,
		};
	function _O(t, e) {
		let i = CO.get(e);
		if (i) return i;
		let n = [],
			r = !0;
		function s(e, i) {
			let r = t.sliceString(e.from, e.to);
			n.push({ label: r, type: i });
		}
		return (
			e.cursor(Gt.IncludeAnonymous).iterate((e) => {
				if (r) r = !1;
				else if (e.name) {
					let t = RO[e.name];
					if ((t && t(e, s)) || AO.has(e.name)) return !1;
				} else if (e.to - e.from > 8192) {
					for (let i of _O(t, e.node)) n.push(i);
					return !1;
				}
			}),
			CO.set(e, n),
			n
		);
	}
	const VO = /^[\w$\xa1-\uffff][\w$\d\xa1-\uffff]*$/,
		qO = [
			'TemplateString',
			'String',
			'RegExp',
			'LineComment',
			'BlockComment',
			'VariableDefinition',
			'TypeDefinition',
			'Label',
			'PropertyDefinition',
			'PropertyName',
			'PrivatePropertyDefinition',
			'PrivatePropertyName',
			'.',
			'?.',
		];
	function jO(t) {
		let e = ou(t.state).resolveInner(t.pos, -1);
		if (qO.indexOf(e.name) > -1) return null;
		let i =
			'VariableName' == e.name ||
			(e.to - e.from < 20 && VO.test(t.state.sliceDoc(e.from, e.to)));
		if (!i && !t.explicit) return null;
		let n = [];
		for (let i = e; i; i = i.parent)
			AO.has(i.name) && (n = n.concat(_O(t.state.doc, i)));
		return { options: n, from: i ? e.from : t.pos, validFor: VO };
	}
	const DO = su.define({
			name: 'javascript',
			parser: rf.configure({
				props: [
					xu.add({
						IfStatement: Au({ except: /^\s*({|else\b)/ }),
						TryStatement: Au({
							except: /^\s*({|catch\b|finally\b)/,
						}),
						LabeledStatement: (t) => t.baseIndent,
						SwitchBody: (t) => {
							let e = t.textAfter,
								i = /^\s*\}/.test(e),
								n = /^\s*(case|default)\b/.test(e);
							return t.baseIndent + (i ? 0 : n ? 1 : 2) * t.unit;
						},
						Block: Tu({ closing: '}' }),
						ArrowFunction: (t) => t.baseIndent + t.unit,
						'TemplateString BlockComment': () => null,
						'Statement Property': Au({ except: /^{/ }),
						JSXElement(t) {
							let e = /^\s*<\//.test(t.textAfter);
							return t.lineIndent(t.node.from) + (e ? 0 : t.unit);
						},
						JSXEscape(t) {
							let e = /\s*\}/.test(t.textAfter);
							return t.lineIndent(t.node.from) + (e ? 0 : t.unit);
						},
						'JSXOpenTag JSXSelfClosingTag': (t) =>
							t.column(t.node.from) + t.unit,
					}),
					Mu.add({
						'Block ClassBody SwitchBody EnumBody ObjectExpression ArrayExpression ObjectType':
							Ru,
						BlockComment: (t) => ({
							from: t.from + 2,
							to: t.to - 2,
						}),
					}),
				],
			}),
			languageData: {
				closeBrackets: { brackets: ['(', '[', '{', "'", '"', '`'] },
				commentTokens: {
					line: '//',
					block: { open: '/*', close: '*/' },
				},
				indentOnInput: /^\s*(?:case |default:|\{|\}|<\/)$/,
				wordChars: '$',
			},
		}),
		EO = {
			test: (t) => /^JSX/.test(t.name),
			facet: eu({
				commentTokens: { block: { open: '{/*', close: '*/}' } },
			}),
		},
		WO = DO.configure({ dialect: 'ts' }, 'typescript'),
		YO = DO.configure({
			dialect: 'jsx',
			props: [iu.add((t) => (t.isTop ? [EO] : void 0))],
		}),
		zO = DO.configure(
			{
				dialect: 'jsx ts',
				props: [iu.add((t) => (t.isTop ? [EO] : void 0))],
			},
			'typescript'
		);
	let LO = (t) => ({ label: t, type: 'keyword' });
	const BO =
			'break case const continue default delete export extends false finally in instanceof let new return static super switch this throw true typeof var yield'
				.split(' ')
				.map(LO),
		UO = BO.concat(
			['declare', 'implements', 'private', 'protected', 'public'].map(LO)
		);
	function NO(t = {}) {
		let e = t.jsx ? (t.typescript ? zO : YO) : t.typescript ? WO : DO,
			i = t.typescript ? TO.concat(UO) : ZO.concat(BO);
		return new mu(e, [
			DO.data.of({
				autocomplete:
					((n = qO),
					(r = af(i)),
					(t) => {
						for (
							let e = ou(t.state).resolveInner(t.pos, -1);
							e;
							e = e.parent
						) {
							if (n.indexOf(e.name) > -1) return null;
							if (e.type.isTop) break;
						}
						return r(t);
					}),
			}),
			DO.data.of({ autocomplete: jO }),
			t.jsx ? FO : [],
		]);
		var n, r;
	}
	function GO(t, e, i = t.length) {
		for (let n = null == e ? void 0 : e.firstChild; n; n = n.nextSibling)
			if (
				'JSXIdentifier' == n.name ||
				'JSXBuiltin' == n.name ||
				'JSXNamespacedName' == n.name ||
				'JSXMemberExpression' == n.name
			)
				return t.sliceString(n.from, Math.min(n.to, i));
		return '';
	}
	const IO =
			'object' == typeof navigator &&
			/Android\b/.test(navigator.userAgent),
		FO = uh.inputHandler.of((t, e, i, n, r) => {
			if (
				(IO ? t.composing : t.compositionStarted) ||
				t.state.readOnly ||
				e != i ||
				('>' != n && '/' != n) ||
				!DO.isActiveAt(t.state, e, -1)
			)
				return !1;
			let s = r(),
				{ state: o } = s,
				a = o.changeByRange((t) => {
					var e;
					let i,
						{ head: r } = t,
						s = ou(o).resolveInner(r - 1, -1);
					if (
						('JSXStartTag' == s.name && (s = s.parent),
						o.doc.sliceString(r - 1, r) != n ||
							('JSXAttributeValue' == s.name && s.to > r))
					);
					else {
						if ('>' == n && 'JSXFragmentTag' == s.name)
							return {
								range: t,
								changes: { from: r, insert: '</>' },
							};
						if ('/' == n && 'JSXStartCloseTag' == s.name) {
							let t = s.parent,
								n = t.parent;
							if (
								n &&
								t.from == r - 2 &&
								((i = GO(o.doc, n.firstChild, r)) ||
									'JSXFragmentTag' ==
										(null === (e = n.firstChild) ||
										void 0 === e
											? void 0
											: e.name))
							) {
								let t = `${i}>`;
								return {
									range: Fn.cursor(r + t.length, -1),
									changes: { from: r, insert: t },
								};
							}
						} else if ('>' == n) {
							let e = (function (t) {
								for (;;) {
									if (
										'JSXOpenTag' == t.name ||
										'JSXSelfClosingTag' == t.name ||
										'JSXFragmentTag' == t.name
									)
										return t;
									if ('JSXEscape' == t.name || !t.parent)
										return null;
									t = t.parent;
								}
							})(s);
							if (
								e &&
								'JSXOpenTag' == e.name &&
								!/^\/?>|^<\//.test(
									o.doc.sliceString(r, r + 2)
								) &&
								(i = GO(o.doc, e, r))
							)
								return {
									range: t,
									changes: { from: r, insert: `</${i}>` },
								};
						}
					}
					return { range: t };
				});
			return (
				!a.changes.empty &&
				(t.dispatch([
					s,
					o.update(a, {
						userEvent: 'input.complete',
						scrollIntoView: !0,
					}),
				]),
				!0)
			);
		}),
		HO = ['_blank', '_self', '_top', '_parent'],
		KO = ['ascii', 'utf-8', 'utf-16', 'latin1', 'latin1'],
		JO = ['get', 'post', 'put', 'delete'],
		tp = [
			'application/x-www-form-urlencoded',
			'multipart/form-data',
			'text/plain',
		],
		ep = ['true', 'false'],
		ip = {},
		np = {
			a: {
				attrs: {
					href: null,
					ping: null,
					type: null,
					media: null,
					target: HO,
					hreflang: null,
				},
			},
			abbr: ip,
			address: ip,
			area: {
				attrs: {
					alt: null,
					coords: null,
					href: null,
					target: null,
					ping: null,
					media: null,
					hreflang: null,
					type: null,
					shape: ['default', 'rect', 'circle', 'poly'],
				},
			},
			article: ip,
			aside: ip,
			audio: {
				attrs: {
					src: null,
					mediagroup: null,
					crossorigin: ['anonymous', 'use-credentials'],
					preload: ['none', 'metadata', 'auto'],
					autoplay: ['autoplay'],
					loop: ['loop'],
					controls: ['controls'],
				},
			},
			b: ip,
			base: { attrs: { href: null, target: HO } },
			bdi: ip,
			bdo: ip,
			blockquote: { attrs: { cite: null } },
			body: ip,
			br: ip,
			button: {
				attrs: {
					form: null,
					formaction: null,
					name: null,
					value: null,
					autofocus: ['autofocus'],
					disabled: ['autofocus'],
					formenctype: tp,
					formmethod: JO,
					formnovalidate: ['novalidate'],
					formtarget: HO,
					type: ['submit', 'reset', 'button'],
				},
			},
			canvas: { attrs: { width: null, height: null } },
			caption: ip,
			center: ip,
			cite: ip,
			code: ip,
			col: { attrs: { span: null } },
			colgroup: { attrs: { span: null } },
			command: {
				attrs: {
					type: ['command', 'checkbox', 'radio'],
					label: null,
					icon: null,
					radiogroup: null,
					command: null,
					title: null,
					disabled: ['disabled'],
					checked: ['checked'],
				},
			},
			data: { attrs: { value: null } },
			datagrid: {
				attrs: { disabled: ['disabled'], multiple: ['multiple'] },
			},
			datalist: { attrs: { data: null } },
			dd: ip,
			del: { attrs: { cite: null, datetime: null } },
			details: { attrs: { open: ['open'] } },
			dfn: ip,
			div: ip,
			dl: ip,
			dt: ip,
			em: ip,
			embed: {
				attrs: { src: null, type: null, width: null, height: null },
			},
			eventsource: { attrs: { src: null } },
			fieldset: {
				attrs: { disabled: ['disabled'], form: null, name: null },
			},
			figcaption: ip,
			figure: ip,
			footer: ip,
			form: {
				attrs: {
					action: null,
					name: null,
					'accept-charset': KO,
					autocomplete: ['on', 'off'],
					enctype: tp,
					method: JO,
					novalidate: ['novalidate'],
					target: HO,
				},
			},
			h1: ip,
			h2: ip,
			h3: ip,
			h4: ip,
			h5: ip,
			h6: ip,
			head: {
				children: [
					'title',
					'base',
					'link',
					'style',
					'meta',
					'script',
					'noscript',
					'command',
				],
			},
			header: ip,
			hgroup: ip,
			hr: ip,
			html: { attrs: { manifest: null } },
			i: ip,
			iframe: {
				attrs: {
					src: null,
					srcdoc: null,
					name: null,
					width: null,
					height: null,
					sandbox: [
						'allow-top-navigation',
						'allow-same-origin',
						'allow-forms',
						'allow-scripts',
					],
					seamless: ['seamless'],
				},
			},
			img: {
				attrs: {
					alt: null,
					src: null,
					ismap: null,
					usemap: null,
					width: null,
					height: null,
					crossorigin: ['anonymous', 'use-credentials'],
				},
			},
			input: {
				attrs: {
					alt: null,
					dirname: null,
					form: null,
					formaction: null,
					height: null,
					list: null,
					max: null,
					maxlength: null,
					min: null,
					name: null,
					pattern: null,
					placeholder: null,
					size: null,
					src: null,
					step: null,
					value: null,
					width: null,
					accept: ['audio/*', 'video/*', 'image/*'],
					autocomplete: ['on', 'off'],
					autofocus: ['autofocus'],
					checked: ['checked'],
					disabled: ['disabled'],
					formenctype: tp,
					formmethod: JO,
					formnovalidate: ['novalidate'],
					formtarget: HO,
					multiple: ['multiple'],
					readonly: ['readonly'],
					required: ['required'],
					type: [
						'hidden',
						'text',
						'search',
						'tel',
						'url',
						'email',
						'password',
						'datetime',
						'date',
						'month',
						'week',
						'time',
						'datetime-local',
						'number',
						'range',
						'color',
						'checkbox',
						'radio',
						'file',
						'submit',
						'image',
						'reset',
						'button',
					],
				},
			},
			ins: { attrs: { cite: null, datetime: null } },
			kbd: ip,
			keygen: {
				attrs: {
					challenge: null,
					form: null,
					name: null,
					autofocus: ['autofocus'],
					disabled: ['disabled'],
					keytype: ['RSA'],
				},
			},
			label: { attrs: { for: null, form: null } },
			legend: ip,
			li: { attrs: { value: null } },
			link: {
				attrs: {
					href: null,
					type: null,
					hreflang: null,
					media: null,
					sizes: ['all', '16x16', '16x16 32x32', '16x16 32x32 64x64'],
				},
			},
			map: { attrs: { name: null } },
			mark: ip,
			menu: {
				attrs: { label: null, type: ['list', 'context', 'toolbar'] },
			},
			meta: {
				attrs: {
					content: null,
					charset: KO,
					name: [
						'viewport',
						'application-name',
						'author',
						'description',
						'generator',
						'keywords',
					],
					'http-equiv': [
						'content-language',
						'content-type',
						'default-style',
						'refresh',
					],
				},
			},
			meter: {
				attrs: {
					value: null,
					min: null,
					low: null,
					high: null,
					max: null,
					optimum: null,
				},
			},
			nav: ip,
			noscript: ip,
			object: {
				attrs: {
					data: null,
					type: null,
					name: null,
					usemap: null,
					form: null,
					width: null,
					height: null,
					typemustmatch: ['typemustmatch'],
				},
			},
			ol: {
				attrs: {
					reversed: ['reversed'],
					start: null,
					type: ['1', 'a', 'A', 'i', 'I'],
				},
				children: ['li', 'script', 'template', 'ul', 'ol'],
			},
			optgroup: { attrs: { disabled: ['disabled'], label: null } },
			option: {
				attrs: {
					disabled: ['disabled'],
					label: null,
					selected: ['selected'],
					value: null,
				},
			},
			output: { attrs: { for: null, form: null, name: null } },
			p: ip,
			param: { attrs: { name: null, value: null } },
			pre: ip,
			progress: { attrs: { value: null, max: null } },
			q: { attrs: { cite: null } },
			rp: ip,
			rt: ip,
			ruby: ip,
			samp: ip,
			script: {
				attrs: {
					type: ['text/javascript'],
					src: null,
					async: ['async'],
					defer: ['defer'],
					charset: KO,
				},
			},
			section: ip,
			select: {
				attrs: {
					form: null,
					name: null,
					size: null,
					autofocus: ['autofocus'],
					disabled: ['disabled'],
					multiple: ['multiple'],
				},
			},
			slot: { attrs: { name: null } },
			small: ip,
			source: { attrs: { src: null, type: null, media: null } },
			span: ip,
			strong: ip,
			style: { attrs: { type: ['text/css'], media: null, scoped: null } },
			sub: ip,
			summary: ip,
			sup: ip,
			table: ip,
			tbody: ip,
			td: { attrs: { colspan: null, rowspan: null, headers: null } },
			template: ip,
			textarea: {
				attrs: {
					dirname: null,
					form: null,
					maxlength: null,
					name: null,
					placeholder: null,
					rows: null,
					cols: null,
					autofocus: ['autofocus'],
					disabled: ['disabled'],
					readonly: ['readonly'],
					required: ['required'],
					wrap: ['soft', 'hard'],
				},
			},
			tfoot: ip,
			th: {
				attrs: {
					colspan: null,
					rowspan: null,
					headers: null,
					scope: ['row', 'col', 'rowgroup', 'colgroup'],
				},
			},
			thead: ip,
			time: { attrs: { datetime: null } },
			title: ip,
			tr: ip,
			track: {
				attrs: {
					src: null,
					label: null,
					default: null,
					kind: [
						'subtitles',
						'captions',
						'descriptions',
						'chapters',
						'metadata',
					],
					srclang: null,
				},
			},
			ul: { children: ['li', 'script', 'template', 'ul', 'ol'] },
			var: ip,
			video: {
				attrs: {
					src: null,
					poster: null,
					width: null,
					height: null,
					crossorigin: ['anonymous', 'use-credentials'],
					preload: ['auto', 'metadata', 'none'],
					autoplay: ['autoplay'],
					mediagroup: ['movie'],
					muted: ['muted'],
					controls: ['controls'],
				},
			},
			wbr: ip,
		},
		rp = {
			accesskey: null,
			class: null,
			contenteditable: ep,
			contextmenu: null,
			dir: ['ltr', 'rtl', 'auto'],
			draggable: ['true', 'false', 'auto'],
			dropzone: ['copy', 'move', 'link', 'string:', 'file:'],
			hidden: ['hidden'],
			id: null,
			inert: ['inert'],
			itemid: null,
			itemprop: null,
			itemref: null,
			itemscope: ['itemscope'],
			itemtype: null,
			lang: [
				'ar',
				'bn',
				'de',
				'en-GB',
				'en-US',
				'es',
				'fr',
				'hi',
				'id',
				'ja',
				'pa',
				'pt',
				'ru',
				'tr',
				'zh',
			],
			spellcheck: ep,
			autocorrect: ep,
			autocapitalize: ep,
			style: null,
			tabindex: null,
			title: null,
			translate: ['yes', 'no'],
			rel: [
				'stylesheet',
				'alternate',
				'author',
				'bookmark',
				'help',
				'license',
				'next',
				'nofollow',
				'noreferrer',
				'prefetch',
				'prev',
				'search',
				'tag',
			],
			role: 'alert application article banner button cell checkbox complementary contentinfo dialog document feed figure form grid gridcell heading img list listbox listitem main navigation region row rowgroup search switch tab table tabpanel textbox timer'.split(
				' '
			),
			'aria-activedescendant': null,
			'aria-atomic': ep,
			'aria-autocomplete': ['inline', 'list', 'both', 'none'],
			'aria-busy': ep,
			'aria-checked': ['true', 'false', 'mixed', 'undefined'],
			'aria-controls': null,
			'aria-describedby': null,
			'aria-disabled': ep,
			'aria-dropeffect': null,
			'aria-expanded': ['true', 'false', 'undefined'],
			'aria-flowto': null,
			'aria-grabbed': ['true', 'false', 'undefined'],
			'aria-haspopup': ep,
			'aria-hidden': ep,
			'aria-invalid': ['true', 'false', 'grammar', 'spelling'],
			'aria-label': null,
			'aria-labelledby': null,
			'aria-level': null,
			'aria-live': ['off', 'polite', 'assertive'],
			'aria-multiline': ep,
			'aria-multiselectable': ep,
			'aria-owns': null,
			'aria-posinset': null,
			'aria-pressed': ['true', 'false', 'mixed', 'undefined'],
			'aria-readonly': ep,
			'aria-relevant': null,
			'aria-required': ep,
			'aria-selected': ['true', 'false', 'undefined'],
			'aria-setsize': null,
			'aria-sort': ['ascending', 'descending', 'none', 'other'],
			'aria-valuemax': null,
			'aria-valuemin': null,
			'aria-valuenow': null,
			'aria-valuetext': null,
		},
		sp =
			'beforeunload copy cut dragstart dragover dragleave dragenter dragend drag paste focus blur change click load mousedown mouseenter mouseleave mouseup keydown keyup resize scroll unload'
				.split(' ')
				.map((t) => 'on' + t);
	for (let t of sp) rp[t] = null;
	class op {
		constructor(t, e) {
			(this.tags = Object.assign(Object.assign({}, np), t)),
				(this.globalAttrs = Object.assign(Object.assign({}, rp), e)),
				(this.allTags = Object.keys(this.tags)),
				(this.globalAttrNames = Object.keys(this.globalAttrs));
		}
	}
	function ap(t, e, i = t.length) {
		if (!e) return '';
		let n = e.firstChild,
			r = n && n.getChild('TagName');
		return r ? t.sliceString(r.from, Math.min(r.to, i)) : '';
	}
	function lp(t, e = !1) {
		for (; t; t = t.parent)
			if ('Element' == t.name) {
				if (!e) return t;
				e = !1;
			}
		return null;
	}
	function hp(t, e, i) {
		let n = i.tags[ap(t, lp(e))];
		return (null == n ? void 0 : n.children) || i.allTags;
	}
	function cp(t, e) {
		let i = [];
		for (let n = lp(e); n && !n.type.isTop; n = lp(n.parent)) {
			let r = ap(t, n);
			if (r && 'CloseTag' == n.lastChild.name) break;
			r &&
				i.indexOf(r) < 0 &&
				('EndTag' == e.name || e.from >= n.firstChild.to) &&
				i.push(r);
		}
		return i;
	}
	op.default = new op();
	const up = /^[:\-\.\w\u00b7-\uffff]*$/;
	function dp(t, e, i, n, r) {
		let s = /\s*>/.test(t.sliceDoc(r, r + 5)) ? '' : '>',
			o = lp(i, !0);
		return {
			from: n,
			to: r,
			options: hp(t.doc, o, e)
				.map((t) => ({ label: t, type: 'type' }))
				.concat(
					cp(t.doc, i).map((t, e) => ({
						label: '/' + t,
						apply: '/' + t + s,
						type: 'type',
						boost: 99 - e,
					}))
				),
			validFor: /^\/?[:\-\.\w\u00b7-\uffff]*$/,
		};
	}
	function fp(t, e, i, n) {
		let r = /\s*>/.test(t.sliceDoc(n, n + 5)) ? '' : '>';
		return {
			from: i,
			to: n,
			options: cp(t.doc, e).map((t, e) => ({
				label: t,
				apply: t + r,
				type: 'type',
				boost: 99 - e,
			})),
			validFor: up,
		};
	}
	function Op(t) {
		let { extraTags: e, extraGlobalAttributes: i } = t,
			n = i || e ? new op(e, i) : op.default;
		return (t) =>
			(function (t, e) {
				let { state: i, pos: n } = e,
					r = ou(i).resolveInner(n, -1),
					s = r.resolve(n);
				for (let t, e = n; s == r && (t = r.childBefore(e)); ) {
					let i = t.lastChild;
					if (!i || !i.type.isError || i.from < i.to) break;
					(s = r = t), (e = i.from);
				}
				return 'TagName' == r.name
					? r.parent && /CloseTag$/.test(r.parent.name)
						? fp(i, r, r.from, n)
						: dp(i, t, r, r.from, n)
					: 'StartTag' == r.name
						? dp(i, t, r, n, n)
						: 'StartCloseTag' == r.name ||
							  'IncompleteCloseTag' == r.name
							? fp(i, r, n, n)
							: 'OpenTag' == r.name ||
								  'SelfClosingTag' == r.name ||
								  'AttributeName' == r.name
								? (function (t, e, i, n, r) {
										let s = lp(i),
											o = s ? e.tags[ap(t.doc, s)] : null,
											a =
												o && o.attrs
													? Object.keys(o.attrs)
													: [];
										return {
											from: n,
											to: r,
											options: (o && !1 === o.globalAttrs
												? a
												: a.length
													? a.concat(
															e.globalAttrNames
														)
													: e.globalAttrNames
											).map((t) => ({
												label: t,
												type: 'property',
											})),
											validFor: up,
										};
									})(
										i,
										t,
										r,
										'AttributeName' == r.name ? r.from : n,
										n
									)
								: 'Is' == r.name ||
									  'AttributeValue' == r.name ||
									  'UnquotedAttributeValue' == r.name
									? (function (t, e, i, n, r) {
											var s;
											let o,
												a =
													null === (s = i.parent) ||
													void 0 === s
														? void 0
														: s.getChild(
																'AttributeName'
															),
												l = [];
											if (a) {
												let s = t.sliceDoc(
														a.from,
														a.to
													),
													h = e.globalAttrs[s];
												if (!h) {
													let n = lp(i),
														r = n
															? e.tags[
																	ap(t.doc, n)
																]
															: null;
													h =
														(null == r
															? void 0
															: r.attrs) &&
														r.attrs[s];
												}
												if (h) {
													let e = t
															.sliceDoc(n, r)
															.toLowerCase(),
														i = '"',
														s = '"';
													/^['"]/.test(e)
														? ((o =
																'"' == e[0]
																	? /^[^"]*$/
																	: /^[^']*$/),
															(i = ''),
															(s =
																t.sliceDoc(
																	r,
																	r + 1
																) == e[0]
																	? ''
																	: e[0]),
															(e = e.slice(1)),
															n++)
														: (o = /^[^\s<>='"]*$/);
													for (let t of h)
														l.push({
															label: t,
															apply: i + t + s,
															type: 'constant',
														});
												}
											}
											return {
												from: n,
												to: r,
												options: l,
												validFor: o,
											};
										})(
											i,
											t,
											r,
											'Is' == r.name ? n : r.from,
											n
										)
									: !e.explicit ||
										  ('Element' != s.name &&
												'Text' != s.name &&
												'Document' != s.name)
										? null
										: (function (t, e, i, n) {
												let r = [],
													s = 0;
												for (let n of hp(t.doc, i, e))
													r.push({
														label: '<' + n,
														type: 'type',
													});
												for (let e of cp(t.doc, i))
													r.push({
														label: '</' + e + '>',
														type: 'type',
														boost: 99 - s++,
													});
												return {
													from: n,
													to: n,
													options: r,
													validFor:
														/^<\/?[:\-\.\w\u00b7-\uffff]*$/,
												};
											})(i, t, r, n);
			})(n, t);
	}
	const pp = DO.parser.configure({ top: 'SingleExpression' }),
		mp = [
			{
				tag: 'script',
				attrs: (t) => 'text/typescript' == t.type || 'ts' == t.lang,
				parser: WO.parser,
			},
			{
				tag: 'script',
				attrs: (t) => 'text/babel' == t.type || 'text/jsx' == t.type,
				parser: YO.parser,
			},
			{
				tag: 'script',
				attrs: (t) => 'text/typescript-jsx' == t.type,
				parser: zO.parser,
			},
			{
				tag: 'script',
				attrs: (t) =>
					/^(importmap|speculationrules|application\/(.+\+)?json)$/i.test(
						t.type
					),
				parser: pp,
			},
			{
				tag: 'script',
				attrs: (t) =>
					!t.type ||
					/^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i.test(
						t.type
					),
				parser: DO.parser,
			},
			{
				tag: 'style',
				attrs: (t) =>
					(!t.lang || 'css' == t.lang) &&
					(!t.type ||
						/^(text\/)?(x-)?(stylesheet|css)$/i.test(t.type)),
				parser: Ld.parser,
			},
		],
		gp = [
			{ name: 'style', parser: Ld.parser.configure({ top: 'Styles' }) },
		].concat(sp.map((t) => ({ name: t, parser: DO.parser }))),
		bp = su.define({
			name: 'html',
			parser: Fi.configure({
				props: [
					xu.add({
						Element(t) {
							let e = /^(\s*)(<\/)?/.exec(t.textAfter);
							return t.node.to <= t.pos + e[0].length
								? t.continue()
								: t.lineIndent(t.node.from) +
										(e[2] ? 0 : t.unit);
						},
						'OpenTag CloseTag SelfClosingTag': (t) =>
							t.column(t.node.from) + t.unit,
						Document(t) {
							if (
								t.pos + /\s*/.exec(t.textAfter)[0].length <
								t.node.to
							)
								return t.continue();
							let e,
								i = null;
							for (let e = t.node; ; ) {
								let t = e.lastChild;
								if (!t || 'Element' != t.name || t.to != e.to)
									break;
								i = e = t;
							}
							return i &&
								(!(e = i.lastChild) ||
									('CloseTag' != e.name &&
										'SelfClosingTag' != e.name))
								? t.lineIndent(i.from) + t.unit
								: null;
						},
					}),
					Mu.add({
						Element(t) {
							let e = t.firstChild,
								i = t.lastChild;
							return e && 'OpenTag' == e.name
								? {
										from: e.to,
										to:
											'CloseTag' == i.name
												? i.from
												: t.to,
									}
								: null;
						},
					}),
					bd.add({
						'OpenTag CloseTag': (t) => t.getChild('TagName'),
					}),
				],
			}),
			languageData: {
				commentTokens: { block: { open: '\x3c!--', close: '--\x3e' } },
				indentOnInput: /^\s*<\/\w+\W$/,
				wordChars: '-._',
			},
		}),
		yp = bp.configure({ wrap: tn(mp, gp) });
	function vp(t = {}) {
		let e,
			i = '';
		!1 === t.matchClosingTags && (i = 'noMatch'),
			!0 === t.selfClosingTags &&
				(i = (i ? i + ' ' : '') + 'selfClosing'),
			((t.nestedLanguages && t.nestedLanguages.length) ||
				(t.nestedAttributes && t.nestedAttributes.length)) &&
				(e = tn(
					(t.nestedLanguages || []).concat(mp),
					(t.nestedAttributes || []).concat(gp)
				));
		let n = e
			? bp.configure({ wrap: e, dialect: i })
			: i
				? yp.configure({ dialect: i })
				: yp;
		return new mu(n, [
			yp.data.of({ autocomplete: Op(t) }),
			!1 !== t.autoCloseTags ? Sp : [],
			NO().support,
			new mu(Ld, Ld.data.of({ autocomplete: zd })).support,
		]);
	}
	const wp = new Set(
			'area base br col command embed frame hr img input keygen link meta param source track wbr menuitem'.split(
				' '
			)
		),
		Sp = uh.inputHandler.of((t, e, i, n, r) => {
			if (
				t.composing ||
				t.state.readOnly ||
				e != i ||
				('>' != n && '/' != n) ||
				!yp.isActiveAt(t.state, e, -1)
			)
				return !1;
			let s = r(),
				{ state: o } = s,
				a = o.changeByRange((t) => {
					var e, i, r;
					let s,
						a = o.doc.sliceString(t.from - 1, t.to) == n,
						{ head: l } = t,
						h = ou(o).resolveInner(l, -1);
					if (a && '>' == n && 'EndTag' == h.name) {
						let n = h.parent;
						if (
							'CloseTag' !=
								(null ===
									(i =
										null === (e = n.parent) || void 0 === e
											? void 0
											: e.lastChild) || void 0 === i
									? void 0
									: i.name) &&
							(s = ap(o.doc, n.parent, l)) &&
							!wp.has(s)
						)
							return {
								range: t,
								changes: {
									from: l,
									to:
										l +
										('>' === o.doc.sliceString(l, l + 1)
											? 1
											: 0),
									insert: `</${s}>`,
								},
							};
					} else if (
						a &&
						'/' == n &&
						'IncompleteCloseTag' == h.name
					) {
						let t = h.parent;
						if (
							h.from == l - 2 &&
							'CloseTag' !=
								(null === (r = t.lastChild) || void 0 === r
									? void 0
									: r.name) &&
							(s = ap(o.doc, t, l)) &&
							!wp.has(s)
						) {
							let t =
									l +
									('>' === o.doc.sliceString(l, l + 1)
										? 1
										: 0),
								e = `${s}>`;
							return {
								range: Fn.cursor(l + e.length, -1),
								changes: { from: l, to: t, insert: e },
							};
						}
					}
					return { range: t };
				});
			return (
				!a.changes.empty &&
				(t.dispatch([
					s,
					o.update(a, {
						userEvent: 'input.complete',
						scrollIntoView: !0,
					}),
				]),
				!0)
			);
		});
	function xp() {
		return (
			(xp = Object.assign
				? Object.assign.bind()
				: function (t) {
						for (var e = 1; e < arguments.length; e++) {
							var i = arguments[e];
							for (var n in i)
								({}).hasOwnProperty.call(i, n) && (t[n] = i[n]);
						}
						return t;
					}),
			xp.apply(null, arguments)
		);
	}
	function Qp(t, e) {
		return ({ state: i, dispatch: n }) => {
			if (i.readOnly) return !1;
			let r = t(e, i);
			return !!r && (n(i.update(r)), !0);
		};
	}
	const kp = Qp(Ap, 0),
		$p = Qp(Cp, 0),
		Pp = Qp(
			(t, e) =>
				Cp(
					t,
					e,
					(function (t) {
						let e = [];
						for (let i of t.selection.ranges) {
							let n = t.doc.lineAt(i.from),
								r = i.to <= n.to ? n : t.doc.lineAt(i.to);
							r.from > n.from &&
								r.from == i.to &&
								(r =
									i.to == n.to + 1
										? n
										: t.doc.lineAt(i.to - 1));
							let s = e.length - 1;
							s >= 0 && e[s].to > n.from
								? (e[s].to = r.to)
								: e.push({
										from:
											n.from +
											/^\s*/.exec(n.text)[0].length,
										to: r.to,
									});
						}
						return e;
					})(e)
				),
			0
		);
	function Zp(t, e) {
		let i = t.languageDataAt('commentTokens', e);
		return i.length ? i[0] : {};
	}
	const Tp = 50;
	function Cp(t, e, i = e.selection.ranges) {
		let n = i.map((t) => Zp(e, t.from).block);
		if (!n.every((t) => t)) return null;
		let r = i.map((t, i) =>
			(function (t, { open: e, close: i }, n, r) {
				let s,
					o,
					a = t.sliceDoc(n - Tp, n),
					l = t.sliceDoc(r, r + Tp),
					h = /\s*$/.exec(a)[0].length,
					c = /^\s*/.exec(l)[0].length,
					u = a.length - h;
				if (
					a.slice(u - e.length, u) == e &&
					l.slice(c, c + i.length) == i
				)
					return {
						open: { pos: n - h, margin: h && 1 },
						close: { pos: r + c, margin: c && 1 },
					};
				r - n <= 2 * Tp
					? (s = o = t.sliceDoc(n, r))
					: ((s = t.sliceDoc(n, n + Tp)),
						(o = t.sliceDoc(r - Tp, r)));
				let d = /^\s*/.exec(s)[0].length,
					f = /\s*$/.exec(o)[0].length,
					O = o.length - f - i.length;
				return s.slice(d, d + e.length) == e &&
					o.slice(O, O + i.length) == i
					? {
							open: {
								pos: n + d + e.length,
								margin: /\s/.test(s.charAt(d + e.length))
									? 1
									: 0,
							},
							close: {
								pos: r - f - i.length,
								margin: /\s/.test(o.charAt(O - 1)) ? 1 : 0,
							},
						}
					: null;
			})(e, n[i], t.from, t.to)
		);
		if (2 != t && !r.every((t) => t))
			return {
				changes: e.changes(
					i.map((t, e) =>
						r[e]
							? []
							: [
									{ from: t.from, insert: n[e].open + ' ' },
									{ from: t.to, insert: ' ' + n[e].close },
								]
					)
				),
			};
		if (1 != t && r.some((t) => t)) {
			let t = [];
			for (let e, i = 0; i < r.length; i++)
				if ((e = r[i])) {
					let r = n[i],
						{ open: s, close: o } = e;
					t.push(
						{ from: s.pos - r.open.length, to: s.pos + s.margin },
						{ from: o.pos - o.margin, to: o.pos + r.close.length }
					);
				}
			return { changes: t };
		}
		return null;
	}
	function Ap(t, e, i = e.selection.ranges) {
		let n = [],
			r = -1;
		for (let { from: t, to: s } of i) {
			let i = n.length,
				o = 1e9,
				a = Zp(e, t).line;
			if (a) {
				for (let i = t; i <= s; ) {
					let l = e.doc.lineAt(i);
					if (l.from > r && (t == s || s > l.from)) {
						r = l.from;
						let t = /^\s*/.exec(l.text)[0].length,
							e = t == l.length,
							i = l.text.slice(t, t + a.length) == a ? t : -1;
						t < l.text.length && t < o && (o = t),
							n.push({
								line: l,
								comment: i,
								token: a,
								indent: t,
								empty: e,
								single: !1,
							});
					}
					i = l.to + 1;
				}
				if (o < 1e9)
					for (let t = i; t < n.length; t++)
						n[t].indent < n[t].line.text.length &&
							(n[t].indent = o);
				n.length == i + 1 && (n[i].single = !0);
			}
		}
		if (2 != t && n.some((t) => t.comment < 0 && (!t.empty || t.single))) {
			let t = [];
			for (let { line: e, token: i, indent: r, empty: s, single: o } of n)
				(!o && s) || t.push({ from: e.from + r, insert: i + ' ' });
			let i = e.changes(t);
			return { changes: i, selection: e.selection.map(i, 1) };
		}
		if (1 != t && n.some((t) => t.comment >= 0)) {
			let t = [];
			for (let { line: e, comment: i, token: r } of n)
				if (i >= 0) {
					let n = e.from + i,
						s = n + r.length;
					' ' == e.text[s - e.from] && s++,
						t.push({ from: n, to: s });
				}
			return { changes: t };
		}
		return null;
	}
	const Xp = Sr.define(),
		Mp = Sr.define(),
		Rp = Jn.define(),
		_p = Jn.define({
			combine: (t) =>
				qr(
					t,
					{
						minDepth: 100,
						newGroupDelay: 500,
						joinToEvent: (t, e) => e,
					},
					{
						minDepth: Math.max,
						newGroupDelay: Math.min,
						joinToEvent: (t, e) => (i, n) => t(i, n) || e(i, n),
					}
				),
		}),
		Vp = or.define({
			create: () => Kp.empty,
			update(t, e) {
				let i = e.state.facet(_p),
					n = e.annotation(Xp);
				if (n) {
					let r = Yp.fromTransaction(e, n.selection),
						s = n.side,
						o = 0 == s ? t.undone : t.done;
					return (
						(o = r
							? zp(o, o.length, i.minDepth, r)
							: Np(o, e.startState.selection)),
						new Kp(0 == s ? n.rest : o, 0 == s ? o : n.rest)
					);
				}
				let r = e.annotation(Mp);
				if (
					(('full' != r && 'before' != r) || (t = t.isolate()),
					!1 === e.annotation($r.addToHistory))
				)
					return e.changes.empty ? t : t.addMapping(e.changes.desc);
				let s = Yp.fromTransaction(e),
					o = e.annotation($r.time),
					a = e.annotation($r.userEvent);
				return (
					s
						? (t = t.addChanges(s, o, a, i, e))
						: e.selection &&
							(t = t.addSelection(
								e.startState.selection,
								o,
								a,
								i.newGroupDelay
							)),
					('full' != r && 'after' != r) || (t = t.isolate()),
					t
				);
			},
			toJSON: (t) => ({
				done: t.done.map((t) => t.toJSON()),
				undone: t.undone.map((t) => t.toJSON()),
			}),
			fromJSON: (t) =>
				new Kp(t.done.map(Yp.fromJSON), t.undone.map(Yp.fromJSON)),
		});
	function qp(t, e) {
		return function ({ state: i, dispatch: n }) {
			if (!e && i.readOnly) return !1;
			let r = i.field(Vp, !1);
			if (!r) return !1;
			let s = r.pop(t, i, e);
			return !!s && (n(s), !0);
		};
	}
	const jp = qp(0, !1),
		Dp = qp(1, !1),
		Ep = qp(0, !0),
		Wp = qp(1, !0);
	class Yp {
		constructor(t, e, i, n, r) {
			(this.changes = t),
				(this.effects = e),
				(this.mapped = i),
				(this.startSelection = n),
				(this.selectionsAfter = r);
		}
		setSelAfter(t) {
			return new Yp(
				this.changes,
				this.effects,
				this.mapped,
				this.startSelection,
				t
			);
		}
		toJSON() {
			var t, e, i;
			return {
				changes:
					null === (t = this.changes) || void 0 === t
						? void 0
						: t.toJSON(),
				mapped:
					null === (e = this.mapped) || void 0 === e
						? void 0
						: e.toJSON(),
				startSelection:
					null === (i = this.startSelection) || void 0 === i
						? void 0
						: i.toJSON(),
				selectionsAfter: this.selectionsAfter.map((t) => t.toJSON()),
			};
		}
		static fromJSON(t) {
			return new Yp(
				t.changes && Yn.fromJSON(t.changes),
				[],
				t.mapped && Wn.fromJSON(t.mapped),
				t.startSelection && Fn.fromJSON(t.startSelection),
				t.selectionsAfter.map(Fn.fromJSON)
			);
		}
		static fromTransaction(t, e) {
			let i = Bp;
			for (let e of t.startState.facet(Rp)) {
				let n = e(t);
				n.length && (i = i.concat(n));
			}
			return !i.length && t.changes.empty
				? null
				: new Yp(
						t.changes.invert(t.startState.doc),
						i,
						void 0,
						e || t.startState.selection,
						Bp
					);
		}
		static selection(t) {
			return new Yp(void 0, Bp, void 0, void 0, t);
		}
	}
	function zp(t, e, i, n) {
		let r = e + 1 > i + 20 ? e - i - 1 : 0,
			s = t.slice(r, e);
		return s.push(n), s;
	}
	function Lp(t, e) {
		return t.length ? (e.length ? t.concat(e) : t) : e;
	}
	const Bp = [],
		Up = 200;
	function Np(t, e) {
		if (t.length) {
			let i = t[t.length - 1],
				n = i.selectionsAfter.slice(
					Math.max(0, i.selectionsAfter.length - Up)
				);
			return n.length && n[n.length - 1].eq(e)
				? t
				: (n.push(e), zp(t, t.length - 1, 1e9, i.setSelAfter(n)));
		}
		return [Yp.selection([e])];
	}
	function Gp(t) {
		let e = t[t.length - 1],
			i = t.slice();
		return (
			(i[t.length - 1] = e.setSelAfter(
				e.selectionsAfter.slice(0, e.selectionsAfter.length - 1)
			)),
			i
		);
	}
	function Ip(t, e) {
		if (!t.length) return t;
		let i = t.length,
			n = Bp;
		for (; i; ) {
			let r = Fp(t[i - 1], e, n);
			if ((r.changes && !r.changes.empty) || r.effects.length) {
				let e = t.slice(0, i);
				return (e[i - 1] = r), e;
			}
			(e = r.mapped), i--, (n = r.selectionsAfter);
		}
		return n.length ? [Yp.selection(n)] : Bp;
	}
	function Fp(t, e, i) {
		let n = Lp(
			t.selectionsAfter.length
				? t.selectionsAfter.map((t) => t.map(e))
				: Bp,
			i
		);
		if (!t.changes) return Yp.selection(n);
		let r = t.changes.map(e),
			s = e.mapDesc(t.changes, !0),
			o = t.mapped ? t.mapped.composeDesc(s) : s;
		return new Yp(
			r,
			kr.mapEffects(t.effects, e),
			o,
			t.startSelection.map(s),
			n
		);
	}
	const Hp = /^(input\.type|delete)($|\.)/;
	class Kp {
		constructor(t, e, i = 0, n = void 0) {
			(this.done = t),
				(this.undone = e),
				(this.prevTime = i),
				(this.prevUserEvent = n);
		}
		isolate() {
			return this.prevTime ? new Kp(this.done, this.undone) : this;
		}
		addChanges(t, e, i, n, r) {
			let s = this.done,
				o = s[s.length - 1];
			return (
				(s =
					o &&
					o.changes &&
					!o.changes.empty &&
					t.changes &&
					(!i || Hp.test(i)) &&
					((!o.selectionsAfter.length &&
						e - this.prevTime < n.newGroupDelay &&
						n.joinToEvent(
							r,
							(function (t, e) {
								let i = [],
									n = !1;
								return (
									t.iterChangedRanges((t, e) => i.push(t, e)),
									e.iterChangedRanges((t, e, r, s) => {
										for (let t = 0; t < i.length; ) {
											let e = i[t++],
												o = i[t++];
											s >= e && r <= o && (n = !0);
										}
									}),
									n
								);
							})(o.changes, t.changes)
						)) ||
						'input.type.compose' == i)
						? zp(
								s,
								s.length - 1,
								n.minDepth,
								new Yp(
									t.changes.compose(o.changes),
									Lp(
										kr.mapEffects(t.effects, o.changes),
										o.effects
									),
									o.mapped,
									o.startSelection,
									Bp
								)
							)
						: zp(s, s.length, n.minDepth, t)),
				new Kp(s, Bp, e, i)
			);
		}
		addSelection(t, e, i, n) {
			let r = this.done.length
				? this.done[this.done.length - 1].selectionsAfter
				: Bp;
			return r.length > 0 &&
				e - this.prevTime < n &&
				i == this.prevUserEvent &&
				i &&
				/^select($|\.)/.test(i) &&
				((s = r[r.length - 1]),
				(o = t),
				s.ranges.length == o.ranges.length &&
					0 ===
						s.ranges.filter((t, e) => t.empty != o.ranges[e].empty)
							.length)
				? this
				: new Kp(Np(this.done, t), this.undone, e, i);
			var s, o;
		}
		addMapping(t) {
			return new Kp(
				Ip(this.done, t),
				Ip(this.undone, t),
				this.prevTime,
				this.prevUserEvent
			);
		}
		pop(t, e, i) {
			let n = 0 == t ? this.done : this.undone;
			if (0 == n.length) return null;
			let r = n[n.length - 1],
				s = r.selectionsAfter[0] || e.selection;
			if (i && r.selectionsAfter.length)
				return e.update({
					selection: r.selectionsAfter[r.selectionsAfter.length - 1],
					annotations: Xp.of({ side: t, rest: Gp(n), selection: s }),
					userEvent: 0 == t ? 'select.undo' : 'select.redo',
					scrollIntoView: !0,
				});
			if (r.changes) {
				let i = 1 == n.length ? Bp : n.slice(0, n.length - 1);
				return (
					r.mapped && (i = Ip(i, r.mapped)),
					e.update({
						changes: r.changes,
						selection: r.startSelection,
						effects: r.effects,
						annotations: Xp.of({ side: t, rest: i, selection: s }),
						filter: !1,
						userEvent: 0 == t ? 'undo' : 'redo',
						scrollIntoView: !0,
					})
				);
			}
			return null;
		}
	}
	Kp.empty = new Kp(Bp, Bp);
	const Jp = [
		{ key: 'Mod-z', run: jp, preventDefault: !0 },
		{ key: 'Mod-y', mac: 'Mod-Shift-z', run: Dp, preventDefault: !0 },
		{ linux: 'Ctrl-Shift-z', run: Dp, preventDefault: !0 },
		{ key: 'Mod-u', run: Ep, preventDefault: !0 },
		{ key: 'Alt-u', mac: 'Mod-Shift-u', run: Wp, preventDefault: !0 },
	];
	function tm(t, e) {
		return Fn.create(t.ranges.map(e), t.mainIndex);
	}
	function em(t, e) {
		return t.update({
			selection: e,
			scrollIntoView: !0,
			userEvent: 'select',
		});
	}
	function im({ state: t, dispatch: e }, i) {
		let n = tm(t.selection, i);
		return !n.eq(t.selection, !0) && (e(em(t, n)), !0);
	}
	function nm(t, e) {
		return Fn.cursor(e ? t.to : t.from);
	}
	function rm(t, e) {
		return im(t, (i) => (i.empty ? t.moveByChar(i, e) : nm(i, e)));
	}
	function sm(t) {
		return t.textDirectionAt(t.state.selection.main.head) == Zo.LTR;
	}
	const om = (t) => rm(t, !sm(t)),
		am = (t) => rm(t, sm(t));
	function lm(t, e) {
		return im(t, (i) => (i.empty ? t.moveByGroup(i, e) : nm(i, e)));
	}
	function hm(t, e, i) {
		if (e.type.prop(i)) return !0;
		let n = e.to - e.from;
		return (
			(n && (n > 2 || /[^\s,.;:]/.test(t.sliceDoc(e.from, e.to)))) ||
			e.firstChild
		);
	}
	function cm(t, e, i) {
		let n,
			r,
			s = ou(t).resolveInner(e.head),
			o = i ? Wt.closedBy : Wt.openedBy;
		for (let n = e.head; ; ) {
			let e = i ? s.childAfter(n) : s.childBefore(n);
			if (!e) break;
			hm(t, e, o) ? (s = e) : (n = i ? e.to : e.from);
		}
		return (
			(r =
				s.type.prop(o) &&
				(n = i ? wd(t, s.from, 1) : wd(t, s.to, -1)) &&
				n.matched
					? i
						? n.end.to
						: n.end.from
					: i
						? s.to
						: s.from),
			Fn.cursor(r, i ? -1 : 1)
		);
	}
	function um(t, e) {
		return im(t, (i) => {
			if (!i.empty) return nm(i, e);
			let n = t.moveVertically(i, e);
			return n.head != i.head ? n : t.moveToLineBoundary(i, e);
		});
	}
	'undefined' != typeof Intl && Intl.Segmenter;
	const dm = (t) => um(t, !1),
		fm = (t) => um(t, !0);
	function Om(t) {
		let e,
			i = t.scrollDOM.clientHeight < t.scrollDOM.scrollHeight - 2,
			n = 0,
			r = 0;
		if (i) {
			for (let e of t.state.facet(uh.scrollMargins)) {
				let i = e(t);
				(null == i ? void 0 : i.top) &&
					(n = Math.max(null == i ? void 0 : i.top, n)),
					(null == i ? void 0 : i.bottom) &&
						(r = Math.max(null == i ? void 0 : i.bottom, r));
			}
			e = t.scrollDOM.clientHeight - n - r;
		} else e = (t.dom.ownerDocument.defaultView || window).innerHeight;
		return {
			marginTop: n,
			marginBottom: r,
			selfScroll: i,
			height: Math.max(t.defaultLineHeight, e - 5),
		};
	}
	function pm(t, e) {
		let i,
			n = Om(t),
			{ state: r } = t,
			s = tm(r.selection, (i) =>
				i.empty ? t.moveVertically(i, e, n.height) : nm(i, e)
			);
		if (s.eq(r.selection)) return !1;
		if (n.selfScroll) {
			let e = t.coordsAtPos(r.selection.main.head),
				o = t.scrollDOM.getBoundingClientRect(),
				a = o.top + n.marginTop,
				l = o.bottom - n.marginBottom;
			e &&
				e.top > a &&
				e.bottom < l &&
				(i = uh.scrollIntoView(s.main.head, {
					y: 'start',
					yMargin: e.top - a,
				}));
		}
		return t.dispatch(em(r, s), { effects: i }), !0;
	}
	const mm = (t) => pm(t, !1),
		gm = (t) => pm(t, !0);
	function bm(t, e, i) {
		let n = t.lineBlockAt(e.head),
			r = t.moveToLineBoundary(e, i);
		if (
			(r.head == e.head &&
				r.head != (i ? n.to : n.from) &&
				(r = t.moveToLineBoundary(e, i, !1)),
			!i && r.head == n.from && n.length)
		) {
			let i = /^\s*/.exec(
				t.state.sliceDoc(n.from, Math.min(n.from + 100, n.to))
			)[0].length;
			i && e.head != n.from + i && (r = Fn.cursor(n.from + i));
		}
		return r;
	}
	function ym(t, e) {
		let i = tm(t.state.selection, (t) => {
			let i = e(t);
			return Fn.range(
				t.anchor,
				i.head,
				i.goalColumn,
				i.bidiLevel || void 0
			);
		});
		return !i.eq(t.state.selection) && (t.dispatch(em(t.state, i)), !0);
	}
	function vm(t, e) {
		return ym(t, (i) => t.moveByChar(i, e));
	}
	const wm = (t) => vm(t, !sm(t)),
		Sm = (t) => vm(t, sm(t));
	function xm(t, e) {
		return ym(t, (i) => t.moveByGroup(i, e));
	}
	function Qm(t, e) {
		return ym(t, (i) => t.moveVertically(i, e));
	}
	const km = (t) => Qm(t, !1),
		$m = (t) => Qm(t, !0);
	function Pm(t, e) {
		return ym(t, (i) => t.moveVertically(i, e, Om(t).height));
	}
	const Zm = (t) => Pm(t, !1),
		Tm = (t) => Pm(t, !0),
		Cm = ({ state: t, dispatch: e }) => (e(em(t, { anchor: 0 })), !0),
		Am = ({ state: t, dispatch: e }) => (
			e(em(t, { anchor: t.doc.length })), !0
		),
		Xm = ({ state: t, dispatch: e }) => (
			e(em(t, { anchor: t.selection.main.anchor, head: 0 })), !0
		),
		Mm = ({ state: t, dispatch: e }) => (
			e(em(t, { anchor: t.selection.main.anchor, head: t.doc.length })),
			!0
		);
	function Rm(t, e) {
		if (t.state.readOnly) return !1;
		let i = 'delete.selection',
			{ state: n } = t,
			r = n.changeByRange((n) => {
				let { from: r, to: s } = n;
				if (r == s) {
					let o = e(n);
					o < r
						? ((i = 'delete.backward'), (o = _m(t, o, !1)))
						: o > r && ((i = 'delete.forward'), (o = _m(t, o, !0))),
						(r = Math.min(r, o)),
						(s = Math.max(s, o));
				} else (r = _m(t, r, !1)), (s = _m(t, s, !0));
				return r == s
					? { range: n }
					: {
							changes: { from: r, to: s },
							range: Fn.cursor(r, r < n.head ? -1 : 1),
						};
			});
		return (
			!r.changes.empty &&
			(t.dispatch(
				n.update(r, {
					scrollIntoView: !0,
					userEvent: i,
					effects:
						'delete.selection' == i
							? uh.announce.of(n.phrase('Selection deleted'))
							: void 0,
				})
			),
			!0)
		);
	}
	function _m(t, e, i) {
		if (t instanceof uh)
			for (let n of t.state.facet(uh.atomicRanges).map((e) => e(t)))
				n.between(e, e, (t, n) => {
					t < e && n > e && (e = i ? n : t);
				});
		return e;
	}
	const Vm = (t, e, i) =>
			Rm(t, (n) => {
				let r,
					s,
					o = n.from,
					{ state: a } = t,
					l = a.doc.lineAt(o);
				if (
					i &&
					!e &&
					o > l.from &&
					o < l.from + 200 &&
					!/[^ \t]/.test((r = l.text.slice(0, o - l.from)))
				) {
					if ('\t' == r[r.length - 1]) return o - 1;
					let t = ts(r, a.tabSize) % yu(a) || yu(a);
					for (let e = 0; e < t && ' ' == r[r.length - 1 - e]; e++)
						o--;
					s = o;
				} else
					(s = Rn(l.text, o - l.from, e, e) + l.from),
						s == o && l.number != (e ? a.doc.lines : 1)
							? (s += e ? 1 : -1)
							: !e &&
								/[\ufe00-\ufe0f]/.test(
									l.text.slice(s - l.from, o - l.from)
								) &&
								(s = Rn(l.text, s - l.from, !1, !1) + l.from);
				return s;
			}),
		qm = (t) => Vm(t, !1, !0),
		jm = (t) => Vm(t, !0, !1),
		Dm = (t, e) =>
			Rm(t, (i) => {
				let n = i.head,
					{ state: r } = t,
					s = r.doc.lineAt(n),
					o = r.charCategorizer(n);
				for (let t = null; ; ) {
					if (n == (e ? s.to : s.from)) {
						n == i.head &&
							s.number != (e ? r.doc.lines : 1) &&
							(n += e ? 1 : -1);
						break;
					}
					let a = Rn(s.text, n - s.from, e) + s.from,
						l = s.text.slice(
							Math.min(n, a) - s.from,
							Math.max(n, a) - s.from
						),
						h = o(l);
					if (null != t && h != t) break;
					(' ' == l && n == i.head) || (t = h), (n = a);
				}
				return n;
			}),
		Em = (t) => Dm(t, !1);
	function Wm(t) {
		let e = [],
			i = -1;
		for (let n of t.selection.ranges) {
			let r = t.doc.lineAt(n.from),
				s = t.doc.lineAt(n.to);
			if (
				(n.empty || n.to != s.from || (s = t.doc.lineAt(n.to - 1)),
				i >= r.number)
			) {
				let t = e[e.length - 1];
				(t.to = s.to), t.ranges.push(n);
			} else e.push({ from: r.from, to: s.to, ranges: [n] });
			i = s.number + 1;
		}
		return e;
	}
	function Ym(t, e, i) {
		if (t.readOnly) return !1;
		let n = [],
			r = [];
		for (let e of Wm(t)) {
			if (i ? e.to == t.doc.length : 0 == e.from) continue;
			let s = t.doc.lineAt(i ? e.to + 1 : e.from - 1),
				o = s.length + 1;
			if (i) {
				n.push(
					{ from: e.to, to: s.to },
					{ from: e.from, insert: s.text + t.lineBreak }
				);
				for (let i of e.ranges)
					r.push(
						Fn.range(
							Math.min(t.doc.length, i.anchor + o),
							Math.min(t.doc.length, i.head + o)
						)
					);
			} else {
				n.push(
					{ from: s.from, to: e.from },
					{ from: e.to, insert: t.lineBreak + s.text }
				);
				for (let t of e.ranges)
					r.push(Fn.range(t.anchor - o, t.head - o));
			}
		}
		return (
			!!n.length &&
			(e(
				t.update({
					changes: n,
					scrollIntoView: !0,
					selection: Fn.create(r, t.selection.mainIndex),
					userEvent: 'move.line',
				})
			),
			!0)
		);
	}
	function zm(t, e, i) {
		if (t.readOnly) return !1;
		let n = [];
		for (let e of Wm(t))
			i
				? n.push({
						from: e.from,
						insert: t.doc.slice(e.from, e.to) + t.lineBreak,
					})
				: n.push({
						from: e.to,
						insert: t.lineBreak + t.doc.slice(e.from, e.to),
					});
		return (
			e(
				t.update({
					changes: n,
					scrollIntoView: !0,
					userEvent: 'input.copyline',
				})
			),
			!0
		);
	}
	const Lm = Bm(!1);
	function Bm(t) {
		return ({ state: e, dispatch: i }) => {
			if (e.readOnly) return !1;
			let n = e.changeByRange((i) => {
				let { from: n, to: r } = i,
					s = e.doc.lineAt(n),
					o =
						!t &&
						n == r &&
						(function (t, e) {
							if (/\(\)|\[\]|\{\}/.test(t.sliceDoc(e - 1, e + 1)))
								return { from: e, to: e };
							let i,
								n = ou(t).resolveInner(e),
								r = n.childBefore(e),
								s = n.childAfter(e);
							return r &&
								s &&
								r.to <= e &&
								s.from >= e &&
								(i = r.type.prop(Wt.closedBy)) &&
								i.indexOf(s.name) > -1 &&
								t.doc.lineAt(r.to).from ==
									t.doc.lineAt(s.from).from &&
								!/\S/.test(t.sliceDoc(r.to, s.from))
								? { from: r.to, to: s.from }
								: null;
						})(e, n);
				t && (n = r = (r <= s.to ? s : e.doc.lineAt(r)).to);
				let a = new Su(e, {
						simulateBreak: n,
						simulateDoubleBreak: !!o,
					}),
					l = wu(a, n);
				for (
					null == l &&
					(l = ts(/^\s*/.exec(e.doc.lineAt(n).text)[0], e.tabSize));
					r < s.to && /\s/.test(s.text[r - s.from]);

				)
					r++;
				o
					? ({ from: n, to: r } = o)
					: n > s.from &&
						n < s.from + 100 &&
						!/\S/.test(s.text.slice(0, n)) &&
						(n = s.from);
				let h = ['', vu(e, l)];
				return (
					o && h.push(vu(e, a.lineIndent(s.from, -1))),
					{
						changes: { from: n, to: r, insert: Qn.of(h) },
						range: Fn.cursor(n + 1 + h[1].length),
					}
				);
			});
			return (
				i(e.update(n, { scrollIntoView: !0, userEvent: 'input' })), !0
			);
		};
	}
	function Um(t, e) {
		let i = -1;
		return t.changeByRange((n) => {
			let r = [];
			for (let s = n.from; s <= n.to; ) {
				let o = t.doc.lineAt(s);
				o.number > i &&
					(n.empty || n.to > o.from) &&
					(e(o, r, n), (i = o.number)),
					(s = o.to + 1);
			}
			let s = t.changes(r);
			return {
				changes: r,
				range: Fn.range(s.mapPos(n.anchor, 1), s.mapPos(n.head, 1)),
			};
		});
	}
	const Nm = ({ state: t, dispatch: e }) =>
			!t.readOnly &&
			(e(
				t.update(
					Um(t, (e, i) => {
						i.push({ from: e.from, insert: t.facet(bu) });
					}),
					{ userEvent: 'input.indent' }
				)
			),
			!0),
		Gm = ({ state: t, dispatch: e }) =>
			!t.readOnly &&
			(e(
				t.update(
					Um(t, (e, i) => {
						let n = /^\s*/.exec(e.text)[0];
						if (!n) return;
						let r = ts(n, t.tabSize),
							s = 0,
							o = vu(t, Math.max(0, r - yu(t)));
						for (
							;
							s < n.length &&
							s < o.length &&
							n.charCodeAt(s) == o.charCodeAt(s);

						)
							s++;
						i.push({
							from: e.from + s,
							to: e.from + n.length,
							insert: o.slice(s),
						});
					}),
					{ userEvent: 'delete.dedent' }
				)
			),
			!0),
		Im = [
			{
				key: 'Alt-ArrowLeft',
				mac: 'Ctrl-ArrowLeft',
				run: (t) => im(t, (e) => cm(t.state, e, !sm(t))),
				shift: (t) => ym(t, (e) => cm(t.state, e, !sm(t))),
			},
			{
				key: 'Alt-ArrowRight',
				mac: 'Ctrl-ArrowRight',
				run: (t) => im(t, (e) => cm(t.state, e, sm(t))),
				shift: (t) => ym(t, (e) => cm(t.state, e, sm(t))),
			},
			{
				key: 'Alt-ArrowUp',
				run: ({ state: t, dispatch: e }) => Ym(t, e, !1),
			},
			{
				key: 'Shift-Alt-ArrowUp',
				run: ({ state: t, dispatch: e }) => zm(t, e, !1),
			},
			{
				key: 'Alt-ArrowDown',
				run: ({ state: t, dispatch: e }) => Ym(t, e, !0),
			},
			{
				key: 'Shift-Alt-ArrowDown',
				run: ({ state: t, dispatch: e }) => zm(t, e, !0),
			},
			{
				key: 'Escape',
				run: ({ state: t, dispatch: e }) => {
					let i = t.selection,
						n = null;
					return (
						i.ranges.length > 1
							? (n = Fn.create([i.main]))
							: i.main.empty ||
								(n = Fn.create([Fn.cursor(i.main.head)])),
						!!n && (e(em(t, n)), !0)
					);
				},
			},
			{ key: 'Mod-Enter', run: Bm(!0) },
			{
				key: 'Alt-l',
				mac: 'Ctrl-l',
				run: ({ state: t, dispatch: e }) => {
					let i = Wm(t).map(({ from: e, to: i }) =>
						Fn.range(e, Math.min(i + 1, t.doc.length))
					);
					return (
						e(
							t.update({
								selection: Fn.create(i),
								userEvent: 'select',
							})
						),
						!0
					);
				},
			},
			{
				key: 'Mod-i',
				run: ({ state: t, dispatch: e }) => {
					let i = tm(t.selection, (e) => {
						let i = ou(t),
							n = i.resolveStack(e.from, 1);
						if (e.empty) {
							let t = i.resolveStack(e.from, -1);
							t.node.from >= n.node.from &&
								t.node.to <= n.node.to &&
								(n = t);
						}
						for (let t = n; t; t = t.next) {
							let { node: i } = t;
							if (
								((i.from < e.from && i.to >= e.to) ||
									(i.to > e.to && i.from <= e.from)) &&
								t.next
							)
								return Fn.range(i.to, i.from);
						}
						return e;
					});
					return !i.eq(t.selection) && (e(em(t, i)), !0);
				},
				preventDefault: !0,
			},
			{ key: 'Mod-[', run: Gm },
			{ key: 'Mod-]', run: Nm },
			{
				key: 'Mod-Alt-\\',
				run: ({ state: t, dispatch: e }) => {
					if (t.readOnly) return !1;
					let i = Object.create(null),
						n = new Su(t, {
							overrideIndentation: (t) => {
								let e = i[t];
								return null == e ? -1 : e;
							},
						}),
						r = Um(t, (e, r, s) => {
							let o = wu(n, e.from);
							if (null == o) return;
							/\S/.test(e.text) || (o = 0);
							let a = /^\s*/.exec(e.text)[0],
								l = vu(t, o);
							(a != l || s.from < e.from + a.length) &&
								((i[e.from] = o),
								r.push({
									from: e.from,
									to: e.from + a.length,
									insert: l,
								}));
						});
					return (
						r.changes.empty ||
							e(t.update(r, { userEvent: 'indent' })),
						!0
					);
				},
			},
			{
				key: 'Shift-Mod-k',
				run: (t) => {
					if (t.state.readOnly) return !1;
					let { state: e } = t,
						i = e.changes(
							Wm(e).map(
								({ from: t, to: i }) => (
									t > 0 ? t-- : i < e.doc.length && i++,
									{ from: t, to: i }
								)
							)
						),
						n = tm(e.selection, (e) => {
							let i;
							if (t.lineWrapping) {
								let n = t.lineBlockAt(e.head),
									r = t.coordsAtPos(e.head, e.assoc || 1);
								r &&
									(i =
										n.bottom +
										t.documentTop -
										r.bottom +
										t.defaultLineHeight / 2);
							}
							return t.moveVertically(e, !0, i);
						}).map(i);
					return (
						t.dispatch({
							changes: i,
							selection: n,
							scrollIntoView: !0,
							userEvent: 'delete.line',
						}),
						!0
					);
				},
			},
			{
				key: 'Shift-Mod-\\',
				run: ({ state: t, dispatch: e }) =>
					(function (t, e, i) {
						let n = !1,
							r = tm(t.selection, (e) => {
								let r =
									wd(t, e.head, -1) ||
									wd(t, e.head, 1) ||
									(e.head > 0 && wd(t, e.head - 1, 1)) ||
									(e.head < t.doc.length &&
										wd(t, e.head + 1, -1));
								if (!r || !r.end) return e;
								n = !0;
								let s =
									r.start.from == e.head
										? r.end.to
										: r.end.from;
								return i ? Fn.range(e.anchor, s) : Fn.cursor(s);
							});
						return !!n && (e(em(t, r)), !0);
					})(t, e, !1),
			},
			{
				key: 'Mod-/',
				run: (t) => {
					let { state: e } = t,
						i = e.doc.lineAt(e.selection.main.from),
						n = Zp(t.state, i.from);
					return n.line ? kp(t) : !!n.block && Pp(t);
				},
			},
			{ key: 'Alt-A', run: $p },
			{
				key: 'Ctrl-m',
				mac: 'Shift-Alt-m',
				run: (t) => (t.setTabFocusMode(), !0),
			},
		].concat(
			[
				{ key: 'ArrowLeft', run: om, shift: wm, preventDefault: !0 },
				{
					key: 'Mod-ArrowLeft',
					mac: 'Alt-ArrowLeft',
					run: (t) => lm(t, !sm(t)),
					shift: (t) => xm(t, !sm(t)),
					preventDefault: !0,
				},
				{
					mac: 'Cmd-ArrowLeft',
					run: (t) => im(t, (e) => bm(t, e, !sm(t))),
					shift: (t) => ym(t, (e) => bm(t, e, !sm(t))),
					preventDefault: !0,
				},
				{ key: 'ArrowRight', run: am, shift: Sm, preventDefault: !0 },
				{
					key: 'Mod-ArrowRight',
					mac: 'Alt-ArrowRight',
					run: (t) => lm(t, sm(t)),
					shift: (t) => xm(t, sm(t)),
					preventDefault: !0,
				},
				{
					mac: 'Cmd-ArrowRight',
					run: (t) => im(t, (e) => bm(t, e, sm(t))),
					shift: (t) => ym(t, (e) => bm(t, e, sm(t))),
					preventDefault: !0,
				},
				{ key: 'ArrowUp', run: dm, shift: km, preventDefault: !0 },
				{ mac: 'Cmd-ArrowUp', run: Cm, shift: Xm },
				{ mac: 'Ctrl-ArrowUp', run: mm, shift: Zm },
				{ key: 'ArrowDown', run: fm, shift: $m, preventDefault: !0 },
				{ mac: 'Cmd-ArrowDown', run: Am, shift: Mm },
				{ mac: 'Ctrl-ArrowDown', run: gm, shift: Tm },
				{ key: 'PageUp', run: mm, shift: Zm },
				{ key: 'PageDown', run: gm, shift: Tm },
				{
					key: 'Home',
					run: (t) => im(t, (e) => bm(t, e, !1)),
					shift: (t) => ym(t, (e) => bm(t, e, !1)),
					preventDefault: !0,
				},
				{ key: 'Mod-Home', run: Cm, shift: Xm },
				{
					key: 'End',
					run: (t) => im(t, (e) => bm(t, e, !0)),
					shift: (t) => ym(t, (e) => bm(t, e, !0)),
					preventDefault: !0,
				},
				{ key: 'Mod-End', run: Am, shift: Mm },
				{ key: 'Enter', run: Lm, shift: Lm },
				{
					key: 'Mod-a',
					run: ({ state: t, dispatch: e }) => (
						e(
							t.update({
								selection: { anchor: 0, head: t.doc.length },
								userEvent: 'select',
							})
						),
						!0
					),
				},
				{ key: 'Backspace', run: qm, shift: qm },
				{ key: 'Delete', run: jm },
				{ key: 'Mod-Backspace', mac: 'Alt-Backspace', run: Em },
				{ key: 'Mod-Delete', mac: 'Alt-Delete', run: (t) => Dm(t, !0) },
				{
					mac: 'Mod-Backspace',
					run: (t) =>
						Rm(t, (e) => {
							let i = t.moveToLineBoundary(e, !1).head;
							return e.head > i ? i : Math.max(0, e.head - 1);
						}),
				},
				{
					mac: 'Mod-Delete',
					run: (t) =>
						Rm(t, (e) => {
							let i = t.moveToLineBoundary(e, !0).head;
							return e.head < i
								? i
								: Math.min(t.state.doc.length, e.head + 1);
						}),
				},
			].concat(
				[
					{ key: 'Ctrl-b', run: om, shift: wm, preventDefault: !0 },
					{ key: 'Ctrl-f', run: am, shift: Sm },
					{ key: 'Ctrl-p', run: dm, shift: km },
					{ key: 'Ctrl-n', run: fm, shift: $m },
					{
						key: 'Ctrl-a',
						run: (t) =>
							im(t, (e) =>
								Fn.cursor(t.lineBlockAt(e.head).from, 1)
							),
						shift: (t) =>
							ym(t, (e) => Fn.cursor(t.lineBlockAt(e.head).from)),
					},
					{
						key: 'Ctrl-e',
						run: (t) =>
							im(t, (e) =>
								Fn.cursor(t.lineBlockAt(e.head).to, -1)
							),
						shift: (t) =>
							ym(t, (e) => Fn.cursor(t.lineBlockAt(e.head).to)),
					},
					{ key: 'Ctrl-d', run: jm },
					{ key: 'Ctrl-h', run: qm },
					{
						key: 'Ctrl-k',
						run: (t) =>
							Rm(t, (e) => {
								let i = t.lineBlockAt(e.head).to;
								return e.head < i
									? i
									: Math.min(t.state.doc.length, e.head + 1);
							}),
					},
					{ key: 'Ctrl-Alt-h', run: Em },
					{
						key: 'Ctrl-o',
						run: ({ state: t, dispatch: e }) => {
							if (t.readOnly) return !1;
							let i = t.changeByRange((t) => ({
								changes: {
									from: t.from,
									to: t.to,
									insert: Qn.of(['', '']),
								},
								range: Fn.cursor(t.from),
							}));
							return (
								e(
									t.update(i, {
										scrollIntoView: !0,
										userEvent: 'input',
									})
								),
								!0
							);
						},
					},
					{
						key: 'Ctrl-t',
						run: ({ state: t, dispatch: e }) => {
							if (t.readOnly) return !1;
							let i = t.changeByRange((e) => {
								if (
									!e.empty ||
									0 == e.from ||
									e.from == t.doc.length
								)
									return { range: e };
								let i = e.from,
									n = t.doc.lineAt(i),
									r =
										i == n.from
											? i - 1
											: Rn(n.text, i - n.from, !1) +
												n.from,
									s =
										i == n.to
											? i + 1
											: Rn(n.text, i - n.from, !0) +
												n.from;
								return {
									changes: {
										from: r,
										to: s,
										insert: t.doc
											.slice(i, s)
											.append(t.doc.slice(r, i)),
									},
									range: Fn.cursor(s),
								};
							});
							return (
								!i.changes.empty &&
								(e(
									t.update(i, {
										scrollIntoView: !0,
										userEvent: 'move.character',
									})
								),
								!0)
							);
						},
					},
					{ key: 'Ctrl-v', run: gm },
				].map((t) => ({ mac: t.key, run: t.run, shift: t.shift }))
			)
		),
		Fm = { key: 'Tab', run: Nm, shift: Gm };
	function Hm() {
		var t = arguments[0];
		'string' == typeof t && (t = document.createElement(t));
		var e = 1,
			i = arguments[1];
		if (
			i &&
			'object' == typeof i &&
			null == i.nodeType &&
			!Array.isArray(i)
		) {
			for (var n in i)
				if (Object.prototype.hasOwnProperty.call(i, n)) {
					var r = i[n];
					'string' == typeof r
						? t.setAttribute(n, r)
						: null != r && (t[n] = r);
				}
			e++;
		}
		for (; e < arguments.length; e++) Km(t, arguments[e]);
		return t;
	}
	function Km(t, e) {
		if ('string' == typeof e) t.appendChild(document.createTextNode(e));
		else if (null == e);
		else if (null != e.nodeType) t.appendChild(e);
		else {
			if (!Array.isArray(e))
				throw new RangeError('Unsupported child node: ' + e);
			for (var i = 0; i < e.length; i++) Km(t, e[i]);
		}
	}
	const Jm =
		'function' == typeof String.prototype.normalize
			? (t) => t.normalize('NFKD')
			: (t) => t;
	class tg {
		constructor(t, e, i = 0, n = t.length, r, s) {
			(this.test = s),
				(this.value = { from: 0, to: 0 }),
				(this.done = !1),
				(this.matches = []),
				(this.buffer = ''),
				(this.bufferPos = 0),
				(this.iter = t.iterRange(i, n)),
				(this.bufferStart = i),
				(this.normalize = r ? (t) => r(Jm(t)) : Jm),
				(this.query = this.normalize(e));
		}
		peek() {
			if (this.bufferPos == this.buffer.length) {
				if (
					((this.bufferStart += this.buffer.length),
					this.iter.next(),
					this.iter.done)
				)
					return -1;
				(this.bufferPos = 0), (this.buffer = this.iter.value);
			}
			return Vn(this.buffer, this.bufferPos);
		}
		next() {
			for (; this.matches.length; ) this.matches.pop();
			return this.nextOverlapping();
		}
		nextOverlapping() {
			for (;;) {
				let t = this.peek();
				if (t < 0) return (this.done = !0), this;
				let e = qn(t),
					i = this.bufferStart + this.bufferPos;
				this.bufferPos += jn(t);
				let n = this.normalize(e);
				if (n.length)
					for (let t = 0, r = i; ; t++) {
						let s = n.charCodeAt(t),
							o = this.match(
								s,
								r,
								this.bufferPos + this.bufferStart
							);
						if (t == n.length - 1) {
							if (o) return (this.value = o), this;
							break;
						}
						r == i && t < e.length && e.charCodeAt(t) == s && r++;
					}
			}
		}
		match(t, e, i) {
			let n = null;
			for (let e = 0; e < this.matches.length; e += 2) {
				let r = this.matches[e],
					s = !1;
				this.query.charCodeAt(r) == t &&
					(r == this.query.length - 1
						? (n = { from: this.matches[e + 1], to: i })
						: (this.matches[e]++, (s = !0))),
					s || (this.matches.splice(e, 2), (e -= 2));
			}
			return (
				this.query.charCodeAt(0) == t &&
					(1 == this.query.length
						? (n = { from: e, to: i })
						: this.matches.push(1, e)),
				n &&
					this.test &&
					!this.test(n.from, n.to, this.buffer, this.bufferStart) &&
					(n = null),
				n
			);
		}
	}
	'undefined' != typeof Symbol &&
		(tg.prototype[Symbol.iterator] = function () {
			return this;
		});
	const eg = { from: -1, to: -1, match: /.*/.exec('') },
		ig = 'gm' + (null == /x/.unicode ? '' : 'u');
	class ng {
		constructor(t, e, i, n = 0, r = t.length) {
			if (
				((this.text = t),
				(this.to = r),
				(this.curLine = ''),
				(this.done = !1),
				(this.value = eg),
				/\\[sWDnr]|\n|\r|\[\^/.test(e))
			)
				return new og(t, e, i, n, r);
			(this.re = new RegExp(
				e,
				ig + ((null == i ? void 0 : i.ignoreCase) ? 'i' : '')
			)),
				(this.test = null == i ? void 0 : i.test),
				(this.iter = t.iter());
			let s = t.lineAt(n);
			(this.curLineStart = s.from),
				(this.matchPos = ag(t, n)),
				this.getLine(this.curLineStart);
		}
		getLine(t) {
			this.iter.next(t),
				this.iter.lineBreak
					? (this.curLine = '')
					: ((this.curLine = this.iter.value),
						this.curLineStart + this.curLine.length > this.to &&
							(this.curLine = this.curLine.slice(
								0,
								this.to - this.curLineStart
							)),
						this.iter.next());
		}
		nextLine() {
			(this.curLineStart = this.curLineStart + this.curLine.length + 1),
				this.curLineStart > this.to
					? (this.curLine = '')
					: this.getLine(0);
		}
		next() {
			for (let t = this.matchPos - this.curLineStart; ; ) {
				this.re.lastIndex = t;
				let e = this.matchPos <= this.to && this.re.exec(this.curLine);
				if (e) {
					let i = this.curLineStart + e.index,
						n = i + e[0].length;
					if (
						((this.matchPos = ag(this.text, n + (i == n ? 1 : 0))),
						i == this.curLineStart + this.curLine.length &&
							this.nextLine(),
						(i < n || i > this.value.to) &&
							(!this.test || this.test(i, n, e)))
					)
						return (
							(this.value = { from: i, to: n, match: e }), this
						);
					t = this.matchPos - this.curLineStart;
				} else {
					if (!(this.curLineStart + this.curLine.length < this.to))
						return (this.done = !0), this;
					this.nextLine(), (t = 0);
				}
			}
		}
	}
	const rg = new WeakMap();
	class sg {
		constructor(t, e) {
			(this.from = t), (this.text = e);
		}
		get to() {
			return this.from + this.text.length;
		}
		static get(t, e, i) {
			let n = rg.get(t);
			if (!n || n.from >= i || n.to <= e) {
				let n = new sg(e, t.sliceString(e, i));
				return rg.set(t, n), n;
			}
			if (n.from == e && n.to == i) return n;
			let { text: r, from: s } = n;
			return (
				s > e && ((r = t.sliceString(e, s) + r), (s = e)),
				n.to < i && (r += t.sliceString(n.to, i)),
				rg.set(t, new sg(s, r)),
				new sg(e, r.slice(e - s, i - s))
			);
		}
	}
	class og {
		constructor(t, e, i, n, r) {
			(this.text = t),
				(this.to = r),
				(this.done = !1),
				(this.value = eg),
				(this.matchPos = ag(t, n)),
				(this.re = new RegExp(
					e,
					ig + ((null == i ? void 0 : i.ignoreCase) ? 'i' : '')
				)),
				(this.test = null == i ? void 0 : i.test),
				(this.flat = sg.get(t, n, this.chunkEnd(n + 5e3)));
		}
		chunkEnd(t) {
			return t >= this.to ? this.to : this.text.lineAt(t).to;
		}
		next() {
			for (;;) {
				let t = (this.re.lastIndex = this.matchPos - this.flat.from),
					e = this.re.exec(this.flat.text);
				if (
					(e &&
						!e[0] &&
						e.index == t &&
						((this.re.lastIndex = t + 1),
						(e = this.re.exec(this.flat.text))),
					e)
				) {
					let t = this.flat.from + e.index,
						i = t + e[0].length;
					if (
						(this.flat.to >= this.to ||
							e.index + e[0].length <=
								this.flat.text.length - 10) &&
						(!this.test || this.test(t, i, e))
					)
						return (
							(this.value = { from: t, to: i, match: e }),
							(this.matchPos = ag(
								this.text,
								i + (t == i ? 1 : 0)
							)),
							this
						);
				}
				if (this.flat.to == this.to) return (this.done = !0), this;
				this.flat = sg.get(
					this.text,
					this.flat.from,
					this.chunkEnd(this.flat.from + 2 * this.flat.text.length)
				);
			}
		}
	}
	function ag(t, e) {
		if (e >= t.length) return e;
		let i,
			n = t.lineAt(e);
		for (
			;
			e < n.to &&
			(i = n.text.charCodeAt(e - n.from)) >= 56320 &&
			i < 57344;

		)
			e++;
		return e;
	}
	function lg(t) {
		let e = Hm('input', {
			class: 'cm-textfield',
			name: 'line',
			value: String(
				t.state.doc.lineAt(t.state.selection.main.head).number
			),
		});
		function i() {
			let i = /^([+-])?(\d+)?(:\d+)?(%)?$/.exec(e.value);
			if (!i) return;
			let { state: n } = t,
				r = n.doc.lineAt(n.selection.main.head),
				[, s, o, a, l] = i,
				h = a ? +a.slice(1) : 0,
				c = o ? +o : r.number;
			if (o && l) {
				let t = c / 100;
				s && (t = t * ('-' == s ? -1 : 1) + r.number / n.doc.lines),
					(c = Math.round(n.doc.lines * t));
			} else o && s && (c = c * ('-' == s ? -1 : 1) + r.number);
			let u = n.doc.line(Math.max(1, Math.min(n.doc.lines, c))),
				d = Fn.cursor(u.from + Math.max(0, Math.min(h, u.length)));
			t.dispatch({
				effects: [
					hg.of(!1),
					uh.scrollIntoView(d.from, { y: 'center' }),
				],
				selection: d,
			}),
				t.focus();
		}
		return {
			dom: Hm(
				'form',
				{
					class: 'cm-gotoLine',
					onkeydown: (e) => {
						27 == e.keyCode
							? (e.preventDefault(),
								t.dispatch({ effects: hg.of(!1) }),
								t.focus())
							: 13 == e.keyCode && (e.preventDefault(), i());
					},
					onsubmit: (t) => {
						t.preventDefault(), i();
					},
				},
				Hm('label', t.state.phrase('Go to line'), ': ', e),
				' ',
				Hm(
					'button',
					{ class: 'cm-button', type: 'submit' },
					t.state.phrase('go')
				)
			),
		};
	}
	'undefined' != typeof Symbol &&
		(ng.prototype[Symbol.iterator] = og.prototype[Symbol.iterator] =
			function () {
				return this;
			});
	const hg = kr.define(),
		cg = or.define({
			create: () => !0,
			update(t, e) {
				for (let i of e.effects) i.is(hg) && (t = i.value);
				return t;
			},
			provide: (t) => Tc.from(t, (t) => (t ? lg : null)),
		}),
		ug = uh.baseTheme({
			'.cm-panel.cm-gotoLine': {
				padding: '2px 6px 4px',
				'& label': { fontSize: '80%' },
			},
		}),
		dg = {
			highlightWordAroundCursor: !1,
			minSelectionLength: 1,
			maxMatches: 100,
			wholeWords: !1,
		},
		fg = Jn.define({
			combine: (t) =>
				qr(t, dg, {
					highlightWordAroundCursor: (t, e) => t || e,
					minSelectionLength: Math.min,
					maxMatches: Math.min,
				}),
		}),
		Og = mo.mark({ class: 'cm-selectionMatch' }),
		pg = mo.mark({ class: 'cm-selectionMatch cm-selectionMatch-main' });
	function mg(t, e, i, n) {
		return !(
			(0 != i && t(e.sliceDoc(i - 1, i)) == Mr.Word) ||
			(n != e.doc.length && t(e.sliceDoc(n, n + 1)) == Mr.Word)
		);
	}
	const gg = da.fromClass(
			class {
				constructor(t) {
					this.decorations = this.getDeco(t);
				}
				update(t) {
					(t.selectionSet || t.docChanged || t.viewportChanged) &&
						(this.decorations = this.getDeco(t.view));
				}
				getDeco(t) {
					let e = t.state.facet(fg),
						{ state: i } = t,
						n = i.selection;
					if (n.ranges.length > 1) return mo.none;
					let r,
						s = n.main,
						o = null;
					if (s.empty) {
						if (!e.highlightWordAroundCursor) return mo.none;
						let t = i.wordAt(s.head);
						if (!t) return mo.none;
						(o = i.charCategorizer(s.head)),
							(r = i.sliceDoc(t.from, t.to));
					} else {
						let t = s.to - s.from;
						if (t < e.minSelectionLength || t > 200) return mo.none;
						if (e.wholeWords) {
							if (
								((r = i.sliceDoc(s.from, s.to)),
								(o = i.charCategorizer(s.head)),
								!mg(o, i, s.from, s.to) ||
									!(function (t, e, i, n) {
										return (
											t(e.sliceDoc(i, i + 1)) ==
												Mr.Word &&
											t(e.sliceDoc(n - 1, n)) == Mr.Word
										);
									})(o, i, s.from, s.to))
							)
								return mo.none;
						} else if (((r = i.sliceDoc(s.from, s.to)), !r))
							return mo.none;
					}
					let a = [];
					for (let n of t.visibleRanges) {
						let t = new tg(i.doc, r, n.from, n.to);
						for (; !t.next().done; ) {
							let { from: n, to: r } = t.value;
							if (
								(!o || mg(o, i, n, r)) &&
								(s.empty && n <= s.from && r >= s.to
									? a.push(pg.range(n, r))
									: (n >= s.to || r <= s.from) &&
										a.push(Og.range(n, r)),
								a.length > e.maxMatches)
							)
								return mo.none;
						}
					}
					return mo.set(a);
				}
			},
			{ decorations: (t) => t.decorations }
		),
		bg = uh.baseTheme({
			'.cm-selectionMatch': { backgroundColor: '#99ff7780' },
			'.cm-searchMatch .cm-selectionMatch': {
				backgroundColor: 'transparent',
			},
		}),
		yg = Jn.define({
			combine: (t) =>
				qr(t, {
					top: !1,
					caseSensitive: !1,
					literal: !1,
					regexp: !1,
					wholeWord: !1,
					createPanel: (t) => new Gg(t),
					scrollToMatch: (t) => uh.scrollIntoView(t),
				}),
		});
	class vg {
		constructor(t) {
			(this.search = t.search),
				(this.caseSensitive = !!t.caseSensitive),
				(this.literal = !!t.literal),
				(this.regexp = !!t.regexp),
				(this.replace = t.replace || ''),
				(this.valid =
					!!this.search &&
					(!this.regexp ||
						(function (t) {
							try {
								return new RegExp(t, ig), !0;
							} catch (t) {
								return !1;
							}
						})(this.search))),
				(this.unquoted = this.unquote(this.search)),
				(this.wholeWord = !!t.wholeWord);
		}
		unquote(t) {
			return this.literal
				? t
				: t.replace(/\\([nrt\\])/g, (t, e) =>
						'n' == e
							? '\n'
							: 'r' == e
								? '\r'
								: 't' == e
									? '\t'
									: '\\'
					);
		}
		eq(t) {
			return (
				this.search == t.search &&
				this.replace == t.replace &&
				this.caseSensitive == t.caseSensitive &&
				this.regexp == t.regexp &&
				this.wholeWord == t.wholeWord
			);
		}
		create() {
			return this.regexp ? new Pg(this) : new xg(this);
		}
		getCursor(t, e = 0, i) {
			let n = t.doc ? t : Vr.create({ doc: t });
			return (
				null == i && (i = n.doc.length),
				this.regexp ? Qg(this, n, e, i) : Sg(this, n, e, i)
			);
		}
	}
	class wg {
		constructor(t) {
			this.spec = t;
		}
	}
	function Sg(t, e, i, n) {
		return new tg(
			e.doc,
			t.unquoted,
			i,
			n,
			t.caseSensitive ? void 0 : (t) => t.toLowerCase(),
			t.wholeWord
				? (function (t, e) {
						return (i, n, r, s) => (
							(s > i || s + r.length < n) &&
								((s = Math.max(0, i - 2)),
								(r = t.sliceString(
									s,
									Math.min(t.length, n + 2)
								))),
							!(
								(e(kg(r, i - s)) == Mr.Word &&
									e($g(r, i - s)) == Mr.Word) ||
								(e($g(r, n - s)) == Mr.Word &&
									e(kg(r, n - s)) == Mr.Word)
							)
						);
					})(e.doc, e.charCategorizer(e.selection.main.head))
				: void 0
		);
	}
	class xg extends wg {
		constructor(t) {
			super(t);
		}
		nextMatch(t, e, i) {
			let n = Sg(this.spec, t, i, t.doc.length).nextOverlapping();
			if (n.done) {
				let i = Math.min(t.doc.length, e + this.spec.unquoted.length);
				n = Sg(this.spec, t, 0, i).nextOverlapping();
			}
			return n.done || (n.value.from == e && n.value.to == i)
				? null
				: n.value;
		}
		prevMatchInRange(t, e, i) {
			for (let n = i; ; ) {
				let i = Math.max(e, n - 1e4 - this.spec.unquoted.length),
					r = Sg(this.spec, t, i, n),
					s = null;
				for (; !r.nextOverlapping().done; ) s = r.value;
				if (s) return s;
				if (i == e) return null;
				n -= 1e4;
			}
		}
		prevMatch(t, e, i) {
			let n = this.prevMatchInRange(t, 0, e);
			return (
				n ||
					(n = this.prevMatchInRange(
						t,
						Math.max(0, i - this.spec.unquoted.length),
						t.doc.length
					)),
				!n || (n.from == e && n.to == i) ? null : n
			);
		}
		getReplacement(t) {
			return this.spec.unquote(this.spec.replace);
		}
		matchAll(t, e) {
			let i = Sg(this.spec, t, 0, t.doc.length),
				n = [];
			for (; !i.next().done; ) {
				if (n.length >= e) return null;
				n.push(i.value);
			}
			return n;
		}
		highlight(t, e, i, n) {
			let r = Sg(
				this.spec,
				t,
				Math.max(0, e - this.spec.unquoted.length),
				Math.min(i + this.spec.unquoted.length, t.doc.length)
			);
			for (; !r.next().done; ) n(r.value.from, r.value.to);
		}
	}
	function Qg(t, e, i, n) {
		return new ng(
			e.doc,
			t.search,
			{
				ignoreCase: !t.caseSensitive,
				test: t.wholeWord
					? ((r = e.charCategorizer(e.selection.main.head)),
						(t, e, i) =>
							!i[0].length ||
							((r(kg(i.input, i.index)) != Mr.Word ||
								r($g(i.input, i.index)) != Mr.Word) &&
								(r($g(i.input, i.index + i[0].length)) !=
									Mr.Word ||
									r(kg(i.input, i.index + i[0].length)) !=
										Mr.Word)))
					: void 0,
			},
			i,
			n
		);
		var r;
	}
	function kg(t, e) {
		return t.slice(Rn(t, e, !1), e);
	}
	function $g(t, e) {
		return t.slice(e, Rn(t, e));
	}
	class Pg extends wg {
		nextMatch(t, e, i) {
			let n = Qg(this.spec, t, i, t.doc.length).next();
			return (
				n.done && (n = Qg(this.spec, t, 0, e).next()),
				n.done ? null : n.value
			);
		}
		prevMatchInRange(t, e, i) {
			for (let n = 1; ; n++) {
				let r = Math.max(e, i - 1e4 * n),
					s = Qg(this.spec, t, r, i),
					o = null;
				for (; !s.next().done; ) o = s.value;
				if (o && (r == e || o.from > r + 10)) return o;
				if (r == e) return null;
			}
		}
		prevMatch(t, e, i) {
			return (
				this.prevMatchInRange(t, 0, e) ||
				this.prevMatchInRange(t, i, t.doc.length)
			);
		}
		getReplacement(t) {
			return this.spec
				.unquote(this.spec.replace)
				.replace(/\$([$&\d+])/g, (e, i) =>
					'$' == i
						? '$'
						: '&' == i
							? t.match[0]
							: '0' != i && +i < t.match.length
								? t.match[i]
								: e
				);
		}
		matchAll(t, e) {
			let i = Qg(this.spec, t, 0, t.doc.length),
				n = [];
			for (; !i.next().done; ) {
				if (n.length >= e) return null;
				n.push(i.value);
			}
			return n;
		}
		highlight(t, e, i, n) {
			let r = Qg(
				this.spec,
				t,
				Math.max(0, e - 250),
				Math.min(i + 250, t.doc.length)
			);
			for (; !r.next().done; ) n(r.value.from, r.value.to);
		}
	}
	const Zg = kr.define(),
		Tg = kr.define(),
		Cg = or.define({
			create: (t) => new Ag(Yg(t).create(), null),
			update(t, e) {
				for (let i of e.effects)
					i.is(Zg)
						? (t = new Ag(i.value.create(), t.panel))
						: i.is(Tg) &&
							(t = new Ag(t.query, i.value ? Wg : null));
				return t;
			},
			provide: (t) => Tc.from(t, (t) => t.panel),
		});
	class Ag {
		constructor(t, e) {
			(this.query = t), (this.panel = e);
		}
	}
	const Xg = mo.mark({ class: 'cm-searchMatch' }),
		Mg = mo.mark({ class: 'cm-searchMatch cm-searchMatch-selected' }),
		Rg = da.fromClass(
			class {
				constructor(t) {
					(this.view = t),
						(this.decorations = this.highlight(t.state.field(Cg)));
				}
				update(t) {
					let e = t.state.field(Cg);
					(e != t.startState.field(Cg) ||
						t.docChanged ||
						t.selectionSet ||
						t.viewportChanged) &&
						(this.decorations = this.highlight(e));
				}
				highlight({ query: t, panel: e }) {
					if (!e || !t.spec.valid) return mo.none;
					let { view: i } = this,
						n = new zr();
					for (
						let e = 0, r = i.visibleRanges, s = r.length;
						e < s;
						e++
					) {
						let { from: o, to: a } = r[e];
						for (; e < s - 1 && a > r[e + 1].from - 500; )
							a = r[++e].to;
						t.highlight(i.state, o, a, (t, e) => {
							let r = i.state.selection.ranges.some(
								(i) => i.from == t && i.to == e
							);
							n.add(t, e, r ? Mg : Xg);
						});
					}
					return n.finish();
				}
			},
			{ decorations: (t) => t.decorations }
		);
	function _g(t) {
		return (e) => {
			let i = e.state.field(Cg, !1);
			return i && i.query.spec.valid ? t(e, i) : Bg(e);
		};
	}
	const Vg = _g((t, { query: e }) => {
			let { to: i } = t.state.selection.main,
				n = e.nextMatch(t.state, i, i);
			if (!n) return !1;
			let r = Fn.single(n.from, n.to),
				s = t.state.facet(yg);
			return (
				t.dispatch({
					selection: r,
					effects: [Kg(t, n), s.scrollToMatch(r.main, t)],
					userEvent: 'select.search',
				}),
				Lg(t),
				!0
			);
		}),
		qg = _g((t, { query: e }) => {
			let { state: i } = t,
				{ from: n } = i.selection.main,
				r = e.prevMatch(i, n, n);
			if (!r) return !1;
			let s = Fn.single(r.from, r.to),
				o = t.state.facet(yg);
			return (
				t.dispatch({
					selection: s,
					effects: [Kg(t, r), o.scrollToMatch(s.main, t)],
					userEvent: 'select.search',
				}),
				Lg(t),
				!0
			);
		}),
		jg = _g((t, { query: e }) => {
			let i = e.matchAll(t.state, 1e3);
			return !(
				!i ||
				!i.length ||
				(t.dispatch({
					selection: Fn.create(i.map((t) => Fn.range(t.from, t.to))),
					userEvent: 'select.search.matches',
				}),
				0)
			);
		}),
		Dg = _g((t, { query: e }) => {
			let { state: i } = t,
				{ from: n, to: r } = i.selection.main;
			if (i.readOnly) return !1;
			let s = e.nextMatch(i, n, n);
			if (!s) return !1;
			let o,
				a,
				l = s,
				h = [],
				c = [];
			if (
				(l.from == n &&
					l.to == r &&
					((a = i.toText(e.getReplacement(l))),
					h.push({ from: l.from, to: l.to, insert: a }),
					(l = e.nextMatch(i, l.from, l.to)),
					c.push(
						uh.announce.of(
							i.phrase(
								'replaced match on line $',
								i.doc.lineAt(n).number
							) + '.'
						)
					)),
				l)
			) {
				let e =
					0 == h.length || h[0].from >= s.to
						? 0
						: s.to - s.from - a.length;
				(o = Fn.single(l.from - e, l.to - e)),
					c.push(Kg(t, l)),
					c.push(i.facet(yg).scrollToMatch(o.main, t));
			}
			return (
				t.dispatch({
					changes: h,
					selection: o,
					effects: c,
					userEvent: 'input.replace',
				}),
				!0
			);
		}),
		Eg = _g((t, { query: e }) => {
			if (t.state.readOnly) return !1;
			let i = e.matchAll(t.state, 1e9).map((t) => {
				let { from: i, to: n } = t;
				return { from: i, to: n, insert: e.getReplacement(t) };
			});
			if (!i.length) return !1;
			let n = t.state.phrase('replaced $ matches', i.length) + '.';
			return (
				t.dispatch({
					changes: i,
					effects: uh.announce.of(n),
					userEvent: 'input.replace.all',
				}),
				!0
			);
		});
	function Wg(t) {
		return t.state.facet(yg).createPanel(t);
	}
	function Yg(t, e) {
		var i, n, r, s, o;
		let a = t.selection.main,
			l = a.empty || a.to > a.from + 100 ? '' : t.sliceDoc(a.from, a.to);
		if (e && !l) return e;
		let h = t.facet(yg);
		return new vg({
			search: (
				null !== (i = null == e ? void 0 : e.literal) && void 0 !== i
					? i
					: h.literal
			)
				? l
				: l.replace(/\n/g, '\\n'),
			caseSensitive:
				null !== (n = null == e ? void 0 : e.caseSensitive) &&
				void 0 !== n
					? n
					: h.caseSensitive,
			literal:
				null !== (r = null == e ? void 0 : e.literal) && void 0 !== r
					? r
					: h.literal,
			regexp:
				null !== (s = null == e ? void 0 : e.regexp) && void 0 !== s
					? s
					: h.regexp,
			wholeWord:
				null !== (o = null == e ? void 0 : e.wholeWord) && void 0 !== o
					? o
					: h.wholeWord,
		});
	}
	function zg(t) {
		let e = kc(t, Wg);
		return e && e.dom.querySelector('[main-field]');
	}
	function Lg(t) {
		let e = zg(t);
		e && e == t.root.activeElement && e.select();
	}
	const Bg = (t) => {
			let e = t.state.field(Cg, !1);
			if (e && e.panel) {
				let i = zg(t);
				if (i && i != t.root.activeElement) {
					let n = Yg(t.state, e.query.spec);
					n.valid && t.dispatch({ effects: Zg.of(n) }),
						i.focus(),
						i.select();
				}
			} else
				t.dispatch({
					effects: [
						Tg.of(!0),
						e
							? Zg.of(Yg(t.state, e.query.spec))
							: kr.appendConfig.of(tb),
					],
				});
			return !0;
		},
		Ug = (t) => {
			let e = t.state.field(Cg, !1);
			if (!e || !e.panel) return !1;
			let i = kc(t, Wg);
			return (
				i && i.dom.contains(t.root.activeElement) && t.focus(),
				t.dispatch({ effects: Tg.of(!1) }),
				!0
			);
		},
		Ng = [
			{ key: 'Mod-f', run: Bg, scope: 'editor search-panel' },
			{
				key: 'F3',
				run: Vg,
				shift: qg,
				scope: 'editor search-panel',
				preventDefault: !0,
			},
			{
				key: 'Mod-g',
				run: Vg,
				shift: qg,
				scope: 'editor search-panel',
				preventDefault: !0,
			},
			{ key: 'Escape', run: Ug, scope: 'editor search-panel' },
			{
				key: 'Mod-Shift-l',
				run: ({ state: t, dispatch: e }) => {
					let i = t.selection;
					if (i.ranges.length > 1 || i.main.empty) return !1;
					let { from: n, to: r } = i.main,
						s = [],
						o = 0;
					for (
						let e = new tg(t.doc, t.sliceDoc(n, r));
						!e.next().done;

					) {
						if (s.length > 1e3) return !1;
						e.value.from == n && (o = s.length),
							s.push(Fn.range(e.value.from, e.value.to));
					}
					return (
						e(
							t.update({
								selection: Fn.create(s, o),
								userEvent: 'select.search.matches',
							})
						),
						!0
					);
				},
			},
			{
				key: 'Mod-Alt-g',
				run: (t) => {
					let e = kc(t, lg);
					if (!e) {
						let i = [hg.of(!0)];
						null == t.state.field(cg, !1) &&
							i.push(kr.appendConfig.of([cg, ug])),
							t.dispatch({ effects: i }),
							(e = kc(t, lg));
					}
					return e && e.dom.querySelector('input').select(), !0;
				},
			},
			{
				key: 'Mod-d',
				run: ({ state: t, dispatch: e }) => {
					let { ranges: i } = t.selection;
					if (i.some((t) => t.from === t.to))
						return (({ state: t, dispatch: e }) => {
							let { selection: i } = t,
								n = Fn.create(
									i.ranges.map(
										(e) =>
											t.wordAt(e.head) ||
											Fn.cursor(e.head)
									),
									i.mainIndex
								);
							return (
								!n.eq(i) && (e(t.update({ selection: n })), !0)
							);
						})({ state: t, dispatch: e });
					let n = t.sliceDoc(i[0].from, i[0].to);
					if (
						t.selection.ranges.some(
							(e) => t.sliceDoc(e.from, e.to) != n
						)
					)
						return !1;
					let r = (function (t, e) {
						let { main: i, ranges: n } = t.selection,
							r = t.wordAt(i.head),
							s = r && r.from == i.from && r.to == i.to;
						for (
							let i = !1,
								r = new tg(t.doc, e, n[n.length - 1].to);
							;

						) {
							if ((r.next(), !r.done)) {
								if (i && n.some((t) => t.from == r.value.from))
									continue;
								if (s) {
									let e = t.wordAt(r.value.from);
									if (
										!e ||
										e.from != r.value.from ||
										e.to != r.value.to
									)
										continue;
								}
								return r.value;
							}
							if (i) return null;
							(r = new tg(
								t.doc,
								e,
								0,
								Math.max(0, n[n.length - 1].from - 1)
							)),
								(i = !0);
						}
					})(t, n);
					return (
						!!r &&
						(e(
							t.update({
								selection: t.selection.addRange(
									Fn.range(r.from, r.to),
									!1
								),
								effects: uh.scrollIntoView(r.to),
							})
						),
						!0)
					);
				},
				preventDefault: !0,
			},
		];
	class Gg {
		constructor(t) {
			this.view = t;
			let e = (this.query = t.state.field(Cg).query.spec);
			function i(t, e, i) {
				return Hm(
					'button',
					{ class: 'cm-button', name: t, onclick: e, type: 'button' },
					i
				);
			}
			(this.commit = this.commit.bind(this)),
				(this.searchField = Hm('input', {
					value: e.search,
					placeholder: Ig(t, 'Find'),
					'aria-label': Ig(t, 'Find'),
					class: 'cm-textfield',
					name: 'search',
					form: '',
					'main-field': 'true',
					onchange: this.commit,
					onkeyup: this.commit,
				})),
				(this.replaceField = Hm('input', {
					value: e.replace,
					placeholder: Ig(t, 'Replace'),
					'aria-label': Ig(t, 'Replace'),
					class: 'cm-textfield',
					name: 'replace',
					form: '',
					onchange: this.commit,
					onkeyup: this.commit,
				})),
				(this.caseField = Hm('input', {
					type: 'checkbox',
					name: 'case',
					form: '',
					checked: e.caseSensitive,
					onchange: this.commit,
				})),
				(this.reField = Hm('input', {
					type: 'checkbox',
					name: 're',
					form: '',
					checked: e.regexp,
					onchange: this.commit,
				})),
				(this.wordField = Hm('input', {
					type: 'checkbox',
					name: 'word',
					form: '',
					checked: e.wholeWord,
					onchange: this.commit,
				})),
				(this.dom = Hm(
					'div',
					{ onkeydown: (t) => this.keydown(t), class: 'cm-search' },
					[
						this.searchField,
						i('next', () => Vg(t), [Ig(t, 'next')]),
						i('prev', () => qg(t), [Ig(t, 'previous')]),
						i('select', () => jg(t), [Ig(t, 'all')]),
						Hm('label', null, [
							this.caseField,
							Ig(t, 'match case'),
						]),
						Hm('label', null, [this.reField, Ig(t, 'regexp')]),
						Hm('label', null, [this.wordField, Ig(t, 'by word')]),
						...(t.state.readOnly
							? []
							: [
									Hm('br'),
									this.replaceField,
									i('replace', () => Dg(t), [
										Ig(t, 'replace'),
									]),
									i('replaceAll', () => Eg(t), [
										Ig(t, 'replace all'),
									]),
								]),
						Hm(
							'button',
							{
								name: 'close',
								onclick: () => Ug(t),
								'aria-label': Ig(t, 'close'),
								type: 'button',
							},
							['×']
						),
					]
				));
		}
		commit() {
			let t = new vg({
				search: this.searchField.value,
				caseSensitive: this.caseField.checked,
				regexp: this.reField.checked,
				wholeWord: this.wordField.checked,
				replace: this.replaceField.value,
			});
			t.eq(this.query) ||
				((this.query = t), this.view.dispatch({ effects: Zg.of(t) }));
		}
		keydown(t) {
			var e, i;
			(i = t),
				kh(wh((e = this.view).state), i, e, 'search-panel')
					? t.preventDefault()
					: 13 == t.keyCode && t.target == this.searchField
						? (t.preventDefault(),
							(t.shiftKey ? qg : Vg)(this.view))
						: 13 == t.keyCode &&
							t.target == this.replaceField &&
							(t.preventDefault(), Dg(this.view));
		}
		update(t) {
			for (let e of t.transactions)
				for (let t of e.effects)
					t.is(Zg) &&
						!t.value.eq(this.query) &&
						this.setQuery(t.value);
		}
		setQuery(t) {
			(this.query = t),
				(this.searchField.value = t.search),
				(this.replaceField.value = t.replace),
				(this.caseField.checked = t.caseSensitive),
				(this.reField.checked = t.regexp),
				(this.wordField.checked = t.wholeWord);
		}
		mount() {
			this.searchField.select();
		}
		get pos() {
			return 80;
		}
		get top() {
			return this.view.state.facet(yg).top;
		}
	}
	function Ig(t, e) {
		return t.state.phrase(e);
	}
	const Fg = 30,
		Hg = /[\s\.,:;?!]/;
	function Kg(t, { from: e, to: i }) {
		let n = t.state.doc.lineAt(e),
			r = t.state.doc.lineAt(i).to,
			s = Math.max(n.from, e - Fg),
			o = Math.min(r, i + Fg),
			a = t.state.sliceDoc(s, o);
		if (s != n.from)
			for (let t = 0; t < Fg; t++)
				if (!Hg.test(a[t + 1]) && Hg.test(a[t])) {
					a = a.slice(t);
					break;
				}
		if (o != r)
			for (let t = a.length - 1; t > a.length - Fg; t--)
				if (!Hg.test(a[t - 1]) && Hg.test(a[t])) {
					a = a.slice(0, t);
					break;
				}
		return uh.announce.of(
			`${t.state.phrase('current match')}. ${a} ${t.state.phrase('on line')} ${n.number}.`
		);
	}
	const Jg = uh.baseTheme({
			'.cm-panel.cm-search': {
				padding: '2px 6px 4px',
				position: 'relative',
				'& [name=close]': {
					position: 'absolute',
					top: '0',
					right: '4px',
					backgroundColor: 'inherit',
					border: 'none',
					font: 'inherit',
					padding: 0,
					margin: 0,
				},
				'& input, & button, & label': { margin: '.2em .6em .2em 0' },
				'& input[type=checkbox]': { marginRight: '.2em' },
				'& label': { fontSize: '80%', whiteSpace: 'pre' },
			},
			'&light .cm-searchMatch': { backgroundColor: '#ffff0054' },
			'&dark .cm-searchMatch': { backgroundColor: '#00ffff8a' },
			'&light .cm-searchMatch-selected': { backgroundColor: '#ff6a0054' },
			'&dark .cm-searchMatch-selected': { backgroundColor: '#ff00ff8a' },
		}),
		tb = [Cg, lr.low(Rg), Jg];
	class eb {
		constructor(t, e, i) {
			(this.from = t), (this.to = e), (this.diagnostic = i);
		}
	}
	class ib {
		constructor(t, e, i) {
			(this.diagnostics = t), (this.panel = e), (this.selected = i);
		}
		static init(t, e, i) {
			let n = t,
				r = i.facet(fb).markerFilter;
			r && (n = r(n, i));
			let s = t.slice().sort((t, e) => t.from - e.from || t.to - e.to),
				o = new zr(),
				a = [],
				l = 0;
			for (let t = 0; ; ) {
				let e,
					n,
					r = t == s.length ? null : s[t];
				if (!r && !a.length) break;
				for (
					a.length
						? ((e = l),
							(n = a.reduce(
								(t, e) => Math.min(t, e.to),
								r && r.from > e ? r.from : 1e8
							)))
						: ((e = r.from), (n = r.to), a.push(r), t++);
					t < s.length;

				) {
					let i = s[t];
					if (i.from != e || !(i.to > i.from || i.to == e)) {
						n = Math.min(i.from, n);
						break;
					}
					a.push(i), t++, (n = Math.min(i.to, n));
				}
				let h = Sb(a);
				if (
					a.some(
						(t) =>
							t.from == t.to ||
							(t.from == t.to - 1 &&
								i.doc.lineAt(t.from).to == t.from)
					)
				)
					o.add(
						e,
						e,
						mo.widget({ widget: new mb(h), diagnostics: a.slice() })
					);
				else {
					let t = a.reduce(
						(t, e) => (e.markClass ? t + ' ' + e.markClass : t),
						''
					);
					o.add(
						e,
						n,
						mo.mark({
							class: 'cm-lintRange cm-lintRange-' + h + t,
							diagnostics: a.slice(),
							inclusiveEnd: a.some((t) => t.to > n),
						})
					);
				}
				l = n;
				for (let t = 0; t < a.length; t++)
					a[t].to <= l && a.splice(t--, 1);
			}
			let h = o.finish();
			return new ib(h, e, nb(h));
		}
	}
	function nb(t, e = null, i = 0) {
		let n = null;
		return (
			t.between(i, 1e9, (t, i, { spec: r }) => {
				if (!(e && r.diagnostics.indexOf(e) < 0))
					if (n) {
						if (r.diagnostics.indexOf(n.diagnostic) < 0) return !1;
						n = new eb(n.from, i, n.diagnostic);
					} else n = new eb(t, i, e || r.diagnostics[0]);
			}),
			n
		);
	}
	const rb = kr.define(),
		sb = kr.define(),
		ob = kr.define(),
		ab = or.define({
			create: () => new ib(mo.none, null, null),
			update(t, e) {
				if (e.docChanged && t.diagnostics.size) {
					let i = t.diagnostics.map(e.changes),
						n = null,
						r = t.panel;
					if (t.selected) {
						let r = e.changes.mapPos(t.selected.from, 1);
						n = nb(i, t.selected.diagnostic, r) || nb(i, null, r);
					}
					!i.size && r && e.state.facet(fb).autoPanel && (r = null),
						(t = new ib(i, r, n));
				}
				for (let i of e.effects)
					if (i.is(rb)) {
						let n = e.state.facet(fb).autoPanel
							? i.value.length
								? bb.open
								: null
							: t.panel;
						t = ib.init(i.value, n, e.state);
					} else
						i.is(sb)
							? (t = new ib(
									t.diagnostics,
									i.value ? bb.open : null,
									t.selected
								))
							: i.is(ob) &&
								(t = new ib(t.diagnostics, t.panel, i.value));
				return t;
			},
			provide: (t) => [
				Tc.from(t, (t) => t.panel),
				uh.decorations.from(t, (t) => t.diagnostics),
			],
		}),
		lb = mo.mark({ class: 'cm-lintRange cm-lintRange-active' });
	function hb(t, e, i) {
		let n,
			{ diagnostics: r } = t.state.field(ab),
			s = -1,
			o = -1;
		r.between(
			e - (i < 0 ? 1 : 0),
			e + (i > 0 ? 1 : 0),
			(t, r, { spec: a }) => {
				if (
					e >= t &&
					e <= r &&
					(t == r || ((e > t || i > 0) && (e < r || i < 0)))
				)
					return (n = a.diagnostics), (s = t), (o = r), !1;
			}
		);
		let a = t.state.facet(fb).tooltipFilter;
		return (
			n && a && (n = a(n, t.state)),
			n
				? {
						pos: s,
						end: o,
						above: t.state.doc.lineAt(s).to < o,
						create: () => ({ dom: cb(t, n) }),
					}
				: null
		);
	}
	function cb(t, e) {
		return Hm(
			'ul',
			{ class: 'cm-tooltip-lint' },
			e.map((e) => pb(t, e, !1))
		);
	}
	const ub = (t) => {
			let e = t.state.field(ab, !1);
			return !(!e || !e.panel || (t.dispatch({ effects: sb.of(!1) }), 0));
		},
		db = [
			{
				key: 'Mod-Shift-m',
				run: (t) => {
					let e = t.state.field(ab, !1);
					var i, n;
					(e && e.panel) ||
						t.dispatch({
							effects:
								((i = t.state),
								(n = [sb.of(!0)]),
								i.field(ab, !1)
									? n
									: n.concat(kr.appendConfig.of(xb))),
						});
					let r = kc(t, bb.open);
					return (
						r && r.dom.querySelector('.cm-panel-lint ul').focus(),
						!0
					);
				},
				preventDefault: !0,
			},
			{
				key: 'F8',
				run: (t) => {
					let e = t.state.field(ab, !1);
					if (!e) return !1;
					let i = t.state.selection.main,
						n = e.diagnostics.iter(i.to + 1);
					return !(
						(!n.value &&
							((n = e.diagnostics.iter(0)),
							!n.value || (n.from == i.from && n.to == i.to))) ||
						(t.dispatch({
							selection: { anchor: n.from, head: n.to },
							scrollIntoView: !0,
						}),
						0)
					);
				},
			},
		],
		fb = Jn.define({
			combine: (t) =>
				Object.assign(
					{
						sources: t
							.map((t) => t.source)
							.filter((t) => null != t),
					},
					qr(
						t.map((t) => t.config),
						{
							delay: 750,
							markerFilter: null,
							tooltipFilter: null,
							needsRefresh: null,
							hideOn: () => null,
						},
						{
							needsRefresh: (t, e) =>
								t ? (e ? (i) => t(i) || e(i) : t) : e,
						}
					)
				),
		});
	function Ob(t) {
		let e = [];
		if (t)
			t: for (let { name: i } of t) {
				for (let t = 0; t < i.length; t++) {
					let n = i[t];
					if (
						/[a-zA-Z]/.test(n) &&
						!e.some((t) => t.toLowerCase() == n.toLowerCase())
					) {
						e.push(n);
						continue t;
					}
				}
				e.push('');
			}
		return e;
	}
	function pb(t, e, i) {
		var n;
		let r = i ? Ob(e.actions) : [];
		return Hm(
			'li',
			{ class: 'cm-diagnostic cm-diagnostic-' + e.severity },
			Hm(
				'span',
				{ class: 'cm-diagnosticText' },
				e.renderMessage ? e.renderMessage(t) : e.message
			),
			null === (n = e.actions) || void 0 === n
				? void 0
				: n.map((i, n) => {
						let s = !1,
							o = (n) => {
								if ((n.preventDefault(), s)) return;
								s = !0;
								let r = nb(t.state.field(ab).diagnostics, e);
								r && i.apply(t, r.from, r.to);
							},
							{ name: a } = i,
							l = r[n] ? a.indexOf(r[n]) : -1,
							h =
								l < 0
									? a
									: [
											a.slice(0, l),
											Hm('u', a.slice(l, l + 1)),
											a.slice(l + 1),
										];
						return Hm(
							'button',
							{
								type: 'button',
								class: 'cm-diagnosticAction',
								onclick: o,
								onmousedown: o,
								'aria-label': ` Action: ${a}${l < 0 ? '' : ` (access key "${r[n]})"`}.`,
							},
							h
						);
					}),
			e.source && Hm('div', { class: 'cm-diagnosticSource' }, e.source)
		);
	}
	class mb extends Oo {
		constructor(t) {
			super(), (this.sev = t);
		}
		eq(t) {
			return t.sev == this.sev;
		}
		toDOM() {
			return Hm('span', {
				class: 'cm-lintPoint cm-lintPoint-' + this.sev,
			});
		}
	}
	class gb {
		constructor(t, e) {
			(this.diagnostic = e),
				(this.id =
					'item_' +
					Math.floor(4294967295 * Math.random()).toString(16)),
				(this.dom = pb(t, e, !0)),
				(this.dom.id = this.id),
				this.dom.setAttribute('role', 'option');
		}
	}
	class bb {
		constructor(t) {
			(this.view = t),
				(this.items = []),
				(this.list = Hm('ul', {
					tabIndex: 0,
					role: 'listbox',
					'aria-label': this.view.state.phrase('Diagnostics'),
					onkeydown: (e) => {
						if (27 == e.keyCode) ub(this.view), this.view.focus();
						else if (38 == e.keyCode || 33 == e.keyCode)
							this.moveSelection(
								(this.selectedIndex - 1 + this.items.length) %
									this.items.length
							);
						else if (40 == e.keyCode || 34 == e.keyCode)
							this.moveSelection(
								(this.selectedIndex + 1) % this.items.length
							);
						else if (36 == e.keyCode) this.moveSelection(0);
						else if (35 == e.keyCode)
							this.moveSelection(this.items.length - 1);
						else if (13 == e.keyCode) this.view.focus();
						else {
							if (
								!(
									e.keyCode >= 65 &&
									e.keyCode <= 90 &&
									this.selectedIndex >= 0
								)
							)
								return;
							{
								let { diagnostic: i } =
										this.items[this.selectedIndex],
									n = Ob(i.actions);
								for (let r = 0; r < n.length; r++)
									if (
										n[r].toUpperCase().charCodeAt(0) ==
										e.keyCode
									) {
										let e = nb(
											this.view.state.field(ab)
												.diagnostics,
											i
										);
										e &&
											i.actions[r].apply(t, e.from, e.to);
									}
							}
						}
						e.preventDefault();
					},
					onclick: (t) => {
						for (let e = 0; e < this.items.length; e++)
							this.items[e].dom.contains(t.target) &&
								this.moveSelection(e);
					},
				})),
				(this.dom = Hm(
					'div',
					{ class: 'cm-panel-lint' },
					this.list,
					Hm(
						'button',
						{
							type: 'button',
							name: 'close',
							'aria-label': this.view.state.phrase('close'),
							onclick: () => ub(this.view),
						},
						'×'
					)
				)),
				this.update();
		}
		get selectedIndex() {
			let t = this.view.state.field(ab).selected;
			if (!t) return -1;
			for (let e = 0; e < this.items.length; e++)
				if (this.items[e].diagnostic == t.diagnostic) return e;
			return -1;
		}
		update() {
			let { diagnostics: t, selected: e } = this.view.state.field(ab),
				i = 0,
				n = !1,
				r = null,
				s = new Set();
			for (
				t.between(
					0,
					this.view.state.doc.length,
					(t, o, { spec: a }) => {
						for (let t of a.diagnostics) {
							if (s.has(t)) continue;
							s.add(t);
							let o,
								a = -1;
							for (let e = i; e < this.items.length; e++)
								if (this.items[e].diagnostic == t) {
									a = e;
									break;
								}
							a < 0
								? ((o = new gb(this.view, t)),
									this.items.splice(i, 0, o),
									(n = !0))
								: ((o = this.items[a]),
									a > i &&
										(this.items.splice(i, a - i),
										(n = !0))),
								e && o.diagnostic == e.diagnostic
									? o.dom.hasAttribute('aria-selected') ||
										(o.dom.setAttribute(
											'aria-selected',
											'true'
										),
										(r = o))
									: o.dom.hasAttribute('aria-selected') &&
										o.dom.removeAttribute('aria-selected'),
								i++;
						}
					}
				);
				i < this.items.length &&
				!(1 == this.items.length && this.items[0].diagnostic.from < 0);

			)
				(n = !0), this.items.pop();
			0 == this.items.length &&
				(this.items.push(
					new gb(this.view, {
						from: -1,
						to: -1,
						severity: 'info',
						message: this.view.state.phrase('No diagnostics'),
					})
				),
				(n = !0)),
				r
					? (this.list.setAttribute('aria-activedescendant', r.id),
						this.view.requestMeasure({
							key: this,
							read: () => ({
								sel: r.dom.getBoundingClientRect(),
								panel: this.list.getBoundingClientRect(),
							}),
							write: ({ sel: t, panel: e }) => {
								let i = e.height / this.list.offsetHeight;
								t.top < e.top
									? (this.list.scrollTop -=
											(e.top - t.top) / i)
									: t.bottom > e.bottom &&
										(this.list.scrollTop +=
											(t.bottom - e.bottom) / i);
							},
						}))
					: this.selectedIndex < 0 &&
						this.list.removeAttribute('aria-activedescendant'),
				n && this.sync();
		}
		sync() {
			let t = this.list.firstChild;
			function e() {
				let e = t;
				(t = e.nextSibling), e.remove();
			}
			for (let i of this.items)
				if (i.dom.parentNode == this.list) {
					for (; t != i.dom; ) e();
					t = i.dom.nextSibling;
				} else this.list.insertBefore(i.dom, t);
			for (; t; ) e();
		}
		moveSelection(t) {
			if (this.selectedIndex < 0) return;
			let e = nb(
				this.view.state.field(ab).diagnostics,
				this.items[t].diagnostic
			);
			e &&
				this.view.dispatch({
					selection: { anchor: e.from, head: e.to },
					scrollIntoView: !0,
					effects: ob.of(e),
				});
		}
		static open(t) {
			return new bb(t);
		}
	}
	function yb(t) {
		return (function (t, e = 'viewBox="0 0 40 40"') {
			return `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" ${e}>${encodeURIComponent(t)}</svg>')`;
		})(
			`<path d="m0 2.5 l2 -1.5 l1 0 l2 1.5 l1 0" stroke="${t}" fill="none" stroke-width=".7"/>`,
			'width="6" height="3"'
		);
	}
	const vb = uh.baseTheme({
		'.cm-diagnostic': {
			padding: '3px 6px 3px 8px',
			marginLeft: '-1px',
			display: 'block',
			whiteSpace: 'pre-wrap',
		},
		'.cm-diagnostic-error': { borderLeft: '5px solid #d11' },
		'.cm-diagnostic-warning': { borderLeft: '5px solid orange' },
		'.cm-diagnostic-info': { borderLeft: '5px solid #999' },
		'.cm-diagnostic-hint': { borderLeft: '5px solid #66d' },
		'.cm-diagnosticAction': {
			font: 'inherit',
			border: 'none',
			padding: '2px 4px',
			backgroundColor: '#444',
			color: 'white',
			borderRadius: '3px',
			marginLeft: '8px',
			cursor: 'pointer',
		},
		'.cm-diagnosticSource': { fontSize: '70%', opacity: 0.7 },
		'.cm-lintRange': {
			backgroundPosition: 'left bottom',
			backgroundRepeat: 'repeat-x',
			paddingBottom: '0.7px',
		},
		'.cm-lintRange-error': { backgroundImage: yb('#d11') },
		'.cm-lintRange-warning': { backgroundImage: yb('orange') },
		'.cm-lintRange-info': { backgroundImage: yb('#999') },
		'.cm-lintRange-hint': { backgroundImage: yb('#66d') },
		'.cm-lintRange-active': { backgroundColor: '#ffdd9980' },
		'.cm-tooltip-lint': { padding: 0, margin: 0 },
		'.cm-lintPoint': {
			position: 'relative',
			'&:after': {
				content: '""',
				position: 'absolute',
				bottom: 0,
				left: '-2px',
				borderLeft: '3px solid transparent',
				borderRight: '3px solid transparent',
				borderBottom: '4px solid #d11',
			},
		},
		'.cm-lintPoint-warning': { '&:after': { borderBottomColor: 'orange' } },
		'.cm-lintPoint-info': { '&:after': { borderBottomColor: '#999' } },
		'.cm-lintPoint-hint': { '&:after': { borderBottomColor: '#66d' } },
		'.cm-panel.cm-panel-lint': {
			position: 'relative',
			'& ul': {
				maxHeight: '100px',
				overflowY: 'auto',
				'& [aria-selected]': {
					backgroundColor: '#ddd',
					'& u': { textDecoration: 'underline' },
				},
				'&:focus [aria-selected]': {
					background_fallback: '#bdf',
					backgroundColor: 'Highlight',
					color_fallback: 'white',
					color: 'HighlightText',
				},
				'& u': { textDecoration: 'none' },
				padding: 0,
				margin: 0,
			},
			'& [name=close]': {
				position: 'absolute',
				top: '0',
				right: '2px',
				background: 'inherit',
				border: 'none',
				font: 'inherit',
				padding: 0,
				margin: 0,
			},
		},
	});
	function wb(t) {
		return 'error' == t ? 4 : 'warning' == t ? 3 : 'info' == t ? 2 : 1;
	}
	function Sb(t) {
		let e = 'hint',
			i = 1;
		for (let n of t) {
			let t = wb(n.severity);
			t > i && ((i = t), (e = n.severity));
		}
		return e;
	}
	const xb = [
		ab,
		uh.decorations.compute([ab], (t) => {
			let { selected: e, panel: i } = t.field(ab);
			return e && i && e.from != e.to
				? mo.set([lb.range(e.from, e.to)])
				: mo.none;
		}),
		wc(hb, {
			hideOn: function (t, e) {
				let i = e.pos,
					n = e.end || i,
					r = t.state.facet(fb).hideOn(t, i, n);
				if (null != r) return r;
				let s = t.startState.doc.lineAt(e.pos);
				return !(
					!t.effects.some((t) => t.is(rb)) &&
					!t.changes.touchesRange(s.from, Math.max(s.to, n))
				);
			},
		}),
		vb,
	];
	var Qb = function (t) {
		void 0 === t && (t = {});
		var { crosshairCursor: e = !1 } = t,
			i = [];
		!1 !== t.closeBracketsKeymap && (i = i.concat(bO)),
			!1 !== t.defaultKeymap && (i = i.concat(Im)),
			!1 !== t.searchKeymap && (i = i.concat(Ng)),
			!1 !== t.historyKeymap && (i = i.concat(Jp)),
			!1 !== t.foldKeymap && (i = i.concat(Uu)),
			!1 !== t.completionKeymap && (i = i.concat($O)),
			!1 !== t.lintKeymap && (i = i.concat(db));
		var n = [];
		return (
			!1 !== t.lineNumbers &&
				n.push(
					(function (t = {}) {
						return [Uc.of(t), qc(), Ic];
					})()
				),
			!1 !== t.highlightActiveLineGutter && n.push(Kc),
			!1 !== t.highlightSpecialChars &&
				n.push(
					(function (t = {}) {
						return [
							Ih.of(t),
							Fh ||
								(Fh = da.fromClass(
									class {
										constructor(t) {
											(this.view = t),
												(this.decorations = mo.none),
												(this.decorationCache =
													Object.create(null)),
												(this.decorator =
													this.makeDecorator(
														t.state.facet(Ih)
													)),
												(this.decorations =
													this.decorator.createDeco(
														t
													));
										}
										makeDecorator(t) {
											return new Lh({
												regexp: t.specialChars,
												decoration: (e, i, n) => {
													let { doc: r } = i.state,
														s = Vn(e[0], 0);
													if (9 == s) {
														let t = r.lineAt(n),
															e = i.state.tabSize,
															s = ts(
																t.text,
																e,
																n - t.from
															);
														return mo.replace({
															widget: new Kh(
																((e - (s % e)) *
																	this.view
																		.defaultCharacterWidth) /
																	this.view
																		.scaleX
															),
														});
													}
													return (
														this.decorationCache[
															s
														] ||
														(this.decorationCache[
															s
														] = mo.replace({
															widget: new Hh(
																t,
																s
															),
														}))
													);
												},
												boundary: t.replaceTabs
													? void 0
													: /[^]/,
											});
										}
										update(t) {
											let e = t.state.facet(Ih);
											t.startState.facet(Ih) != e
												? ((this.decorator =
														this.makeDecorator(e)),
													(this.decorations =
														this.decorator.createDeco(
															t.view
														)))
												: (this.decorations =
														this.decorator.updateDeco(
															t,
															this.decorations
														));
										}
									},
									{ decorations: (t) => t.decorations }
								)),
						];
					})()
				),
			!1 !== t.history &&
				n.push(
					(function (t = {}) {
						return [
							Vp,
							_p.of(t),
							uh.domEventHandlers({
								beforeinput(t, e) {
									let i =
										'historyUndo' == t.inputType
											? jp
											: 'historyRedo' == t.inputType
												? Dp
												: null;
									return !!i && (t.preventDefault(), i(e));
								},
							}),
						];
					})()
				),
			!1 !== t.foldGutter &&
				n.push(
					(function (t = {}) {
						let e = Object.assign(Object.assign({}, Ju), t),
							i = new td(e, !0),
							n = new td(e, !1),
							r = da.fromClass(
								class {
									constructor(t) {
										(this.from = t.viewport.from),
											(this.markers =
												this.buildMarkers(t));
									}
									update(t) {
										(t.docChanged ||
											t.viewportChanged ||
											t.startState.facet(pu) !=
												t.state.facet(pu) ||
											t.startState.field(Wu, !1) !=
												t.state.field(Wu, !1) ||
											ou(t.startState) != ou(t.state) ||
											e.foldingChanged(t)) &&
											(this.markers = this.buildMarkers(
												t.view
											));
									}
									buildMarkers(t) {
										let e = new zr();
										for (let r of t.viewportLineBlocks) {
											let s = Yu(t.state, r.from, r.to)
												? n
												: Vu(t.state, r.from, r.to)
													? i
													: null;
											s && e.add(r.from, r.from, s);
										}
										return e.finish();
									}
								}
							),
							{ domEventHandlers: s } = e;
						return [
							r,
							_c({
								class: 'cm-foldGutter',
								markers(t) {
									var e;
									return (
										(null === (e = t.plugin(r)) ||
										void 0 === e
											? void 0
											: e.markers) || Yr.empty
									);
								},
								initialSpacer: () => new td(e, !1),
								domEventHandlers: Object.assign(
									Object.assign({}, s),
									{
										click: (t, e, i) => {
											if (s.click && s.click(t, e, i))
												return !0;
											let n = Yu(t.state, e.from, e.to);
											if (n)
												return (
													t.dispatch({
														effects: Du.of(n),
													}),
													!0
												);
											let r = Vu(t.state, e.from, e.to);
											return (
												!!r &&
												(t.dispatch({
													effects: ju.of(r),
												}),
												!0)
											);
										},
									}
								),
							}),
							Iu(),
						];
					})()
				),
			!1 !== t.drawSelection &&
				n.push(
					(function (t = {}) {
						return [Mh.of(t), _h, qh, Dh, na.of(!0)];
					})()
				),
			!1 !== t.dropCursor && n.push([Wh, Yh]),
			!1 !== t.allowMultipleSelections &&
				n.push(Vr.allowMultipleSelections.of(!0)),
			!1 !== t.indentOnInput &&
				n.push(
					Vr.transactionFilter.of((t) => {
						if (
							!t.docChanged ||
							(!t.isUserEvent('input.type') &&
								!t.isUserEvent('input.complete'))
						)
							return t;
						let e = t.startState.languageDataAt(
							'indentOnInput',
							t.startState.selection.main.head
						);
						if (!e.length) return t;
						let i = t.newDoc,
							{ head: n } = t.newSelection.main,
							r = i.lineAt(n);
						if (n > r.from + 200) return t;
						let s = i.sliceString(r.from, n);
						if (!e.some((t) => t.test(s))) return t;
						let { state: o } = t,
							a = -1,
							l = [];
						for (let { head: t } of o.selection.ranges) {
							let e = o.doc.lineAt(t);
							if (e.from == a) continue;
							a = e.from;
							let i = wu(o, e.from);
							if (null == i) continue;
							let n = /^\s*/.exec(e.text)[0],
								r = vu(o, i);
							n != r &&
								l.push({
									from: e.from,
									to: e.from + n.length,
									insert: r,
								});
						}
						return l.length
							? [t, { changes: l, sequential: !0 }]
							: t;
					})
				),
			!1 !== t.syntaxHighlighting && n.push(od(hd, { fallback: !0 })),
			!1 !== t.bracketMatching &&
				n.push(
					(function (t = {}) {
						return [dd.of(t), gd];
					})()
				),
			!1 !== t.closeBrackets && n.push([gO, dO]),
			!1 !== t.autocompletion &&
				n.push(
					(function (t = {}) {
						return [Lf, Vf, bf.of(t), Yf, PO, Bf];
					})()
				),
			!1 !== t.rectangularSelection &&
				n.push(
					(function () {
						let t = (t) => t.altKey && 0 == t.button;
						return uh.mouseSelectionStyle.of((e, i) =>
							t(i)
								? (function (t, e) {
										let i = nc(t, e),
											n = t.state.selection;
										return i
											? {
													update(t) {
														if (t.docChanged) {
															let e =
																	t.changes.mapPos(
																		t.startState.doc.line(
																			i.line
																		).from
																	),
																r =
																	t.state.doc.lineAt(
																		e
																	);
															(i = {
																line: r.number,
																col: i.col,
																off: Math.min(
																	i.off,
																	r.length
																),
															}),
																(n = n.map(
																	t.changes
																));
														}
													},
													get(e, r, s) {
														let o = nc(t, e);
														if (!o) return n;
														let a = (function (
															t,
															e,
															i
														) {
															let n = Math.min(
																	e.line,
																	i.line
																),
																r = Math.max(
																	e.line,
																	i.line
																),
																s = [];
															if (
																e.off > ic ||
																i.off > ic ||
																e.col < 0 ||
																i.col < 0
															) {
																let o =
																		Math.min(
																			e.off,
																			i.off
																		),
																	a =
																		Math.max(
																			e.off,
																			i.off
																		);
																for (
																	let e = n;
																	e <= r;
																	e++
																) {
																	let i =
																		t.doc.line(
																			e
																		);
																	i.length <=
																		a &&
																		s.push(
																			Fn.range(
																				i.from +
																					o,
																				i.to +
																					a
																			)
																		);
																}
															} else {
																let o =
																		Math.min(
																			e.col,
																			i.col
																		),
																	a =
																		Math.max(
																			e.col,
																			i.col
																		);
																for (
																	let e = n;
																	e <= r;
																	e++
																) {
																	let i =
																			t.doc.line(
																				e
																			),
																		n = es(
																			i.text,
																			o,
																			t.tabSize,
																			!0
																		);
																	if (n < 0)
																		s.push(
																			Fn.cursor(
																				i.to
																			)
																		);
																	else {
																		let e =
																			es(
																				i.text,
																				a,
																				t.tabSize
																			);
																		s.push(
																			Fn.range(
																				i.from +
																					n,
																				i.from +
																					e
																			)
																		);
																	}
																}
															}
															return s;
														})(t.state, i, o);
														return a.length
															? s
																? Fn.create(
																		a.concat(
																			n.ranges
																		)
																	)
																: Fn.create(a)
															: n;
													},
												}
											: null;
									})(e, i)
								: null
						);
					})()
				),
			!1 !== e &&
				n.push(
					(function (t = {}) {
						let [e, i] = rc[t.key || 'Alt'],
							n = da.fromClass(
								class {
									constructor(t) {
										(this.view = t), (this.isDown = !1);
									}
									set(t) {
										this.isDown != t &&
											((this.isDown = t),
											this.view.update([]));
									}
								},
								{
									eventObservers: {
										keydown(t) {
											this.set(t.keyCode == e || i(t));
										},
										keyup(t) {
											(t.keyCode != e && i(t)) ||
												this.set(!1);
										},
										mousemove(t) {
											this.set(i(t));
										},
									},
								}
							);
						return [
							n,
							uh.contentAttributes.of((t) => {
								var e;
								return (
									null === (e = t.plugin(n)) || void 0 === e
										? void 0
										: e.isDown
								)
									? sc
									: null;
							}),
						];
					})()
				),
			!1 !== t.highlightActiveLine && n.push(tc),
			!1 !== t.highlightSelectionMatches &&
				n.push(
					(function () {
						let t = [bg, gg];
						return t;
					})()
				),
			t.tabSize &&
				'number' == typeof t.tabSize &&
				n.push(bu.of(' '.repeat(t.tabSize))),
			n.concat([yh.of(i.flat())]).filter(Boolean)
		);
	};
	const kb = '#e06c75',
		$b = '#abb2bf',
		Pb = '#7d8799',
		Zb = '#d19a66',
		Tb = '#2c313a',
		Cb = '#282c34',
		Ab = '#353a42',
		Xb = '#528bff',
		Mb = [
			uh.theme(
				{
					'&': { color: $b, backgroundColor: Cb },
					'.cm-content': { caretColor: Xb },
					'.cm-cursor, .cm-dropCursor': { borderLeftColor: Xb },
					'&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
						{ backgroundColor: '#3E4451' },
					'.cm-panels': { backgroundColor: '#21252b', color: $b },
					'.cm-panels.cm-panels-top': {
						borderBottom: '2px solid black',
					},
					'.cm-panels.cm-panels-bottom': {
						borderTop: '2px solid black',
					},
					'.cm-searchMatch': {
						backgroundColor: '#72a1ff59',
						outline: '1px solid #457dff',
					},
					'.cm-searchMatch.cm-searchMatch-selected': {
						backgroundColor: '#6199ff2f',
					},
					'.cm-activeLine': { backgroundColor: '#6699ff0b' },
					'.cm-selectionMatch': { backgroundColor: '#aafe661a' },
					'&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket':
						{ backgroundColor: '#bad0f847' },
					'.cm-gutters': {
						backgroundColor: Cb,
						color: Pb,
						border: 'none',
					},
					'.cm-activeLineGutter': { backgroundColor: Tb },
					'.cm-foldPlaceholder': {
						backgroundColor: 'transparent',
						border: 'none',
						color: '#ddd',
					},
					'.cm-tooltip': { border: 'none', backgroundColor: Ab },
					'.cm-tooltip .cm-tooltip-arrow:before': {
						borderTopColor: 'transparent',
						borderBottomColor: 'transparent',
					},
					'.cm-tooltip .cm-tooltip-arrow:after': {
						borderTopColor: Ab,
						borderBottomColor: Ab,
					},
					'.cm-tooltip-autocomplete': {
						'& > ul > li[aria-selected]': {
							backgroundColor: Tb,
							color: $b,
						},
					},
				},
				{ dark: !0 }
			),
			od(
				id.define([
					{ tag: Zi.keyword, color: '#c678dd' },
					{
						tag: [
							Zi.name,
							Zi.deleted,
							Zi.character,
							Zi.propertyName,
							Zi.macroName,
						],
						color: kb,
					},
					{
						tag: [Zi.function(Zi.variableName), Zi.labelName],
						color: '#61afef',
					},
					{
						tag: [
							Zi.color,
							Zi.constant(Zi.name),
							Zi.standard(Zi.name),
						],
						color: Zb,
					},
					{ tag: [Zi.definition(Zi.name), Zi.separator], color: $b },
					{
						tag: [
							Zi.typeName,
							Zi.className,
							Zi.number,
							Zi.changed,
							Zi.annotation,
							Zi.modifier,
							Zi.self,
							Zi.namespace,
						],
						color: '#e5c07b',
					},
					{
						tag: [
							Zi.operator,
							Zi.operatorKeyword,
							Zi.url,
							Zi.escape,
							Zi.regexp,
							Zi.link,
							Zi.special(Zi.string),
						],
						color: '#56b6c2',
					},
					{ tag: [Zi.meta, Zi.comment], color: Pb },
					{ tag: Zi.strong, fontWeight: 'bold' },
					{ tag: Zi.emphasis, fontStyle: 'italic' },
					{ tag: Zi.strikethrough, textDecoration: 'line-through' },
					{ tag: Zi.link, color: Pb, textDecoration: 'underline' },
					{ tag: Zi.heading, fontWeight: 'bold', color: kb },
					{
						tag: [Zi.atom, Zi.bool, Zi.special(Zi.variableName)],
						color: Zb,
					},
					{
						tag: [Zi.processingInstruction, Zi.string, Zi.inserted],
						color: '#98c379',
					},
					{ tag: Zi.invalid, color: '#ffffff' },
				])
			),
		];
	var Rb = uh.theme({ '&': { backgroundColor: '#fff' } }, { dark: !1 }),
		_b = function (t) {
			void 0 === t && (t = {});
			var {
					indentWithTab: e = !0,
					editable: i = !0,
					readOnly: n = !1,
					theme: r = 'light',
					placeholder: s = '',
					basicSetup: o = !0,
				} = t,
				a = [];
			switch (
				(e && a.unshift(yh.of([Fm])),
				o &&
					('boolean' == typeof o
						? a.unshift(Qb())
						: a.unshift(Qb(o))),
				s &&
					a.unshift(
						(function (t) {
							return da.fromClass(
								class {
									constructor(e) {
										(this.view = e),
											(this.placeholder = t
												? mo.set([
														mo
															.widget({
																widget: new ec(
																	t
																),
																side: 1,
															})
															.range(0),
													])
												: mo.none);
									}
									get decorations() {
										return this.view.state.doc.length
											? mo.none
											: this.placeholder;
									}
								},
								{ decorations: (t) => t.decorations }
							);
						})(s)
					),
				r)
			) {
				case 'light':
					a.push(Rb);
					break;
				case 'dark':
					a.push(Mb);
					break;
				case 'none':
					break;
				default:
					a.push(r);
			}
			return (
				!1 === i && a.push(uh.editable.of(!1)),
				n && a.push(Vr.readOnly.of(!0)),
				[...a]
			);
		},
		Vb = Sr.define(),
		qb = [],
		jb = [
			'className',
			'value',
			'selection',
			'extensions',
			'onChange',
			'onStatistics',
			'onCreateEditor',
			'onUpdate',
			'autoFocus',
			'theme',
			'height',
			'minHeight',
			'maxHeight',
			'width',
			'minWidth',
			'maxWidth',
			'basicSetup',
			'placeholder',
			'indentWithTab',
			'editable',
			'readOnly',
			'root',
			'initialState',
		],
		Db = (0, i.forwardRef)((t, e) => {
			var {
					className: n,
					value: r = '',
					selection: s,
					extensions: o = [],
					onChange: a,
					onStatistics: l,
					onCreateEditor: h,
					onUpdate: c,
					autoFocus: u,
					theme: d = 'light',
					height: f,
					minHeight: O,
					maxHeight: p,
					width: m,
					minWidth: g,
					maxWidth: b,
					basicSetup: y,
					placeholder: v,
					indentWithTab: w,
					editable: S,
					readOnly: x,
					root: Q,
					initialState: k,
				} = t,
				$ = (function (t, e) {
					if (null == t) return {};
					var i = {};
					for (var n in t)
						if ({}.hasOwnProperty.call(t, n)) {
							if (e.includes(n)) continue;
							i[n] = t[n];
						}
					return i;
				})(t, jb),
				P = (0, i.useRef)(null),
				{
					state: Z,
					view: T,
					container: C,
				} = (function (t) {
					var {
							value: e,
							selection: n,
							onChange: r,
							onStatistics: s,
							onCreateEditor: o,
							onUpdate: a,
							extensions: l = qb,
							autoFocus: h,
							theme: c = 'light',
							height: u = null,
							minHeight: d = null,
							maxHeight: f = null,
							width: O = null,
							minWidth: p = null,
							maxWidth: m = null,
							placeholder: g = '',
							editable: b = !0,
							readOnly: y = !1,
							indentWithTab: v = !0,
							basicSetup: w = !0,
							root: S,
							initialState: x,
						} = t,
						[Q, k] = (0, i.useState)(),
						[$, P] = (0, i.useState)(),
						[Z, T] = (0, i.useState)(),
						C = uh.theme({
							'&': {
								height: u,
								minHeight: d,
								maxHeight: f,
								width: O,
								minWidth: p,
								maxWidth: m,
							},
							'& .cm-scroller': { height: '100% !important' },
						}),
						A = uh.updateListener.of((t) => {
							if (
								t.docChanged &&
								'function' == typeof r &&
								!t.transactions.some((t) => t.annotation(Vb))
							) {
								var e = t.state.doc.toString();
								r(e, t);
							}
							s &&
								s(
									((t) => ({
										line: t.state.doc.lineAt(
											t.state.selection.main.from
										),
										lineCount: t.state.doc.lines,
										lineBreak: t.state.lineBreak,
										length: t.state.doc.length,
										readOnly: t.state.readOnly,
										tabSize: t.state.tabSize,
										selection: t.state.selection,
										selectionAsSingle:
											t.state.selection.asSingle().main,
										ranges: t.state.selection.ranges,
										selectionCode: t.state.sliceDoc(
											t.state.selection.main.from,
											t.state.selection.main.to
										),
										selections:
											t.state.selection.ranges.map((e) =>
												t.state.sliceDoc(e.from, e.to)
											),
										selectedText:
											t.state.selection.ranges.some(
												(t) => !t.empty
											),
									}))(t)
								);
						}),
						X = [
							A,
							C,
							..._b({
								theme: c,
								editable: b,
								readOnly: y,
								placeholder: g,
								indentWithTab: v,
								basicSetup: w,
							}),
						];
					return (
						a &&
							'function' == typeof a &&
							X.push(uh.updateListener.of(a)),
						(X = X.concat(l)),
						(0, i.useEffect)(() => {
							if (Q && !Z) {
								var t = { doc: e, selection: n, extensions: X },
									i = x
										? Vr.fromJSON(x.json, t, x.fields)
										: Vr.create(t);
								if ((T(i), !$)) {
									var r = new uh({
										state: i,
										parent: Q,
										root: S,
									});
									P(r), o && o(r, i);
								}
							}
							return () => {
								$ && (T(void 0), P(void 0));
							};
						}, [Q, Z]),
						(0, i.useEffect)(() => k(t.container), [t.container]),
						(0, i.useEffect)(
							() => () => {
								$ && ($.destroy(), P(void 0));
							},
							[$]
						),
						(0, i.useEffect)(() => {
							h && $ && $.focus();
						}, [h, $]),
						(0, i.useEffect)(() => {
							$ && $.dispatch({ effects: kr.reconfigure.of(X) });
						}, [c, l, u, d, f, O, p, m, g, b, y, v, w, r, a]),
						(0, i.useEffect)(() => {
							if (void 0 !== e) {
								var t = $ ? $.state.doc.toString() : '';
								$ &&
									e !== t &&
									$.dispatch({
										changes: {
											from: 0,
											to: t.length,
											insert: e || '',
										},
										annotations: [Vb.of(!0)],
									});
							}
						}, [e, $]),
						{
							state: Z,
							setState: T,
							view: $,
							setView: P,
							container: Q,
							setContainer: k,
						}
					);
				})({
					container: P.current,
					root: Q,
					value: r,
					autoFocus: u,
					theme: d,
					height: f,
					minHeight: O,
					maxHeight: p,
					width: m,
					minWidth: g,
					maxWidth: b,
					basicSetup: y,
					placeholder: v,
					indentWithTab: w,
					editable: S,
					readOnly: x,
					selection: s,
					onChange: a,
					onStatistics: l,
					onCreateEditor: h,
					onUpdate: c,
					extensions: o,
					initialState: k,
				});
			if (
				((0, i.useImperativeHandle)(
					e,
					() => ({ editor: P.current, state: Z, view: T }),
					[P, C, Z, T]
				),
				'string' != typeof r)
			)
				throw new Error(
					'value must be typeof string but got ' + typeof r
				);
			var A = 'string' == typeof d ? 'cm-theme-' + d : 'cm-theme';
			return (0, At.jsx)(
				'div',
				xp({ ref: P, className: A + (n ? ' ' + n : '') }, $)
			);
		});
	Db.displayName = 'CodeMirror';
	const Eb = Db,
		Wb = ({ settingsGroup: t, fieldName: e }) => {
			const { control: i } = $();
			return (0, At.jsxs)(Tt.__experimentalVStack, {
				width: '100%',
				spacing: 4,
				children: [
					(0, At.jsx)(V, {
						name: `${t}.${e}.content`,
						control: i,
						render: ({ field: t }) =>
							(0, At.jsx)(Eb, {
								...t,
								placeholder: (0, Ct.__)(
									'Place your code here',
									'timbertail'
								),
								height: '300px',
								theme: 'light',
								options: { keyMap: 'sublime', mode: 'html' },
								extensions: [vp()],
							}),
					}),
					(0, At.jsx)(V, {
						name: `${t}.${e}.isActive`,
						control: i,
						render: ({ field: t }) =>
							(0, At.jsx)(Tt.ToggleControl, {
								...t,
								label: (0, Ct.__)(
									'Activate scripts',
									'timbertail'
								),
								checked: t.value,
								__nextHasNoMarginBottom: !0,
							}),
					}),
				],
			});
		},
		Yb = () => {
			const t = [
				{
					fieldName: 'head',
					sectionTitle: (0, Ct.__)('Scripts in Header', 'timbertail'),
					sectionDescription: (0, Ct.__)(
						'These scripts will be printed in the <head> section',
						'timbertail'
					),
				},
				{
					fieldName: 'body',
					sectionTitle: (0, Ct.__)('Scripts in Body', 'timbertail'),
					sectionDescription: (0, Ct.__)(
						'These scripts will be printed in the <body> section',
						'timbertail'
					),
				},
				{
					fieldName: 'footer',
					sectionTitle: (0, Ct.__)('Scripts in Footer', 'timbertail'),
					sectionDescription: (0, Ct.__)(
						'These scripts will be printed in the <footer> section',
						'timbertail'
					),
				},
			];
			return (0, At.jsx)(At.Fragment, {
				children: t.map(
					({
						fieldName: t,
						sectionTitle: e,
						sectionDescription: i,
					}) =>
						(0, At.jsx)(
							Mt,
							{
								sectionTitle: e,
								sectionDescription: i,
								children: (0, At.jsx)(Wb, {
									settingsGroup: 'scriptsSettings',
									fieldName: t,
								}),
							},
							t
						)
				),
			});
		},
		zb = (t) => {
			const [i, n] = (0, e.useState)(!1);
			return {
				isOpen: i,
				handleShowDialog: () => {
					n(!0);
				},
				handleConfirm: () => {
					t(), n(!1);
				},
				handleCancel: () => {
					n(!1);
				},
			};
		},
		Lb = 'oCouH4uSJwbGwAW9eutQ',
		Bb = ({ index: t, settingsGroup: e, handleRemove: i, isNew: n }) => {
			const {
					control: r,
					watch: s,
					formState: { errors: o },
				} = $(),
				a =
					s(`${e}.${t}.platform`) ||
					(0, Ct.__)('New Social Media', 'timbertail');
			return (0, At.jsx)(Tt.Panel, {
				children: (0, At.jsx)(Tt.PanelBody, {
					title: a,
					initialOpen: n,
					children: (0, At.jsxs)('div', {
						style: { marginTop: '16px' },
						children: [
							(0, At.jsx)(Tt.PanelRow, {
								children: (0, At.jsx)(V, {
									name: `${e}.${t}.platform`,
									control: r,
									rules: {
										required: {
											value: !0,
											message: 'Field is required',
										},
									},
									render: ({ field: i }) =>
										(0, At.jsx)('div', {
											style: { flex: 1 },
											children: (0, At.jsx)(
												Tt.TextControl,
												{
													...i,
													label: (0, Ct.__)(
														'Platform Name',
														'timbertail'
													),
													help:
														o?.[e]?.[t]?.platform &&
														(0, At.jsx)('span', {
															className: Lb,
															children:
																o?.[e]?.[t]
																	?.platform
																	.message,
														}),
													__next40pxDefaultSize: !0,
												}
											),
										}),
								}),
							}),
							(0, At.jsx)(Tt.PanelRow, {
								children: (0, At.jsx)(V, {
									name: `${e}.${t}.url`,
									control: r,
									rules: {
										required: {
											value: !0,
											message: 'Field is required',
										},
									},
									render: ({ field: i }) =>
										(0, At.jsx)('div', {
											style: { flex: 1 },
											children: (0, At.jsx)(
												Tt.TextControl,
												{
													...i,
													label: (0, Ct.__)(
														'URL',
														'timbertail'
													),
													help:
														o?.[e]?.[t]?.url &&
														(0, At.jsx)('span', {
															className: Lb,
															children:
																o?.[e]?.[t]?.url
																	.message,
														}),
													__next40pxDefaultSize: !0,
												}
											),
										}),
								}),
							}),
							(0, At.jsx)(Tt.PanelRow, {
								children: (0, At.jsx)(Tt.Button, {
									variant: 'primary',
									isDestructive: !0,
									onClick: i,
									style: { width: 'fit-content' },
									children: (0, Ct.__)(
										'Remove item',
										'timbertail'
									),
								}),
							}),
						],
					}),
				}),
			});
		},
		Ub = () => {
			const { control: t } = $(),
				{
					fields: n,
					append: r,
					remove: s,
				} = (function (t) {
					const e = $(),
						{
							control: n = e.control,
							name: r,
							keyName: s = 'id',
							shouldUnregister: o,
							rules: a,
						} = t,
						[l, h] = i.useState(n._getFieldArray(r)),
						c = i.useRef(n._getFieldArray(r).map(j)),
						d = i.useRef(l),
						f = i.useRef(r),
						p = i.useRef(!1);
					(f.current = r),
						(d.current = l),
						n._names.array.add(r),
						a && n.register(r, a),
						M({
							next: ({ values: t, name: e }) => {
								if (e === f.current || !e) {
									const e = O(t, f.current);
									Array.isArray(e) &&
										(h(e), (c.current = e.map(j)));
								}
							},
							subject: n._subjects.array,
						});
					const m = i.useCallback(
						(t) => {
							(p.current = !0), n._updateFieldArray(r, t);
						},
						[n, r]
					);
					return (
						i.useEffect(() => {
							if (
								((n._state.action = !1),
								W(r, n._names) &&
									n._subjects.state.next({ ...n._formState }),
								p.current &&
									(!E(n._options.mode).isOnSubmit ||
										n._formState.isSubmitted))
							)
								if (n._options.resolver)
									n._executeSchema([r]).then((t) => {
										const e = O(t.errors, r),
											i = O(n._formState.errors, r);
										(i
											? (!e && i.type) ||
												(e &&
													(i.type !== e.type ||
														i.message !==
															e.message))
											: e && e.type) &&
											(e
												? b(n._formState.errors, r, e)
												: ut(n._formState.errors, r),
											n._subjects.state.next({
												errors: n._formState.errors,
											}));
									});
								else {
									const t = O(n._fields, r);
									!t ||
										!t._f ||
										(E(n._options.reValidateMode)
											.isOnSubmit &&
											E(n._options.mode).isOnSubmit) ||
										nt(
											t,
											n._formValues,
											n._options.criteriaMode === S,
											n._options
												.shouldUseNativeValidation,
											!0
										).then(
											(t) =>
												!T(t) &&
												n._subjects.state.next({
													errors: z(
														n._formState.errors,
														t,
														r
													),
												})
										);
								}
							n._subjects.values.next({
								name: r,
								values: { ...n._formValues },
							}),
								n._names.focus &&
									Y(n._fields, (t, e) => {
										if (
											n._names.focus &&
											e.startsWith(n._names.focus) &&
											t.focus
										)
											return t.focus(), 1;
									}),
								(n._names.focus = ''),
								n._updateValid(),
								(p.current = !1);
						}, [l, r, n]),
						i.useEffect(
							() => (
								!O(n._formValues, r) && n._updateFieldArray(r),
								() => {
									(n._options.shouldUnregister || o) &&
										n.unregister(r);
								}
							),
							[r, n, s, o]
						),
						{
							swap: i.useCallback(
								(t, e) => {
									const i = n._getFieldArray(r);
									ct(i, t, e),
										ct(c.current, t, e),
										m(i),
										h(i),
										n._updateFieldArray(
											r,
											i,
											ct,
											{ argA: t, argB: e },
											!1
										);
								},
								[m, r, n]
							),
							move: i.useCallback(
								(t, e) => {
									const i = n._getFieldArray(r);
									at(i, t, e),
										at(c.current, t, e),
										m(i),
										h(i),
										n._updateFieldArray(
											r,
											i,
											at,
											{ argA: t, argB: e },
											!1
										);
								},
								[m, r, n]
							),
							prepend: i.useCallback(
								(t, e) => {
									const i = A(u(t)),
										s = lt(n._getFieldArray(r), i);
									(n._names.focus = D(r, 0, e)),
										(c.current = lt(c.current, i.map(j))),
										m(s),
										h(s),
										n._updateFieldArray(r, s, lt, {
											argA: st(t),
										});
								},
								[m, r, n]
							),
							append: i.useCallback(
								(t, e) => {
									const i = A(u(t)),
										s = rt(n._getFieldArray(r), i);
									(n._names.focus = D(r, s.length - 1, e)),
										(c.current = rt(c.current, i.map(j))),
										m(s),
										h(s),
										n._updateFieldArray(r, s, rt, {
											argA: st(t),
										});
								},
								[m, r, n]
							),
							remove: i.useCallback(
								(t) => {
									const e = ht(n._getFieldArray(r), t);
									(c.current = ht(c.current, t)),
										m(e),
										h(e),
										!Array.isArray(O(n._fields, r)) &&
											b(n._fields, r, void 0),
										n._updateFieldArray(r, e, ht, {
											argA: t,
										});
								},
								[m, r, n]
							),
							insert: i.useCallback(
								(t, e, i) => {
									const s = A(u(e)),
										o = ot(n._getFieldArray(r), t, s);
									(n._names.focus = D(r, t, i)),
										(c.current = ot(
											c.current,
											t,
											s.map(j)
										)),
										m(o),
										h(o),
										n._updateFieldArray(r, o, ot, {
											argA: t,
											argB: st(e),
										});
								},
								[m, r, n]
							),
							update: i.useCallback(
								(t, e) => {
									const i = u(e),
										s = dt(n._getFieldArray(r), t, i);
									(c.current = [...s].map((e, i) =>
										e && i !== t ? c.current[i] : j()
									)),
										m(s),
										h([...s]),
										n._updateFieldArray(
											r,
											s,
											dt,
											{ argA: t, argB: i },
											!0,
											!1
										);
								},
								[m, r, n]
							),
							replace: i.useCallback(
								(t) => {
									const e = A(u(t));
									(c.current = e.map(j)),
										m([...e]),
										h([...e]),
										n._updateFieldArray(
											r,
											[...e],
											(t) => t,
											{},
											!0,
											!1
										);
								},
								[m, r, n]
							),
							fields: i.useMemo(
								() =>
									l.map((t, e) => ({
										...t,
										[s]: c.current[e] || j(),
									})),
								[l, s]
							),
						}
					);
				})({ control: t, name: 'socialMediaSettings' }),
				[o, a] = (0, e.useState)(null),
				{
					isOpen: l,
					handleShowDialog: h,
					handleConfirm: c,
					handleCancel: d,
				} = zb(() => {
					s(), a(null);
				});
			return (0, At.jsx)(Mt, {
				sectionTitle: (0, Ct.__)('Social Media', 'timbertail'),
				sectionDescription: (0, Ct.__)(
					'Add your social media platforms',
					'timbertail'
				),
				children: (0, At.jsxs)(Tt.__experimentalVStack, {
					spacing: 4,
					children: [
						0 === n.length
							? (0, At.jsx)('p', {
									children: (0, Ct.__)(
										'No social media links added yet. Click the button below to add one.',
										'timbertail'
									),
								})
							: (0, At.jsx)('div', {
									children: n.map((t, e) =>
										(0, At.jsx)(
											Bb,
											{
												index: e,
												settingsGroup:
													'socialMediaSettings',
												handleRemove: () =>
													((t) => {
														s(t);
													})(e),
												isNew: e === o,
											},
											t.id
										)
									),
								}),
						(0, At.jsx)(Tt.__experimentalConfirmDialog, {
							isOpen: l,
							onConfirm: c,
							onCancel: d,
							cancelButtonText: (0, Ct.__)(
								'No, thanks',
								'timbertail'
							),
							confirmButtonText: (0, Ct.__)(
								'Yes, please!',
								'timbertail'
							),
							children: (0, Ct.__)(
								'Are you sure you want to remove all items?',
								'timbertail'
							),
						}),
						(0, At.jsxs)(Tt.__experimentalHStack, {
							justify: 'flex-start',
							children: [
								(0, At.jsx)(Tt.Button, {
									variant: 'secondary',
									onClick: () => {
										r({ platform: '', url: '' }),
											a(n.length);
									},
									style: { width: 'fit-content' },
									children: (0, Ct.__)(
										'Add item',
										'timbertail'
									),
								}),
								n.length > 0 &&
									(0, At.jsx)(Tt.Button, {
										variant: 'secondary',
										isDestructive: !0,
										onClick: h,
										style: { width: 'fit-content' },
										children: (0, Ct.__)(
											'Remove all items',
											'timbertail'
										),
									}),
							],
						}),
					],
				}),
			});
		},
		Nb = {
			commonSettings: {
				excerptLength: 55,
				customBodyClasses: [],
				disableWordpressVersion: !1,
				addSvgSupport: !1,
				disableXmlRpc: !1,
				disableAdminBar: !1,
				disableFileEdit: !1,
			},
			scriptsSettings: {
				head: { content: '', isActive: !1 },
				body: { content: '', isActive: !1 },
				footer: { content: '', isActive: !1 },
			},
			socialMediaSettings: [],
		},
		Gb = window.wp.apiFetch;
	var Ib = t.n(Gb);
	const Fb = () => {
			const {
					notice: t,
					dismissNotice: n,
					settings: r,
					submitSettings: s,
					isFetchingSettings: o,
					notices: a,
					showSnackbar: l,
					onRemove: h,
				} = (() => {
					const [t, i] = (0, e.useState)({}),
						[n, r] = (0, e.useState)(!0),
						{
							notice: s,
							showNotice: o,
							dismissNotice: a,
						} = (() => {
							const [t, i] = (0, e.useState)({
									isVisible: !1,
									type: '',
									message: '',
								}),
								n = () => {
									i({ isVisible: !1, type: '', message: '' });
								};
							return (
								(0, e.useEffect)(() => {
									const t = setTimeout(() => {
										n();
									}, 2e3);
									return () => clearTimeout(t);
								}, [t.isVisible]),
								{
									notice: t,
									setNotice: i,
									showNotice: (t, e, n) => {
										i({
											isVisible: t,
											type: e,
											message: n,
										});
									},
									dismissNotice: n,
								}
							);
						})(),
						{
							notices: l,
							showSnackbar: h,
							onRemove: c,
						} = (() => {
							const [t, i] = (0, e.useState)([]);
							return {
								notices: t,
								showSnackbar: (t) => {
									const e = {
										id: Date.now().toString(),
										content: t,
										spokenMessage: t,
									};
									i((t) => [...t, e]);
								},
								onRemove: (t) => {
									i((e) => e.filter((e) => e.id !== t));
								},
							};
						})();
					return (
						(0, e.useEffect)(() => {
							(async () => {
								try {
									const t = await Ib()({
										path: 'tt/v1/settings',
									});
									i(t);
								} catch (t) {
									o(!0, 'error', 'Error fetching settings.'),
										console.error(
											'Error fetching settings:',
											t
										);
								} finally {
									r(!1);
								}
							})();
						}, []),
						{
							notice: s,
							dismissNotice: a,
							settings: t,
							submitSettings: async (t) => {
								try {
									const e = await Ib()({
											path: 'tt/v1/settings',
											method: 'POST',
											data: { tt_theme_settings: t },
											parse: !1,
										}),
										i = await e.json();
									e.ok
										? (o(!0, 'success', i.message),
											h(i.message))
										: (o(!0, 'warning', i.message),
											h(i.message));
								} catch (t) {
									o(
										!0,
										'error',
										'An unexpected error occurred.'
									),
										h(t.message);
								}
							},
							isFetchingSettings: n,
							notices: l,
							showSnackbar: h,
							onRemove: c,
						}
					);
				})(),
				c = (function (t = {}) {
					const e = i.useRef(void 0),
						n = i.useRef(void 0),
						[r, s] = i.useState({
							isDirty: !1,
							isValidating: !1,
							isLoading: B(t.defaultValues),
							isSubmitted: !1,
							isSubmitting: !1,
							isSubmitSuccessful: !1,
							isValid: !1,
							submitCount: 0,
							dirtyFields: {},
							touchedFields: {},
							validatingFields: {},
							errors: t.errors || {},
							disabled: t.disabled || !1,
							defaultValues: B(t.defaultValues)
								? void 0
								: t.defaultValues,
						});
					e.current || (e.current = { ...Zt(t), formState: r });
					const o = e.current.control;
					return (
						(o._options = t),
						M({
							subject: o._subjects.state,
							next: (t) => {
								C(
									t,
									o._proxyFormState,
									o._updateFormState,
									!0
								) && s({ ...o._formState });
							},
						}),
						i.useEffect(
							() => o._disableForm(t.disabled),
							[o, t.disabled]
						),
						i.useEffect(() => {
							if (o._proxyFormState.isDirty) {
								const t = o._getDirty();
								t !== r.isDirty &&
									o._subjects.state.next({ isDirty: t });
							}
						}, [o, r.isDirty]),
						i.useEffect(() => {
							t.values && !pt(t.values, n.current)
								? (o._reset(t.values, o._options.resetOptions),
									(n.current = t.values),
									s((t) => ({ ...t })))
								: o._resetDefaultValues();
						}, [t.values, o]),
						i.useEffect(() => {
							t.errors && o._setErrors(t.errors);
						}, [t.errors, o]),
						i.useEffect(() => {
							o._state.mount ||
								(o._updateValid(), (o._state.mount = !0)),
								o._state.watch &&
									((o._state.watch = !1),
									o._subjects.state.next({
										...o._formState,
									})),
								o._removeUnmounted();
						}),
						i.useEffect(() => {
							t.shouldUnregister &&
								o._subjects.values.next({
									values: o._getWatch(),
								});
						}, [t.shouldUnregister, o]),
						(e.current.formState = Z(r, o)),
						e.current
					);
				})({ defaultValues: r });
			(0, e.useEffect)(() => {
				r && c.reset(r);
			}, [r]);
			const {
					isOpen: u,
					handleShowDialog: d,
					handleConfirm: f,
					handleCancel: O,
				} = zb(() => {
					s(Nb),
						c.reset(Nb),
						l(
							'Settings have been successfully reset to their default values.'
						);
				}),
				p = [
					{
						name: 'commonSettings',
						title: 'Common',
						className: 'tab',
						component: (0, At.jsx)(qt, {}),
					},
					{
						name: 'scriptsSettings',
						title: 'Scripts',
						className: 'tab',
						component: (0, At.jsx)(Yb, {}),
					},
					{
						name: 'socialMediaSettings',
						title: 'Social Media',
						className: 'tab',
						component: (0, At.jsx)(Ub, {}),
					},
				];
			return (0, At.jsxs)(At.Fragment, {
				children: [
					t.isVisible &&
						(0, At.jsx)('div', {
							style: {
								marginBottom: '.75rem',
								marginTop: '.75rem',
							},
							children: (0, At.jsx)(Tt.Notice, {
								status: t.type,
								onDismiss: n,
								children: t.message,
							}),
						}),
					a.length > 0 &&
						(0, At.jsx)(Tt.SnackbarList, {
							notices: a,
							onRemove: h,
						}),
					(0, At.jsx)(Tt.__experimentalConfirmDialog, {
						isOpen: u,
						onConfirm: f,
						onCancel: O,
						cancelButtonText: (0, Ct.__)(
							'No, keep my settings',
							'timbertail'
						),
						confirmButtonText: (0, Ct.__)(
							'Yes, reset all',
							'timbertail'
						),
						children: (0, Ct.__)(
							'Are you sure you want to reset all settings to their default values?',
							'timbertail'
						),
					}),
					(0, At.jsx)(P, {
						...c,
						children: (0, At.jsx)('form', {
							onSubmit: c.handleSubmit(async (t) => {
								await s(t);
							}),
							children: (0, At.jsxs)(Tt.Card, {
								isRounded: !1,
								children: [
									(0, At.jsx)(Tt.CardHeader, {
										children: (0, At.jsx)(
											Tt.__experimentalHeading,
											{
												level: 1,
												style: { fontWeight: 600 },
												children: (0, Ct.__)(
													'Theme Settings',
													'timbertail'
												),
											}
										),
									}),
									(0, At.jsx)(Tt.CardBody, {
										children: o
											? (0, At.jsx)(Tt.Spinner, {})
											: (0, At.jsx)(Tt.TabPanel, {
													tabs: p,
													children: (t) =>
														t.component,
												}),
									}),
									(0, At.jsx)(Tt.CardFooter, {
										children: (0, At.jsxs)(
											Tt.__experimentalHStack,
											{
												spacing: 4,
												justify: 'flex-start',
												children: [
													(0, At.jsx)(Tt.Button, {
														type: 'submit',
														variant: 'primary',
														isBusy: c.formState
															.isSubmitting,
														disabled:
															c.formState
																.isSubmitting,
														children: c.formState
															.isSubmitting
															? (0, Ct.__)(
																	'Saving…',
																	'timbertail'
																)
															: (0, Ct.__)(
																	'Save settings',
																	'timbertail'
																),
													}),
													(0, At.jsx)(Tt.Button, {
														variant: 'tertiary',
														isDestructive: !0,
														onClick: d,
														disabled:
															c.formState
																.isSubmitting,
														children: (0, Ct.__)(
															'Reset settings',
															'timbertail'
														),
													}),
												],
											}
										),
									}),
								],
							}),
						}),
					}),
				],
			});
		},
		Hb = () => (0, At.jsx)(Fb, {}),
		Kb = document.getElementById('tt-theme-settings');
	Kb && (0, e.createRoot)(Kb).render((0, At.jsx)(Hb, {}));
})();
